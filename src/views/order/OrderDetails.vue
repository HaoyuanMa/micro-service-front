<template>
  <div class="order-details">
    <!-- 给header上与data上加on为退款订单-->
    <div
      class="header bg-color-red acea-row row-middle"
      :class="refundOrder ? 'on' : ''"
    >
      <div class="data" :class="refundOrder ? 'on' : ''">
        <div class="state">{{ getStatus }}</div>
        <div>
          <span class="time">{{ getOrderTimeStr(statusTime) }}</span>
        </div>
      </div>
    </div>
    <template v-if="!refundOrder">
      <!--订单状态导航-->
      <div class="nav">
        <div class="navCon acea-row row-between-wrapper">
          <div :class="{ on: orderInfo.status === 0 }">待付款</div>
          <div :class="{ on: orderInfo.status === 1 }">已付款</div>
          <div :class="{ on: orderInfo.status === 2 }">待评价</div>
          <div :class="{ on: orderInfo.status === 3 }">已完成</div>
        </div>
        <div class="progress acea-row row-between-wrapper">
          <div
            class="iconfont"
            :class="[
              status.type === 0 || status.type === 9
                ? 'icon-webicon318'
                : 'icon-yuandianxiao',
              status.type >= 0 ? 'font-color-red' : ''
            ]"
          ></div>
          <div
            class="line"
            :class="{ 'bg-color-red': status.type > 0 && status.type != 9 }"
          ></div>
          <div
            class="iconfont"
            :class="[
              status.type === 1 ? 'icon-webicon318' : 'icon-yuandianxiao',
              status.type >= 1 && status.type != 6 && status.type != 9
                ? 'font-color-red'
                : ''
            ]"
          ></div>
          <div
            class="line"
            :class="{
              'bg-color-red':
                status.type > 1 && status.type != 6 && status.type != 9
            }"
            v-if="orderInfo.shipping_type === 1"
          ></div>
          <div
            class="iconfont"
            :class="[
              status.type === 2 ? 'icon-webicon318' : 'icon-yuandianxiao',
              status.type >= 2 && status.type != 6 && status.type != 9
                ? 'font-color-red'
                : ''
            ]"
            v-if="orderInfo.shipping_type === 1"
          ></div>
          <div
            class="line"
            :class="{
              'bg-color-red':
                status.type > 2 && status.type != 6 && status.type != 9
            }"
          ></div>
          <div
            class="iconfont"
            :class="[
              status.type === 3 ? 'icon-webicon318' : 'icon-yuandianxiao',
              status.type >= 3 && status.type != 6 && status.type != 9
                ? 'font-color-red'
                : ''
            ]"
          ></div>
          <div
            class="line"
            :class="{
              'bg-color-red':
                status.type > 3 && status.type != 6 && status.type != 9
            }"
          ></div>
          <div
            class="iconfont"
            :class="[
              status.type == 4 ? 'icon-webicon318' : 'icon-yuandianxiao',
              status.type >= 4 && status.type != 6 && status.type != 9
                ? 'font-color-red'
                : ''
            ]"
          ></div>
        </div>
      </div>
      <!--地址信息-->
      <div class="address">
        <div class="name">
          {{ orderInfo.name }}
          <span class="phone">{{ orderInfo.userPhone }}</span>
        </div>
        <div>{{ getAddressStr() }}</div>
      </div>
      <div class="line">
        <img src="@assets/images/line.jpg" />
      </div>
    </template>

    <!--陪诊员信息-->
    <div v-if="orderInfo.status === 1">
      <div class="wrapper">
        <div class="item acea-row row-between">
          <div>陪诊员：</div>
          <div class="conter">{{ fellow.username }}</div>
        </div>
        <div class="item acea-row row-between">
          <div>联系电话：</div>
          <div class="conter acea-row row-middle row-right">
            {{ fellow.mobile }}
            <a :href="'tel:' + fellow.mobile"><span class="copy">拨打</span></a>
          </div>
        </div>
      </div>
    </div>
    <div class="evaluateWtapper" style="padding-top: 0.2rem">
      <div class="evaluateItem">
        <div class="pic-text acea-row row-middle">
          <div class="pictrue">
            <img :src="fellow.header" class="image" />
          </div>
          <div class="acea-row row-middle">
            <div class="name line1">{{ fellow.username }}</div>
          </div>
        </div>
        <div class="time">
          {{ fellow.age }}岁
          {{ getGender(fellow.gender) }}
        </div>
        <div class="evaluate-infor">{{ fellow.sign }}</div>
      </div>
    </div>
    <!--订单细节-->
    <div class="wrapper">
      <div class="item acea-row row-between">
        <div>订单编号：</div>
        <div class="conter acea-row row-middle row-right">
          {{ orderInfo.orderSn }}
          <span class="copy copy-data" :data-clipboard-text="orderInfo.id"
            >复制</span
          >
        </div>
      </div>
      <div class="item acea-row row-between">
        <div>下单时间：</div>
        <div class="conter">
          {{ getOrderTimeStr(orderInfo.createTime) }}
        </div>
      </div>
      <div class="item acea-row row-between">
        <div>支付状态：</div>
        <div class="conter">
          {{ orderInfo.status > 0 ? "已支付" : "未支付" }}
        </div>
      </div>
      <div class="item acea-row row-between">
        <div>支付方式：</div>
        <div class="conter">
          {{ orderInfo.payType ? "线下支付" : "微信支付" }}
        </div>
      </div>
      <div class="item acea-row row-between" v-if="orderInfo.note">
        <div>备注：</div>
        <div class="conter">{{ orderInfo.note }}</div>
      </div>
    </div>

    <!--支付详情 -->
    <div class="wrapper">
      <div class="item acea-row row-between">
        <div>支付金额：</div>
        <div class="conter">￥{{ orderInfo.totalAmount }}</div>
      </div>
      <div class="actualPay acea-row row-right">
        实付款：<span class="money font-color-red">￥{{ getPayAmount }}</span>
      </div>
    </div>
    <div style="height:1.2rem;" v-if="!refundOrder"></div>
    <!--footer-->
    <div class="footer acea-row row-right row-middle">
      <template v-if="orderInfo.status === 0">
        <div class="bnt cancel" @click="cancelOrder">取消订单</div>
        <div class="bnt bg-color-red" @click="toPay()">立即付款</div>
      </template>
      <template v-if="orderInfo.status === 1">
        <div class="bnt bg-color-red" @click="finishAcc()">
          陪诊结束
        </div>
      </template>
      <template v-if="orderInfo.status === 2">
        <div class="bnt bg-color-red" @click="toEvaluate()">
          去评价
        </div>
      </template>
      <template v-if="orderInfo.status === 3">
        <div class="bnt bg-color-red" @click="goFellowDetail(fellow.id)">
          再次下单
        </div>
      </template>
    </div>
    <GeneralWindow
      :generalActive="generalActive"
      @closeGeneralWindow="closeGeneralWindow"
      :generalContent="generalContent"
    ></GeneralWindow>
  </div>
