<template>
  <via-element
    @click="$emit('click', index)"
    class="via-grid-item"
    :style="{
      marginTop: index + 1 > parent.columnNum ? parent.space : '',
      marginRight: (index + 1) % parent.columnNum ? parent.space : '',
      width: `calc(100% / ${parent.columnNum} - ${parent.space} * (${parent.columnNum} - 1) / ${parent.columnNum})`,
    }"
  >
    <via-element
      v-if="parent.square"
      class="relative"
      :paddingBottom="parent.square ? '100%' : ''"
    >
      <via-element class="absolute inset-0" v-bind="attrsMap">
        <slot></slot>
      </via-element>
    </via-element>

    <via-element v-else class="relative" v-bind="attrsMap">
      <slot> </slot>
    </via-element>
  </via-element>
</template>

<script>
import { findComponentUpward, nodeIndex, isObject } from "@/utils";
export default {
  name: "ViaGridItem",
  data() {
    return {
      parent: findComponentUpward(this, "ViaGrid"),
      index: 0,
      num: 0,
    };
  },
  created() {
    // console.log(this);
    this.$nextTick(() => {
      this.index = nodeIndex(this.$el);
      this.num = this.$el.parentNode.childElementCount;
    });
  },
  // props: {},
  computed: {
    attrsMap() {
      let borderTopLeftRadius = "";
      let borderTopRightRadius = "";
      let borderBottomLeftRadius = "";
      let borderBottomRightRadius = "";
      if (isObject(this.parent.rounded)) {
        if (this.parent.rounded.top) {
          borderTopLeftRadius = this.parent.rounded.top;
          borderTopRightRadius = this.parent.rounded.top;
        } else if (this.parent.rounded.bottom) {
          borderBottomLeftRadius = this.parent.rounded.bottom;
          borderBottomRightRadius = this.parent.rounded.bottom;
        } else if (this.parent.rounded.left) {
          borderTopLeftRadius = this.parent.rounded.left;
          borderBottomLeftRadius = this.parent.rounded.left;
        } else if (this.parent.rounded.right) {
          borderTopRightRadius = this.parent.rounded.right;
          borderBottomRightRadius = this.parent.rounded.right;
        }
      } else {
        borderTopLeftRadius = this.parent.rounded;
        borderTopRightRadius = this.parent.rounded;
        borderBottomLeftRadius = this.parent.rounded;
        borderBottomRightRadius = this.parent.rounded;
      }
      borderTopLeftRadius =
        this.parent.$attrs["border-top-left-radius"] || borderTopLeftRadius;
      borderTopRightRadius =
        this.parent.$attrs["border-top-right-radius"] || borderTopRightRadius;
      borderBottomLeftRadius =
        this.parent.$attrs["border-bottom-left-radius"] ||
        borderBottomLeftRadius;
      borderBottomRightRadius =
        this.parent.$attrs["border-bottom-right-radius"] ||
        borderBottomRightRadius;
      return {
        borderTopLeftRadius: this.index === 0 ? borderTopLeftRadius : "",
        borderTopRightRadius:
          this.index === this.parent.columnNum - 1 ? borderTopRightRadius : "",
        borderBottomLeftRadius:
          this.index === this.num - this.parent.columnNum
            ? borderBottomLeftRadius
            : "",
        borderBottomRightRadius:
          this.index === this.num - 1 ? borderBottomRightRadius : "",
        ...this.$attrs,
      };
    },
  },
  methods: {},
};
</script>
