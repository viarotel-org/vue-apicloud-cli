//请求配置
export const requestConfig = {
  //加密
  encrypt: {
    on: true,
    publicKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDEOeG53JMdg9f5U4VZvxt0WACJjT+RGO0SF00l8BrlyCt0U6XEDLUI/aW1Ba2mXwYO7MJYgxhecQQTBrI5YYPFhuj0D7Pr5ztMytThdcWPpLP3E3TgvBmDb5Ef6r2/jGEeaMnmAGugNjaDdTlmGQsaYapfyhjFBZXOGjvWq0viHwIDAQAB',
    iv: '09538abe79a497cf',
    toBase64: false
  },
  //请求域名
  url: 'http://goodvideo.vmall99.com/api/',
  //超时时间
  timeout: 10000
};