<template>
  <div>
    <div class="address-window" :class="value === true ? 'on' : ''">
      <div class="title">
        {{ titleText
        }}<span class="iconfont icon-guanbi" @click="closeAddress"></span>
      </div>
      <div class="list" v-if="addressList.length">
        <div
          class="item acea-row row-between-wrapper"
          :class="item.id === checked ? 'font-color-red' : ''"
          v-for="(item, index) in addressList"
          @click="tapAddress(index)"
          :key="index"
        >
          <span
            class="iconfont icon-ditu"
            :class="item.id === checked ? 'font-color-red' : ''"
          ></span>
          <div class="addressTxt">
            <div
              class="name"
              :class="item.id === checked ? 'font-color-red' : ''"
            >
              {{ item.name }}<span class="phone">{{ item.phone }}</span>
            </div>
            <div class="line1">
              {{ getAddressStr(item) }}
            </div>
          </div>
          <span
            class="iconfont icon-complete"
            :class="item.id === checked ? 'font-color-red' : ''"
          ></span>
        </div>
      </div>
      <div class="pictrue" v-if="addressList.length < 1">
        <img src="@assets/images/noAddress.png" class="image" />
      </div>
      <div class="addressBnt bg-color-red" @click="goAddressPages">
        新加地址
      </div>
    </div>
    <div
      class="mask"
      @touchmove.prevent
      :hidden="value === false"
      @click="closeAddress"
    ></div>
  </div>
</template>
<script>
import { getAddressList, setDefaultAddress } from "@api/user";
export default {
  name: "AddressWindow",
  props: {
    value: Boolean,
    checked: Number,
    toDefault: Boolean
  },
  data: function() {
    return {
      titleText: "选择地址",
      addressList: [],
      current: 0,
      cartId: 0,
      pinkId: 0,
      couponId: 0
    };
  },
  mounted: function() {
    if (this.toDefault) {
      this.titleText = "设置默认地址";
    }
  },
  methods: {
    getAddressStr(item) {
      let p = item.province;
      let c = item.city;
      let r = item.region;
      let d = item.detailAddress;
      let addressStr = (p !== null ? p + "省" : "") + c + "市" + r + "," + d;
      return addressStr;
    },
    getAddressList: function() {
      let that = this;
      getAddressList().then(res => {
        console.log(res);
        that.addressList = res.data;
      });
    },
    closeAddress() {
      this.$emit("input", false);
    },
    goAddressPages: function() {
      this.$router.push({ path: "/user/add_address" });
      this.$emit("redirect");
    },
    tapAddress: function(index) {
      let that = this;
      if (that.toDefault) {
        setDefaultAddress(that.addressList[index].id).then(() => {
          setTimeout(() => {
            that.$dialog.toast({ mes: " 设置成功" });
            that.$emit("checked", that.addressList[index]);
            that.$emit("input", false);
          }, 100);
        });
      } else {
        that.$emit("checked", that.addressList[index]);
        that.$emit("input", false);
      }
    }
  }
};
</script>
