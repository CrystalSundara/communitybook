<template>
  <div>
    <article v-for="(user, idx) in users" :key="idx">
      <img :src="user.image" width="300px">
      <h1>{{ user.name }}</h1>
      <button class="button is-small is-danger" @click="deleteUser(user.id)">
        Delete
      </button>
    </article>

    <hr>

    <form @submit="addUserImage(name, image)">
      <h2>Add a New User image</h2>
      <input v-model="name" placeholder="User Name" class="input">
      <input v-model="image" placeholder="User Image URL" class="input">
      <button type="submit" class="button is-success">Add New User image </button>
    </form>
  </div>
</template>

<script>
import { fstore } from '../db'

export default {
  name: 'uploadTest',
  data () {
    return {
      users: [],
      name: '',
      image: ''
    }
  },
  firestore () {
    return {
      users: fstore.collection('Users').orderBy('createdAt')
    }
  },
  methods: {
    addUserImage (name, image) {
      const createdAt = new Date()
      fstore.collection('Users').add({name, image, createdAt})
    }
  }
}
</script>
