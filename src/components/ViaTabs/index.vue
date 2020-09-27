<template>
  <via-element
    class="flex-shrink-0 via-tabs"
    v-bind="{
      borderColor,
      ...typeMap,
      ...$attrs,
    }"
  >
    <via-element
      :id="`scrollContainer${_uid}`"
      class="flex-grow scrollbar_none"
      v-bind="{
        ...scrollNavMap.parent,
      }"
    >
      <via-element
        @click="$emit('input', index), $emit('change', item)"
        v-for="(item, index) in options"
        :key="index"
        class="flex-shrink-0 flex items-center justify-center text-center via-tabs-item"
        v-bind="{
          ...scrollNavMap.children,
          paddingY: titleLeading,
          ...titleSpacingMap,
          color: value === index ? titleColorActive : titleColor,
          fontSize: value === index ? titleSizeActive : titleSize,
          rounded: titleRounded,
          borderWidth: titleBorderWidthMap,
          borderColor:
            value === index ? titleBorderColorActive : titleBorderColor,
          backgroundColor:
            value === index ? titleBackgroundColorActive : titleBackgroundColor,
          background: value === index ? titleBackgroundActive : titleBackground,
          ...(value === index ? titleAttrsActive : titleAttrs),
          ...item.attrs,
        }"
      >
        <via-element
          v-if="icon"
          tag="i"
          :class="icon"
          :font-size="iconSize"
          :color="iconColor"
          class="iconfont_common mr-2"
        ></via-element>
        <via-element
          v-if="image"
          tag="img"
          v-bind="{
            src: image,
            width: imageSize,
            height: imageSize,
            rounded: imageRounded,
            ...imageAttrs,
          }"
          class="flex-shrink-0 mr-2"
          alt=""
        />
        <via-element class="flex-shrink-0 truncate">{{
          item[name]
        }}</via-element>
      </via-element>
    </via-element>
    <slot name="more">
      <via-element
        v-if="more"
        @click="$emit('click-more', $event)"
        v-bind="{
          fontSize: moreIconSize,
          color: moreIconColor,
          ...moreAttrs,
        }"
        :class="moreIcon"
        class="iconfont_common shadow flex-shrink-0 flex items-center justify-center"
      ></via-element>
    </slot>
  </via-element>
</template>