</template>
<style scoped>
.goodCall {
  color: #e93323;
  text-align: center;
  width: 100%;
  height: 0.86rem;
  padding: 0 0.3rem;
  border-bottom: 0.01rem solid #eee;
  font-size: 0.3rem;
  line-height: 0.86rem;
  background: #fff;
}
.iconfont {
  margin-right: 0.15rem;
}
.geoPage {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 10000;
}
.order-details .writeOff {
  background-color: #fff;
  margin-top: 0.13rem;
  padding-bottom: 0.3rem;
}
.order-details .writeOff .title {
  font-size: 0.3rem;
  color: #282828;
  height: 0.87rem;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 0.3rem;
  line-height: 0.87rem;
}
.order-details .writeOff .grayBg {
  background-color: #f2f5f7;
  width: 5.9rem;
  height: 3.84rem;
  border-radius: 0.2rem 0.2rem 0 0;
  margin: 0.5rem auto 0 auto;
  padding-top: 0.55rem;
}
.order-details .writeOff .grayBg .pictrue {
  width: 2.9rem;
  height: 2.9rem;
  margin: 0 auto;
}
.order-details .writeOff .grayBg .pictrue img {
  width: 100%;
  height: 100%;
  display: block;
}
.order-details .writeOff .gear {
  width: 5.9rem;
  height: 0.3rem;
  margin: 0 auto;
}
.order-details .writeOff .gear img {
  width: 100%;
  height: 100%;
  display: block;
}
.order-details .writeOff .num {
  background-color: #f0c34c;
  width: 5.9rem;
  height: 0.84rem;
  color: #282828;
  font-size: 0.48rem;
  margin: 0 auto;
  border-radius: 0 0 0.2rem 0.2rem;
  text-align: center;
  padding-top: 0.04rem;
}
.order-details .writeOff .rules {
  margin: 0.46rem 0.3rem 0 0.3rem;
  border-top: 0.01rem solid #f0f0f0;
  padding-top: 0.1rem;
}
.order-details .writeOff .rules .item {
  margin-top: 0.15rem;
}
.order-details .writeOff .rules .item .rulesTitle {
  font-size: 0.28rem;
  color: #282828;
}
.order-details .writeOff .rules .item .rulesTitle .iconfont {
  font-size: 0.3rem;
  color: #333;
  margin-right: 0.08rem;
  margin-top: 0.05rem;
}
.order-details .writeOff .rules .item .info {
  font-size: 0.28rem;
  color: #999;
  margin-top: 0.05rem;
}
.order-details .writeOff .rules .item .info .time {
  margin-left: 0.2rem;
}
.order-details .map {
  height: 0.86rem;
  font-size: 0.3rem;
  color: #282828;
  line-height: 0.86rem;
  border-bottom: 0.01rem solid #f0f0f0;
  margin-top: 0.13rem;
  background-color: #fff;
  padding: 0 0.3rem;
}
.order-details .map .place {
  font-size: 0.26rem;
  width: 1.76rem;
  height: 0.5rem;
  border-radius: 0.25rem;
  line-height: 0.5rem;
  text-align: center;
}
.order-details .map .place .iconfont {
  font-size: 0.27rem;
  height: 0.27rem;
  line-height: 0.27rem;
  margin: 0.02rem 0.03rem 0 0;
}
.order-details .address .name .iconfont {
  font-size: 0.34rem;
  margin-left: 0.1rem;
}
</style>

