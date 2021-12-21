/*
 * 订单确认
 * */
import request from "@utils/request";

/**
 * 计算订单金额
 * @param key
 * @param data
 * @returns {*}
 */
export function postOrderComputed(key, data) {
  return request.post("/order/computed/" + key, data);
}

/**
 * 生成订单
 * @param key
 * @param data
 * @returns {*}
 */
export function createOrder(data) {
  return request.post("/order/order/add/", data, { login: true });
}

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
 * @returns {*}
 */
export function getOrderList(data) {
  return request.get("/order/list", data);
}

/**
 * 取消订单
 * @returns {*}
 */
export function cancelOrder(id) {
  return request.post("/order/order/delete", [id], { login: true });
}

export function finishAcc(id) {
  return request.post("/order/order/finishAcc/" + id, {}, { login: true });
}

/**
 * 订单详情
 * @returns {*}
 */
export function getOrderDetail(id) {
  return request.get("/order/order/info/" + id);
}

/**
 * 退款理由
 * @returns {*}
 */
export function getRefundReason() {
  return request.get("/order/refund/reason");
}

/**
 * 提交退款
 * @returns {*}
 */
export function postOrderRefund(data) {
  return request.post("/order/refund/verify", data);
}

/**
 * 确认收货
 * @returns {*}
 */
export function takeOrder(uni) {
  return request.post("/order/take", { uni });
}

/**
 * 删除订单
 * @returns {*}
 */
export function delOrder(uni) {
  return request.post("/order/del", { uni });
}

/**
 * 订单查询物流信息
 * @returns {*}
 */
export function express(uni) {
  return request.get("order/express/" + uni);
}

/**
 * 订单查询物流信息
 * @returns {*}
 */
export function payOrder(uni, paytype, from) {
  return request.post("order/pay", { uni, paytype, from });
}
/**
 * 订单核销
 * @returns {*}
 */
export function orderVerific(verify_code, is_confirm) {
  return request.post("order/order_verific", { verify_code, is_confirm });
}
/**
 * 再次下单
 * @param string uni
 *
 */
export function orderAgain(uni) {
  return request.post("order/again", { uni: uni });
}
