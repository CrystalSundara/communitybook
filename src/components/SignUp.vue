<template>
<div id="signup">

    <div id="landingbg" class="container d-flex flex-column">
        <div class="row fill justify-content-center">
            <h1 class="text-light mt-5 pt-5 mb-5 pb-5">Community Book</h1>
        </div>
        <form @submit="register" class="col-12 col-md-6 col-xl-4 align-self-center">
        <div class="form-group">
            <label for="profilePhoto" class="text-light textshadow">Upload photo</label>
            <input type="file" class="form-control-file text-light" v-bind="imageName" id="profilePhoto" @change="onFilePicked">
        </div>
        <div class="form-group">
            <label for="email" class="text-light textshadow">Email</label>
            <input type="email" class="form-control form-control-lg" v-model="newUser.email" id="email" aria-describedby="email">
        </div>
        <div class="form-group">
            <label for="password" class="text-light textshadow">Password</label>
            <input type="password" class="form-control form-control-lg" v-model="newUser.password" id="password">
        </div>
        <div class="form-group">
            <label for="fullName" class="text-light textshadow">Full name</label>
            <input type="text" class="form-control form-control-lg" v-model="newUser.fullName" id="fullName">
        </div>
        <div class="form-group">
          <label for="schoolName" class="text-light textshadow">School name</label>
           <select class="form-control" v-model="newUser.schoolName" id="schoolName">
            <option>UNC Charlotte</option>
            <option>UNC Chapel Hill</option>
            <option>Columbia</option>
            <option>Stanford</option>
            <option>Harvard</option>
          </select>
        </div>
        <div class="form-group">
          <label for="gradeLevel" class="text-light textshadow">Grade level</label>
           <select class="form-control" v-model="newUser.gradeLevel" id="gradeLevel">
            <option>Freshman</option>
            <option>Sophomore</option>
            <option>Junior</option>
            <option>Senior</option>
            <option>Grad student</option>
          </select>
        </div>
        <div class="form-group">
          <label for="fieldOfStudy" class="text-light textshadow">Field of study</label>
           <select class="form-control" v-model="newUser.fieldOfStudy" id="fieldOfStudy">
            <option>Accounting</option>
            <option>Anthropology</option>
            <option>Computer Science</option>
            <option>Information Technology</option>
            <option>Psychology</option>
          </select>
        </div>
        <div class="mb-5">
        <button type="next" class="btn btn-primary mr-4">Sign up</button>
        <router-link to="/"><button type="cancel" class="btn btn-secondary">Cancel</button></router-link>
        </div>
        </form>
    </div>
</div>
</template>

<script>

import { fstore, storageRef } from '../db'
import firebase from 'firebase'
import router from '../router'

export default {
  name: 'signUp',
  data () {
    return {
      photo: null,
      photo_url: null,
      dialog: false,
      imageName: '',
      imageUrl: '',
      imageFile: '',
      imgUrls: [],
      newUser: {
        profilePhotoUrl: '',
        email: '',
        password: '',
        fullName: '',
        schoolName: '',
        gradeLevel: '',
        fieldOfStudy: ''
      }
    }
  },
  methods: {
    register: function (e) {
      firebase.auth().createUserWithEmailAndPassword(this.newUser.email, this.newUser.password)
        .then(user => {
          alert(`Account created for ${user.email}`)
          var mountainsRef = storageRef.child(`users/${this.imageName}`)
          var email = this.newUser.email
          var fullName = this.newUser.fullName
          var schoolName = this.newUser.schoolName
          var gradeLevel = this.newUser.gradeLevel
          var fieldOfStudy = this.newUser.fieldOfStudy
          mountainsRef.put(this.imageFile).then(snapshot => {
            snapshot.ref.getDownloadURL().then(downloadURL => {
              this.imageUrl = downloadURL
              const bucketName = 'communitybook-1.appspot.com'
              const filePath = this.imageName
              fstore.collection('Users').add({
                downloadURL,
                downloadUrl:
                  `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/users` +
                  '%2F' +
                  `${encodeURIComponent(filePath)}?alt=media&token=`,
                email,
                fullName,
                schoolName,
                gradeLevel,
                fieldOfStudy,
                timestamp: Date.now()
              })
            })
          })
          this.$router.push('/home')
        },
        err => {
          alert(err.message)
        })
      e.preventDefault()
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
      var mountainsRef = storageRef.child(`users/${this.imageName}`)
      var email = this.newUser.email
      var password = this.newUser.password
      var fullName = this.newUser.fullName
      var schoolName = this.newUser.schoolName
      var gradeLevel = this.newUser.gradeLevel
      var fieldOfStudy = this.newUser.fieldOfStudy
      mountainsRef.put(this.imageFile).then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
          this.imageUrl = downloadURL
          const bucketName = 'communitybook-1.appspot.com'
          const filePath = this.imageName
          fstore.collection('Users').add({
            downloadURL,
            downloadUrl:
              `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/users` +
              '%2F' +
              `${encodeURIComponent(filePath)}?alt=media&token=`,
            email,
            password,
            fullName,
            schoolName,
            gradeLevel,
            fieldOfStudy,
            timestamp: Date.now()
          })
        })
      })
      router.push('/home')
    }
  //   addUser (e) {
  //     e.preventDefault()
  //     db.ref('users').push(this.newUser)
  //     router.push('/home')
  //   }
  // },
  // firebase: {
  //   users: db.ref('users')
  // }
  }
}

</script>
