import index from './index.vue';

export default function install(Vue, options) {
  Vue.component(index.name, index);
}