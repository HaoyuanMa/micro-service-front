<template>
  <div class="addAddress absolute">
    <div class="list">
      <div class="item acea-row row-between-wrapper">
        <div class="name">姓名</div>
        <input
          type="text"
          placeholder="请输入姓名"
          v-model="userAddress.name"
          required
        />
      </div>
      <div class="item acea-row row-between-wrapper">
        <div class="name">联系电话</div>
        <input
          type="text"
          placeholder="请输入联系电话"
          v-model="userAddress.phone"
          required
        />
      </div>
      <div class="item acea-row row-between-wrapper">
        <div class="name">省份</div>
        <input
          type="text"
          placeholder="请输入省份"
          v-model="userAddress.province"
        />
      </div>
      <div class="item acea-row row-between-wrapper">
        <div class="name">市</div>
        <input
          type="text"
          placeholder="请输入市"
          v-model="userAddress.city"
          required
        />
      </div>
      <div class="item acea-row row-between-wrapper">
        <div class="name">区</div>
        <input
          type="text"
          placeholder="请输入区"
          v-model="userAddress.region"
        />
      </div>
      <div class="item acea-row row-between-wrapper">
        <div class="name">详细地址</div>
        <input
          type="text"
          placeholder="请填写具体地址"
          v-model="userAddress.detailAddress"
          required
        />
      </div>
    </div>
    <div class="default acea-row row-middle">
      <div class="select-btn">
        <div class="checkbox-wrapper">
          <label class="well-check"
            ><input
              type="checkbox"
              name=""
              value=""
              @click="ChangeIsDefault"
              :checked="userAddress.defaultStatus ? true : false"
            /><i class="icon"></i><span class="def">设置为默认地址</span></label
          >
        </div>
      </div>
    </div>
    <div></div>
    <div class="keepBnt bg-color-red" @click="submit">立即保存</div>
  </div>
</template>
<script type="text/babel">
import { postAddress } from "@api/user";
import attrs, { required, chs_phone } from "@utils/validate";
import { validatorDefaultCatch } from "@utils/dialog";
import { isWeixin } from "@utils";

export default {
  components: {},
  data() {
    return {
      show2: false,
      model2: "",
      district: [],
      id: 0,
      userAddress: { defaultStatus: 0 },
      address: {},
      isWechat: isWeixin(),
      ready: false
    };
  },
  mounted: function() {
    let id = this.$route.params.id;
    this.id = id;
    document.title = !id ? "添加地址" : "修改地址";
    //this.getUserAddress();
  },
  methods: {
    async submit() {
      let name = this.userAddress.name,
        phone = this.userAddress.phone,
        detail = this.userAddress.detailAddress;
      try {
        await this.$validator({
          name: [
            required(required.message("姓名")),
            attrs.range([2, 16], attrs.range.message("姓名"))
          ],
          phone: [
            required(required.message("联系电话")),
            chs_phone(chs_phone.message())
          ],
          detail: [required(required.message("具体地址"))]
        }).validate({ name, phone, detail });
      } catch (e) {
        return validatorDefaultCatch(e);
      }
      try {
        let that = this;
        console.log(that.userAddress);
        postAddress(that.userAddress, that.id)
          .then(function() {
            if (that.id) that.$dialog.toast({ mes: "修改成功" });
            else that.$dialog.toast({ mes: "添加成功" });
            that.$router.go(-1);
          })
          .catch(err => {
            that.$dialog.error(err.msg);
          });
      } catch (e) {
        this.$dialog.error(e.msg);
      }
    },
    // getUserAddress: function() {
    //   if (!this.id) return false;
    //   let that = this;
    //   getAddress(that.id)
    //     .then(res => {
    //       that.userAddress = res.data;
    //       that.model2 =
    //         res.data.province + " " + res.data.city + " " + res.data.district;
    //       that.address.province = res.data.province;
    //       that.address.city = res.data.city;
    //       that.address.city_id = res.data.city_id;
    //     })
    //     .catch(err => {
    //       that.$dialog.error(err.msg);
    //     });
    // },
    // getAddress() {
    //   openAddress().then(userInfo => {
    //     this.$dialog.loading.open();
    //     postAddress({
    //       id: this.id,
    //       real_name: userInfo.userName,
    //       phone: userInfo.telNumber,
    //       address: {
    //         province: userInfo.provinceName,
    //         city: userInfo.cityName,
    //         district: userInfo.countryName
    //       },
    //       detail: userInfo.detailInfo,
    //       is_default: 1,
    //       post_code: userInfo.postalCode,
    //       type: 1
    //     })
    //       .then(() => {
    //         this.$dialog.loading.close();
    //         this.$dialog.toast({ mes: "添加成功" });
    //         this.$router.go(-1);
    //       })
    //       .catch(err => {
    //         this.$dialog.loading.close();
    //         this.$dialog.error(err.msg || "添加失败");
    //       });
    //   });
    // },
    ChangeIsDefault: function() {
      this.userAddress.defaultStatus = !this.userAddress.defaultStatus;
    }
  }
};
</script>
