<template>
  <div class="flex flex-wrap" :style="roundedMap">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ViaGrid",
  created() {
    // console.log("via-grid", this);
  },
  props: {
    //是否固定为正方形
    square: {
      type: Boolean,
    },
    //元素间的间距
    space: {
      type: String,
      default: "0px",
    },
    //列数
    columnNum: {
      type: [String, Number],
      default: "3",
    },
    rounded: {
      type: [String],
      // default: "",
    },
  },
  provide() {
    return {
      parentProps: this.$props,
    };
  },
  computed: {
    roundedMap() {
      return {
        borderRadius: this.rounded,
      };
    },
  },
  methods: {},
};
</script>
<style>
@import "~@/assets/css/tailwind/index.css";
</style>