<script>
import { getOrderDetail } from "@api/order";
import ClipboardJS from "clipboard";
import { isWeixin } from "@utils";
import { mapGetters } from "vuex";
import { cancelOrderHandle, finishAccHandle, getTimeStr } from "@libs/order";
import GeneralWindow from "@components/GeneralWindow";
import { getFellowDetail } from "@api/store";

const NAME = "OrderDetails";
export default {
  name: NAME,
  components: {
    GeneralWindow
  },
  props: {},
  data: function() {
    return {
      orderInfo: {},
      fellow: {},
      statusTime: "",
      generalActive: false,
      generalContent: {
        promoterNum: "",
        title: ""
      },

      offlinePayStatus: 2,
      orderTypeName: "普通订单",
      orderTypeNameStatus: true,
      offlineStatus: true,
      id: this.$route.params.id,
      status: {},
      pay: false,
      payType: ["yue", "weixin"],
      from: isWeixin() ? "weixin" : "weixinh5",
      system_store: {},
      mapKay: "",
      mapShow: false
    };
  },
  computed: {
    getPayAmount() {
      return this.orderInfo.status > 0 ? this.orderInfo.totalAmount : 0;
    },
    refundOrder() {
      return false;
    },
    getStatus() {
      switch (this.orderInfo.status) {
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
    ...mapGetters(["userInfo"])
  },
  watch: {
    $route(n) {
      if (n.name === NAME && this.id !== n.params.id) {
        this.id = n.params.id;
        this.getDetail();
      }
    }
  },
  inject: ["app"],
  mounted: function() {
    this.getDetail().then(() => {
      getFellowDetail(this.orderInfo.fellowId).then(data => {
        this.fellow = data.fellow;
      });
    });
    this.$nextTick(function() {
      let copybtn = document.getElementsByClassName("copy-data");
      const clipboard = new ClipboardJS(copybtn);
      clipboard.on("success", () => {
        this.$dialog.success("复制成功");
      });
    });
  },
  methods: {
    getGender: g => {
      return g === 1 ? "男" : " 女";
    },
    getAddressStr() {
      let o = this.orderInfo;
      let p = o.userProvince;
      let c = o.userCity;
      let r = o.userRegion;
      let d = o.userDetailAddress;
      return (p !== null ? p + "省" : "") + c + "市" + r + "," + d;
    },
    getOrderTimeStr(t) {
      return getTimeStr(t);
    },
    getDetail() {
      const id = this.id;
      if (!id) return this.$dialog.error("订单不存在");
      return getOrderDetail(id)
        .then(res => {
          console.log(res);
          this.orderInfo = res.order;
          switch (this.orderInfo.status) {
            case 0:
              this.statusTime = this.orderInfo.createTime;
              break;
            case 1:
              this.statusTime = this.orderInfo.paymentTime;
              break;
            case 4:
              this.statusTime = this.orderInfo.finishTime;
              break;
            default:
              this.statusTime = this.orderInfo.createTime;
          }
          //this.getOrderStatus();
          // this.system_store = res.data.system_store || {};
          // this.mapKey = res.data.mapKey;
          //this.setOfflinePayStatus(this.orderInfo.offlinePayStatus);
          this.$nextTick(function() {
            let copybtn = document.getElementsByClassName("copy-data");
            const clipboard = new ClipboardJS(copybtn);
            clipboard.on("success", () => {
              this.$dialog.success("复制成功");
            });
          });
        })
        .catch(err => {
          this.$dialog.error(err.msg);
          this.$router.go(-1);
        });
    },
    toPay() {
      this.$router.push({
        path: "/order/status/" + this.orderInfo.id + "/1",
        toPay: true
      });
    },
    goBack() {
      const history = this.app.history,
        last = history[history.length - 1] || {};
      if (last.name === "MyOrder") return this.$router.go(-1);
      else {
        return this.$router.replace({ path: "/order/list/" });
      }
    },
    cancelOrder() {
      cancelOrderHandle(this.orderInfo.id)
        .then(() => {
          setTimeout(() => this.goBack(), 300);
        })
        .catch(() => {
          this.getDetail();
        });
    },
    finishAcc() {
      finishAccHandle(this.orderInfo.id)
        .then(() => {
          setTimeout(() => {
            this.generalContent.title = "陪诊结束";
            this.generalContent.promoterNum = "记得评价呦！";
            this.generalActive = true;
          }, 1000);
        })
        .finally(() => {
          this.getDetail();
        });
    },
    closeGeneralWindow(msg) {
      this.generalActive = msg;
      this.getDetail();
    },
    toEvaluate() {
      //todo:
    },
    goFellowDetail(id) {
      this.$router.push({ path: "/detail/" + id });
    }
  }
};
</script>
