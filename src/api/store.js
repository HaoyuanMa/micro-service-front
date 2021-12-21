import request from "@utils/request";

/*
 * 商品详情
 * */
export function getFellowDetail(id) {
  return request.get("/fellow/fellow/info/" + id, {}, { login: false });
}

/*
 * 商品列表
 * */
export function getProducts(q) {
  return request.get("/fellow/fellow/list", q, { login: false });
}

/*
 * 添加收藏
 * */
export function toAttend(id) {
  return request.get("/user/userattendfellow/set/" + id, {}, { login: true });
}

export function getAttend(id) {
  return request.get("/user/userattendfellow/get/" + id, {}, { login: false });
}

export function getAttendList(page, limit) {
  return request.get(
    "/user/userattendfellow/list",
    { page: page, limit: limit },
    { login: true }
  );
}

/**
 * 产品评论列表
 */
export function getReplyList(q) {
  return request.get("/fellow/fellowcomment/list/", q, { login: false });
}

/**
 * 产品评价数量和好评度
 */
export function getReplyConfig(id) {
  return request.get(
    "/fellow/fellowcomment/config/",
    { fellow_id: id },
    { login: false }
  );
}

/**
 * 提交评价页面；
 */
export function postFellowComment(data) {
  return request.post("/fellow/fellowcomment/add", data, { login: true });
}
