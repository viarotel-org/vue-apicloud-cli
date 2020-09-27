import createAPIComponent from 'vue-create-api'

export default function createAPI(Vue, Component, { isSingle = true, apiPrefix = '', componentPrefix = '$create' } = {}) {
  Vue.use(createAPIComponent);
  return Vue.createAPI(Component, isSingle);
};