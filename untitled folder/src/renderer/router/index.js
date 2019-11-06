import Vue from 'vue'
import Router from 'vue-router'
import Splash from '@/pages/Splash'
import OnBoard from '@/pages/OnBoard'
import Login from '@/pages/Login'
import Home from '@/pages/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Splash',
      component: Splash
    },
    {
      path: '/on-board',
      name: 'OnBoard',
      component: OnBoard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
