import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/LoginPage'
import MainPage from '@/components/MainPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/page',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/token',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/dashboard',
      name: 'MainPage',
      component: MainPage
    }
  ]
})
