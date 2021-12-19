<template>
  <div class="productList" ref="container">
    <form @submit.prevent="submitForm">
      <div class="search bg-color-red acea-row row-between-wrapper">
        <div class="input acea-row row-between-wrapper">
          <span class="iconfont icon-sousuo"></span>
          <input placeholder="搜索陪诊员" v-model="where.keyword" />
        </div>
        <div
          class="iconfont"
          :class="Switch === true ? 'icon-pailie' : 'icon-tupianpailie'"
          @click="switchTap"
        ></div>
      </div>
    </form>
    <div class="nav acea-row row-middle">
      <div
        class="item"
        :class="title ? 'font-color-red' : ''"
        @click="set_where(0)"
      >
        {{ title ? title : "默认" }}
      </div>
      <div class="item" @click="set_where(1)">
        价格
        <img src="@assets/images/horn.png" v-if="price === 0" />
        <img src="@assets/images/up.png" v-if="price === 1" />
        <img src="@assets/images/down.png" v-if="price === 2" />
      </div>
      <div class="item" @click="set_where(2)">
        年龄
        <img src="@assets/images/horn.png" v-if="age === 0" />
        <img src="@assets/images/up.png" v-if="age === 1" />
        <img src="@assets/images/down.png" v-if="age === 2" />
      </div>
      <div class="item" @click="set_where(3)">
        性别
        <img src="@assets/images/horn.png" v-if="gender === 0" />
        <img src="@assets/images/up.png" v-if="gender === 1" />
        <img src="@assets/images/down.png" v-if="gender === 2" />
      </div>
      <!-- down -->
    </div>
    <div
      class="list acea-row row-between-wrapper"
      :class="Switch === true ? '' : 'on'"
      ref="container"
    >
      <div
        @click="goDetail(item)"
        v-for="(item, index) in productList"
        :key="index"
        class="item"
        :class="Switch === true ? '' : 'on'"
        :title="item.username"
      >
        <div class="pictrue" :class="Switch === true ? '' : 'on'">
          <img :src="item.header" :class="Switch === true ? '' : 'on'" />
        </div>
        <div class="text" :class="Switch === true ? '' : 'on'">
          <div class="name line1">{{ item.username }}</div>
          <div class="vip acea-row row-between-wrapper">
            {{ item.age }}岁 {{ getGender(item.gender) }}
          </div>
          <div
            class="money font-color-red"
            :class="Switch === true ? '' : 'on'"
          >
            ￥<span class="num">{{ item.price }}</span>
          </div>
        </div>
      </div>
    </div>
    <div style="height:1.2rem;"></div>
    <Loading :loaded="loadend" :loading="loading"></Loading>
    <div
      class="noCommodity"
      v-cloak
      style="background-color: #fff;"
      v-if="productList.length === 0 && where.page > 1"
    >
      <div class="noPictrue">
        <img src="@assets/images/noGood.png" class="image" />
      </div>
    </div>
    <Recommend v-if="productList.length === 0 && where.page > 1"></Recommend>
  </div>
</template>

<script>
import Recommend from "@components/Recommend";
import { getProducts } from "@api/store";
import debounce from "lodash.debounce";
import Loading from "@components/Loading";

export default {
  name: "GoodsList",
  components: {
    Recommend,
    Loading
  },
  props: {},
  data: function() {
    const { s = "", title = "" } = this.$route.query;

    return {
      productList: [],
      Switch: true,
      where: {
        page: 1,
        limit: 8,
        order: "",
        sidx: "",
        keyword: s
      },
      title: title ? title : "",
      loadTitle: "",
      loading: false,
      loadend: false,
      price: 0,
      age: 0,
      name: 0,
      gender: 0
    };
  },
  watch: {
    title() {
      this.updateTitle();
    },
    $route(to) {
      if (to.name !== "GoodsList") return;
      const { s = "", title = "" } = to.query;

      if (s !== this.where.keyword) {
        this.where.keyword = s;
        this.loadend = false;
        this.loading = false;
        this.where.page = 1;
        this.title = title ? title : "";
        this.$set(this, "productList", []);
        this.get_fellow_list();
      }
    }
  },
  mounted: function() {
    this.updateTitle();
    this.get_fellow_list();
    this.$scroll(this.$refs.container, () => {
      !this.loading && this.get_fellow_list();
    });
  },
  methods: {
    getGender: g => {
      return g === 1 ? "男" : "女";
    },
    // 商品详情跳转
    goDetail(item) {
      this.$router.push({ path: "/detail/" + item.id });
    },
    updateTitle() {
      document.title = this.title || this.$route.meta.title;
    },
    get_fellow_list: debounce(function() {
      let that = this;
      if (that.loading) return; //阻止下次请求（false可以进行请求）；
      if (that.loadend) return; //阻止结束当前请求（false可以进行请求）；
      that.loading = true;
      this.setWhere();
      let q = that.where;
      getProducts(q).then(res => {
        console.log("then:");
        console.log(res);
        that.loading = false;
        that.productList.push.apply(that.productList, res.page.list);
        that.loadend = res.page.list.length < that.where.limit; //判断所有数据是否加载完成；
        that.where.page = that.where.page + 1;
      });
    }, 300),
    submitForm: function() {
      this.$set(this, "productList", []);
      this.where.page = 1;
      this.loadend = false;
      this.loading = false;
      this.get_fellow_list();
    },
    //点击事件处理
    set_where: function(index) {
      let that = this;
      switch (index) {
        case 0:
          that.price = 0;
          that.age = 0;
          that.gender = 0;
          break;
        case 1:
          if (that.price === 0) that.price = 1;
          else if (that.price === 1) that.price = 2;
          else if (that.price === 2) that.price = 0;
          that.age = 0;
          this.gender = 0;
          break;
        case 2:
          if (that.age === 0) that.age = 1;
          else if (that.age === 1) that.age = 2;
          else if (that.age === 2) that.age = 0;
          that.price = 0;
          that.gender = 0;
          break;
        case 3:
          if (that.gender === 0) that.gender = 1;
          else if (that.gender === 1) that.gender = 2;
          else if (that.gender === 2) that.gender = 0;
          that.price = 0;
          that.age = 0;
          break;
        default:
          break;
      }
      that.$set(that, "productList", []);
      that.where.page = 1;
      that.loadend = false;
      that.get_fellow_list();
    },
    //设置where条件
    setWhere: function() {
      let that = this;
      if (that.price === 0) {
        that.where.order = "";
        that.where.sidx = "";
      } else if (that.price === 1) {
        that.where.order = "asc";
        that.where.sidx = "price";
      } else if (that.price === 2) {
        that.where.order = "desc";
        that.where.sidx = "price";
      }
      if (that.age === 1) {
        that.where.order = "asc";
        that.where.sidx = "age";
      } else if (that.age === 2) {
        that.where.order = "desc";
        that.where.sidx = "age";
      }
      if (that.gender === 1) {
        that.where.order = "asc";
        that.where.sidx = "gender";
      } else if (that.gender === 2) {
        that.where.order = "desc";
        that.where.sidx = "gender";
      }
    },
    switchTap: function() {
      let that = this;
      that.Switch = !that.Switch;
    }
  }
};
</script>
<style scoped>
.noCommodity {
  border-top: 3px solid #f5f5f5;
  padding-bottom: 1px;
}
</style>
