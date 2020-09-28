//请求配置
export const requestConfig = {
  //加密
  encrypt: {
    on: false, //是否开启加密
    publicKey: '', //公共密钥
    iv: '', //加密向量
    // toBase64: false //是否采用base64方式编译
  },
  //请求域名
  // url: process.env.BASE_URL + 'api',
  url: 'https://api.ipify.org/',
  //超时时间
  timeout: 10000
};