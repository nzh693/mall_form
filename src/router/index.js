import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import welcome from '@/components/welcome'
import news from '@/components/news'
import grada from '@/components/grada'
import about from '@/components/about'
import community from '@/components/community'
import dynamics from '@/components/dynamics'
import registerFor from '@/components/registerFor'
import web from '@/components/web'
import step_1 from '@/components/step_1'
import step_2 from '@/components/step_2'
import step_3 from '@/components/step_3'
import step_4 from '@/components/step_4'

Vue.use(Router)
const router = new Router({
  mode: 'history', // 去掉url中的#
  routes: [
    {
      path: "/",
      redirect: '/home',
      component: web,
      children: [
        {
          path: '/home',
          component: Home,
          redirect: '/welcome',
          children: [
            { path: '/welcome', component: welcome },//首页
            { path: '/area_news', component: news },//赛区新闻
            { path: '/dynamic', component: dynamics },//赛区动态
            { path: '/grada_review', component: grada },//往屆回顾
            { path: '/about', component: about },//关于大赛
            { path: '/community', component: community },//大赛社区
          ]
        },
        { path: '/registfor',
          component: registerFor,
          redirect: '/step1',
          children:[
          {path:"/step1",component: step_1},//报名步骤1
          {path:"/step2",component: step_2},//报名步骤2     
          {path:"/step3",component: step_3}, //报名步骤3  
          {path:"/step4",component: step_4} //报名步骤4  

        ] 
        }//报名参赛
      ]

    },



  ]
})

//路由导航守卫
//to:将要访问的路径   from：来自哪个路径   next() 放行  next('url') 强制跳转

// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next();
//   const token = window.sessionStorage.getItem('token');
//   if (!token) return next('/login');
//   next();
// })


export default router


