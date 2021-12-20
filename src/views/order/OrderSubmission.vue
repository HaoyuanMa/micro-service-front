<template>
  <div class="order-submission">
    <!--地址-->
    <div class="allAddress" style="padding-top: 0.2rem">
      <div class="address acea-row row-between-wrapper" @click="addressTap">
        <div class="addressCon" v-if="hasDefaultAddress">
          <div class="name">
            {{ userAddress.name }}
            <span class="phone">{{ userAddress.phone }}</span>
          </div>
          <div>
            <span
              class="default font-color-red"
              v-if="userAddress.defaultStatus"
              >[默认]</span
            >
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
    <!--fellow信息-->
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
    <!--备注-->
    <div class="wrapper">
      <div>
        <div class="item acea-row row-between-wrapper">
          <div>联系人</div>
          <div class="discount">
            <input
              type="text"
              placeholder="请填写您的联系姓名"
              v-model="contactsName"
              disabled="true"
            />
          </div>
        </div>
        <div class="item acea-row row-between-wrapper">
          <div>联系电话</div>
          <div class="discount">
            <input
              type="text"
              placeholder="请填写您的联系电话"
              v-model="contactsTel"
              disabled="true"
            />
          </div>
        </div>
      </div>
      <div class="item">
        <div>备注信息</div>
        <textarea
          placeholder="请添加备注（150字以内）"
          v-model="note"
        ></textarea>
      </div>
    </div>
    <!--支付方式-->
    <div class="wrapper">
      <div class="item">
        <div>支付方式</div>
        <div class="list">
          <!--微信支付(微信内)-->
          <div
            class="payItem acea-row row-middle"
            :class="active === 'weixin' ? 'on' : ''"
            @click="payItem('weixin')"
            v-show="isWeixin"
          >
            <div class="name acea-row row-center-wrapper">
              <div
                class="iconfont icon-weixin2"
                :class="active === 'weixin' ? 'bounceIn' : ''"
              ></div>
              微信支付
            </div>
            <div class="tip">微信快捷支付</div>
          </div>
          <!--微信支付(非微信内)-->
          <div
            class="payItem acea-row row-middle"
            :class="active === 'weixin' ? 'on' : ''"
            @click="payItem('weixin')"
            v-show="!isWeixin"
          >
            <div class="name acea-row row-center-wrapper">
              <div
                class="iconfont icon-weixin2"
                :class="active === 'weixin' ? 'bounceIn' : ''"
              ></div>
              微信支付
            </div>
            <div class="tip">微信快捷支付</div>
          </div>
          <!--线下支付-->
          <div
            class="payItem acea-row row-middle"
            :class="active === 'offline' ? 'on' : ''"
            @click="payItem('offline')"
          >
            <div class="name acea-row row-center-wrapper">
              <div
                class="iconfont icon-yinhangqia"
                :class="active === 'offline' ? 'bounceIn' : ''"
              ></div>
              线下支付
            </div>
            <div class="tip">线下方便支付</div>
          </div>
        </div>
      </div>
    </div>
    <div style="height:1.2rem"></div>
    <div class="footer acea-row row-between-wrapper">
      <div>
        合计:
        <span class="font-color-red">￥{{ fellow.price }}</span>
      </div>
      <div class="settlement" @click="createOrder">立即结算</div>
    </div>
    <AddressWindow
      @checked="changeAddress"
      @redirect="addressRedirect"
      v-model="showAddress"
      :checked="userAddress.id"
      ref="mychild"
    ></AddressWindow>
  </div>
