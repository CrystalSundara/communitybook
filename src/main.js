// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { rtdbPlugin as VueFire, firestorePlugin } from 'vuefire'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../css/bootstrap-themed.css'
import 'firebase/firestore'
import firebase from 'firebase'
import './db.js'

Vue.use(firestorePlugin)

Vue.use(BootstrapVue)
Vue.use(VueFire)

Vue.config.productionTip = false

let app
firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
})
