import Vue from 'vue';
import VueRouter from 'vue-router';
import { isNoAttrs, setStorages, getStorages } from '../utils/index.js';

/**
 * @param {array} routes 路由表数组
 * @param {object} 路由配置
 * @returns {object} 路由实例
 */
export const createRouter = function (routes, { base = process.env.BASE_URL, mode = "hash", ...moreOptions } = {}) {
  //路由防抖
  const originalPush = VueRouter.prototype.push;
  VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
  }

  Vue.use(VueRouter);

  return new VueRouter({
    mode,
    base,
    routes,
    ...moreOptions
  })
}

/**
 * @param {string} name 要打开的路由名称
 * @param {object}  params 路由传参 默认为params传参
 * @param {object} 其他配置 isReplace是否替换当前路由 isQuery是否地址栏传参 ctx 上下文
 */
export const openView = function (name, params, { isReplace = false, isBody = false, ctx = this } = {}) {
  const way = isReplace ? 'replace' : 'push';

  params = isBody ? { params } : { query: params };

  return ctx.$router[way]({ name, ...params });
}

/**
 * @param {object} ctx 要打开的路由名称
 * @returns {object} 页面所接受的参数
 */
export const getViewParams = function (ctx = this) {
  const whitelist = ['via', 'direction']; //忽略路由管理器所用到的参数

  let tempObj = {};
  let isQuery = isNoAttrs(ctx.$route.query, ...whitelist);
  let isBody = isNoAttrs(ctx.$route.params, ...whitelist);

  if (isQuery) {
    tempObj = ctx.$route.query;
  } else if (isBody) {
    tempObj = ctx.$route.params;
    setStorages(ctx.$route.name, ctx.$route.params);
    // console.log('isBody', setStorages(ctx.$route.name));
  } else {
    tempObj = getStorages(ctx.$route.name) || {};
  }
  return tempObj;
}


export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$openView', {
      get() {
        return openView.bind(this)
      }
    })

    Object.defineProperty(Vue.prototype, '$viewParams', {
      get() {
        return getViewParams(this);
      }
    })
  }
};