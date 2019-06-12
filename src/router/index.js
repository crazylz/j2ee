import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//可以不用先加载，而是最后在routers里面进行require可以加快加载速度

// 登陆、注册界面
import login from '../pages/login.vue'
import register from '../pages/register.vue'

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

//管理员界面
import adminhome from '../pages/admin/adminhome.vue'

//担保员界面
import guaranteehome from '../pages/guarantee/guarantee..vue'

const router = new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path:'/register',
      component:register
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
    },
    {
      path:'/adminhome',
      component:adminhome
    },
    {
      path:'/guaranteehome',
      component:guaranteehome
    }
  ]
  })

  export default router
