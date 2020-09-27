<template>
  <div class="border_t_safe">
    {{ count }}
    <van-button @click="test" type="default">主要按钮</van-button>
    <via-svg name="link"></via-svg>
    <!-- <img src="@/assets/img/admin-edit-login-password.png" alt="" class="" />
    <van-cell is-link @click="showPopup">展示弹出层</van-cell>
    <van-popup v-model="show">内容</van-popup> -->
  </div>
</template>

<script>
// import mixinApicloud from "@/assets/js/mixin-apicloud.js";
import { dialog, loading, toast } from "@/plugins/modal";
import request from "@/request";
Vue.use(request);
import { mixinApicloud } from "@/utils";
export default {
  mixins: [mixinApicloud],
  data() {
    return {
      topSafeAreaColor: "dark",
      count: 1,
      show: false,
    };
  },
  created() {
    console.log(1);
    // alert(1);
    // setInterval(() => {
    //   this.$req.getReportNote();
    // }, 500);
  },
  methods: {
    async test() {
      loading("确认要返回?", { isCancel: true });

      // loading();
    },
  },
};
</script>

<style>
@import "~@/assets/css/tailwind.css";
</style>
