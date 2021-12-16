import request from "@utils/request";

/*
 * 商品详情
 * */
export function getProductDetail(id) {
  return request.get("/product/detail/" + id, {}, { login: false });
}

/*
 * 商品分销二维码
 * */
export function getProductCode(id) {
  return request.get("/product/code/" + id, {}, { login: true });
}

/*
 * 商品列表
 * */
export function getProducts(q) {
  let result = request.get("/fellow/fellow/list", q, { login: false });
  console.log(result);
  return result;
}

/*
 * 添加收藏
 * */
export function toCollect(id, category) {
  return request.get("/collect/add/" + id + "/" + category);
}

/*
 * 为你推荐
 * */
export function getHostProducts(page, limit) {
  return request.get(
    "/product/hot",
    { page: page, limit: limit },
    { login: false }
  );
}

/*
 * 精品、热门、首发列表
 * */
export function getGroomList(type, data) {
  return request.get("/groom/list/" + type, data, { login: false });
}

/**
 * 搜索推荐关键字
 */
export function getSearchKeyword() {
  return request.get("/search/keyword", {}, { login: false });
}

/**
 * 产品评论列表
 */
export function getReplyList(id, q) {
  return request.get("/reply/list/" + id, q, { login: false });
}

/**
 * 产品评价数量和好评度
 */
export function getReplyConfig(id) {
  return request.get("/reply/config/" + id, {}, { login: false });
}

/**
 * 评价页面获取单个产品详情
 */
export function postOrderProduct(unique) {
  return request.post("/order/product", { unique }, { login: false });
}

/**
 * 提交评价页面；
 */
export function postOrderComment(data) {
  return request.post("/order/comment", data, { login: false });
}
/**
 * 门店列表
 */
export function storeListApi(data) {
  return request.get("store_list", data, { login: false });
}
