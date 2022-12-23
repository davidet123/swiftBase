import { defineStore } from 'pinia'

import { collection, onSnapshot, addDoc } from "firebase/firestore"
// the firestore instance
import db from '../firebase/init.js'


export const usegFutbolStore = defineStore('futbol', {
  state: () => ({
    local: [],
    visitante: []
  }),
  getters: {

  },
  actions: {
    cargarEquipo() {
      const docSnap = onSnapshot(collection(db, "futbol_local"), (doc) => {
        doc.docChanges().forEach((change) => {
          if (change.type === "added") {
            let jugador = change.doc.data()
            jugador.id = change.doc.id
            console.log(change.doc.id)
            this.local.push(jugador)
          }
        })
      })
    },
    

  }

})