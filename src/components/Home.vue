<template>
<div id="home">

  <nav class="navbar navbar-light">
      <button class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>
      <a href="#" style="margin:auto; text-align:center; padding: 10px 0 0 0;"><h4>Community Book</h4></a>
  </nav>
  <hr />
  <div class="container d-flex flex-column">
    <div class="input-group input-group-sm mb-3 col-12 col-md-6" style="margin:auto;">
      <div class="input-group-prepend">
        <router-link to="/search/ "><button v-on:click="submit" class="btn-link pb-1"><i class="text-secondary typcn typcn-zoom"></i></button></router-link>
      </div>
      <input type="text" v-model="searchMsg" @keyup.enter="submit" class="form-control" placeholder="Search Community Book" aria-label="Search" aria-describedby="inputGroup-sizing-sm">
    </div>

    <div>
      <h6 class="interactive">Wishlist books available</h6>
    </div>

      <div class="row">
        <div v-for="book in wishlistBooks" v-bind:key="book" class="col-6 col-md-4">
          <div class="card-deck">
            <div class="card mb-3">
              <div class="card-header text-center">
                <img class="card-img-top" :src="book.downloadUrl" style="max-height: 150px; width: auto; margin: auto;" alt="Card image cap">
              </div>
              <div class="card-body">
                <h6 class="card-title">{{ book.title }}</h6>
                <h6 class="small card-subtitle mb-2 text-secondary">{{ book.edition }} edition</h6>
                <h6 class="small card-subtitle mb-2 text-secondary">{{ book.author }}</h6>
                <p class="small card-text text-right"><small class="text-muted">added {{ timeSince(book.timestamp) }} ago</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>

    <div>
      <h6 class="text-primary mt-4">Computer Science books</h6>
    </div>

      <div class="row">
        <div v-for="book in subjectBooks" v-bind:key="book" class="col-6 col-md-4">
          <div class="card-deck">
            <div class="card mb-3">
              <div class="card-header text-center">
                <img class="card-img-top" :src="book.downloadUrl" style="max-height: 150px; width: auto; margin: auto;" alt="Card image cap">
              </div>
              <div class="card-body">
                <h6 class="card-title">{{ book.title }}</h6>
                <h6 class="small card-subtitle mb-2 text-secondary">{{ book.edition }} edition</h6>
                <h6 class="small card-subtitle mb-2 text-secondary">{{ book.author }}</h6>
                <p class="small card-text text-right"><small class="text-muted">added {{ timeSince(book.timestamp) }} ago</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>

    <!-- <router-link to="/" class="mt-5">Go back to landing page</router-link> -->
    <div class="mt-5" style="margin: 0 0 80px 0;">
    </div>
    <nav class="nav nav-pills nav-justified fixed-bottom small">
      <router-link to="/home" class="nav-item nav-link active" href="#"><i class="text-primary typcn typcn-home-outline" style="font-size: 1.3rem;"></i><br />Home</router-link>
      <router-link to="/search/ " class="nav-item nav-link" href="#"><i class="text-primary typcn typcn-zoom" style="font-size: 1.3rem;"></i><br />Search</router-link>
      <router-link to="/mybooks" class="nav-item nav-link" href="#"><i class="text-primary typcn typcn-book" style="font-size: 1.3rem;"></i><br />My books</router-link>
      <router-link to="/wishlist" class="nav-item nav-link" href="#"><i class="text-primary typcn typcn-th-list" style="font-size: 1.3rem;"></i><br />Wishlist</router-link>
      <a class="nav-item nav-link" href="#"><i class="text-primary typcn typcn-messages" style="font-size: 1.3rem;"></i><br />Forum</a>
    </nav>

  </div>
</div>
</template>

<script>

import { fstore } from '../db'
import router from '../router'

export default {
  name: 'home',
  data () {
    return {
      books: []
    }
  },
  firestore () {
    return {
      books: fstore.collection('Books').orderBy('timestamp', 'desc')
    }
  },
  methods: {
    submit: function () {
      // this.$emit('inputData', this.searchMessage)
      // this.searchMessage = ''
      if (this.searchMsg == null) {
        this.searchMsg = ''
      }
      router.push('/search/' + this.searchMsg)
    },
    timeSince: function (ts) {
      var now = new Date()
      var timeStamp = new Date(ts)
      var secondsPast = (now.getTime() - timeStamp.getTime()) / 1000

      if (secondsPast < 60) {
        return parseInt(secondsPast) + ' secs'
      }
      if (secondsPast < 3600) {
        return parseInt(secondsPast / 60) + ' mins'
      }
      if (secondsPast <= 86400) {
        return parseInt(secondsPast / 3600) + ' hours'
      }
      if (secondsPast > 86400) {
        return parseInt(secondsPast / 86400) + ' days'
      }
    }
  },
  computed: {
    wishlistBooks () {
      // return this.books.filter((book) => {
      //   return book.title.toLowerCase().match(this.search.toLowerCase())
      // })
      return this.books.filter(book => {
        let listType = book.listType.toLowerCase()
        let matchTerm = 'Wishlist'.toLowerCase()
        return listType.indexOf(matchTerm) >= 0
      })
    },
    subjectBooks () {
      // return this.books.filter((book) => {
      //   return book.title.toLowerCase().match(this.search.toLowerCase())
      // })
      return this.books.filter(book => {
        let subject = book.subject.toLowerCase()
        let subjectTerm = 'Computer Science'.toLowerCase()
        return subject.indexOf(subjectTerm) >= 0
      })
    }
  }
}

</script>
