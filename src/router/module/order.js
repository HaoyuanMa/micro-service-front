import MyOrder from "@views/order/MyOrder";

export default [
  {
    path: "/order/list/:type",
    name: "MyOrder",
    meta: {
      title: "我的订单",
      keepAlive: false,
      auth: true
    },
    component: MyOrder
  },
  {
    path: "/order/detail/:id",
    name: "OrderDetails",
    meta: {
      title: "订单详情",
      keepAlive: false,
      auth: true
    },
    component: () => import("@views/order/OrderDetails")
  },
  {
    path: "/order/submit/:id",
    name: "OrderSubmission",
    meta: {
      title: "提交订单",
      keepAlive: true,
      auth: true
    },
    component: () => import("@views/order/OrderSubmission")
  },
  {
    path: "/order/status/:id/:toPay",
    name: "PaymentStatus",
    meta: {
      title: "支付状态",
      keepAlive: true,
      auth: true
    },
    component: () => import("@views/order/PaymentStatus")
  }
];
