<template>
  <div class="border-t-safe">
    <div class="">{{ data }}</div>
    <van-button @click="getData" type="default">获取数据</van-button>
    <van-button @click="$apiOpenWin('account_login')" type="default"
      >打开login</van-button
    >

    <via-grid rounded="25px" space="10px" square>
      <via-grid-item
        v-for="(i, iIndex) in 9"
        :key="iIndex"
        custom-class="bg-red"
        >{{ i }}</via-grid-item
      >
    </via-grid>
    <via-svg name="404"></via-svg>
  </div>
</template>

<script>
import { mixinApicloud } from "@/utils";
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
      const data = await this.$req.getDemoData();
      this.data = data;
    },
  },
};
</script>

<style>
@import "~@/assets/css/tailwind/index.css";
</style>
