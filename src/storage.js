// Get a firestore instance
import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
  projectId: 'communitybook-1',
  databaseURL: 'https://communitybook-1.firebaseio.com/'
})

export const fstore = firebase.firestore()
