<template>
  <div ref="container" style="height: 100%">
    <div class="collectionGoods" v-if="attendedFellowList.length > 0">
      <router-link
        :to="{ path: '/detail/' + item.fellowId }"
        class="item acea-row row-between-wrapper"
        v-for="(item, index) in attendedFellowList"
        :key="index"
      >
        <div class="pictrue"><img :src="item.fellowImage" /></div>
        <div class="text acea-row row-column-between">
          <div class="infor line1">{{ item.fellowName }}</div>
          <div class="acea-row row-between-wrapper">
            <div class="delete" @click.prevent="delAttend(index)">删除</div>
          </div>
        </div>
      </router-link>
    </div>
    <Loading :loaded="loadend" :loading="loading"></Loading>
    <div
      class="noCommodity"
      style="background-color:#fff; height: 50%"
      v-if="attendedFellowList.length < 1 && page > 1"
    >
      <div class="noPictrue">
        <img src="@assets/images/noCollection.png" class="image" />
      </div>
    </div>
  </div>
</template>
<script>
import Loading from "@components/Loading";
import { getAttendList, toAttend } from "@api/store";
export default {
  name: "GoodsCollection",
  components: {
    Loading
  },
  props: {},
  data: function() {
    return {
      page: 1,
      limit: 20,
      attendedFellowList: [],
      loadTitle: "",
      loading: false,
      loadend: false
    };
  },
  mounted: function() {
    this.getAttendedList();
    this.$scroll(this.$refs.container, () => {
      !this.loading && this.getAttendedList();
    });
  },
  methods: {
    getAttendedList: function() {
      let that = this;
      if (that.loading) return; //阻止下次请求（false可以进行请求）；
      if (that.loadend) return; //阻止结束当前请求（false可以进行请求）；
      that.loading = true;
      getAttendList(that.page, that.limit).then(res => {
        console.log(res);
        that.loading = false;
        //apply();js将一个数组插入另一个数组;
        that.attendedFellowList.push.apply(
          that.attendedFellowList,
          res.page.list
        );
        that.loadend = res.page.list.length < that.limit; //判断所有数据是否加载完成；
        that.page = that.page + 1;
      });
    },
    //删除收藏；
    delAttend: function(index) {
      let that = this,
        fellowId = that.attendedFellowList[index].fellowId;
      toAttend(fellowId).then(function() {
        that.$dialog.toast({
          mes: "取消关注成功!",
          callback: () => {
            that.attendedFellowList.splice(index, 1);
            that.$set(that, "attendedFellowList", that.attendedFellowList);
          }
        });
      });
    }
  }
};
</script>
