import axios from 'axios';
import apicloudAdapter from 'axios-apicloud-adapter';
import { requestConfig } from '@/config';
import { rsa, aes, getKey } from '@/plugins/encrypt.js';
import { isArray, isObject, isAttrs, debounce } from '@/utils/index.js';
import { loading, toast } from '@/plugins/modal/index.js';
import { getStorages, removeStorages } from '@/plugins/storages.js';

axios.defaults.adapter = apicloudAdapter; //apicloud 适配器
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

const service = axios.create({
  baseURL: requestConfig.url,
  timeout: requestConfig.timeout
});

const statusCode = {
  '200': '服务器成功返回请求的数据。',
  '201': '新建或修改数据成功。',
  '202': '一个请求已经进入后台排队（异步任务）。',
  '204': '删除数据成功。',
  '400': '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  '401': '认证失败，无法访问系统资源',
  '403': '请重新登录',
  '404': '访问资源不存在',
  '406': '请求的格式不可得。',
  '410': '请求的资源被永久删除，且不会再得到的。',
  '422': '当创建一个对象时，发生一个验证错误。',
  '500': '服务器发生错误，请检查服务器。',
  '502': '网关错误。',
  '503': '服务不可用，服务器暂时过载或维护。',
  '504': '网关超时。',
  'default': '系统未知错误，请反馈给管理员'
};


// 请求拦截
service.interceptors.request.use(request => {
  console.log('请求拦截request:', request);

  const { isToken, isUpload, isLoading } = request;
  if (isToken) {
    request.headers['Authorization'] = 'Bearer ' + getStorages('token');
  }

  if (isLoading) {
    loading('请稍后...');
  }

  if (isUpload) {
    request.headers['Content-Type'] = 'multipart/form-data;';
    request.data = fileToFormData(request.data);

    function fileToFormData(fileObj) {
      if (!isObject(fileObj)) {
        return new Error('传入的文件不是对象格式');
      }
      const key = Object.keys(fileObj)[0];
      const value = fileObj[key];
      if (!value) {
        return new Error('传入的文件对象值键名所对应的值不能为空');
      }
      const formData = new FormData();
      if (isArray(value)) {
        value.forEach(file => {
          formData.append(key, file);
        })
      } else {
        formData.append(key, value);
      }
      return formData;
    }
  }

  return request;

}, error => {

  console.log(error);
  Promise.reject(error);

});

let clearLoading = debounce(() => {
  loading();
}, 500); //定时器

// 响应拦截
service.interceptors.response.use(async response => {
  console.log('响应拦截response:', response);

  const { data, config: { encryptObj, isLoading, isIntercept } } = response;
  const { code } = data;

  if (isLoading) {
    clearLoading();
  }
  
  if (!isIntercept) {
    return data;
  }

  const message = statusCode[code] || data.msg || statusCode['default'];

  switch (code) {
    case 401:
      removeStorages('token');
      await toast(message);
      break;
    case 403:
      removeStorages('token');
      await toast(message);
      break;
    case 500:
      toast(message);
      break;

    default:
      if (code === 0 || code === 200) {
        if (encryptObj.on) {
          data.data = aes.decrypt(encryptObj.key, data.data);
        }
        return data;
      } else {
        return Promise.reject('error')
      }
      break;
  }
},
  error => {
    console.log('err:' + error)
    return Promise.reject(error)
  }
);

/**
 * 
 * @param {string} url 
 * @param {object} params 
 * @param {object} options isBody 是否body方式传参 isEncrypt 是否加密 isToken 是否传token isLoading是否显示loading  isIntercept是否自动控制状态 moreOptions更多选项
 */
export const request = (url, params = {}, { method = 'get', isBody = false, isEncrypt = requestConfig.encrypt.on, isToken = true, isLoading = true, isIntercept = true, isUpload = false, ...moreOptions } = {}) => {

  if (isUpload) {
    isBody = true;
    method = 'post';
    isEncrypt = false;
  };

  const way = isBody ? 'data' : 'params';

  let data = formatData(params, way);
  function formatData(params, way) {
    let tempObj = {
      data: {},
      params: {}
    };
    if (isAttrs(params, 'body')) {
      tempObj.data = params.body;
    }
    if (isAttrs(params, 'query')) {
      tempObj.params = params.query;
    }

    if (!isAttrs(params, 'body', 'query')) {
      tempObj[way] = params;
    }
    return tempObj;
  }

  let encryptObj = {
    on: isEncrypt,
    key: ""
  };
  if (isEncrypt) {
    const encryptDataObj = encryptData(data[way]);
    function encryptData(params) {
      const key = getKey(); //生成随机key
      const _rsa = rsa.encrypt(key); //生成对key 进行加密
      const _cipher = aes.encrypt(key, params); //对传入的参数进行加密
      return {
        data: {
          _rsa,
          _cipher
        },
        key
      }
    }
    encryptObj.key = encryptDataObj.key;

    data[way] = encryptDataObj.data;
  }

  return service({
    url,
    method,
    ...data,

    encryptObj,
    isToken,
    isLoading,
    isIntercept,
    isUpload,
    ...moreOptions
  });
};

export default {
  install(Vue) {
    Vue.prototype.$req = request;
  },
  request
};