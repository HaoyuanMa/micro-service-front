import request from "@utils/request";

/**
 * 用户登录
 * @param data object 用户账号密码
 */
export function login(data) {
  let r = request.post("user/user/login", data, { login: false });
  console.log(r);
  return r;
}

/**
 * 用户手机号注册
 * @param data object 用户手机号 验证码 密码
 */
export function register(data) {
  return request.post("user/user/register", data, { login: false });
}

/*
 * 个人中心
 * */
export function getUser() {
  return request.get("/user/user/info");
}

export function getDefaultAddress() {
  return request.get("/user/useraddress/default", {}, { login: true });
}
/*
 * 地址列表
 * */
export function getAddressList() {
  return request.get("/user/useraddress/list", {}, { login: true });
}

/*
 * 修改 添加地址
 * */
export function postAddress(data, id) {
  if (id) return request.post("update", { login: true });
  else return request.post("user/useraddress/add", data, { login: true });
}

export function setDefaultAddress(id) {
  return request.post(
    "user/useraddress/set_default/" + id,
    {},
    { login: true }
  );
}

/*
 * 用户修改信息
 * */
export function postUserEdit(data) {
  return request.post("/user/user/update", data, { login: true });
}

/*
 * 删除地址
 * */
export function getAddressRemove(id) {
  //todo
  return request.post("/address/del", { id: id });
}
