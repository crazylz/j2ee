import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//可以不用先加载，而是最后在routers里面进行require可以加快加载速度

// 登陆、注册界面
import login from '../pages/login.vue'
import register from '../pages/register.vue'

//用户界面
import userhome from '../components/userhome.vue'
import loans from '../pages/user/loans.vue'
import newproducts from '../pages/user/newproducts.vue'
import producted from '../pages/user/producted.vue'
import repay from '../pages/user/repay.vue'
import record from '../pages/user/record.vue'
import information from '../pages/user/infromation.vue'
import credit from '../pages/user/credit.vue'
import latestcredit from '../pages/user/latestcredit.vue'

//管理员界面
import adminhome from '../components/adminhome.vue'
import users from '../pages/admin/users.vue'
import produce from '../pages/admin/produce.vue'
import operation from '../pages/admin/operation.vue'

//担保员界面
import guaranteehome from '../components/guaranteehome.vue'
import guarantee from '../pages/guarantee/guarantee.vue'
import freeze from '../pages/guarantee/freeze.vue'

//审核员界面
import reviewer from '../components/reviewerhome.vue'

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login' 
    },
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
          path:'/userhome/loans',
          component:loans
        },
        {
          path:'/userhome/newproducts',
          component:newproducts
        },
        {
          path:'/userhome/producted',
          component:producted
        },
        {
          path:'/userhome/repay',
          component:repay
        },
        {
          path:'/userhome/information',
          component:information
        },
        {
          path:'/userhome/record',
          component:record
        },
        {
          path:'/userhome/credit',
          component:credit
        },
        {
          path:'/userhome/latestcredit',
          component:latestcredit
        }
      ]
    },
    {
      path:'/adminhome',
      component:adminhome,
      children:[
        {
          path:'/adminhome/produce',
          component:produce
        },
        {
          path:'/adminhome/users',
          component:users
        },
        {
          path:'/adminhome/operation',
          component:operation
        }]
    },
    {
      path:'/guaranteehome',
      component:guaranteehome,
      children:[
        {
          path:'/guaranteehome/guarantee',
          component:guarantee
        },
        {
          path:'/guaranteehome/freeze',
          component:freeze   
        }
      ]
    },
    {
      path:'/reviewer',
      component:reviewer
    }
  ]
  })

  export default router
