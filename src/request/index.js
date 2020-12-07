import { mapRequest } from "@/plugins/request/index.js";
import { requestConfig } from "@/config/index.js";

const requestObj = mapRequest([
  //获取模拟数据
  {
    key: "getDemoData",
    value: "",
    options: {
      method: "get",
    },
  },
]);

export default {
  install(Vue) {
    Vue.prototype.$req = requestObj;
  },
  ...requestObj,
};
