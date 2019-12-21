<template>
<div id="addBook">

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
        <form @submit="upload" class="col-12 col-md-6 col-xl-4 align-self-center">
        <div>
        <h5 class="text-primary mt-3 mb-5">Add book details</h5>
        </div>
        <div class="form-group">
            <label for="bookPhoto" class="text-primary">Upload photo</label>
            <input type="file" class="form-control-file text-secondary" v-bind="imageName" id="bookPhoto" @change="onFilePicked">
        </div>
        <div class="form-group">
            <label for="title" class="text-primary">Title</label>
            <input type="text" class="form-control form-control-lg" v-model="newBook.title" id="title" aria-describedby="title">
        </div>
        <div class="form-group">
            <label for="author" class="text-primary">Author(s)</label>
            <input type="text" class="form-control form-control-lg" v-model="newBook.author" id="author">
        </div>
        <div class="form-group">
            <label for="edition" class="text-primary">Edition</label>
            <input type="text" class="form-control form-control-lg w-25" v-model="newBook.edition" id="edition">
        </div>
        <div class="form-group">
            <label for="isbn" class="text-primary">ISBN</label>
            <input type="text" class="form-control form-control-lg w-75" v-model="newBook.isbn" id="isbn">
        </div>
        <div class="form-group">
          <label for="subject" class="text-primary">Subject</label>
           <select class="form-control w-50" v-model="newBook.subject" id="subject">
            <option>Accounting</option>
            <option>Anthropology</option>
            <option>Computer Science</option>
            <option>Data Science</option>
            <option>Information Technology</option>
            <option>Psychology</option>
            <option>Other - not listed</option>
          </select>
        </div>
        <div class="form-group">
            <div class="form-check">
                <input class="form-check-input" type="radio" v-model="newBook.listType" id="wishlistRadio" value="Wishlist">
                <label class="form-check-label text-primary" for="wishlistRadio">
                    Add to wishlist
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" v-model="newBook.listType" id="myBooksRadio" value="MyBooks">
                <label class="form-check-label text-primary" for="myBooksRadio">
                    Add to my books
                </label>
            </div>
            <div class="my-4">
        </div>
        <button type="submit" class="btn btn-primary mr-4">Submit</button>
        <router-link to="/search/ "><button type="cancel" class="btn btn-secondary">Cancel</button></router-link>
        </div>
        </form>

        <div style="margin: 0 0 80px 0;">
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

import { fstore, storageRef } from '../db'
import router from '../router'
import firebase from 'firebase'

export default {
  name: 'addBook',
  data () {
    return {
      isLoggedIn: false,
      currentUser: false,
      photo: null,
      photo_url: null,
      dialog: false,
      imageName: '',
      imageUrl: '',
      imageFile: '',
      imgUrls: [],
      newBook: {
        bookPhotoUrl: '',
        title: '',
        author: '',
        edition: '',
        isbn: '',
        subject: '',
        listType: ''
      }
    }
  },
  created () {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true
      this.currentUser = firebase.auth().currentUser.email
    }
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    },
    onFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.imageName = files[0].name
        if (this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          // console.log('imageUrl')
          this.imageFile = files[0] // this is an image file that can be sent to server...
          // this.getImages()
        })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    },
    upload: function () {
      var mountainsRef = storageRef.child(`books/${this.imageName}`)
      var title = this.newBook.title
      var author = this.newBook.author
      var edition = this.newBook.edition
      var isbn = this.newBook.isbn
      var subject = this.newBook.subject
      var listType = this.newBook.listType
      mountainsRef.put(this.imageFile).then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
          this.imageUrl = downloadURL
          const bucketName = 'communitybook-1.appspot.com'
          const filePath = this.imageName
          fstore.collection('Books').add({
            downloadURL,
            downloadUrl:
              `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/books` +
              '%2F' +
              `${encodeURIComponent(filePath)}?alt=media&token=`,
            title,
            author,
            edition,
            isbn,
            subject,
            listType,
            timestamp: Date.now()
          })
        })
      })
      router.push('/search/ ')
    }
  }
}

</script>
