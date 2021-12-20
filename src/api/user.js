import request from "@utils/request";

/**
 * 用户登录
 * @param data object 用户账号密码
 */
export function login(data) {
  return request.post("user/user/login", data, { login: false });
}

/**
 * 用户发送验证码
 * @param data object 用户手机号
 */
export function registerVerify(data) {
  return request.post("/register/verify", data, { login: false });
}

/**
 * 用户手机号注册
 * @param data object 用户手机号 验证码 密码
 */
export function register(data) {
  return request.post("user/user/register", data, { login: false });
}

/**
 * 用户手机号修改密码
 * @param data object 用户手机号 验证码 密码
 */
export function registerReset(data) {
  return request.post("/register/reset", data, { login: false });
}

/*
 * 个人中心
 * */
export function getUser() {
  return request.get("/user/user/info");
}

/*
 * 用户信息
 * */
export function getUserInfo() {
  //return request.get("/userinfo");
  return new Promise(resolve => {
    resolve({
      data: {
        token: "token",
        expires_time: new Date().getTime() + 1000 * 60 * 60 * 10
      }
    });
  });
}

/*
 * 个人中心(功能列表)
 * */
export function getMenuUser() {
  return request.get("/menu/user");
}

export function getDefaultAddress() {
  return request.get("/user/useraddress/default", { login: true });
}
/*
 * 地址列表
 * */
export function getAddressList() {
  return request.get("/user/useraddress/list", { login: true });
}

/*
 * 删除地址
 * */
export function getAddressRemove(id) {
  return request.post("/address/del", { id: id });
}

/*
 * 设置默认地址
 * */
export function getAddressDefaultSet(id) {
  return request.post("/address/default/set", { id: id });
}

/*
 * 获取默认地址
 * */
export function getAddressDefault() {
  return request.get("/address/default");
}

/*
 * 获取单个地址
 * */
export function getAddress(id) {
  return request.get("/address/detail/" + id);
}

/*
 * 修改 添加地址
 * */
export function postAddress(data, id) {
  if (id) return request.post("update", { login: true });
  else return request.post("user/useraddress/add", data, { login: true });
}

export function setDefaultAddress(id) {
  return request.post("user/useraddress/set_default/" + id, { login: true });
}

/*
 * 获取收藏产品
 * */
export function getCollectUser(page, limit) {
  return request.get("/collect/user", { page: page, limit: limit });
}

/*
 * 删除收藏产品
 * */
export function getCollectDel(id, category) {
  return request.post("/collect/del", { id: id, category: category });
}

/*
 * 批量收藏产品
 * */
export function postCollectAll(data) {
  return request.post("/collect/all", data);
}

/*
 * 添加收藏产品
 * */
export function getCollectAdd(id, category) {
  return request.post("collect/add", { id: id, category: category });
}

/*
 * 资金明细（types|0=全部,1=消费,2=充值,3=返佣,4=提现）
 * */
export function getCommissionInfo(q, types) {
  return request.get("/spread/commission/" + types, q);
}

/*
 * 用户修改信息
 * */
export function postUserEdit(data) {
  return request.post("/user/user/update", data, { login: true });
}

/*
 * 用户修改信息
 * */
export function getChatRecord(to_uid, data) {
  return request.get("user/service/record/" + to_uid, data);
}

/*
 * 用户修改信息
 * */
export function serviceList() {
  return request.get("user/service/list");
}

/*
 * 退出登录
 * */
export function getLogout() {
  return request.get("/logout");
}

/*
 * 绑定手机号
 * */
export function bindingPhone(data) {
  return request.post("binding", data);
}

/*
 * h5切换公众号登陆
 * */
export function switchH5Login() {
  return request.post("switch_h5", { from: "wechat" });
}

/**
 * 验证码key
 */
export function getCodeApi() {
  return request.get("verify_code", {}, { login: false });
}
