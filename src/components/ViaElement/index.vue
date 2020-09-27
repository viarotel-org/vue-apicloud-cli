<script>
import {
  // isStringNumber,
  // isNumber,
  // isArray,
  isObject,
  isBoolean,
} from "@/utils";
export default {
  name: "ViaElement",
  render(h) {
    // console.log(this);
    return (
      <this.tag
        {...{
          props: this.options,
          attrs: this.mapAttr.native,
          on: this.$listeners,
        }}
        style={[this.mapProps, this.mapAttr.custom]}
      >
        {this.$slots.default}
      </this.tag>
    );
  },
  inheritAttrs: false, //禁用 Attribute 自动继承 不会影响 style 和 class 的绑定。
  props: {
    tag: {
      type: String,
      default: "div",
    },
    //需要传给下一个组件参数(有时候tag值可能是一个组件的名称)
    options: {
      type: Object,
      // default() {
      //   return {};
      // },
    },
    margin: {
      type: [Object, String, Number],
      // default: "",
    },
    marginX: {
      type: String,
      // default: "",
    },
    marginY: {
      type: String,
      // default: "",
    },
    padding: {
      type: [Object, String, Number],
      // default: "",
    },
    paddingX: {
      type: [String, Number],
      // default: "",
    },
    paddingY: {
      type: [String, Number],
      // default: "",
    },
    borderWidth: {
      type: [Object, String, Boolean, Number],
      default: undefined,
    },
    rounded: {
      type: [Object, String, Boolean],
      // default: "",
    },

    flex: {
      type: String,
      // default: "rowL", // rowL rowC rowR rowBetween rowAround rowEvenly colT colC colB colBetween colAround colEvenly rowsStart rowsC rowsEnd rowsBetween rowsAround rowsEvenly colsStart colsC colsEnd colsBetween colsAround colsEvenly
    },
    //弹性元素换行
    flexWrap: {
      type: [String, Boolean],
      default: undefined, // wrap nowrap
    },
    // 弹性容器控制子类 侧轴对齐
    alignItems: {
      type: String,
      // default: "center", // stretch start end center
    },
    // 弹性元素单独控制 侧轴对齐方式 不能放到预设(rowL ...)上面会被覆盖
    alignSelf: {
      type: String,
      // default: "center", // stretch start end center baseline
    },
    scroll: {
      type: String,
    },
    mask: {
      type: [Boolean, String],
      default: undefined,
    },
  },
  computed: {
    /**
     * @desc 映射并处理没有在props中定义的属性
     */
    mapAttr() {
      const nativeAttrObj = {
        id: "",
        src: "",
        alt: "", //定义图像输入的替代文本。 (只针对type="image") 不显示损坏图片
        type: "",
        name: "",
        value: "",
        accept: "", //audio/* video/* image/* MIME_type
        // autocomplete: "", //规定 <input> 元素输入字段是否应该启用自动完成功能。
        autofocus: "", //属性规定当页面加载时 <input> 元素应该自动获得焦点。
        checked: "", //	checked 属性规定在页面加载时应该被预先选定的
        disabled: "",
        max: "",
        min: "",
        maxlength: "",
        placeholder: "", //简短的提示信息
        readonly: "", //规定输入字段是只读的。
        size: "", //size 属性规定以字符数计的 <input> 元素的可见宽度。

        // download: "", //指定下载链接
        href: "", //规定链接的目标 URL。
        // rel: "", //规定当前文档与目标 URL 之间的关系。仅在 href 属性存在时使用。
        target: "", //规定在何处打开目标 URL。仅在 href 属性存在时使用。

        hidden: "", //hidden 属性规定对元素进行隐藏。
        autoplay: "", //自动播放
        controls: "", //显示控件，比如播放按钮。
        loop: "", //循坏
        muted: "", //	如果出现该属性，视频的音频输出为静音。
        poster: "", //规定视频正在下载时显示的图像，直到用户点击播放按钮。
        preload: "", //加载方式

        dir: "", //设置元素中内容的文本方向。
        // contenteditable: "", //规定是否可编辑元素的内容。
        // draggable: "", //指定某个元素是否可以拖动
        // dropzone: "", //指定是否将数据复制，移动，或链接，或删除
        // title: "", //规定元素的额外信息（可在工具提示中显示）
        // accesskey: "", //设置访问元素的键盘快捷键。
        // tabindex: "", //设置元素的 Tab 键控制次序。
        // translate: "", //指定是否一个元素的值在页面载入时是否需要翻译
      }; //原生属性名数组

      let attrObj = {
        native: {}, //原生属性
        custom: { ...this.$attrs }, //自定义未在props中声明的属性
      };

      for (const key in this.$attrs) {
        if (this.$attrs.hasOwnProperty(key)) {
          if (nativeAttrObj[key] !== undefined) {
            delete attrObj.custom[key];
            attrObj.native[key] = this.$attrs[key];
          }
          if (attrObj.custom[key] === undefined || attrObj.custom[key] === "") {
            delete attrObj.custom[key];
          }
        }
      }
      // console.log(attrObj);
      return attrObj;
    },
    /**
     * @desc 映射并处理props的参数
     */
    mapProps() {
      let tempObj = {};
      let value = "";
      for (const key in this.$props) {
        if (this.$props.hasOwnProperty(key) && this.$props[key] !== undefined) {
          value = this.$props[key];
          switch (key) {
            case "marginX":
              Object.assign(tempObj, {
                "margin-left": value,
                "margin-right": value,
              });
              break;
            case "marginY":
              Object.assign(tempObj, {
                "margin-top": value,
                "margin-bottom": value,
              });
              break;
            case "margin":
              if (isObject(value)) {
                value = `${value.top || 0} ${value.right || 0} ${value.bottom ||
                  0} ${value.left || 0}`;
              }
              tempObj[key] = value;
              break;
            case "paddingX":
              Object.assign(tempObj, {
                "padding-left": value,
                "padding-right": value,
              });
              break;
            case "paddingY":
              Object.assign(tempObj, {
                "padding-top": value,
                "padding-bottom": value,
              });
              break;
            case "padding":
              if (isObject(value)) {
                value = `${value.top || 0} ${value.right || 0} ${value.bottom ||
                  0} ${value.left || 0}`;
              }
              tempObj[key] = value;
              break;
            case "borderWidth":
              if (isObject(value)) {
                value = `${value.top || 0} ${value.right || 0} ${value.bottom ||
                  0} ${value.left || 0}`;
              } else if (isBoolean(value)) {
                if (value) {
                  value = "1px";
                } else {
                  value = 0;
                }
              }
              tempObj[key] = value;
              break;
            case "rounded":
              if (isObject(value)) {
                if (value.top) {
                  value = `${value.top} ${value.top} 0 0`;
                }

                if (value.bottom) {
                  value = `0 0 ${value.bottom} ${value.bottom}`;
                }

                if (value.left) {
                  value = `${value.left} 0 0 ${value.left}`;
                }

                if (value.right) {
                  value = `0 ${value.right} ${value.right} 0`;
                }
              } else if (isBoolean(value)) {
                if (value) {
                  value = "9999px";
                } else {
                  value = "";
                }
              }

              tempObj["border-radius"] = value;
              break;
            case "flex":
              switch (value) {
                case "rowL":
                  value = {
                    display: "-webkit-box",
                    display: "-ms-flexbox",
                    display: "flex",
                    "-webkit-box-align": "center",
                    "-ms-flex-align": "center",
                    "align-items": "center",

                    "-webkit-box-pack": "start",
                    "-ms-flex-pack": "start",
                    "justify-content": "flex-start",
                  };
                  break;
                case "rowC":
                  value = {
                    display: "-webkit-box",
                    display: "-ms-flexbox",
                    display: "flex",
                    "-webkit-box-align": "center",
                    "-ms-flex-align": "center",
                    "align-items": "center",

                    "-webkit-box-pack": "center",
                    "-ms-flex-pack": "center",
                    "justify-content": "center",
                  };
                  break;
                case "rowR":
                  value = {
                    display: "-webkit-box",
                    display: "-ms-flexbox",
                    display: "flex",
                    "-webkit-box-align": "center",
                    "-ms-flex-align": "center",
                    "align-items": "center",

                    "-webkit-box-pack": "end",
                    "-ms-flex-pack": "end",
                    "justify-content": "flex-end",
                  };
                  break;
                case "rowBetween":
                  value = {
                    display: "-webkit-box",
                    display: "-ms-flexbox",
                    display: "flex",
                    "-webkit-box-align": "center",
                    "-ms-flex-align": "center",
                    "align-items": "center",

                    "-webkit-box-pack": "justify",
                    "-ms-flex-pack": "justify",
                    "justify-content": "space-between",
                  };
                  break;
                case "rowAround":
                  value = {
                    display: "-webkit-box",
                    display: "-ms-flexbox",
                    display: "flex",
                    "-webkit-box-align": "center",
                    "-ms-flex-align": "center",
                    "align-items": "center",

                    "-ms-flex-pack": "distribute",
                    "justify-content": "space-around",
                  };
                  break;
                case "rowEvenly":
                  value = {
                    display: "-webkit-box",
                    display: "-ms-flexbox",
                    display: "flex",
                    "-webkit-box-align": "center",
                    "-ms-flex-align": "center",
                    "align-items": "center",

                    "-webkit-box-pack": "space-evenly",
                    "-ms-flex-pack": "space-evenly",
                    "justify-content": "space-evenly",
                  };
                  break;

                case "colT":
                  value = {
                    display: "-webkit-box",
                    display: "-ms-flexbox",
                    display: "flex",
                    "-webkit-box-orient": "vertical",
                    "-webkit-box-direction": "normal",
                    "-ms-flex-direction": "column",
                    "flex-direction": "column",
                    "-webkit-box-align": "center",
                    "-ms-flex-align": "center",
                    "align-items": "center",

                    "-webkit-box-pack": "start",
                    "-ms-flex-pack": "start",
                    "justify-content": "flex-start",
                  };
                  break;
                case "colC":
                  value = {
                    display: "-webkit-box",
                    display: "-ms-flexbox",
                    display: "flex",
                    "-webkit-box-orient": "vertical",
                    "-webkit-box-direction": "normal",
                    "-ms-flex-direction": "column",
                    "flex-direction": "column",
                    "-webkit-box-align": "center",
                    "-ms-flex-align": "center",
                    "align-items": "center",

                    "-webkit-box-pack": "center",
                    "-ms-flex-pack": "center",
                    "justify-content": "center",
                  };
                  break;
                case "colB":
                  value = {
                    display: "-webkit-box",
                    display: "-ms-flexbox",
                    display: "flex",
                    "-webkit-box-orient": "vertical",
                    "-webkit-box-direction": "normal",
                    "-ms-flex-direction": "column",
                    "flex-direction": "column",
                    "-webkit-box-align": "center",
                    "-ms-flex-align": "center",
                    "align-items": "center",

                    "-webkit-box-pack": "end",
                    "-ms-flex-pack": "end",
                    "justify-content": "flex-end",
                  };
                  break;
                case "colBetween":
                  value = {
                    display: "-webkit-box",
                    display: "-ms-flexbox",
                    display: "flex",
                    "-webkit-box-orient": "vertical",
                    "-webkit-box-direction": "normal",
                    "-ms-flex-direction": "column",
                    "flex-direction": "column",
                    "-webkit-box-align": "center",
                    "-ms-flex-align": "center",
                    "align-items": "center",

                    "-webkit-box-pack": "justify",
                    "-ms-flex-pack": "justify",
                    "justify-content": "space-between",
                  };
                  break;
                case "colAround":
                  value = {
                    display: "-webkit-box",
                    display: "-ms-flexbox",
                    display: "flex",
                    "-webkit-box-orient": "vertical",
                    "-webkit-box-direction": "normal",
                    "-ms-flex-direction": "column",
                    "flex-direction": "column",
                    "-webkit-box-align": "center",
                    "-ms-flex-align": "center",
                    "align-items": "center",

                    "-ms-flex-pack": "distribute",
                    "justify-content": "space-around",
                  };
                  break;
                case "colEvenly":
                  value = {
                    display: "-webkit-box",
                    display: "-ms-flexbox",
                    display: "flex",
                    "-webkit-box-orient": "vertical",
                    "-webkit-box-direction": "normal",
                    "-ms-flex-direction": "column",
                    "flex-direction": "column",
                    "-webkit-box-align": "center",
                    "-ms-flex-align": "center",
                    "align-items": "center",

                    "-webkit-box-pack": "space-evenly",
                    "-ms-flex-pack": "space-evenly",
                    "justify-content": "space-evenly",
                  };
                  break;

                case "rowsStart":
                  value = {
                    display: "-webkit-box",
                    display: "-ms-flexbox",
                    display: "flex",
                    "-webkit-box-orient": "horizontal",
                    "-webkit-box-direction": "normal",
                    "-ms-flex-flow": "row wrap",
                    "flex-flow": "row wrap",
                    "-webkit-box-pack": "start",
                    "-ms-flex-pack": "start",
                    "justify-content": "flex-start",

                    "-ms-flex-line-pack": "start",
                    "align-content": "flex-start",
                  };
                  break;
                case "rowsC":
                  value = {
                    display: "-webkit-box",
                    display: "-ms-flexbox",
                    display: "flex",
                    "-webkit-box-orient": "horizontal",
                    "-webkit-box-direction": "normal",
                    "-ms-flex-flow": "row wrap",
                    "flex-flow": "row wrap",
                    "-webkit-box-pack": "start",
                    "-ms-flex-pack": "start",
                    "justify-content": "flex-start",

                    "-ms-flex-line-pack": "center",
                    "align-content": "center",
                  };
                  break;
                case "rowsEnd":
                  value = {
                    display: "-webkit-box",
                    display: "-ms-flexbox",
                    display: "flex",
                    "-webkit-box-orient": "horizontal",
                    "-webkit-box-direction": "normal",
                    "-ms-flex-flow": "row wrap",
                    "flex-flow": "row wrap",
                    "-webkit-box-pack": "start",
                    "-ms-flex-pack": "start",
                    "justify-content": "flex-start",

                    "-ms-flex-line-pack": "end",
                    "align-content": "flex-end",
                  };
                  break;
                case "rowsBetween":
                  value = {
                    display: "-webkit-box",
                    display: "-ms-flexbox",
                    display: "flex",
                    "-webkit-box-orient": "horizontal",
                    "-webkit-box-direction": "normal",
                    "-ms-flex-flow": "row wrap",
                    "flex-flow": "row wrap",
                    "-webkit-box-pack": "start",
                    "-ms-flex-pack": "start",
                    "justify-content": "flex-start",

                    "-ms-flex-line-pack": "justify",
                    "align-content": "space-between",
                  };
                  break;
                case "rowsAround":
                  value = {
                    display: "-webkit-box",
                    display: "-ms-flexbox",
                    display: "flex",
                    "-webkit-box-orient": "horizontal",
                    "-webkit-box-direction": "normal",
                    "-ms-flex-flow": "row wrap",
                    "flex-flow": "row wrap",
                    "-webkit-box-pack": "start",
                    "-ms-flex-pack": "start",
                    "justify-content": "flex-start",

                    "-ms-flex-line-pack": "distribute",
                    "align-content": "space-around",
                  };
                  break;
                case "rowsEvenly":
                  value = {
                    display: "-webkit-box",
                    display: "-ms-flexbox",
                    display: "flex",
                    "-webkit-box-orient": "horizontal",
                    "-webkit-box-direction": "normal",
                    "-ms-flex-flow": "row wrap",
                    "flex-flow": "row wrap",
                    "-webkit-box-pack": "start",
                    "-ms-flex-pack": "start",
                    "justify-content": "flex-start",

                    "-ms-flex-line-pack": "space-evenly",
                    "align-content": "space-evenly",
                  };
                  break;

                case "colsStart":
                  value = {
                    display: "-webkit-box",
                    display: "-ms-flexbox",
                    display: "flex",
                    "-webkit-box-orient": "vertical",
                    "-webkit-box-direction": "normal",
                    "-ms-flex-flow": "column wrap",
                    "flex-flow": "column wrap",
                    "-webkit-box-pack": "start",
                    "-ms-flex-pack": "start",
                    "justify-content": "flex-start",

                    "-ms-flex-line-pack": "start",
                    "align-content": "flex-start",
                  };
                  break;
                case "colsC":
                  value = {
                    display: "-webkit-box",
                    display: "-ms-flexbox",
                    display: "flex",
                    "-webkit-box-orient": "vertical",
                    "-webkit-box-direction": "normal",
                    "-ms-flex-flow": "column wrap",
                    "flex-flow": "column wrap",
                    "-webkit-box-pack": "start",
                    "-ms-flex-pack": "start",
                    "justify-content": "flex-start",

                    "-ms-flex-line-pack": "center",
                    "align-content": "center",
                  };
                  break;
                case "colsEnd colsBetween":
                  value = {
                    display: "-webkit-box",
                    display: "-ms-flexbox",
                    display: "flex",
                    "-webkit-box-orient": "vertical",
                    "-webkit-box-direction": "normal",
                    "-ms-flex-flow": "column wrap",
                    "flex-flow": "column wrap",
                    "-webkit-box-pack": "start",
                    "-ms-flex-pack": "start",
                    "justify-content": "flex-start",

                    "-ms-flex-line-pack": "end",
                    "align-content": "flex-end",
                  };
                  break;
                case "colsBetween":
                  value = {
                    display: "-webkit-box",
                    display: "-ms-flexbox",
                    display: "flex",
                    "-webkit-box-orient": "vertical",
                    "-webkit-box-direction": "normal",
                    "-ms-flex-flow": "column wrap",
                    "flex-flow": "column wrap",
                    "-webkit-box-pack": "start",
                    "-ms-flex-pack": "start",
                    "justify-content": "flex-start",

                    "-ms-flex-line-pack": "justify",
                    "align-content": "space-between",
                  };
                  break;
                case "colsAround":
                  value = {
                    display: "-webkit-box",
                    display: "-ms-flexbox",
                    display: "flex",
                    "-webkit-box-orient": "vertical",
                    "-webkit-box-direction": "normal",
                    "-ms-flex-flow": "column wrap",
                    "flex-flow": "column wrap",
                    "-webkit-box-pack": "start",
                    "-ms-flex-pack": "start",
                    "justify-content": "flex-start",

                    "-ms-flex-line-pack": "distribute",
                    "align-content": "space-around",
                  };
                  break;
                case "colsEvenly":
                  value = {
                    display: "-webkit-box",
                    display: "-ms-flexbox",
                    display: "flex",
                    "-webkit-box-orient": "vertical",
                    "-webkit-box-direction": "normal",
                    "-ms-flex-flow": "column wrap",
                    "flex-flow": "column wrap",
                    "-webkit-box-pack": "start",
                    "-ms-flex-pack": "start",
                    "justify-content": "flex-start",

                    "-ms-flex-line-pack": "space-evenly",
                    "align-content": "space-evenly",
                  };
                  break;
              }
              Object.assign(tempObj, value);
              break;
            case "flexWrap":
              if (isBoolean(value)) {
                if (value) {
                  tempObj[key] = "wrap";
                } else {
                  tempObj[key] = "nowrap";
                }
              } else {
                tempObj[key] = value;
              }
              break;
            case "alignItems":
              switch (value) {
                case "stretch":
                  value = {
                    "-webkit-box-align": "stretch",
                    "-ms-flex-align": "stretch",
                    "align-items": "stretch",
                  };
                  break;
                case "start":
                  value = {
                    "-webkit-box-align": "start",
                    "-ms-flex-align": "start",
                    "align-items": "flex-start",
                  };
                  break;
                case "end":
                  value = {
                    "-webkit-box-align": "end",
                    "-ms-flex-align": "end",
                    "align-items": "flex-end",
                  };
                  break;
                case "center":
                  value = {
                    "-webkit-box-align": "center",
                    "-ms-flex-align": "center",
                    "align-items": "center",
                  };
                  break;
              }
              Object.assign(tempObj, value);
              break;
            case "alignSelf":
              switch (value) {
                case "start":
                  value = {
                    "-ms-flex-item-align": "start",
                    "align-self": "flex-start",
                  };
                  break;
                case "end":
                  value = {
                    "-ms-flex-item-align": "end",
                    "align-self": "flex-end",
                  };
                  break;
                case "center":
                  value = {
                    "-ms-flex-item-align": "center",
                    "-ms-grid-row-align": "center",
                    "align-self": "center",
                  };
                  break;
                case "baseline":
                  value = {
                    "-ms-flex-item-align": "baseline",
                    "align-self": "baseline",
                  };
                  break;
                case "stretch":
                  value = {
                    "-ms-flex-item-align": "stretch",
                    "-ms-grid-row-align": "stretch",
                    "align-self": "stretch",
                  };
                  break;
              }
              Object.assign(tempObj, value);
              break;
            case "scroll":
              switch (value) {
                case "x":
                  value = {
                    overflowX: "scroll",
                    "-webkit-overflow-scrolling": "touch",
                    position: "static",
                  };
                  break;
                case "y":
                  value = {
                    overflowY: "scroll",
                    "-webkit-overflow-scrolling": "touch",
                    position: "static",
                  };
                  break;
              }
              Object.assign(tempObj, value);
              break;
            case "mask":
              if (this.mask) {
                if (isBoolean(this.mask)) {
                  value = {
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    background: "rgba(0, 0, 0, 0.4)",
                  };
                } else {
                  value = {
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    background: this.mask,
                  };
                }
              }
              Object.assign(tempObj, value);
              break;
          }
        }
      }

      // console.log(tempObj);
      return tempObj;
    },
  },
};
</script>
