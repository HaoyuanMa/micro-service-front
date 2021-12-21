import User from "@views/user/User";

export default [
  {
    path: "/user",
    name: "User",
    meta: {
      title: "个人中心",
      keepAlive: true,
      footer: true,
      auth: true
    },
    component: User
  },
  {
    path: "/user/add_address/:id?",
    name: "AddAddress",
    meta: {
      title: "添加收货地址",
      keepAlive: true,
      auth: true
    },
    component: () => import("@views/user/AddAddress.vue")
  },
  {
    path: "/user/data",
    name: "PersonalData",
    meta: {
      title: "个人资料",
      keepAlive: true,
      auth: true
    },
    component: () => import("@views/user/PersonalData.vue")
  }
];
