<template>
  <div @click="$apiCloseWin()" class="tw-pt-10">
    返回
  </div>
</template>

<script>
import { mixinApicloud } from "@/utils";
export default {
  mixins: [mixinApicloud],
  data() {
    return {
      topSafeAreaColor: "dark",
    };
  },
};
</script>

<style></style>
