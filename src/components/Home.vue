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
        <button class="btn-link" type="submit"><i class="text-secondary typcn typcn-zoom"></i></button>
      </div>
      <input type="text" class="form-control" placeholder="Search Community Book" aria-label="Search" aria-describedby="inputGroup-sizing-sm">
    </div>

    <div>
      <h6 class="interactive">Wishlist books available</h6>
    </div>

    <div class="card-deck">
      <!-- <div class="row"> -->
        <div v-for="book in books" v-bind:key="book" class="col-6 col-md-4">
          <div class="card mb-3">
          <div class="card-header text-center">
            <img class="card-img-top" :src="book.downloadUrl" style="max-height: 150px; width: auto; margin: auto;" alt="Card image cap">
          </div>
          <div class="card-body">
            <h6 class="card-title">{{ book.title }}</h6>
            <h6 class="small card-subtitle mb-2 text-secondary">{{ book.edition }} edition</h6>
            <h6 class="small card-subtitle mb-2 text-secondary">{{ book.author }}</h6>
            <p class="small card-text text-right"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
          </div>
        <!-- </div> -->

      </div>
    </div>

    <div class="card-deck">
      <!-- <div class="row"> -->
        <div v-for="book in books" v-bind:key="book" class="col-12 col-sm-9 col-md-6 col-xl-4">
          <div class="card text-left mb-3">
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
                  <a href="#" class="card-link interactive small"><i class="typcn typcn-plus" style="font-size: 1rem;"></i>Wishlist</a>
                  <a href="#" class="card-link text-right interactive small"><i class="typcn typcn-plus" style="font-size: 1rem;"></i>My books</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      <!-- </div> -->
    </div>

    <router-link to="/">Landing page</router-link>
    <div style="margin: 0 0 80px 0;">
    </div>
    <nav class="nav nav-pills nav-justified fixed-bottom small">
      <router-link to="/home" class="nav-item nav-link active" href="#"><i class="text-primary typcn typcn-home-outline" style="font-size: 1.3rem;"></i><br />Home</router-link>
      <router-link to="/search" class="nav-item nav-link" href="#"><i class="text-primary typcn typcn-zoom" style="font-size: 1.3rem;"></i><br />Search</router-link>
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
  name: 'home',
  data () {
    return {
      books: []
    }
  },
  firestore () {
    return {
      books: fstore.collection('Books')
    }
  }
}

</script>
