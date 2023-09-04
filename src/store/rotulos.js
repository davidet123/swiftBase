import { onSnapshot, collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore"
import db from '../firebase/init.js'
import { defineStore } from "pinia"

export const useRotulosStore = defineStore('rotulosStore', {
  state: () => ({
    rotulos: [],
    rotulo_cargado: []
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
            // console.log("ACTUALIZANDO ROTULOS")
          } else if (change.type === "removed") {
            let rotulo_eliminado = change.doc.data()
            rotulo_eliminado.id_rotulo = change.doc.id
            // console.log(rotulo_eliminado)
            this.eliminarRotulo(rotulo_eliminado.id_rotulo)
            // this.actualizarRotulos(nuevo_rotulo)
            // console.log("ACTUALIZANDO ROTULOS")
          }
        })
      })
      this.rotuloCargado()

    },

    crearRotulos () {
      const tipo_rotulos = [
        'ALINEACION',
        'DSK_ARBITROS',
        'DSK_INDIVIDUAL',
        'EST_EQUIPOS',
        'EST_FINAL',
        'EST_INDIVIDUAL',
        'FORMACION',
        'MARCADOR',
        'SUSTITUCION'
      ]

      tipo_rotulos.forEach(tipo => {
        console.log(tipo)

        const rotulo = {
            contenido: null,
          live: false,
          tipo: tipo
  
          }

        this.addRotuloCargadoToDB(rotulo)
      })


    },

    async addRotuloCargadoToDB(rotulo) {
      const docRef = await addDoc(collection(db, 'rotulo_cargado'), rotulo) 
    },



    async rotuloCargado () {
      // this.crearRotulos()

      const docSnap = onSnapshot(collection(db, 'rotulo_cargado'), doc => {
        doc.docChanges().forEach((change) => {
          if (change.type === "added") {
            let rotulo_cargado = change.doc.data()
            rotulo_cargado.id_rotulo = change.doc.id
            this.rotulo_cargado.push(rotulo_cargado)
            // console.log(this.rotulo_cargado)
          } else if (change.type === "modified") {
            let nuevo_rotulo_cargado = change.doc.data()
            nuevo_rotulo_cargado.id_rotulo = change.doc.id
            this.actualizarRotuloCargado(nuevo_rotulo_cargado)
          } else if (change.type === "removed") {
            let rotulo_cargado_eliminado = change.doc.data()
            rotulo_cargado_eliminado.id_rotulo = change.doc.id
            this.eliminarRotulo(rotulo_cargado_eliminado)
          }
        })
  
      })
    } ,
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

    // async actualizarRotuloCargadoDB(rotulo) {
    //   const docRef = doc(db, "rotulo_cargado", payload.id_rotulo)
    //   await updateDoc(docRef, {
    //     titulo: rotulo.titulo,
    //     live: rotulo.live
    //   })

    // },
    actualizarRotuloCargado(payload) {
      const rotulo = this.rotulo_cargado.find(r => r.tipo === payload.tipo)
      rotulo.contenido = payload.contenido
      rotulo.live = payload.live
    },

    
    async actualizarRotuloCargadoDB(payload) {
      const rotulo_cargado = this.rotulo_cargado.find(r => r.tipo === payload.tipo)

      const docRef = doc(db, "rotulo_cargado", rotulo_cargado.id_rotulo)
      
      await updateDoc(docRef, {
        contenido: payload.contenido,
        live: payload.live
      })
    },

    getRotulosById(id) {
      return this.rotulos.filter(rotulo => {
        return rotulo.id_partido === id
      })
    },
    async actualizarRotulosDB(payload) {
      // console.log(payload)
      const docRef = doc(db, "rotulos", payload.id_rotulo)
      // console.log(docRef)
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