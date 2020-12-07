<template>
  <div
    @click="$emit('click', childElementIndex)"
    class="via-grid-item"
    :style="{
      marginTop:
        childElementIndex + 1 > parentProps.columnNum ? parentProps.space : '',
      marginRight:
        (childElementIndex + 1) % parentProps.columnNum
          ? parentProps.space
          : '',
      width: `calc(100% / ${parentProps.columnNum} - ${parentProps.space} * (${parentProps.columnNum} - 1) / ${parentProps.columnNum})`,
    }"
  >
    <div
      v-if="parentProps.square"
      class="relative"
      :style="{
        paddingBottom: parentProps.square ? '100%' : '',
      }"
    >
      <div
        class="absolute inset-0"
        :class="customClass"
        :style="[roundedMap, customStyle]"
      >
        <slot></slot>
      </div>
    </div>

    <div
      v-else
      class="relative"
      :class="customClass"
      :style="[roundedMap, customStyle]"
    >
      <slot> </slot>
    </div>
  </div>
</template>

<script>
import { findComponentUpward, nodeIndex, isObject } from "@/utils";
export default {
  name: "ViaGridItem",
  data() {
    return {
      childElementIndex: 0,
      childElementCount: 0,
    };
  },
  inject: ["parentProps"],
  mounted() {
    // console.log(this);
    this.$nextTick(() => {
      this.childElementIndex = nodeIndex(this.$el);
      this.childElementCount = this.$el.parentNode.childElementCount;
    });
  },
  props: {
    customStyle: {
      type: [Object],
      default: () => {},
    },
    customClass: {
      type: [String],
      default: "",
    },
  },
  computed: {
    roundedMap() {
      const rounded = this.parentProps.rounded;

      return {
        borderTopLeftRadius: this.childElementIndex === 0 ? rounded : "",
        borderTopRightRadius:
          this.childElementIndex === this.parentProps.columnNum - 1
            ? rounded
            : "",
        borderBottomLeftRadius:
          this.childElementIndex ===
          this.childElementCount - this.parentProps.columnNum
            ? rounded
            : "",
        borderBottomRightRadius:
          this.childElementIndex === this.childElementCount - 1 ? rounded : "",
      };
    },
  },
  methods: {},
};
</script>
<style>
@import "~@/assets/css/tailwind/index.css";
</style>