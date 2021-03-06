import Vue from "vue";
import Router from "vue-router";
import module from "./module";
import Index from "@views/home/Index";
import GoodsList from "@views/shop/GoodsList";
import NotDefined from "@views/NotDefined";
import $store from "../store";
import toLogin from "@libs/login";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Index",
      meta: {
        title: "首页",
        keepAlive: true,
        footer: true,
        backgroundColor: "#fff"
      },
      component: Index
    },
    {
      path: "/collection",
      name: "GoodsCollection",
      meta: {
        title: "收藏商品",
        keepAlive: false,
        auth: true
      },
      component: () => import("@views/shop/GoodsCollection.vue")
    },
    {
      path: "/evaluate_list/:id",
      name: "EvaluateList",
      meta: {
        title: "商品评分",
        keepAlive: true,
        auth: true
      },
      component: () => import("@views/shop/EvaluateList.vue")
    },
    {
      path: "/goods_evaluate/:id",
      name: "GoodsEvaluate",
      meta: {
        title: "商品评价",
        keepAlive: true,
        auth: true
      },
      component: () => import("@views/shop/GoodsEvaluate.vue")
    },
    {
      path: "/detail/:id",
      name: "GoodsCon",
      meta: {
        title: "商品详情",
        keepAlive: false
      },
      component: () => import("@views/shop/GoodsCon.vue")
    },
    {
      path: "/goods_list",
      name: "GoodsList",
      meta: {
        title: "商品列表",
        keepAlive: true
      },
      component: GoodsList
    },
    {
      path: "/login",
      name: "Login",
      meta: {
        title: "登录",
        keepAlive: true
      },
      component: () =>
        import(/* webpackChunkName: "login" */ "@views/user/Login.vue")
    },
    ...module,
    {
      path: "*",
      name: "NotDefined",
      meta: {
        title: "页面找不到",
        keepAlive: true,
        home: false,
        backgroundColor: "#F4F6FB"
      },
      component: NotDefined
    }
  ],
  scrollBehavior(to, from) {
    from.meta.scrollTop = window.scrollY;
    return { x: 0, y: to.meta.scrollTop || 0 };
  }
});

const { back, replace } = router;

router.back = function() {
  this.isBack = true;
  back.call(router);
};
router.replace = function(...args) {
  this.isReplace = true;
  replace.call(router, ...args);
};

router.beforeEach((to, form, next) => {
  const { title, backgroundColor, footer, home, auth } = to.meta;
  console.log(to.name, form.name);
  if (auth === true && !$store.state.app.token) {
    if (form.name === "Login") return;
    return toLogin(true, to.fullPath);
  }
  document.title = title || process.env.VUE_APP_NAME || "crmeb商城";
  //判断是否显示底部导航
  footer === true ? $store.commit("SHOW_FOOTER") : $store.commit("HIDE_FOOTER");

  //控制悬浮按钮是否显示
  home === false ? $store.commit("HIDE_HOME") : $store.commit("SHOW_HOME");

  $store.commit("BACKGROUND_COLOR", backgroundColor || "#F5F5F5");

  next();
});

export default router;
