<template>
  <div class="register absolute">
    <div class="shading">
      <div class="pictrue acea-row row-center-wrapper">
        <img :src="logoUrl" v-if="logoUrl" />
        <img src="@assets/images/logo2.png" v-else />
      </div>
    </div>
    <div class="whiteBg" v-if="formItem === 1">
      <div class="title acea-row row-center-wrapper">
        <div
          class="item"
          :class="current === index ? 'on' : ''"
          v-for="(item, index) in navList"
          @click="navTap(index)"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
      <div class="list" :hidden="current !== 0">
        <form @submit.prevent="submit">
          <div class="item">
            <div class="acea-row row-between-wrapper">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-phone_"></use>
              </svg>
              <input
                type="text"
                placeholder="输入手机号码"
                v-model="account"
                required
              />
            </div>
          </div>
          <div class="item">
            <div class="acea-row row-between-wrapper">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-code_"></use>
              </svg>
              <input
                type="password"
                placeholder="填写登录密码"
                v-model="password"
                required
              />
            </div>
          </div>
        </form>
        <div
          class="forgetPwd"
          @click="$router.push({ name: 'RetrievePassword' })"
        >
          <span class="iconfont icon-wenti"></span>忘记密码
        </div>
      </div>
      <div class="logon" @click="submit" :hidden="current === 1">登录</div>
      <div class="tip">
        没有账号?
        <span @click="formItem = 2" class="font-color-red">立即注册</span>
      </div>
    </div>
    <div class="whiteBg" v-else>
      <div class="title">注册账号</div>
      <div class="list">
        <div class="item">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-phone_"></use>
            </svg>
            <input type="text" placeholder="输入手机号码" v-model="account" />
          </div>
        </div>
        <div class="item">
          <div class="align-left">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yonghu-xianxing"></use>
            </svg>
            <input type="text" placeholder="填写用户名" v-model="username" />
          </div>
        </div>
        <div class="item">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-code_"></use>
            </svg>
            <input
              type="password"
              placeholder="填写您的登录密码"
              v-model="password"
            />
          </div>
        </div>
      </div>
      <div class="logon" @click="register">注册</div>
      <div class="tip">
        已有账号?
        <span @click="formItem = 1" class="font-color-red">立即登录</span>
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>
<script>
import { login, register } from "@api/user";
import attrs, { required, alpha_num, chs_phone } from "@utils/validate";
import { validatorDefaultCatch } from "@utils/dialog";
import cookie from "@utils/store/cookie";

const BACK_URL = "login_back_url";

export default {
  name: "Login",
  data: function() {
    return {
      username: "",
      navList: ["账号登录"],
      current: 0,
      account: "",
      password: "",
      formItem: 1,
      type: "login",
      logoUrl: ""
    };
  },
  mounted: function() {
    //this.getCode();
    this.getLogoImage();
  },
  methods: {
    async register() {
      let that = this;
      const { account, username, password } = that;
      try {
        await that
          .$validator({
            account: [
              required(required.message("手机号码")),
              chs_phone(chs_phone.message())
            ],
            username: [
              required(required.message("用户名")),
              alpha_num(alpha_num.message("用户名"))
            ],
            password: [
              required(required.message("密码")),
              attrs.range([6, 16], attrs.range.message("密码")),
              alpha_num(alpha_num.message("密码"))
            ]
          })
          .validate({ account, username, password });
      } catch (e) {
        return validatorDefaultCatch(e);
      }
      register({
        mobile: that.account,
        username: that.username,
        password: that.password
      })
        .then(res => {
          that.$dialog.success(res.msg);
          that.formItem = 1;
        })
        .catch(res => {
          that.$dialog.error(res.msg);
        });
    },
    async submit() {
      const { account, password } = this;
      try {
        await this.$validator({
          account: [
            required(required.message("账号")),
            attrs.range([5, 16], attrs.range.message("账号")),
            alpha_num(alpha_num.message("账号"))
          ],
          password: [
            required(required.message("密码")),
            attrs.range([6, 16], attrs.range.message("密码")),
            alpha_num(alpha_num.message("密码"))
          ]
        }).validate({ account, password });
      } catch (e) {
        return validatorDefaultCatch(e);
      }
      login({ account, password })
        .then(data => {
          console.log(data);
          const datas = {
            token: data.token,
            expires_time: 0
          };
          this.$store.commit("LOGIN", datas);
          const backUrl = cookie.get(BACK_URL) || "/";
          cookie.remove(BACK_URL);
          this.$router.replace({ path: backUrl });
        })
        .catch(e => {
          this.$dialog.error(e.msg);
        });
    }
  }
};
</script>
<style scoped>
.code img {
  width: 100%;
  height: 100%;
}
</style>
