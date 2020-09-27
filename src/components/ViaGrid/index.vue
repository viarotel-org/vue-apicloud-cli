<template>
  <via-element
    v-bind="{
      rounded,
      ...$attrs,
    }"
    class="flex flex-wrap"
  >
    <slot></slot>
  </via-element>
</template>

<script>
export default {
  name: "ViaGrid",
  // data() {
  //   return {};
  // },
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
      type: [Object, String],
      // default: "",
    },
  },
  computed: {},
  methods: {},
};
</script>
