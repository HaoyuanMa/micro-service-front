<template>
  <div class="my-order" ref="container">
    <div class="header bg-color-red">
      <div class="picTxt acea-row row-between-wrapper">
        <div class="text">
          <div class="name">订单信息</div>
          <div>累计订单：{{ orderStats.total }}</div>
        </div>
        <div class="pictrue"><img src="@assets/images/orderTime.png" /></div>
      </div>
    </div>
    <div class="nav acea-row row-around">
      <div
        class="item"
        :class="{ on: type === 0 }"
        @click="$router.replace({ path: '/order/list/0' })"
      >
        <div>待付款</div>
        <div class="num">{{ orderStats.unpaid }}</div>
      </div>
      <div
        class="item"
        :class="{ on: type === 1 }"
        @click="$router.replace({ path: '/order/list/1' })"
      >
        <div>已付款</div>
        <div class="num">{{ orderStats.paid }}</div>
      </div>
      <div
        class="item"
        :class="{ on: type === 2 }"
        @click="$router.replace({ path: '/order/list/2' })"
      >
        <div>待评价</div>
        <div class="num">{{ orderStats.waitToComment }}</div>
      </div>
      <div
        class="item"
        :class="{ on: type === 3 }"
        @click="$router.replace({ path: '/order/list/3' })"
      >
        <div>已完成</div>
        <div class="num">{{ orderStats.finished }}</div>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="order in orderList" :key="order.id">
        <div class="title acea-row row-between-wrapper">
          <div class="acea-row row-middle">
            {{ order.createTime }}
          </div>
          <div class="font-color-red">{{ getStatusStr(order.status) }}</div>
        </div>
        <div @click="$router.push({ path: '/order/detail/' + order.id })">
          <div class="item-info acea-row row-between row-top">
            <div class="pictrue">
              <img
                :src="order.fellowHeader"
                @click.stop="
                  $router.push({ path: '/detail/' + order.fellowId })
                "
              />
            </div>
            <div class="text acea-row row-between">
              <div class="name line2">
                {{ order.fellowName }}
              </div>
              <div class="money">
                <div>￥{{ order.totalAmount }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="totalPrice">
          总金额
          <span class="money font-color-red">￥{{ order.totalAmount }}</span>
        </div>
        <div class="bottom acea-row row-right row-middle">
          <template v-if="order.status === 0">
            <div class="bnt cancelBnt" @click="cancelOrder(order.id)">
              取消订单
            </div>
          </template>
          <template v-if="order.status === 0">
            <div class="bnt bg-color-red" @click="toPay(order.id)">
              立即付款
            </div>
          </template>
          <template v-if="order.status === 1">
            <div class="bnt bg-color-red" @click="finishAcc(order.id)">
              完成陪诊
            </div>
          </template>
          <template v-if="order.status === 2">
            <div
              class="bnt bg-color-red"
              @click="$router.push({ path: '/goods_evaluate/' + order.id })"
            >
              去评价
            </div>
          </template>
          <template v-if="order.status === 3">
            <div
              class="bnt bg-color-red"
              @click="$router.push({ path: '/order/detail/' + order.id })"
            >
              查看订单
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="noCart" v-if="orderList.length === 0 && page > 1">
      <div class="pictrue"><img src="@assets/images/noOrder.png" /></div>
    </div>
    <Loading :loaded="loaded" :loading="loading"></Loading>
    <GeneralWindow
      :generalActive="generalActive"
      @closeGeneralWindow="closeGeneralWindow"
      :generalContent="generalContent"
    ></GeneralWindow>
  </div>
</template>
<script>
import { getOrderList, getOrderStats } from "@api/order";
import { cancelOrderHandle, finishAccHandle } from "@libs/order";
import Loading from "@components/Loading";
import { mapGetters } from "vuex";
import GeneralWindow from "@components/GeneralWindow";

const NAME = "MyOrder";

export default {
  name: NAME,
  data() {
    return {
      type: parseInt(this.$route.params.type) || 0,
      orderStats: {
        unpaid: 0,
        paid: 0,
        waitToComment: 0,
        finished: 0,
        total: 0
      },
      page: 1,
      limit: 20,
      loaded: false,
      loading: false,
      orderList: [],
      generalActive: false,
      generalContent: {
        promoterNum: "",
        title: ""
      }
    };
  },
  components: {
    Loading,
    GeneralWindow
  },
  computed: mapGetters(["userInfo"]),
  watch: {
    $route(n) {
      if (n.name === NAME) {
        const type = parseInt(this.$route.params.type) || 0;
        if (this.type !== type) {
          this.changeType(type);
        }
        this.getOrderData();
      }
    }
  },
  mounted() {
    this.getOrderData();
    this.$scroll(this.$refs.container, () => {
      !this.loading && this.getOrderData();
    });
  },
  methods: {
    getStatusStr(s) {
      switch (s) {
        case 0:
          return "待付款";
        case 1:
          return "已付款";
        case 2:
          return "待评价";
        case 3:
          return "已完成";
        default:
          return "";
      }
    },
    getOrderData() {
      let that = this;
      if (this.loading || this.loaded) return;
      this.loading = true;
      const { page, limit, type } = this;
      getOrderStats()
        .then(res => {
          let os = that.orderStats;
          os.unpaid = res.unpaid;
          os.paid = res.paid;
          os.waitToComment = res.waitToComment;
          os.finished = res.finished;
          os.total = res.total;
        })
        .then(() => {
          getOrderList(type, {
            page,
            limit
          }).then(res => {
            this.orderList = res.page.list;
            this.page++;
            this.loaded = res.page.list.length < this.limit;
            this.loading = false;
          });
        });
    },
    cancelOrder(orderId) {
      cancelOrderHandle(orderId).then(() => {
        this.reload();
      });
    },
    changeType(type) {
      this.type = type;
      this.orderList = [];
      this.page = 1;
      this.loaded = false;
      this.loading = false;
      this.getOrderData();
    },
    finishAcc(orderId) {
      finishAccHandle(orderId)
        .then(() => {
          setTimeout(() => {
            this.generalContent.title = "陪诊结束";
            this.generalContent.promoterNum = "记得评价呦！";
            this.generalActive = true;
          }, 1000);
        })
        .finally(() => {
          this.reload();
        });
    },
    closeGeneralWindow(msg) {
      this.generalActive = msg;
      this.reload();
      this.getOrderData();
    },
    toPay(orderId) {
      this.$router.push({
        path: "/order/status/" + orderId + "/1",
        toPay: true
      });
    },
    reload() {
      this.changeType(this.type);
    }
  }
};
</script>

<style scoped>
.noCart {
  margin-top: 0.17rem;
  padding-top: 0.1rem;
}

.noCart .pictrue {
  width: 4rem;
  height: 3rem;
  margin: 0.7rem auto 0.5rem auto;
}

.noCart .pictrue img {
  width: 100%;
  height: 100%;
}
</style>
