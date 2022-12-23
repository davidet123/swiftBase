import { defineStore } from 'pinia'
import { collection, onSnapshot } from "firebase/firestore"
// the firestore instance
import db from '../firebase/init.js'

export const usegDatabaseStore = defineStore('database', {
  state: () => ({
   temp: null
  }),
  getters: {

  },
  actions: {
    cargarDb() {
      const docSnap = onSnapshot(collection(db, "test"), (doc) => {
        doc.docChanges().forEach((change) => {
          console.log(change.doc.data())
        })
      })
    }

  }

})