<template>
  <div class="index" v-cloak>
    <div
      class="follow acea-row row-between-wrapper"
      v-if="followHid && isWeixin"
    >
      <div>点击“立即关注”即可关注公众号</div>
      <div class="acea-row row-middle">
        <div class="bnt" @click="followTap">立即关注</div>
        <span class="iconfont icon-guanbi" @click="closeFollow"></span>
      </div>
    </div>
    <div class="followCode" v-if="followCode">
      <div class="pictrue"><img :src="followUrl" /></div>
      <div class="mask" @click="closeFollowCode"></div>
    </div>
    <div class="header acea-row row-center-wrapper">
      <div class="logo"><img :src="logoUrl" /></div>
      <router-link :to="'/search'" class="search acea-row row-middle">
        <span class="iconfont icon-xiazai5"></span>搜索商品
      </router-link>
    </div>
    <GoodsList></GoodsList>
  </div>
</template>

<script>
import { isWeixin } from "@utils";
import GoodsList from "@views/shop/GoodsList";

export default {
  name: "Index",
  components: { GoodsList },
  props: {},
  data: function() {
    return {
      isWeixin: isWeixin(),
      followUrl: "",
      followHid: false,
      followCode: false,
      logoUrl: ""
    };
  },
  created() {},
  mounted: function() {},
  methods: {
    closeFollow() {
      this.followHid = false;
    },
    followTap() {
      this.followCode = true;
      this.followHid = false;
    },
    closeFollowCode() {
      this.followCode = false;
      this.followHid = true;
    }
  }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
.index {
  background-color: #fff;
}

.index .follow {
  z-index: 100000;
}
.keep {
  text-align: center;
}
</style>
