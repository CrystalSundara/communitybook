<template>
<div id="wishlist">

  <b-navbar small align="right" toggleable="lg" type="light">
    <span class="navbar-brand mb-0 h4 mx-auto">Community Book</span>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item right class="my-auto">{{currentUser}}</b-nav-item>
        <b-nav-item right v-on:click="logout"><i class="typcn typcn-power my-auto mr-1" style="font-size: 1.2rem;"></i>Sign out</b-nav-item>
        <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
      </b-navbar-nav>
    </b-collapse>

  </b-navbar>
  <hr />
  <div class="container d-flex flex-column">
    <div class="input-group input-group-sm mb-3 col-12 col-md-6" style="margin:auto;">
      <div class="input-group-prepend">
        <router-link to="/search/ "><button v-on:click="submit" class="btn-link pb-1"><i class="text-secondary typcn typcn-zoom"></i></button></router-link>
      </div>
      <input type="text" v-model="searchMsg" @keyup.enter="submit" class="form-control" placeholder="Search Community Book" aria-label="Search" aria-describedby="inputGroup-sizing-sm">
    </div>

    <div class="row my-3">
      <h5 class="text-primary ml-4">Wishlist</h5>
      <router-link to="/addBook" class="btn btn-primary btn-sm my-auto ml-auto mr-3">Add book</router-link>
    </div>

    <div class="card-deck mt-2">
        <div v-for="book in wishlistBooks" v-bind:key="book" class="col-12 col-sm-9 col-md-6 col-xl-5">
          <div class="card text-left mb-3 mr-1">
            <div class="row no-gutters">
              <div class="col-4">
                <img :src="book.downloadUrl" class="card-img" style="max-height: 150px; width: auto;" alt="...">
              </div>
              <div class="col-8">
                <div class="card-body d-flex flex-column ml-3" style="height: 150px;">
                  <h6 class="card-title">{{ book.title }}
                  <br />{{ book.edition }} edition</h6>
                  <p class="small card-subtitle mb-2 text-secondary">{{ book.author }}</p>
                  <p class="small card-subtitle text-secondary">{{ book.isbn }}</p>
                  <div class="mt-auto">
                  <a @click="removeWishlist(book)" href="#" class="card-link interactive mr-2 small"><i class="typcn typcn-minus" style="font-size: 1rem;"></i>Wishlist</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>

    <div style="margin: 0 0 80px 0;">
    </div>
    <nav class="nav nav-pills nav-justified fixed-bottom small">
      <router-link to="/home" class="nav-item nav-link" href="#"><i class="text-primary typcn typcn-home-outline" style="font-size: 1.3rem;"></i><br />Home</router-link>
      <router-link to="/search/ " class="nav-item nav-link" href="#"><i class="text-primary typcn typcn-zoom" style="font-size: 1.3rem;"></i><br />Search</router-link>
      <router-link to="/mybooks" class="nav-item nav-link" href="#"><i class="text-primary typcn typcn-book" style="font-size: 1.3rem;"></i><br />My books</router-link>
      <router-link to="/wishlist" class="nav-item nav-link active" href="#"><i class="text-primary typcn typcn-th-list" style="font-size: 1.3rem;"></i><br />Wishlist</router-link>
      <a class="nav-item nav-link" href="#"><i class="text-primary typcn typcn-messages" style="font-size: 1.3rem;"></i><br />Forum</a>
    </nav>

  </div>
</div>
</template>

<script>

import { fstore } from '../db'
import router from '../router'
import firebase from 'firebase'

export default {
  name: 'wishlist',
  data () {
    return {
      isLoggedIn: false,
      currentUser: false,
      books: []
    }
  },
  created () {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true
      this.currentUser = firebase.auth().currentUser.email
    }
  },
  firestore () {
    return {
      books: fstore.collection('Books').orderBy('timestamp', 'desc')
    }
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    },
    submit: function () {
      // this.$emit('inputData', this.searchMessage)
      // this.searchMessage = ''
      if (this.searchMsg == null) {
        this.searchMsg = ''
      }
      router.push('/search/' + this.searchMsg)
    },
    removeWishlist: function (book) {
      fstore.collection('Books').doc(book.id).update({
        listType: ''
      })
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
    }
  }
}

</script>
