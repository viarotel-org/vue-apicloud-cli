<template>
  <via-element
    :class="{ border_t_safe: $isAPICloud }"
    class="via-header flex-shrink-0 border-gray-100"
    v-bind="{
      padding,
      background,
      ...$attrs,
    }"
  >
    <via-element class="flex justify-center items-center">
      <via-element
        v-if="leftGrow != 0"
        @click="$emit('click-left')"
        class="w-1"
        :flex-grow="leftGrow"
      >
        <slot name="left">
          <via-element class="flex justify-start items-center">
            <via-element
              v-if="leftImage"
              tag="img"
              :src="leftImage"
              v-bind="{
                width: leftImageWidth || leftImageSize,
                height: leftImageHeight || leftImageSize,
              }"
              alt
              class="flex-shrink-0 mr-1"
            />
            <via-element
              v-if="leftIcon"
              tag="i"
              v-bind="{
                fontSize: leftIconSize,
                color: leftIconColor,
              }"
              :class="leftIcon"
              class="flex-shrink-0 iconfont_common pr-1"
            ></via-element>
            <via-element
              v-if="leftText"
              tag="div"
              v-bind="{
                fontSize: leftTextSize,
                color: leftTextColor,
              }"
              v-truncate:[leftTextLength]
              class="flex-shrink-0"
              >{{ leftText }}</via-element
            >
          </via-element>
        </slot>
      </via-element>
      <via-element
        v-if="grow != 0"
        @click="$emit('click-center')"
        class="w-1"
        :flex-grow="grow"
      >
        <slot>
          <via-element class="flex justify-center items-center">
            <via-element
              v-if="image"
              tag="img"
              :src="image"
              v-bind="{
                width: imageWidth || imageSize,
                height: imageWidth || imageSize,
              }"
              alt
              class="flex-shrink-0 mr-1"
            />
            <via-element
              v-if="icon"
              tag="i"
              v-bind="{
                fontSize: iconSize,
                color: iconColor,
              }"
              :class="icon"
              class="flex-shrink-0 iconfont_common pr-1"
            ></via-element>
            <via-element
              v-if="title"
              tag="div"
              v-bind="{
                fontSize: titleSize,
                color: titleColor,
              }"
              v-truncate:[titleLength]
              class="flex-shrink-0 text-center"
              >{{ title }}</via-element
            >
          </via-element>
        </slot>
      </via-element>
      <via-element
        v-if="rightGrow != 0"
        @click="$emit('click-right')"
        class="w-1"
        :flex-grow="rightGrow"
      >
        <slot name="right">
          <via-element class="flex justify-end items-center">
            <via-element
              v-if="rightImage"
              tag="img"
              :src="rightImage"
              v-bind="{
                width: rightImageWidth || rightImageSize,
                height: rightImageWidth || rightImageSize,
              }"
              alt
              class="flex-shrink-0"
            />
            <via-element
              v-if="rightIcon"
              tag="i"
              v-bind="{
                fontSize: rightIconSize,
                color: rightIconColor,
              }"
              :class="rightIcon"
              class="flex-shrink-0 iconfont_common pl-1"
            ></via-element>
            <via-element
              v-if="rightText"
              tag="div"
              v-bind="{
                fontSize: rightTextSize,
                color: rightTextColor,
              }"
              v-truncate:[rightTextLength]
              class="flex-shrink-0 text-right ml-1"
              >{{ rightText }}</via-element
            >
          </via-element>
        </slot>
      </via-element>
    </via-element>
    <slot name="bottom"></slot>
  </via-element>
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
      type: [Object, String],
      default() {
        return {
          top: "0.75rem",
          bottom: "0.75rem",
          left: "1rem",
          right: "1rem",
        };
      },
    },
  },
  // computed: {},
  // mounted() {},
  // methods: {},
};
</script>
