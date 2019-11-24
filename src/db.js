// Get a RTDB instance
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/storage'

export const db = firebase
  // .initializeApp({ databaseURL: 'https://communitybook-1.firebaseio.com/', projectId: 'communitybook-1' })
  .initializeApp({
    apiKey: 'AIzaSyBW1B0hHk-H8gt_Hn43RdEzYJ1lCZj9PfA',
    authDomain: 'communitybook-1.firebaseapp.com',
    databaseURL: 'https://communitybook-1.firebaseio.com',
    projectId: 'communitybook-1',
    storageBucket: 'communitybook-1.appspot.com',
    messagingSenderId: '1037273801312',
    appId: '1:1037273801312:web:f6400c518e62e3f0a59905',
    measurementId: 'G-MYBJLBHNNP'
  })
  .database()

export const fstore = firebase.firestore()

export const storageRef = firebase.storage().ref()