<script>
import { tween } from "shifty";
export default {
  name: "ViaTabs",
  // data() {
  //   return {};
  // },
  // model: {
  //   prop: "value",
  //   event: "input",
  // },
  mounted() {
    this.tween && this.scrollNav && this.$watch("value", this.onTween);
  },
  props: {
    /**
     * @desc 是否开启补间动画
     */
    tween: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      default: "title", //某些情况下，数据可能是从后端获取的，list所需的数组中不一定会有name属性，比如可能为cate_name，如果这种情况还需一定要提供name属性 会导致用户需要循环一遍，把cate_name改成name，显然不人性的，所以tab组件提供了一个name参数，您可以设置其值为cate_name，组件内部 会读取数组中的cate_name属性，而不是默认的name属性。
    },

    type: {
      type: String,
      default: "row", //row col
    },
    value: {
      type: Number,
      required: true,
    },
    //所需要的数据列表
    options: {
      type: Array,
      required: true,
      // default() {
      //   return [
      //     {
      //       title: "广泛大概",
      //       attrs: {
      //         rounded: { left: "0.25rem" },
      //       },
      //     },
      //     {
      //       title: "首页",
      //       attrs: {
      //         // borderWidth: { top: "1px", bottom: "1px" },
      //       },
      //     },
      //     {
      //       title: "首页1",
      //       attrs: {
      //         rounded: { right: "0.25rem" },
      //       },
      //     },
      //   ];
      // },
    },
    //开启滑动导航
    scrollNav: {
      type: Boolean,
      // default: false,
    },
    //标题旁的字体图标
    icon: {
      type: String,
      // default: "",
    },
    //标题旁的字体图标大小
    iconSize: {
      type: String,
      default: "1rem",
    },
    //标题旁的字体图标颜色
    iconColor: {
      type: String,
      // default: "",
    },
    //标题旁的图片
    image: {
      type: String,
      // default: "",
    },
    //标题旁的图片大小
    imageSize: {
      type: String,
      // default: "",
    },
    //标题旁的图片圆角
    imageRounded: {
      type: String,
      // default: "",
    },
    //image和icon整体的属性样式集合
    imageAttrs: {
      type: Object,
    },

    //标题行高
    titleLeading: {
      type: String,
      default: "0.5rem",
    },
    //标题字间距
    titleSpacing: {
      type: String,
      default: "0.75rem",
    },
    //处理字间距的方式
    titleSpacingMode: {
      type: String,
      default: "padding", //padding margin
    },
    //标题颜色
    titleColor: {
      type: String,
      default: "gray",
    },
    //激活状态下的标题颜色
    titleColorActive: {
      type: String,
      // default: "",
    },
    //标题字体大小
    titleSize: {
      type: String,
      // default: "",
    },
    //激活状态下的标题颜色
    titleSizeActive: {
      type: String,
      // default: "",
    },
    //标题圆角
    titleRounded: {
      type: [String, Object, Boolean],
      // default: "",
    },
    //标题的边框宽度
    titleBorderWidth: {
      type: [String, Object, Number],
      // default() {
      //   return {
      //     bottom: "1px",
      //   };
      // },
    },
    //标题边框的颜色
    titleBorderColor: {
      type: String,
      default: "transparent",
    },
    //激活状态下标题边框的颜色
    titleBorderColorActive: {
      type: String,
      default: "black",
    },
    //标题背景颜色
    titleBackgroundColor: {
      type: String,
      // default: "",
    },
    //激活状态下标题背景颜色
    titleBackgroundColorActive: {
      type: String,
      // default: "",
    },
    //标题背景
    titleBackground: {
      type: String,
      // default: "",
    },
    //激活状态下标题背景
    titleBackgroundActive: {
      type: String,
      // default: "",
    },
    //标题样式对象
    titleAttrs: {
      type: Object,
      // default: "",
    },
    //标题样式对象激活状态
    titleAttrsActive: {
      type: Object,
      default() {
        return {
          // fontWeight: "700",
        };
      },
    },
    //右侧的更多按钮是否显示
    more: {
      type: Boolean,
      // default: false,
    },
    //右侧的更多按钮图标class
    moreIcon: {
      type: String,
      default: "icon_list",
    },
    //右侧的更多按钮图标大小
    moreIconSize: {
      type: String,
      default: "1rem",
    },
    //右侧的更多按钮图标颜色
    moreIconColor: {
      type: String,
      // default: "",
    },
    //右侧的更多按钮图标样式属性集合 以对象方式自定义样式
    moreAttrs: {
      type: Object,
      default() {
        return {
          paddingX: "1.25rem",
        };
      },
    },
    //最外层的边框颜色
    borderColor: {
      type: String,
      default: "#F5F5F5",
    },
  },
  computed: {
    typeMap() {
      let value = {};
      switch (this.type) {
        case "row":
          value = {
            flex: "rowL",
            alignItems: "stretch",
          };
          break;
        case "col":
          value = {
            flex: "colT",
            alignItems: "stretch",
            height: "100%",
          };
          break;
      }
      return value;
    },
    titleBorderWidthMap() {
      let value = "";
      if (this.titleBorderWidth !== undefined) {
        value = this.titleBorderWidth;
      } else {
        switch (this.type) {
          case "row":
            value = {
              bottom: "2px",
            };
            break;
          case "col":
            value = {
              left: "2px",
            };
            break;
        }
      }
      return value;
    },
    scrollNavMap() {
      let value = {};
      switch (this.type) {
        case "row":
          if (this.scrollNav) {
            value = {
              parent: {
                flex: "rowL",
                overflowX: "scroll",
                "-webkit-overflow-scrolling": "touch",
                position: "static",
              },
              children: {},
            };
          } else {
            value = {
              parent: {
                flex: "rowL",
              },
              children: {
                width: "1px",
                flexGrow: 1,
              },
            };
          }
          break;
        case "col":
          value = {
            parent: {
              flex: "colT",
              alignItems: "stretch",
              overflowY: "scroll",
              "-webkit-overflow-scrolling": "touch",
              position: "static",
            },
            children: {},
          };
          break;
      }
      return value;
    },
    titleSpacingMap() {
      let value = {};
      switch (this.type) {
        case "row":
          if (this.titleSpacingMode === "margin") {
            value = {
              marginX: this.titleSpacing,
            };
          } else {
            value = {
              paddingX: this.titleSpacing,
            };
          }
          break;
        case "col":
          value = {
            paddingX: this.titleSpacing,
          };
          break;
      }

      return value;
    },
  },
  methods: {
    onTween() {
      let tempObj = {};
      this.$nextTick(() => {
        const parent = document.querySelector(`#scrollContainer${this._uid}`);
        switch (this.type) {
          case "row":
            tempObj = {
              start: parent.scrollLeft,
              end:
                parent.children[this.value].offsetLeft +
                parent.children[0].offsetWidth / 2 -
                parent.offsetWidth / 2,
              attr: "scrollLeft",
            };
            break;
          case "col":
            tempObj = {
              start: parent.scrollTop,
              end:
                parent.children[this.value].offsetTop +
                parent.children[0].offsetHeight / 2 -
                parent.offsetHeight / 2,
              attr: "scrollTop",
            };
            break;
        }

        tween({
          from: { number: tempObj.start },
          to: { number: tempObj.end },
          duration: 300,
          easing: "linear",
          step: ({ number }) => {
            parent[tempObj.attr] = number;
          },
        }).then(() => {
          // console.log("All done!")
        });
      });
    },
  },
};
</script>
