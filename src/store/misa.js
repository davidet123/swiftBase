import { defineStore } from 'pinia'

import { collection, onSnapshot, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"
// import { getStorage, ref, uploadBytes } from "firebase/storage";
// the firestore instance
import db from '../firebase/init.js'


export const useMisaStore = defineStore('misa', {
  state: () => ({
    textoLive: 0,
    idTextoLive: null,
    textos: [
      {
        id: 0,
        titulo: "Comunion",
        texto: "Poble de Déu, poble en marxa; junts fem camí.",
        tamaño: 70,
        color: '#ffffff'
      },
      {
        id: 1,
        titulo: "Comunion",
        texto: "poble de Déu, església que avança; el regne ja està ací. ",
        tamaño: 70,
        color: '#ffffff'
      },
      {
        id: 2,
        titulo: "Comunion",
        texto: "marcat sovint per tantes pors, però viu en el Crist lluminós.",
        tamaño: 70,
        color: '#ffffff'
      },
      {
        id: 3,
        titulo: "Comunion",
        texto: "",
        tamaño: 20,
        color: '#000000'
      },
      {
        id: 4,
        titulo: "Comunion",
        texto: "Camina al llarc del temps, travessa mars pregons, ",
        tamaño: 70,
        color: '#00ff00'
      },
    ] ,
    textosMisa:[
      {
        id: 0,
        idTextos:[3,0,1,2,0,4]
      }
    ]

  }),
  getters: {
    getTextoLive: state => state.textos[state.textosMisa[0].idTextos[state.textoLive]]
    
  },
  actions: {
    getMisaById(id) {
      console.log(this.textosMisa, id)
      const misa = this.textosMisa.find(el => {
        return el.id === parseInt(id)
      })
      console.log(misa)
      const listado = misa.idTextos
      const resultado = listado.map(id => this.textos.find(item => item.id === id))
      return resultado.filter(item => item !== undefined)
    },
    getTextoById(id) {
      return this.textos.find(el => el.id == id)
    },
    addTexto(texto) {
      // console.log(this.textosMisa.idTextos)
      this.textos.push(texto)
      this.textosMisa[0].idTextos.push(texto.id)
    },
    setTextoLive(id) {
      this.textoLive = id
      this.actualizarTextoLive(id)
    },
    // base de datos
    async cargartextoMisa () {
      // this.rotulos = []

      const docSnap = onSnapshot(collection(db, 'misa'), doc => {
        doc.docChanges().forEach((change) => {
          if (change.type === "added") {
            let valorTextoMisa = change.doc.data()
            this.textoLive = valorTextoMisa.textoMisa
            this.idTextoLive = change.doc.id
          } else if (change.type === "modified") {
            let cambioTextoMisa = change.doc.data()
            this.textoLive = cambioTextoMisa.textoMisa
            this.idTextoLive = change.doc.id
            // this.actualizarRotulos(nuevo_rotulo)
            // console.log("ACTUALIZANDO ID TEXTO MISA")
          } 
        })
      })
      // this.rotuloCargado()
    },

    async actualizarTextoLive (val) {      
      const docRef = doc(db, "misa", this.idTextoLive)
      // console.log(docRef)
      await updateDoc(docRef, {
        textoMisa: val
      })
    },

    updateTextoMisa (item) {
      // console.log(item)

      const texto = this.getTextoById(item.id)
      if(texto) {
        texto.texto = item.texto
        texto.tamaño = item.tamaño
        texto.color = item.color
        return true
      }
      return false
    },
    buscarMisa(id) {
      return this.textosMisa.find(el => {
        return el.id === parseInt(id)
      })
    }

    

  }
})