import request from "@utils/request";

/*
 * 商品详情
 * */
export function getProductDetail(id) {
  //return request.get("/product/detail/" + id, {}, { login: false });
  return new Promise(resolve => {
    resolve({
      data: {
        id: id,
        productAttr: {
          id: 1,
          product_id: 2,
          attr_name: "mahdyc",
          type: 1
        },
        fellowInfo: {
          username: "马浩元",
          sign: "没有签名",
          gender: 1,
          age: 20,
          status: 0,
          id: 1,
          mer_id: 0,
          image: "kjdsfkjf",
          store_name: "sdfdsf",
          store_info: "dsfsd",
          keyword: "fljdsf",
          price: 20.0,
          sales: 500,
          stock: 50
        },
        productValue: 10,
        priceName: 10,
        reply: [
          {
            header: "sdsfsdf",
            username: "mmm",
            fellow_name: "mahaoyuan",
            star: 5,
            content: "nice!!!"
          },
          {
            header: "sdsfsdf",
            username: "mmm",
            fellow_name: "mahaoyuan",
            star: 5,
            content: "very good"
          }
        ],
        replyChance: 95,
        replyCount: 500
      }
    });
  });
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
