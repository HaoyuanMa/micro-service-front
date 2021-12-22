<template>
  <div
    :class="[posterImageStatus ? 'noscroll product-con' : 'product-con']"
    ref="box"
    @scroll.native="onScroll"
  >
    <div
      class="header acea-row row-center-wrapper"
      :style="'opacity:' + opacity"
      ref="header"
    >
      <div
        class="item"
        :class="navActive === index ? 'on' : ''"
        v-for="(item, index) in navList"
        :key="index"
        @click="asideTap(index)"
      >
        {{ item }}
      </div>
    </div>
    <div id="title0">
      <img :src="fellow.header" width="100%" />
      <div class="wrapper">
        <div class="share acea-row row-between row-bottom">
          <div class="money">
            <span class="num">{{ fellow.username }}</span>
          </div>
        </div>
        <div class="introduce">{{ fellow.sign }}</div>
        <div class="label acea-row row-between-wrapper">
          <div>性别: {{ getGender(fellow.gender) }}</div>
          <div>年龄: {{ fellow.age }}</div>
          <div>状态: {{ getStatus(fellow.status) }}</div>
        </div>
      </div>
    </div>
    <div class="userEvaluation" id="title1">
      <div class="title acea-row row-between-wrapper">
        <div>用户评价({{ replyCount }})</div>
        <router-link :to="{ path: '/evaluate_list/' + id }" class="praise"
          ><span class="font-color-red">{{ replyChance }}%</span>好评率<span
            class="iconfont icon-jiantou"
          ></span
        ></router-link>
      </div>
      <user-evaluation
        :reply="reply ? reply.slice(0, 2) : []"
      ></user-evaluation>
    </div>
    <div class="product-intro userEvaluation" id="title3">
      <div class="title">陪诊员介绍</div>
      <img :src="fellow.header" width="100%" />
      <div class="label">
        <div>姓名: {{ fellow.username }}</div>
        <div>性别: {{ getGender(fellow.gender) }}</div>
        <div>年龄: {{ fellow.age }}</div>
        <div>地址: {{ getAddressStr() }}</div>
        <div>联系电话: {{ fellow.mobile }}</div>
        <div>电子邮件: {{ fellow.email }}</div>
        <div>简介:</div>
      </div>
      <div class="conter" v-html="'  ' + fellow.description"></div>
    </div>
    <div style="height:1.2rem;"></div>
    <div class="order-submission">
      <div class="footer acea-row row-between-wrapper">
        <div class="item" @click="setAttend">
          <div
            class="iconfont"
            :class="isAttend ? 'icon-shoucang1' : 'icon-shoucang'"
          ></div>
          <div>关注</div>
        </div>
        <div class="settlement" @click="submitOrder" v-if="fellow.status === 0">
          下单
        </div>
        <div class="settlement bg-color-hui" v-else>陪诊员忙碌</div>
      </div>
    </div>
  </div>
</template>
<script>
import "@assets/css/swiper.min.css";
import UserEvaluation from "@components/UserEvaluation";
import debounce from "lodash.debounce";
import { mapGetters } from "vuex";
import { getAttend, getFellowDetail, toAttend } from "@api/store";

