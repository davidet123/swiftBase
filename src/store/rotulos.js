import { onSnapshot, collection } from "firebase/firestore"
import db from '../firebase/init.js'
import { defineStore } from "pinia"

export const useRotulosStore = defineStore('rotulosStore', {
  state: () => ({
    rotulos: []
  }),
  getters: {

  },
  actions: {

    async cargarRotulos () {
      this.rotulos = []

      const docSnap = onSnapshot(collection(db, 'rotulos'), doc => {
        doc.docChanges().forEach((change) => {
          if (change.type === "added") {
            let rotulo = change.doc.data()
            rotulo.id_rotulo = change.doc.id
            this.rotulos.push(rotulo)
          } else if (change.type === "modified") {
            let nuevo_rotulo = change.doc.data()
            nuevo_rotulo.id_rotulo = change.doc.id
            this.actualizarRotulos(nuevo_rotulo)
            console.log("ACTUALIZANDO ROTULOS")
          }
        })
      })

    },

    getRotulosById(id) {
      return this.rotulos.filter(rotulo => {
        return rotulo.id_partido === id
      })
    },

    actualizarRotulos(rotulo) {
      const r = this.rotulos.find(el => el.id_rotulo === rotulo.id_rotulo)

      r.nombre = rotulo.nombre
      r.funcion = rotulo.funcion
      r.id_partido = rotulo.id_partido
      r.mostrado = rotulo.mostrado
    }

    
  }

})