<template>
  <div class="evaluateWtapper">
    <div class="evaluateItem" v-for="(item, index) in reply" :key="index">
      <div class="pic-text acea-row row-middle">
        <div class="pictrue">
          <img :src="item.userIcon" class="image" />
        </div>
        <div class="acea-row row-middle">
          <div class="name line1">{{ item.userNickName }}</div>
          <div class="start" :class="'star' + item.commentType"></div>
        </div>
      </div>
      <div class="time">
        {{ item.createTime ? getOrderTimeStr(item.createTime) : "" }} 陪诊员：
        {{ item.fellowName }}
      </div>
      <div class="evaluate-infor">{{ item.content }}</div>
    </div>
    <div style="height:1.2rem;"></div>
  </div>
</template>
<script>
import Vue from "vue";
import { ImagePreview } from "vant";
import { getTimeStr } from "@libs/order";

Vue.use(ImagePreview);
export default {
  name: "UserEvaluation",
  props: {
    reply: {
      type: Array,
      default: () => []
    }
  },
  data: function() {
    return {};
  },
  mounted: function() {},
  methods: {
    getOrderTimeStr(t) {
      return getTimeStr(t);
    }
  }
};
</script>
