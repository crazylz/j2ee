// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs' //跨域加密
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'  //element-ui的默认背景色

Vue.config.productionTip = false

Vue.use(ElementUI)
//axios.defaults.baseURL = 'http://localhost:5000/api/'; //请求基地址
axios.defaults.withCredentials = true //使跨域session请求统一
Vue.prototype.$ajax = axios;  //配置axios依赖发起ajax请求
Vue.prototype.$qs = qs;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})