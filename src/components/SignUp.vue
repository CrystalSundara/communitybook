<template>
<div id="signup">

    <div id="landingbg" class="container d-flex flex-column">
        <div class="row fill justify-content-center">
            <h1 class="text-light mt-5 pt-5 mb-5 pb-5">Community Book</h1>
        </div>
        <form @submit="addUser" class="col-12 col-md-6 col-xl-4 align-self-center">
        <div class="form-group">
            <label for="email" class="text-light textshadow">Email</label>
            <input type="email" class="form-control form-control-lg" v-model="newUser.email" id="email" aria-describedby="email">
        </div>
        <div class="form-group">
            <label for="password" class="text-light textshadow">Password</label>
            <input type="password" class="form-control form-control-lg" v-model="newUser.password" id="password">
            <small id="emailHelp" class="form-text text-light text-center  textshadow">Forgot your password?</small>
        </div>
        <div class="text-center">
        <button type="submit" class="btn btn-primary mr-4">Sign up</button>
        <router-link to="/"><button type="cancel" class="btn btn-secondary">Cancel</button></router-link>
        </div>
        </form>
    </div>
</div>
</template>

<script>

import { db } from '../db'
import router from '../router'

export default {
  data () {
    return {
      newUser: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    addUser (e) {
      e.preventDefault()
      db.ref('users').push(this.newUser)
      router.push('/home')
    }
  },
  firebase: {
    users: db.ref('users')
  }
}
</script>
