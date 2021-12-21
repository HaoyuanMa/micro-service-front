<template>
  <div class="evaluate-con">
    <!--陪诊员信息-->
    <div class="evaluateWtapper">
      <div class="evaluateItem">
        <div class="pic-text acea-row row-middle">
          <div class="pictrue">
            <img :src="fellow.header" class="image" />
          </div>
          <div class="acea-row row-middle">
            <div class="name line1">{{ fellow.username }}</div>
          </div>
        </div>
        <div class="time">
          {{ fellow.age }}岁
          {{ getGender(fellow.gender) }}
        </div>
        <div class="evaluate-infor">{{ fellow.sign }}</div>
      </div>
    </div>
    <div style="height:0.1rem;"></div>
    <!--支付详情 -->
    <div class="score wrapper">
      <div class="item acea-row row-between">
        <div>支付金额：</div>
        <div class="conter">￥{{ orderInfo.totalAmount }}</div>
      </div>
      <div class="actualPay acea-row row-between">
        实付款：<span class="money font-color-red">￥{{ getPayAmount }}</span>
      </div>
    </div>
    <div style="height:0.1rem;"></div>
    <!--评价-->
    <div class="score">
      <div
        class="item acea-row row-middle"
        v-for="(item, indexw) in scoreList"
        :key="indexw"
      >
        <div>{{ item.name }}</div>
        <div class="starsList">
          <span
            @click="stars(indexn, indexw)"
            v-for="(itemn, indexn) in item.stars"
            :key="indexn"
            class="iconfont"
            :class="
              item.index >= indexn
                ? 'icon-shitixing font-color-red'
                : 'icon-kongxinxing'
            "
          ></span>
        </div>
        <span class="evaluate">{{
          item.index === -1 ? "" : item.index + 1 + "分"
        }}</span>
      </div>
      <div class="textarea">
        <textarea
          placeholder="陪诊员满足你的期待么？说说你的想法。"
          v-model="expect"
        ></textarea>
      </div>
      <div class="evaluateBnt bg-color-red" @click="submit">立即评价</div>
    </div>
  </div>
</template>
<style scoped>
.evaluate-con .score .textarea .list .pictrue.uploadBnt {
  border: 1px solid #ddd;
}
</style>
<script>
import { getFellowDetail, postFellowComment } from "@api/store";
import { required } from "@utils/validate";
import { validatorDefaultCatch } from "@utils/dialog";
import { getOrderDetail } from "@api/order";
import { trim } from "@utils";

const NAME = "GoodsEvaluate";

export default {
  name: NAME,
  computed: {
    getPayAmount() {
      return this.orderInfo.status > 0 ? this.orderInfo.totalAmount : 0;
    }
  },
  props: {},
  data: function() {
    return {
      orderInfo: {},
      fellow: {},
      scoreList: [
        {
          name: "到达速度",
          stars: ["", "", "", "", ""],
          index: -1
        },
        {
          name: "服务态度",
          stars: ["", "", "", "", ""],
          index: -1
        }
      ],
      expect: "",
      orderId: this.$route.params.id
    };
  },
  mounted: function() {
    this.getDetail();
  },
  watch: {
    $route(n) {
      if (n.name === NAME && this.orderId !== n.params.id) {
        this.orderId = n.params.id;
        this.$set(this.scoreList[0], "index", -1);
        this.$set(this.scoreList[1], "index", -1);
        this.expect = "";
        this.getDetail();
      }
    }
  },
  methods: {
    getDetail: function() {
      this.getOrderInfo().then(() => {
        getFellowDetail(this.orderInfo.fellowId).then(data => {
          this.fellow = data.fellow;
        });
      });
    },
    getOrderInfo: function() {
      let orderId = this.orderId;
      return getOrderDetail(orderId).then(res => {
        this.orderInfo = res.order;
      });
    },
    getGender: g => {
      return g === 1 ? "男" : " 女";
    },
    stars: function(indexn, indexw) {
      this.scoreList[indexw].index = indexn;
    },
    async submit() {
      const expect = trim(this.expect),
        speed_score =
          this.scoreList[0].index + 1 === 0 ? "" : this.scoreList[0].index + 1,
        service_score =
          this.scoreList[1].index + 1 === 0 ? "" : this.scoreList[1].index + 1;
      try {
        await this.$validator({
          speed_score: [
            required("请选择到达速度分数", {
              type: "number"
            })
          ],
          service_score: [
            required("请选择服务态度分数", {
              type: "number"
            })
          ]
        }).validate({ speed_score, service_score });
      } catch (e) {
        return validatorDefaultCatch(e);
      }
      let score = Math.round((speed_score + service_score) / 2);
      let fellow = this.fellow;
      let order = this.orderInfo;
      postFellowComment({
        orderId: order.id,
        fellowId: fellow.id,
        fellowName: fellow.username,
        userNickName: order.username,
        content: expect,
        commentType: score
      })
        .then(() => {
          this.$dialog.success("评价成功");
          this.$router.replace({
            path: "/order/detail/" + this.orderInfo.id
          });
        })
        .catch(res => {
          this.$dialog.error(res.msg);
        });
    }
  }
};
</script>
