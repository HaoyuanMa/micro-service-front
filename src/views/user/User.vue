<template>
  <div class="user">
    <!--header-->
    <div class="header bg-color-red acea-row row-between-wrapper">
      <div class="picTxt acea-row row-between-wrapper">
        <div class="pictrue"><img :src="userInfo.header" /></div>
        <div class="text">
          <div class="acea-row row-middle">
            <div class="name line1">{{ userInfo.username }}</div>
          </div>
          <router-link :to="'/user/data'" class="id">
            mobile：{{ userInfo.mobile }}
          </router-link>
        </div>
      </div>
      <span
        class="iconfont icon-shezhi"
        @click="$router.push({ path: '/user/data' })"
      ></span>
    </div>
    <div class="wrapper">
      <div class="myOrder">
        <div class="title acea-row row-between-wrapper">
          <div>我的订单</div>
          <router-link :to="'/order/list/0'" class="allOrder">
            全部订单<span class="iconfont icon-jiantou"></span>
          </router-link>
        </div>
        <!--订单分类Nav-->
        <div class="orderState acea-row row-middle">
          <router-link :to="{ path: '/order/list/' + 0 }" class="item">
            <div class="pictrue">
              <img src="@assets/images/dfk.png" />
              <span class="order-status-num" v-if="orderStats.unpaid > 0">{{
                orderStats.unpaid
              }}</span>
            </div>
            <div>待付款</div>
          </router-link>
          <router-link :to="{ path: '/order/list/' + 1 }" class="item">
            <div class="pictrue">
              <img src="@assets/images/dfh.png" />
              <span class="order-status-num" v-if="orderStats.paid > 0">{{
                orderStats.paid
              }}</span>
            </div>
            <div>待完成</div>
          </router-link>
          <router-link :to="{ path: '/order/list/' + 2 }" class="item">
            <div class="pictrue">
              <img src="@assets/images/dpj.png" />
              <span
                class="order-status-num"
                v-if="orderStats.waitToComment > 0"
                >{{ orderStats.waitToComment }}</span
              >
            </div>
            <div>待评价</div>
          </router-link>
        </div>
      </div>
      <div class="myService order-submission">
        <div class="title acea-row row-middle">我的地址</div>
        <div class="allAddress" style="padding-top: 0.2rem">
          <div class="address acea-row row-between-wrapper" @click="addressTap">
            <div class="addressCon" v-if="hasDefaultAddress">
              <div class="name">
                {{ userAddress.name }}
                <span class="phone">{{ userAddress.phone }}</span>
              </div>
              <div>
                <span class="default font-color-red">[默认]</span>
                {{ getAddressStr() }}
              </div>
            </div>
            <div class="addressCon" v-else>
              <div class="setaddress">设置收货地址</div>
            </div>
            <div class="iconfont icon-jiantou"></div>
          </div>
          <div class="line">
            <img src="@assets/images/line.jpg" />
          </div>
        </div>
      </div>
      <div class="myService order-submission">
        <div class="userEvaluation" id="title1">
          <router-link :to="{ path: '/collection' }" class="praise">
            <div class="title acea-row row-between-wrapper">
              <span>我的关注</span>
              <span class="iconfont icon-jiantou"></span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="footer-line-height"></div>
    <AddressWindow
      @checked="changeAddress"
      @redirect="addressRedirect"
      v-model="showAddress"
      :checked="userAddress.id"
      :to-default="true"
      ref="mychild"
    ></AddressWindow>
  </div>
</template>

<script>
import { getUser, getDefaultAddress } from "@api/user";
import { getOrderStats } from "@api/order";
import AddressWindow from "@components/AddressWindow";
const NAME = "User";

export default {
  name: NAME,
  props: {},
  components: {
    AddressWindow
  },
  data: function() {
    return {
      hasDefaultAddress: false,
      userAddress: {},
      addressLoaded: false,
      showAddress: false,
      userInfo: {},
      orderStats: {
        unpaid: 0,
        paid: 0,
        waitToComment: 0,
        finished: 0
      }
    };
  },
  watch: {
    $route(n) {
      if (n.name === NAME) this.getUserInfo();
    }
  },
  mounted: function() {
    this.getUserInfo();
  },
  methods: {
    getAddressStr() {
      let p = this.userAddress.province;
      let c = this.userAddress.city;
      let r = this.userAddress.region;
      let d = this.userAddress.detailAddress;
      return (p !== null ? p + "省" : "") + c + "市" + r + "," + d;
    },
    getUserInfo: function() {
      let that = this;
      getUser().then(res => {
        that.userInfo = res.user;
        getOrderStats().then(res => {
          let os = that.orderStats;
          os.unpaid = res.unpaid;
          os.paid = res.paid;
          os.waitToComment = res.waitToComment;
          os.finished = res.finished;
          getDefaultAddress().then(res => {
            that.userAddress = res.data;
            if (that.userAddress) that.hasDefaultAddress = true;
            that.contactsName = that.userAddress.name;
            that.contactsTel = that.userAddress.phone;
          });
        });
      });
    },
    changeAddress(addressInfo) {
      this.userAddress = addressInfo;
    },
    addressRedirect() {
      this.addressLoaded = false;
      this.showAddress = false;
    },
    addressTap: function() {
      this.showAddress = true;
      if (!this.addressLoaded) {
        this.addressLoaded = true;
        this.$refs.mychild.getAddressList();
      }
    }
  }
};
</script>

<style scoped>
.footer-line-height {
  height: 1rem;
}
.order-status-num {
  min-width: 0.33rem;
  background-color: #fff;
  color: #ee5a52;
  border-radius: 15px;
  position: absolute;
  right: -0.14rem;
  top: -0.15rem;
  font-size: 0.2rem;
  padding: 0 0.08rem;
  border: 1px solid #ee5a52;
}

.pictrue {
  position: relative;
}
.switch-h5 {
  margin-left: 0.2rem;
}
.binding {
  padding: 0.05rem 0.2rem;
  background-color: #ca1f10;
  border-radius: 50px;
  font-size: 0.14rem;
  border: 1px solid #e8695e;
  color: #ffffff;
}
</style>
