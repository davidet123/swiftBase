import { onSnapshot, collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore"
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
          } else if (change.type === "removed") {
            let rotulo_eliminado = change.doc.data()
            rotulo_eliminado.id_rotulo = change.doc.id
            console.log(rotulo_eliminado)
            this.eliminarRotulo(rotulo_eliminado.id_rotulo)
            // this.actualizarRotulos(nuevo_rotulo)
            console.log("ACTUALIZANDO ROTULOS")
          }
        })
      })

    },
    // async addPartido(partido, marcador) {
    //   const docRef = await addDoc(collection(db, 'partidos_futbol'), partido)
    //   partido.id_partido = docRef.id 
    //   marcador.id_partido = docRef.id
    //   this.addMarcadorDB(marcador) 
    //   this.addIdPartidoAJugador(partido)
    // },
    async addRotuloToDb(payload) {
      const docRef = await addDoc(collection(db, 'rotulos'), payload)

    },

    getRotulosById(id) {
      return this.rotulos.filter(rotulo => {
        return rotulo.id_partido === id
      })
    },
    async actualizarRotulosDB(payload) {
      console.log(payload)
      const docRef = doc(db, "rotulos", payload.id_rotulo)
      console.log(docRef)
      await updateDoc(docRef, {
        titulo: payload.titulo,
        subtitulo: payload.subtitulo,
        id_partido: payload.id_partido,
        mostrado: payload.mostrado,
        periodista: payload.periodista
      })


    },

    actualizarRotulos(rotulo) {
      const r = this.rotulos.find(el => el.id_rotulo === rotulo.id_rotulo)

      r.titulo = rotulo.titulo
      r.subtitulo = rotulo.subtitulo
      r.id_partido = rotulo.id_partido
      r.mostrado = rotulo.mostrado,
      r.periodista = rotulo.periodista
    },

    async eliminarRotuloDB(id) {
      await deleteDoc(doc(db, 'rotulos', id))
    },

    eliminarRotulo(id) {
      this.rotulos = this.rotulos.filter(el => el.id_rotulo !== id)
    }

    

    
  }

})