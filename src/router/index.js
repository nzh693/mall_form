import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import shopManagement from '@/components/shopManagement'
import shopDetail from '@/components/shopDetail'

import rentUserManagement from '@/components/rentUserManagement'
import operatorManagement from '@/components/operatorManagement'
import assistantManagement from '@/components/assistantManagement'

import checkManagement from '@/components/checkManagement'

import othersManagement from '@/components/othersManagement'
import menuManagement from '@/components/menuManagement'
import acountManagement from '@/components/acountManagement'

import contractManagement from '@/components/contractManagement'
import contractDetail from '@/components/contractDetail'

import rentManagement from '@/components/rentManagement'
import shopRunManagement from '@/components/shopRunManagement'
import mallRunManagement from '@/components/mallRunManagement'
import welcome from '@/components/welcome'


Vue.use(Router)
const router = new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/login', component: Login },

    {
      path: '/home',
      component: Home,
      redirect:'/welcome',
      children: [
        { path: '/welcome', component: welcome },//店员管理
        { path: '/shop', component: shopManagement },//商铺管理
        { path: '/shopDetail', component: shopDetail },//店员管理

        { path: '/rentUserManage', component: rentUserManagement },//租赁户管理
        { path: '/operatorManage', component: operatorManagement },//职运营理
        { path: '/assistantManage', component: assistantManagement },//店员管理

        { path: '/shopRunManage', component: shopRunManagement },//商铺运营管理
        { path: '/mallRunManage', component: mallRunManagement },//商场运营管理

        { path: '/rent', component: rentManagement },//招租管理

        { path: '/check', component: checkManagement },//审核管理

        { path: '/others', component: othersManagement },//其他管理
        { path: '/menuManage', component: menuManagement },//菜单管理
        { path: '/acountManage', component: acountManagement },//账户管理



        { path: '/contract', component: contractManagement },//合同管理
        { path: '/contractdetail', component: contractDetail },//合同管理


        

      ]
    },


  ]
})

//路由导航守卫
//to:将要访问的路径   from：来自哪个路径   next() 放行  next('url') 强制跳转

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  const token = window.sessionStorage.getItem('token');
  if (!token) return next('/login');
  next();
})


export default router


