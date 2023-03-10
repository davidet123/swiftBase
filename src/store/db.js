import { defineStore } from 'pinia'
import { collection, onSnapshot, addDoc } from "firebase/firestore"
// the firestore instance
import db from '../firebase/init.js'




export const useDatabaseStore = defineStore('database', {
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
    },
    async addPlayer(obj) {
      await addDoc(collection(db, "test"), obj)
    },
    /* async addDatos(coleccion, payload) {
      await addDoc(collection(coleccion, payload))
    } */

  }

})