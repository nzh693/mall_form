// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入element ui 
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
//导入图表
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
//导入全局样式表
import './assets/css/global.css'
//导入字体图标
import './assets/font_icons/iconfont.css'
//导入网络请求
import axios from 'axios'
Vue.prototype.$http=axios
//导入字符串解析和序列化库
import qs from 'qs'
Vue.prototype.$qs = qs;


//设置网络请求的基本路径
axios.defaults.baseURL='http://193.112.195.243:8888/api/v1/'
//网络请求拦截器 将token设置到请求头中

axios.interceptors.request.use(config=>{
  config.headers.token = window.sessionStorage.getItem('token');
  return config;//最后必须返回config
})

Vue.config.productionTip = false
Vue.use(ElementUI)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
