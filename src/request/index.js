import { request } from '@/plugins/axios.js';
import { requestConfig } from '@/config';
const obj = {
  //获取举报说明
  getReportNote(params) {
    return request('report_suggest/instruction');
  },
  // //多个文件上传  
  // multiFileUpload(params) {
  //   return request('common/uploadsQN', params, { isUpload: true });
  // },
  // //单个文件上传
  // singleFileUpload(params) {
  //   return request('common/uploadQN', params, { isUpload: true });
  // },
  // //通用下载方法
  // downloadCommon(fileName) {
  //   window.location.href = requestConfig.url + "/common/download?fileName=" + encodeURI(fileName) + "&delete=" + true;
  // },
}

export default {
  install(Vue) {
    Vue.prototype.$req = obj;
  },
  ...obj
};