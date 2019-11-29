<template>
<div id="search">

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
  <div class="container">
    <div class="input-group input-group-sm mb-3 col-12 col-md-6" style="margin:auto;">
      <div class="input-group-prepend">
        <button class="btn-link" type="submit"><i class="text-secondary typcn typcn-zoom"></i></button>
      </div>
      <input type="text" class="form-control" v-model="searchTerm" placeholder="Search Community Book" aria-label="Search" aria-describedby="inputGroup-sizing-sm">
    </div>

    <div>
      <h5 class="text-primary mt-3 ml-3">Search results</h5>
      <p class="text-secondary mb-5 ml-3">Book not listed?<router-link to="/addBook" class="interactive pl-3 py-0">Add book ></router-link></p>
    </div>

    <div class="card-deck">
        <div v-for="book in filteredBooks" v-bind:key="book" class="col-12 col-sm-9 col-md-6 col-xl-5">
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
                  <p class="small card-subtitle mb-2 text-secondary">{{ book.isbn }}</p>
                  <div class="mt-auto">
                  <a href="#" class="card-link interactive mr-2 small"><i class="typcn typcn-plus" style="font-size: 1rem;"></i>Wishlist</a>
                  <a href="#" class="card-link interactive small"><i class="typcn typcn-plus" style="font-size: 1rem;"></i>My books</a>
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
      <router-link to="/search" class="nav-item nav-link active" href="#"><i class="text-primary typcn typcn-zoom" style="font-size: 1.3rem;"></i><br />Search</router-link>
      <a class="nav-item nav-link" href="#"><i class="text-primary typcn typcn-book" style="font-size: 1.3rem;"></i><br />My books</a>
      <a class="nav-item nav-link" href="#"><i class="text-primary typcn typcn-th-list" style="font-size: 1.3rem;"></i><br />Wishlist</a>
      <a class="nav-item nav-link" href="#"><i class="text-primary typcn typcn-messages" style="font-size: 1.3rem;"></i><br />Forum</a>
    </nav>

  </div>
</div>
</template>

<script>
import { fstore } from '../db'
export default {
  name: 'search',
  props: {
    searchMsg: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      searchTerm: '',
      books: []
    }
  },
  firestore () {
    return {
      books: fstore.collection('Books')
    }
  },
  created () {
    if (this.searchMsg !== ' ') {
      this.searchTerm = this.searchMsg
    }
  },
  computed: {
    filteredBooks () {
      // return this.books.filter((book) => {
      //   return book.title.toLowerCase().match(this.search.toLowerCase())
      // })
      return this.books.filter(book => {
        let title = book.title.toLowerCase()
        let author = book.author.toLowerCase()
        let isbn = book.isbn.toLowerCase()
        let term = this.searchTerm.toLowerCase()
        return title.indexOf(term) >= 0 || author.indexOf(term) >= 0 || isbn.indexOf(term) >= 0
      })
    }
  }
}
</script>
