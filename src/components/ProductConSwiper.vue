<template>
  <div class="slider-banner product-bg">
    <swiper
      class="swiper-wrapper"
      :options="ProductConSwiper"
      v-if="imgUrls.length > 0"
      ref="mySwiper"
    >
      <swiper-slide
        class="swiper-slide"
        v-for="(item, index) in imgUrls"
        :key="index"
        ref="goodSwiper"
      >
        <div
          class="slide-image"
          :style="{
            background: 'url(' + item + ') no-repeat center center',
            'background-size': '100% 100%'
          }"
        ></div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "@assets/css/swiper.min.css";
// eslint-disable-next-line no-unused-vars
let vm = null;
export default {
  name: "ProductConSwiper",
  components: {
    swiper,
    swiperSlide
  },
  props: {
    imgUrls: {
      type: Array,
      default: () => []
    }
  },
  data: function() {
    return {
      mobile: ""
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted: function() {},
  created() {
    vm = this;
    if (navigator.platform.indexOf("Win") !== -1) this.mobile = "iPhone";
  }
};
</script>

<style scoped>
.videoBox video {
  width: 100%;
  height: 100%;
}
</style>
