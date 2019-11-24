import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Search from '@/components/Search'
import Landing from '@/components/Landing'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import UploadTest from '@/components/UploadTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/uploadTest',
      name: 'uploadTest',
      component: UploadTest
    }
  ]
})
