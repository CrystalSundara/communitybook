<template>
  <div class="signup">
    <form @submit="addUser">
    <div class="form-group">
    <p>Let's create a new account !</p>
    <input type="text" v-model="newUser.email" placeholder="Email" />
    <br />
    <input type="password" v-model="newUser.password" placeholder="Password" />
    <br />
    <button type="submit">Sign Up</button>
    <span>
      or go back to
      <router-link to="/">login</router-link>.
    </span>
    </div>
    </form>
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

 <style scoped>
.sign-up {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 10px;
  width: 10%;
  cursor: pointer;
}
span {
  display: block;
  margin-top: 20px;
  font-size: 11px;
}
</style>