let NAME = "GoodsCon";
export default {
  name: NAME,
  components: {
    UserEvaluation
  },
  data: function() {
    return {
      animated: false,
      id: 0,
      fellow: {},
      replyCount: "",
      replyChance: "",
      reply: [],
      navList: [],
      lock: false,
      navActive: 0,
      opacity: 0,
      isAttend: false
    };
  },
  computed: mapGetters(["isLogin"]),
  watch: {
    $route(n) {
      if (n.name === NAME) {
        this.id = n.params.id;
        this.fellow.slider_image = [];
        this.fellowCon();
      }
    }
  },
  updated() {
    // window.scroll(0, 0);
  },
  mounted: function() {
    document.addEventListener("scroll", this.onScroll, false);
    this.id = this.$route.params.id;
    this.fellow.slider_image = [];
    this.fellowCon();
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    getAddressStr() {
      let p = this.fellow.province;
      let c = this.fellow.city;
      let r = this.fellow.region;
      let d = this.fellow.detailAddress;
      let addressStr = (p !== null ? p + "省" : "") + c + "市" + r + "," + d;
      return addressStr;
    },
    getGender: g => {
      return g === 1 ? "男" : "女";
    },
    getStatus: s => {
      return s ? "忙碌" : "空闲";
    },
    handleScroll() {
      let top = document.body.scrollTop || document.documentElement.scrollTop;
      let opacity = top / 350;
      opacity = opacity > 1 ? 1 : opacity;
      this.opacity = opacity;
    },
    asideTap(a) {
      this.$nextTick(() => {
        let index = a;
        this.navActive = index;
        if (index === 2) {
          index = 3;
        }
        let element = document.querySelector("#title" + index);
        const top =
          element.offsetTop - this.$refs.header.offsetHeight - window.scrollY;
        this.lock = true;
        window.scrollBy({ top, left: 0, behavior: "smooth" });
      });
    },
    onScroll: debounce(function() {
      if (this.lock) {
        this.lock = false;
        return;
      }
      const headerHeight = this.$refs.header.offsetHeight,
        { scrollY } = window,
        titles = [];
      titles.push(document.querySelector("#title0"));
      titles.push(document.querySelector("#title1"));
      titles.push(document.querySelector("#title3"));
      titles.reduce((initial, title, index) => {
        if (
          !document.querySelector("#title0") &&
          !document.querySelector("#title1") &&
          !document.querySelector("#title2")
        ) {
          return;
        }
        if (initial) return initial;
        if (scrollY + headerHeight < title.offsetTop + title.offsetHeight) {
          initial = true;
          this.navActive = index;
        }
        return initial;
      }, false);
    }, 500),
    updateTitle() {
      document.title = this.fellow.store_name || this.$route.meta.title;
    },
    fellowCon: function() {
      let that = this;
      getFellowDetail(that.id)
        .then(data => {
          that.$set(that, "fellow", data.fellow);
          that.$set(that, "replyCount", data.replyCount);
          that.$set(that, "replyChance", data.replyChance);
          that.reply = data.reply ? data.reply : [];
          that.$set(that, "reply", that.reply);
          that.navList = ["商品", "评价", "详情"];
          that.updateTitle();
          getAttend(that.fellow.id).then(res => {
            that.isAttend = res.status;
          });
        })
        .catch(res => {
          that.$dialog.error(res.msg);
          that.$router.go(-1);
        });
    },
    setAttend: function() {
      let id = this.fellow.id;
      toAttend(id).then(() => {
        this.isAttend = !this.isAttend;
        this.$dialog.toast({ mes: " 操作成功" });
      });
    },
    submitOrder: function() {
      console.log("in GoodCon " + this.fellow.id);
      this.$router.push({ path: "/order/submit/" + this.fellow.id });
    }
  },
  beforeDestroy: function() {
    document.removeEventListener("scroll", this.onScroll, false);
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style scoped>
.mask {
  z-index: 888 !important;
}
.activity_pin {
  width: auto;
  height: 0.44rem;
  background: linear-gradient(
    90deg,
    rgba(233, 51, 35, 1) 0%,
    rgba(250, 101, 20, 1) 100%
  );
  opacity: 1;
  border-radius: 0.22rem;
  padding: 0 0.2rem;
  margin-left: 0.19rem;
}
.activity_miao {
  width: auto;
  height: 0.44rem;
  padding: 0 0.2rem;
  background: linear-gradient(
    90deg,
    rgba(250, 102, 24, 1) 0%,
    rgba(254, 161, 15, 1) 100%
  );
  opacity: 1;
  border-radius: 0.22rem;
  margin-left: 0.19rem;
}
.iconfonts {
  color: #fff !important;
  font-size: 0.28rem;
  display: block;
}
.activity_title {
  font-size: 0.24rem;
  color: #fff;
}
.activity_kan {
  width: auto;
  height: 0.44rem;
  padding: 0 0.2rem;
  background: linear-gradient(
    90deg,
    rgba(254, 159, 15, 1) 0%,
    rgba(254, 178, 15, 1) 100%
  );
  opacity: 1;
  border-radius: 0.22rem;
  margin-left: 0.19rem;
}
.addressBox .phone {
  margin-left: 1.1rem;
}
.corlor-red {
  color: #fc4141;
}
.store-box {
  padding: 0 0.3rem;
  border-bottom: 1px solid #f5f5f5;
}
.geoPage {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 10000;
}
.product-con .header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 0.96rem;
  font-size: 0.3rem;
  color: #050505;
  background-color: #fff;
  z-index: 11;
  border-bottom: 0.01rem solid #eee;
}
.product-con .header .item {
  position: relative;
  margin: 0 0.35rem;
}
.product-con .header .item.on:before {
  position: absolute;
  width: 0.6rem;
  height: 0.05rem;
  background-repeat: no-repeat;
  content: "";
  background: linear-gradient(to left, #ff3366 0%, #ff6533 100%);
  background: -webkit-linear-gradient(to left, #ff3366 0%, #ff6533 100%);
  background: -moz-linear-gradient(to left, #ff3366 0%, #ff6533 100%);
  bottom: -0.1rem;
}
.product-con .store-info {
  margin-top: 0.2rem;
  background-color: #fff;
}
.product-con .store-info .title {
  font-size: 0.28rem;
  color: #282828;
  height: 0.8rem;
  line-height: 0.8rem;
  border-bottom: 0.01rem solid #f5f5f5;
}
.product-con .store-info .info {
  padding: 0 0.3rem;
  height: 1.26rem;
}
.store-info .icon-jiantou {
  color: #7a7a7a;
  font-size: 0.28rem;
}
.product-con .store-info .info .pictrue {
  width: 0.76rem;
  height: 0.76rem;
}
.product-con .store-info .info .pictrue img {
  width: 100%;
  height: 100%;
  border-radius: 0.06rem;
}
.product-con .store-info .info .text {
  width: 56%;
}
.product-con .store-info .info .text .name {
  font-size: 0.3rem;
  color: #282828;
}
.product-con .store-info .info .text .address {
  font-size: 0.24rem;
  color: #666;
  margin-top: 0.03rem;
}
.product-con .store-info .info .text .address .iconfont {
  color: #707070;
  font-size: 0.18rem;
  margin-left: 0.1rem;
}
.address_tit {
  max-width: 88% !important;
}
.addressTxt {
  width: auto;
  font-size: 0.24rem;
}
.product-con .store-info .info .iconfont {
  font-size: 0.4rem;
}
.product-con .superior {
  background-color: #fff;
  margin-top: 0.2rem;
}
.product-con .superior .title {
  height: 0.98rem;
}
.product-con .superior .title img {
  width: 0.3rem;
  height: 0.3rem;
}
.product-con .superior .title .titleTxt {
  margin: 0 0.2rem;
  font-size: 0.3rem;
  background-image: linear-gradient(to right, #f57a37 0%, #f21b07 100%);
  background-image: -webkit-linear-gradient(to right, #f57a37 0%, #f21b07 100%);
  background-image: -moz-linear-gradient(to right, #f57a37 0%, #f21b07 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.product-con .superior .slider-banner {
  width: 6.9rem;
  margin: 0 auto;
  padding-bottom: 0.2rem;
}
.product-con .superior .slider-banner .list {
  width: 100%;
  padding-bottom: 0.2rem;
}
.product-con .superior .slider-banner .list .item {
  width: 2.15rem;
  margin: 0 0.21rem 0.2rem 0;
  font-size: 0.26rem;
}
.product-con .superior .slider-banner .list .item:nth-of-type(3n) {
  margin-right: 0;
}
.product-con .superior .slider-banner .list .item .pictrue {
  width: 100%;
  height: 2.15rem;
  position: relative;
}
.product-con .superior .slider-banner .list .item .pictrue img {
  width: 100%;
  height: 100%;
  border-radius: 0.06rem;
}
.product-con .superior .slider-banner .list .item .name {
  color: #282828;
  margin-top: 0.12rem;
}
.product-con .superior .slider-banner .swiper-pagination-bullet {
  background-color: #999;
}
.product-con .superior .slider-banner .swiper-pagination-bullet-active {
  background-color: #e93323;
}

.mask {
  -webkit-filter: blur(2px);
  -moz-filter: blur(2px);
  -ms-filter: blur(2px);
  filter: blur(2px);
  z-index: 888 !important;
}
.footer .icon-shoucang1 {
  color: #e93323;
}
.product-con .product-intro .conter div {
  width: 100% !important;
}
.generate-posters {
  width: 100%;
  height: 1.7rem;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  transform: translate3d(0, 100%, 0);
  -webkit-transform: translate3d(0, 100%, 0);
  -ms-transform: translate3d(0, 100%, 0);
  -moz-transform: translate3d(0, 100%, 0);
  -o-transform: translate3d(0, 100%, 0);
  transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
  -webkit-transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
  -moz-transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
  -o-transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
  opacity: 0;
}
.generate-posters.on {
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  opacity: 1;
}
.generate-posters .item {
  flex: 50%;
  -webkit-flex: 50%;
  -ms-flex: 50%;
  text-align: center;
}
.generate-posters .item .iconfont {
  font-size: 0.8rem;
  color: #5eae72;
}
.generate-posters .item .iconfont.icon-haibao {
  color: #5391f1;
}
.noscroll {
  height: 100%;
  overflow: hidden;
}
</style>
