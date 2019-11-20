<template>
<div id="landing">

    <div id="landingbg" class="container d-flex flex-column">
        <div class="row fill justify-content-center">
            <h1 class="text-light mt-5 pt-5 mb-5 pb-5">Community Book</h1>
        </div>
        <div class="justify-content-center">
        <div class="row justify-content-center">
            <router-link to="/signin"><button class="btn btn-primary mb-3">Sign-in</button></router-link>
        </div>
        <div class="row justify-content-center">
            <router-link to="/home"><button class="btn btn-primary mb-3">Sign-up</button></router-link>
        </div>
        <div class="row justify-content-center">
            <router-link to="/home"><button class="btn btn-primary mb-3">Continue as guest</button></router-link>
        </div>
        </div>
    </div>
</div>
</template>

<script>
import { db } from '../db'

export default {
  name: 'landing',
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
