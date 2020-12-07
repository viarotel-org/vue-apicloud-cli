<template>
  <div
    class="via-header flex-shrink-0 border-gray-100 border_t_safe"
    :style="{
      padding,
      background,
    }"
  >
    <div class="flex justify-center items-center">
      <div
        v-if="leftGrow != 0"
        @click="$emit('click-left')"
        class="w-1"
        :style="{
          flexGrow: leftGrow,
        }"
      >
        <slot name="left">
          <div class="flex justify-start items-center">
            <img
              v-if="leftImage"
              :src="leftImage"
              :style="{
                width: leftImageWidth || leftImageSize,
                height: leftImageHeight || leftImageSize,
              }"
              alt
              class="flex-shrink-0 mr-1"
            />
            <i
              v-if="leftIcon"
              :style="{
                fontSize: leftIconSize,
                color: leftIconColor,
              }"
              :class="leftIcon"
              class="flex-shrink-0 iconfont_common pr-1"
            ></i>
            <div
              v-if="leftText"
              :style="{
                fontSize: leftTextSize,
                color: leftTextColor,
              }"
              v-truncate:[leftTextLength]
              class="flex-shrink-0"
            >
              {{ leftText }}
            </div>
          </div>
        </slot>
      </div>
      <div
        v-if="grow != 0"
        @click="$emit('click-center')"
        class="w-1"
        :style="{
          flexGrow: grow,
        }"
      >
        <slot>
          <div class="flex justify-center items-center">
            <img
              v-if="image"
              :src="image"
              :style="{
                width: imageWidth || imageSize,
                height: imageHeight || imageSize,
              }"
              alt
              class="flex-shrink-0 mr-1"
            />
            <i
              v-if="icon"
              tag="i"
              :style="{
                fontSize: iconSize,
                color: iconColor,
              }"
              :class="icon"
              class="flex-shrink-0 iconfont_common pr-1"
            ></i>
            <div
              v-if="title"
              :style="{
                fontSize: titleSize,
                color: titleColor,
              }"
              v-truncate:[titleLength]
              class="flex-shrink-0 text-center"
            >
              {{ title }}
            </div>
          </div>
        </slot>
      </div>
      <div
        v-if="rightGrow != 0"
        @click="$emit('click-right')"
        class="w-1"
        :style="{
          flexGrow: rightGrow,
        }"
      >
        <slot name="right">
          <div class="flex justify-end items-center">
            <img
              v-if="rightImage"
              :src="rightImage"
              :style="{
                width: rightImageWidth || rightImageSize,
                height: rightImageHeight || rightImageSize,
              }"
              alt
              class="flex-shrink-0"
            />
            <i
              v-if="rightIcon"
              :style="{
                fontSize: rightIconSize,
                color: rightIconColor,
              }"
              :class="rightIcon"
              class="flex-shrink-0 iconfont_common pl-1"
            ></i>
            <div
              v-if="rightText"
              :style="{
                fontSize: rightTextSize,
                color: rightTextColor,
              }"
              v-truncate:[rightTextLength]
              class="flex-shrink-0 text-right ml-1"
            >
              {{ rightText }}
            </div>
          </div>
        </slot>
      </div>
    </div>
    <slot name="bottom"></slot>
  </div>
</template>

<script>
import { vTruncate } from "@/utils";
import Vue from "vue";
Vue.use(vTruncate);
export default {
  name: "ViaHeader",
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      // default: "",
    },
    titleLength: {
      type: [String, Number],
      default: 10,
    },
    titleSize: {
      type: String,
      default: "1.125rem",
    },
    titleColor: {
      type: String,
      // default: "black",
    },
    icon: {
      type: String,
      // default: "",
    },
    iconSize: {
      type: String,
      default: "1rem",
    },
    iconColor: {
      type: String,
      // default: "black",
    },
    image: {
      type: String,
      // default: "",
    },
    imageSize: {
      type: String,
      // default: "",
    },
    imageWidth: {
      type: String,
      // default: "",
    },
    imageHeight: {
      type: String,
      // default: "",
    },
    grow: {
      type: [String, Number],
      default: 3,
    },

    leftIcon: {
      type: [String, Boolean],
      default: "icon_return",
    },
    leftIconSize: {
      type: String,
      default: "1rem",
    },
    leftImageWidth: {
      type: String,
    },
    leftImageHeight: {
      type: String,
    },
    leftIconColor: {
      type: String,
      // default: "black",
    },
    leftImage: {
      type: String,
      // default: "",
    },
    leftImageSize: {
      type: String,
      // default: "",
    },
    leftText: {
      type: String,
      // default: "",
    },
    leftTextLength: {
      type: [String, Number],
      default: 6,
    },
    leftTextSize: {
      type: String,
      default: "1rem",
    },
    leftTextColor: {
      type: String,
      // default: "black",
    },
    leftGrow: {
      type: [String, Number],
      default: 1,
    },

    rightIcon: {
      type: String,
      // default: "",
    },
    rightIconSize: {
      type: String,
      // default: "",
    },
    rightIconColor: {
      type: String,
      // default: "black",
    },
    rightImage: {
      type: String,
      // default: "",
    },
    rightImageSize: {
      type: String,
      // default: "",
    },
    rightImageWidth: {
      type: String,
    },
    rightImageHeight: {
      type: String,
    },
    rightText: {
      type: String,
      // default: "",
    },
    rightTextLength: {
      type: [String, Number],
      default: 6,
    },
    rightTextColor: {
      type: String,
      // default: "black",
    },
    rightTextSize: {
      type: String,
      // default: "",
    },
    rightGrow: {
      type: [String, Number],
      default: 1,
    },
    background: {
      type: String,
      default: "white",
    },
    padding: {
      type: [String],
      default: "0.75rem 1rem",
    },
  },
  // computed: {},
  // mounted() {},
  // methods: {},
};
</script>
<style>
@import "~@/assets/css/tailwind/index.css";
</style>