import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Search from '@/components/Search'
import Landing from '@/components/Landing'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import AddBook from '@/components/AddBook'
import MyBooks from '@/components/MyBooks'
import Wishlist from '@/components/Wishlist'

Vue.use(VueRouter)

export default new VueRouter({
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
      path: '/search/:searchMsg',
      name: 'search',
      component: Search,
      props: true
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
      path: '/addBook',
      name: 'addBook',
      component: AddBook
    },
    {
      path: '/mybooks',
      name: 'mybooks',
      component: MyBooks
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: Wishlist
    }
  ]
})
