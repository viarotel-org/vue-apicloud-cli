import { request } from '@/plugins/axios.js';
import { requestConfig } from '@/config';
const obj = {
  //获取举报说明
  getIp(params) {
    return request('', {}, { isIntercept: false });
  },
};

export default {
  install(Vue) {
    Vue.prototype.$req = obj;
  },
  ...obj
};