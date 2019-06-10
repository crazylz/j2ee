import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 登陆界面
import login from '../pages/login.vue'

const router = new Router({
  routes: [
    {
      path: '/login',
      component: login
    }]
  })

  export default router
