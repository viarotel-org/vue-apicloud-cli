<template>
  <div class="border_t_safe">
    <div class="">{{ data }}</div>
    <van-button @click="getData" type="default">获取数据</van-button>
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
      data: "",
    };
  },
  created() {},
  methods: {
    async getData() {
      const data = await this.$req.getData();
      this.data = data;
    },
  },
};
</script>

<style>
@import "~@/assets/css/tailwind.css";
</style>
