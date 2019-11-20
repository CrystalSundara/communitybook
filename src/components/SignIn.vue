<template>
<div id="signin">

    <div id="landingbg" class="container d-flex flex-column">
        <div class="row fill justify-content-center">
            <h1 class="text-light mt-5 pt-5 mb-5 pb-5">Community Book</h1>
        </div>
        <form class="col-12 col-md-6 col-xl-4 align-self-center">
        <div class="form-group">
            <label for="email" class="text-light textshadow">Email</label>
            <input type="email" class="form-control form-control-lg" id="email" aria-describedby="email">
        </div>
        <div class="form-group">
            <label for="password" class="text-light textshadow">Password</label>
            <input type="password" class="form-control form-control-lg" id="password">
            <small id="emailHelp" class="form-text text-light text-center textshadow">Forgot your password?</small>
        </div>
        <div class="text-center">
        <button type="signin" class="btn btn-primary mr-4">Sign in</button>
        <router-link to="/"><button type="cancel" class="btn btn-secondary">Cancel</button></router-link>
        </div>
        </form>
    </div>
</div>
</template>

<script>
import { db } from '../db'

export default {
  name: 'signin',
  data () {
    return {
      book: []
    }
  },
  firebase: {
    book: db.ref('book')
  }
}

</script>
