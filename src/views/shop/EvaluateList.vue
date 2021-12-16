<template>
  <div class="evaluate-list" ref="container">
    <div class="header">
      <div class="generalComment acea-row row-between-wrapper">
        <div class="acea-row row-middle font-color-red">
          <div class="evaluate">评分</div>
          <div class="start" :class="'star' + replyData.reply_star"></div>
        </div>
        <div>
          <span class="font-color-red">{{ replyData.reply_chance || 0 }}%</span
          >好评率
        </div>
      </div>
      <div class="nav acea-row row-middle">
        <div
          class="acea-row row-center-wrapper"
          v-for="(item, index) in navList"
          :key="index"
          @click="changeType(index)"
        >
          <div
            class="item"
            :class="currentActive === index ? 'bg-color-red' : ''"
            v-if="item.num"
          >
            {{ item.evaluate }}({{ item.num }})
          </div>
        </div>
      </div>
    </div>
    <UserEvaluation :reply="reply"></UserEvaluation>
    <Loading :loaded="loadend" :loading="loading"></Loading>
  </div>
</template>
<script>
import UserEvaluation from "@components/UserEvaluation";
import { getReplyConfig, getReplyList } from "@api/store";
import Loading from "@components/Loading";
let NAME = "EvaluateList";

export default {
  name: "EvaluateList",
  components: {
    UserEvaluation,
    Loading
  },
  props: {},
  data: function() {
    return {
      fellow_id: 0,
      replyData: {},
      navList: [
        { evaluate: "全部", num: 0 },
        { evaluate: "好评", num: 0 },
        { evaluate: "中评", num: 0 },
        { evaluate: "差评", num: 0 }
      ],
      currentActive: 0,
      page: 1,
      limit: 8,
      reply: [],
      loadTitle: "",
      loading: false,
      loadend: false
    };
  },
  watch: {
    $route(n) {
      if (n.name === NAME) {
        this.fellow_id = this.$route.params.id;
        this.loadend = false;
        this.page = 1;
        this.$set(this, "reply", []);
        this.getFellowReplyCount();
        this.getFellowReplyList();
      }
    }
  },
  mounted: function() {
    this.fellow_id = this.$route.params.id;
    this.getFellowReplyCount();
    this.getFellowReplyList();
    this.$scroll(this.$refs.container, () => {
      !this.loading && this.getFellowReplyCount();
    });
  },
  methods: {
    getFellowReplyCount: function() {
      let that = this;
      getReplyConfig(that.fellow_id).then(data => {
        that.$set(that, "replyData", data);
        that.navList[0].num = data.sum_count;
        that.navList[1].num = data.good_count;
        that.navList[2].num = data.in_count;
        that.navList[3].num = data.poor_count;
      });
    },
    getFellowReplyList: function() {
      let that = this;
      if (that.loading) return; //阻止下次请求（false可以进行请求）；
      if (that.loadend) return; //阻止结束当前请求（false可以进行请求）；
      that.loading = true;
      let q = {
        fellow_id: that.fellow_id,
        page: that.page,
        limit: that.limit,
        type: that.currentActive
      };
      getReplyList(q).then(res => {
        console.log(res);
        that.loading = false;
        //apply();js将一个数组插入另一个数组;
        that.reply.push.apply(that.reply, res.page.list);
        that.loadend = res.page.length < that.limit; //判断所有数据是否加载完成；
        that.page = that.page + 1;
      });
    },
    changeType: function(index) {
      let that = this;
      that.currentActive = index;
      that.page = 1;
      that.loadend = false;
      that.$set(that, "reply", []);
      that.getProductReplyList();
    }
  }
};
</script>
<style scoped>
.noCommodity {
  height: 8rem;
  background-color: #fff;
}
</style>
