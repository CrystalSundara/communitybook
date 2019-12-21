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
import firebase from 'firebase'

Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/search/:searchMsg',
      name: 'search',
      component: Search,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/addBook',
      name: 'addBook',
      component: AddBook,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/mybooks',
      name: 'mybooks',
      component: MyBooks,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: Wishlist,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Check for required Auth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NOT logged in
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // Proceed to route
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if IS logged in
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/home',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // Proceed to route
      next()
    }
  } else {
    // Proceed to route
    next()
  }
})

export default router
