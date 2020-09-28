<template>
  <div class="border_t_safe">
    <div class="">{{ ipStr }}</div>
    <van-button @click="getIp" type="default">获取当前ip</van-button>
    <van-button @click="$apiOpenWin('account_login')" type="default"
      >打开login</van-button
    >
  </div>
</template>

<script>
import { mixinApicloud } from "@/utils";
import { dialog, loading, toast } from "@/plugins/modal";
import request from "@/request";
Vue.use(request);
export default {
  mixins: [mixinApicloud],
  data() {
    return {
      topSafeAreaColor: "dark",
      ipStr: "",
    };
  },
  created() {},
  methods: {
    async getIp() {
      const data = await this.$req.getIp();
      this.ipStr = data;
    },
  },
};
</script>

<style>
@import "~@/assets/css/tailwind.css";
</style>
