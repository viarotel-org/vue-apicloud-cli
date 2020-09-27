import Vue from 'vue';
import Vuetify, { VLayout, VDialog } from 'vuetify/lib';
import zhHans from 'vuetify/es5/locale/zh-Hans';
import '@mdi/font/css/materialdesignicons.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import VuetifyDialog from 'vuetify-dialog';
import 'vuetify-dialog/dist/vuetify-dialog.css';


Vue.use(Vuetify, {
  components: {
    VLayout,
  },
});

const vuetify = new Vuetify({
  theme: {
    dark: false,
  },
  lang: {
    locales: { zhHans },
    current: 'zhHans',
  },
});


Vue.use(VuetifyDialog, {
  context: {
    vuetify,
  },
  //confirm > warning error
  confirm: {
    actions: {
      false: '取消',
      true: {
        text: '确定',
        color: 'primary'
      }
    },
    actionOptions: {
      flat: true
    },
  },
  //withLoading
  loading: {
    // color: '',
    // text: '',
    // dark: false
  },
  //message > info error success warning
  toast: {
    position: 'top-right',
    timeout: 2000,
    // flat: true
  },
  //notify > info error success warning
  notification: {
    position: 'top-right',
    timeout: 2000,
    flat: false,
  },
});

export default vuetify;
