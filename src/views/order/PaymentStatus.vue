<template>
  <div class="payment-status" v-cloak>
    <!--失败时： 用icon-iconfontguanbi fail替换icon-duihao2 bg-color-red-->
    <div class="iconfont icon-duihao2 bg-color-red"></div>
    <div class="status" v-if="orderInfo.payType === 1">
      订单创建成功
    </div>
    <div class="status" v-else-if="orderInfo.status === 1">订单支付成功</div>
    <div class="wrapper">
      <div class="item acea-row row-between-wrapper">
        <div>订单编号</div>
        <div class="itemCom" v-text="orderInfo.orderSn"></div>
      </div>
      <div class="item acea-row row-between-wrapper">
        <div>下单时间</div>
        <div
          class="itemCom"
          v-text="getOrderTimeStr(orderInfo.createTime)"
        ></div>
      </div>
      <div class="item acea-row row-between-wrapper">
        <div>支付方式</div>
        <div class="itemCom" v-if="orderInfo.payType === 0">
          微信支付
        </div>
        <div class="itemCom" v-else>
          线下支付
        </div>
      </div>
      <div class="item acea-row row-between-wrapper">
        <div>支付金额</div>
        <div class="itemCom" v-text="orderInfo.totalAmount"></div>
      </div>
    </div>
    <div>
      <div class="returnBnt bg-color-red" @click="goPages()">查看订单</div>
      <div class="returnBnt cart-color" @click="goPages('/')">返回首页</div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getOrderDetail, updateOrder } from "@api/order";
import { getTimeStr } from "@libs/order";

const NAME = "PayMentStatus";

export default {
  name: NAME,
  props: {},
  data: function() {
    return {
      id: "",
      toPay: 0,
      orderInfo: {}
    };
  },
  watch: {
    $route(n) {
      if (n.name === NAME && this.id !== n.params.id) {
        this.id = n.params.id;
        this.toPay = parseInt(n.params.toPay);
        this.getOrderInfo();
      }
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  mounted() {
    this.id = this.$route.params.id;
    this.toPay = parseInt(this.$route.params.toPay);
    this.getOrderInfo(this.id).then(() => {
      if (
        this.toPay === 1 ||
        (this.orderInfo.payType === 0 && this.orderInfo.status === 0)
      ) {
        this.$dialog.loading.open("支付中");
        this.orderInfo.status = 1;
        updateOrder(this.orderInfo).then(() => {
          this.sleep(() => {
            this.$dialog.loading.close();
            this.$dialog.toast({ mes: " 支付成功" });
          }, 3000);
        });
      }
    });
  },
  methods: {
    getOrderTimeStr(t) {
      return getTimeStr(t);
    },
    sleep: function(fun, time) {
      setTimeout(() => {
        fun();
      }, time);
    },
    goPages(route) {
      let routes =
        route !== undefined ? route : "/order/detail/" + this.orderInfo.id;
      return this.$router.replace({
        path: routes
      });
    },
    getOrderInfo() {
      return getOrderDetail(this.id).then(res => {
        this.orderInfo = res.order;
        document.title = "订单创建成功";
      });
    }
  }
};
</script>
