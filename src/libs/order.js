import { cancelOrder, finishAcc } from "@api/order";
import dialog from "@utils/dialog";

export function getTimeStr(timeStr) {
  let time =
    Date.parse(timeStr.slice(0, 10) + " " + timeStr.slice(11, 19)) +
    8 * 60 * 60 * 1000;
  let newTime = new Date(time);
  return newTime.toLocaleDateString() + "    " + newTime.toLocaleTimeString();
}

export function cancelOrderHandle(orderId) {
  return new Promise((resolve, reject) => {
    dialog.confirm({
      mes: "确认取消该订单?",
      opts() {
        cancelOrder(orderId)
          .then(res => {
            dialog.success("取消成功");
            resolve(res);
          })
          .catch(err => {
            dialog.error("取消失败");
            reject(err);
          });
      }
    });
  });
}

export function finishAccHandle(orderId) {
  return new Promise((resolve, reject) => {
    dialog.confirm({
      mes: "确认结束陪诊?",
      opts() {
        finishAcc(orderId)
          .then(res => {
            dialog.success("陪诊结束");
            resolve(res);
          })
          .catch(err => {
            dialog.error("失败");
            reject(err);
          });
      }
    });
  });
}
