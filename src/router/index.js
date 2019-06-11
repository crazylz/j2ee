import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 登陆、注册界面
import login from '../pages/login.vue'
import registe from '../pages/registe.vue'

//用户界面
import userhome from '../components/userhome.vue'
import existingloans from '../pages/user/existingloans.vue'
import existingproducts from '../pages/user/existingproducts.vue'
import invest from '../pages/user/invest.vue'
import newloans from '../pages/user/newloans.vue'
import newproducts from '../pages/user/newproducts.vue'
import persondata from '../pages/user/persondata.vue'
import repay from '../pages/user/repay.vue'
import withdraw from '../pages/user/withdraw.vue'

const router = new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path:'/registe',
      component:registe
    },
    {
      path:'/userhome',
      component:userhome,
      children:[
        {
          path:'/userhome/persondata',
          component:persondata
        },
        {
          path:'/userhome/existingloans',
          component:existingloans
        },
        {
          path:'/userhome/newloans',
          component:newloans
        },
        {
          path:'/userhome/existingproducts',
          component:existingproducts
        },
        {
          path:'/userhome/newproducts',
          component:newproducts
        },
        {
          path:'/userhome/withdraw',
          component:withdraw
        },
        {
          path:'/userhome/invest',
          component:invest
        },
        {
          path:'/userhome/repay',
          component:repay
        }
      ]
    }
  ]
  })

  export default router
