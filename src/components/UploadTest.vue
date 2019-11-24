<template>
  <div id="uploadTest">
    <h1>Vue Firebase Image Upload</h1>
    <div class="containrer">
      <div class="row col-xs-12 col-sm-8 col-md-4">
        <img :src="imageUrl" height="150" v-if="imageUrl">
        <label for="upload" class="text-light textshadow">Upload</label>
        <input type="file" v-bind="imageName" id="profilePhoto" @change="onFilePicked">
        <!-- <v-text-field
          label="Select Image"
          @click="pickFile"
          v-model="imageName"
          prepend-icon="attach_file"
        ></v-text-field> -->
        <!-- <input
          type="file"
          style="display: none"
          ref="image"
          accept="image/*"
          @change="onFilePicked"
        > -->

        <button class="btn btn-primary" @click="upload">Upload</button>

      </div>
      <div class="row col-xs-12 col-sm-8 col-md-4">
        <div v-for="i in imgUrls" v-bind:key="i">
          <br>
          <img :src="i.downloadUrl" height="150">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fstore, storageRef } from '../db'

export default {
  name: 'uploadTest',
  data () {
    return {
      photo: null,
      photo_url: null,
      dialog: false,
      imageName: '',
      imageUrl: '',
      imageFile: '',
      // image_src: require("imageUrl"),
      imgUrls: []
    }
  },
  created () {
    this.getImages()
    // const bucketName = "image-upload-62ed7.appspot.com";
    /*
    var docRef = db.collection("images");
    var imgUrls = [];
    docRef
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          console.log(doc.data().downloadUrl);
          // this.imgUrls.push("doc.data().downloadUrl");
          // this.imgUrls.push("doc.data().downloadUrl");
          // var imgUrls = [];
          imgUrls.push(doc.data().downloadUrl);
          console.log(imgUrls);
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    // console.log(imgUrls);
    */
  },
  methods: {
    getImages: function () {
      fstore.collection('Users')
        .get()
        .then(snap => {
          const array = []
          snap.forEach(doc => {
            array.push(doc.data())
          })
          this.imgUrls = array
        })

      this.imageName = ''
      this.imageFile = ''
      this.imageUrl = ''
    },

    // pickFile () {
    //   this.$refs.image.click()
    // },

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

    // 画像アップロード処理
    upload: function () {
      // var me = this
      /*
      const timestamp = snapshot.get('created_at')
      const date = timestamp.toDate()
      const fsTimestamp =
        '' +
        date.getFullYear() +
        ('0' + date.getMonth() + 1).slice(-2) +
        ('0' + date.getDate()).slice(-2) +
        ('0' + date.getHours()).slice(-2) +
        ('0' + date.getMinutes()).slice(-2) +
        ('0' + date.getSeconds()).slice(-2)
*/
      // ストレージオブジェクト作成
      // var storageRef = firebase.storage().ref()
      // ファイルのパスを設定
      var mountainsRef = storageRef.child(`users/${this.imageName}`)
      // ファイルを適用してファイルアップロード開始
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
            timestamp: Date.now()
          })
          this.getImages()
        })
      })
      // this.getImages()
    }
  },
  components: {}
}
</script>
