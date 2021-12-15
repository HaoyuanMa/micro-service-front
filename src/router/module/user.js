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
    path: "/user/binding",
    name: "BindingPhone",
    meta: {
      title: "绑定手机",
      keepAlive: true,
      backgroundColor: "#fff",
      auth: true
    },
    component: () => import("@views/user/BindingPhone.vue")
  },
  {
    path: "/user/add_address/:id?",
    name: "AddAddress",
    meta: {
      title: "添加收货地址",
      keepAlive: true,
      auth: true
    },
    component: () => import("@views/user/address/AddAddress.vue")
  },
  {
    path: "/user/account",
    name: "UserAccount",
    meta: {
      title: "我的账户",
      keepAlive: true,
      auth: true
    },
    component: () => import("@views/user/UserAccount.vue")
  },
  {
    path: "/user/add_manage",
    name: "AddressManagement",
    meta: {
      title: "地址管理",
      keepAlive: true,
      auth: true
    },
    component: () => import("@views/user/address/AddressManagement.vue")
  },
  {
    path: "/user/bill/:types?",
    name: "UserBill",
    meta: {
      title: "账单明细",
      keepAlive: true,
      auth: true
    },
    component: () => import("@views/user/UserBill.vue")
  },
  {
    path: "/user/vip",
    name: "UserVip",
    meta: {
      title: "会员中心",
      keepAlive: true,
      auth: true
    },
    component: () => import("@views/user/UserVip.vue")
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
