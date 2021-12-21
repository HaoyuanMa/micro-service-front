/*
 * 订单确认
 * */
import request from "@utils/request";

/**
 * 生成订单
 * @param data
 * @returns {*}
 */
export function createOrder(data) {
  return request.post("/order/order/add/", data, { login: true });
}

/**
 * 修改订单
 * @param data
 * @returns {*}
 */
export function updateOrder(data) {
  return request.post("/order/order/update/", data, { login: true });
}

/**
 * 订单统计数据
 * @returns {*}
 */
export function getOrderStats() {
  return request.get("order/order/stats", {}, { login: true });
}

/**
 * 订单列表
 * @param data
 * @returns {*}
 */
export function getOrderList(status, data) {
  return request.get("order/order/list/" + status, data, { login: true });
}

/**
 * 取消订单
 * @param id
 * @returns {*}
 */
export function cancelOrder(id) {
  return request.post("/order/order/delete", [id], { login: true });
}

/**
 * 完成订单
 * @param id
 * @returns {*}
 */
export function finishAcc(id) {
  return request.post("/order/order/finishAcc/" + id, {}, { login: true });
}

/**
 * 订单详情
 * @param id
 * @returns {*}
 */
export function getOrderDetail(id) {
  return request.get("/order/order/info/" + id);
}