</template>
<style scoped>
.order-submission .wrapper .shipping select {
  color: #999;
  padding-right: 0.15rem;
}
.order-submission .wrapper .shipping .iconfont {
  font-size: 0.3rem;
  color: #515151;
}
.order-submission .allAddress {
  width: 100%;
  background-image: linear-gradient(to bottom, #e93323 0%, #f5f5f5 100%);
  background-image: -webkit-linear-gradient(
    to bottom,
    #e93323 0%,
    #f5f5f5 100%
  );
  background-image: -moz-linear-gradient(to bottom, #e93323 0%, #f5f5f5 100%);
  padding-top: 1rem;
}
.order-submission .allAddress .nav {
  width: 7.1rem;
  margin: 0 auto;
}
.order-submission .allAddress .nav .item {
  width: 3.55rem;
}
.order-submission .allAddress .nav .item.on {
  position: relative;
  width: 2.5rem;
}
.order-submission .allAddress .nav .item.on:before {
  position: absolute;
  bottom: 0;
  content: "快递配送";
  font-size: 0.28rem;
  display: block;
  height: 0;
  width: 3.55rem;
  border-width: 0 0.2rem 0.8rem 0;
  border-style: none solid solid;
  border-color: transparent transparent #fff;
  z-index: 9;
  border-radius: 0.07rem 0.3rem 0 0;
  text-align: center;
  line-height: 0.8rem;
}
.order-submission .allAddress .nav .item:nth-of-type(2).on:before {
  content: "到店自提";
  border-width: 0 0 0.8rem 0.2rem;
  border-radius: 0.3rem 0.07rem 0 0;
}
.order-submission .allAddress .nav .item.on2 {
  position: relative;
}
.order-submission .allAddress .nav .item.on2:before {
  position: absolute;
  bottom: 0;
  content: "到店自提";
  font-size: 0.28rem;
  display: block;
  height: 0;
  width: 4.6rem;
  border-width: 0 0 0.6rem 0.6rem;
  border-style: none solid solid;
  border-color: transparent transparent #f7c1bd;
  border-radius: 0.4rem 0.06rem 0 0;
  text-align: center;
  line-height: 0.6rem;
}
.order-submission .allAddress .nav .item:nth-of-type(1).on2:before {
  content: "快递配送";
  border-width: 0 0.6rem 0.6rem 0;
  border-radius: 0.06rem 0.4rem 0 0;
}
.order-submission .allAddress .address {
  width: 7.1rem;
  height: 1.5rem;
  margin: 0 auto;
}
.order-submission .allAddress .line {
  width: 7.1rem;
  margin: 0 auto;
}
.order-submission .wrapper .item .discount input::placeholder {
  color: #ccc;
}
</style>
<script>
import AddressWindow from "@components/AddressWindow";
import { createOrder } from "@api/order";
import { getFellowDetail } from "@api/store";
import { getDefaultAddress } from "@api/user";
import { isWeixin } from "@utils";
import { mapGetters } from "vuex";

const NAME = "OrderSubmission",
  _isWeixin = isWeixin();
export default {
  name: NAME,
  components: {
    AddressWindow
  },
  props: {},
  computed: {
    ...mapGetters(["storeItems"])
  },
  data: function() {
    return {
      fellowId: "",
      fellow: {},
      contactsName: "",
      contactsTel: "",
      note: "",
      hasDefaultAddress: false,
      userAddress: {},
      userAddressList: [],
      active: "weixin",
      isWeixin: _isWeixin,
      showAddress: false,
      addressLoaded: false
    };
  },
  watch: {
    $route(n) {
      if (n.name === NAME) {
        console.log(this.$route.query.pinkid);
        if (this.$route.query.pinkid !== undefined)
          this.pinkId = this.$route.query.pinkid;
        else {
          this.pinkId = 0;
        }
        this.getFellowInfo();
      }
    }
  },
  mounted: function() {
    let that = this;
    if (that.$route.params.id !== undefined)
      that.fellowId = that.$route.params.id;
    that.getFellowInfo().then(() => {
      that.getUserDefaultAddress();
    });
  },
  methods: {
    getGender: g => {
      return g === 1 ? "男" : " 女";
    },
    getAddressStr() {
      let p = this.userAddress.province;
      let c = this.userAddress.city;
      let r = this.userAddress.region;
      let d = this.userAddress.detailAddress;
      return (p !== null ? p + "省" : "") + c + "市" + r + "," + d;
    },
    getFellowInfo() {
      let that = this;
      return getFellowDetail(that.fellowId)
        .then(data => {
          that.$set(that, "fellow", data.fellow);
        })
        .catch(res => {
          that.$dialog.error(res.msg);
          that.$router.go(-1);
        });
    },
    getUserDefaultAddress() {
      getDefaultAddress().then(res => {
        this.userAddress = res.data;
        if (this.userAddress) this.hasDefaultAddress = true;
        this.contactsName = this.userAddress.name;
        this.contactsTel = this.userAddress.phone;
      });
    },
    addressTap: function() {
      this.showAddress = true;
      if (!this.addressLoaded) {
        this.addressLoaded = true;
        this.$refs.mychild.getAddressList();
      }
    },
    changeAddress(addressInfo) {
      this.userAddress = addressInfo;
      this.contactsName = this.userAddress.name;
      this.contactsTel = this.userAddress.phone;
    },
    addressRedirect() {
      this.addressLoaded = false;
      this.showAddress = false;
    },
    payItem: function(index) {
      this.active = index;
    },
    createOrder() {
      if (!this.active) return this.$dialog.toast({ mes: "请选择支付方式" });
      if (!this.userAddress.id)
        return this.$dialog.toast({ mes: "请选择地址" });
      this.$dialog.loading.open("生成订单中");
      let address = this.userAddress;
      createOrder({
        fellowId: this.fellowId,
        totalAmount: this.fellow.price,
        payType: this.active === "weixin" ? 0 : 1,
        sourceType: _isWeixin ? 0 : 1,
        status: 0,
        name: address.name,
        userPhone: address.phone,
        userProvince: address.province,
        userCity: address.city,
        userRegion: address.region,
        userDetailAddress: address.detailAddress,
        note: this.note
      })
        .then(data => {
          console.log(data);
          let url = "/order/status/" + data.orderId;
          this.$dialog.loading.close();
          this.$router.replace({
            path: url + "/0"
          });
        })
        .catch(err => {
          this.$dialog.error(err.msg || "创建订单失败");
          this.$dialog.loading.close();
          this.$router.go(-1);
        });
    }
  }
};
</script>
