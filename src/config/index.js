//请求配置
export const requestConfig = {
  //加密
  encrypt: {
    on: false,
    publicKey: "",
    iv: "",
    toBase64: false,
  },
  //请求域名
  baseUrl: process.env.BASE_URL + "api/",
  authorization: {
    // key: "key",
    // prefix: "",
    key: "Authorization",
    prefix: "Bearer ",
  },
  //响应成功code值
  responseSuccessCode: 0,
  //超时时间
  timeout: 20000,
};

//数据字典配置
export const dictConfig = {
  //底部导航栏
  tabberArr: [
    { dictLabel: "tab-0", dictValue: "home" },
    { dictLabel: "tab-1", dictValue: "store" },
    { dictLabel: "tab-2", dictValue: "cart" },
    { dictLabel: "tab-3", dictValue: "user" },
  ],
};
