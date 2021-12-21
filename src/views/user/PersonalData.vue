<template>
  <div class="personal-data">
    <div class="wrapper">
      <div class="title">管理我的账号</div>
      <!--UserHead-->
      <div class="wrapList">
        <div class="item acea-row row-between-wrapper on" :key="index">
          <div class="picTxt acea-row row-between-wrapper">
            <div class="pictrue">
              <VueCoreImageUpload
                class="btn btn-primary"
                crop="local"
                cropRatio="1:1"
                compress="80"
                @imagechanged="imageChanged"
                :isXhr="false"
                :max-file-size="5242880"
                :credentials="false"
                inputAccept="image/*"
                inputOfFile="file"
                ref="upImg"
              >
                <div class="pictrue">
                  <img :src="userInfo.header" />
                </div>
                <img src="@assets/images/alter.png" class="alter" />
              </VueCoreImageUpload>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="item acea-row row-between-wrapper">
        <div>用户名</div>
        <div class="input">
          <input type="text" v-model="userInfo.username" />
        </div>
      </div>
      <div class="item acea-row row-between-wrapper">
        <div>手机号码</div>
        <div class="input acea-row row-between-wrapper">
          <div class="input acea-row row-between-wrapper">
            <input
              type="text"
              :value="userInfo.mobile"
              disabled
              class="id"
            /><span class="iconfont icon-suozi"></span>
          </div>
        </div>
      </div>
      <!--change password-->
      <div>
        <router-link
          :to="'/change_password'"
          class="item acea-row row-between-wrapper"
        >
          <div>密码</div>
          <div class="input">
            点击修改密码<span class="iconfont icon-xiangyou"></span>
          </div>
        </router-link>
      </div>
    </div>
    <div class="modifyBnt bg-color-red" @click="submit">保存修改</div>
    <!--Logout-->
    <div
      class="logOut cart-color acea-row row-center-wrapper"
      @click="logout"
      v-if="!isWeixin"
    >
      退出登录
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import VueCoreImageUpload from "vue-core-image-upload";
import { postUserEdit, getUser } from "@api/user";
import cookie from "@utils/store/cookie";

export default {
  name: "PersonalData",
  components: {
    VueCoreImageUpload
  },
  data: function() {
    return {
      userInfo: {},
      headImage: ""
    };
  },
  computed: mapGetters(["userInfo"]),
  mounted: function() {
    this.getUserInfo();
  },
  methods: {
    imageChanged(res) {
      this.userInfo.header = res;
    },
    getUserInfo: function() {
      let that = this;
      getUser().then(res => {
        that.userInfo = res.user;
      });
    },
    submit: function() {
      postUserEdit(this.userInfo).then(
        res => {
          this.$dialog.success(res.msg);
          this.$router.go(-1);
        },
        error => {
          this.$dialog.error(error.msg);
        }
      );
    },
    logout: function() {
      this.$dialog.confirm({
        mes: "确认退出登录?",
        opts: () => {
          cookie.remove("login_status");
          this.$store.state.app.token = null;
          this.$router.replace({ path: "/login" });
        }
      });
    }
  }
};
</script>
