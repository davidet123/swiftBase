import { defineStore } from 'pinia'

import { collection, onSnapshot, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"
// import { getStorage, ref, uploadBytes } from "firebase/storage";
// the firestore instance
import db from '../firebase/init.js'


export const useMisaStore = defineStore('misa', {
  state: () => ({
    textoLive: 0,
    idTextoLive: null,
    misaCargada: 0,
    cargandoMisa: false,
    textoFullScreen: {
      texto: "",
      color: "#ffffff",
      titulo: ""
    },
    textos: [
      {
        id: 0,
        titulo: "NEGRO",
        texto: "",
        tamaño: 70,
        color: '#000000'
      },
      {
        id: 3,
        titulo: "Comunion",
        texto: "Poble de Déu, poble en marxa; junts fem camí.",
        tamaño: 70,
        color: '#f2a508'
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
        idTextos:[0, 0],
        fecha: "12/12/2023",
        nombreMisa: "test1"
      },
      {
        id: 1,
        idTextos:[0,1,2,3,4],
        fecha: "5/12/2023",
        nombreMisa: "test2"
      },
    ]

  }),
  getters: {
    getTextoLive: state => state.textos.find(el => el.id == state.textoLive) ,
    getMisas: state => state.textosMisa.map(misa => {
      return {
        id: misa.id, 
        fecha: misa.fecha,
        nombreMisa: misa.nombreMisa
      }
    })
    
  },
  actions: {
    getMisaById(id) {
      const misas = this.getMisas.map(el => el.id)
      if(!misas.includes(id)) {
        this.setMisaCargada(0)
        id = 0
      }

      const misa = this.textosMisa.find(el => {
        return el.id === parseInt(id)
      })
      const listado = misa.idTextos
      const resultado = listado.map(id => this.textos.find(item => item.id === id))
      return resultado.filter(item => item !== undefined)
    
    },
    getTextoById(id) {
      return this.textos.find(el => el.id == id)
    },
    addTexto(texto) {
      this.textos.push(texto)
      this.textosMisa[0].idTextos.push(texto.id)
    },
    setTextoLive(id) {
      this.textoLive = id
      this.actualizarTextoLive(id)
    },
    setMisaCargada(id) {
      this.misaCargada = id
      this.actualizarMisaCargada(id)
    },
    // base de datos
    async cargartextoMisa () {
      // this.rotulos = []
      this.cargandoMisa = true

      const docSnap = onSnapshot(collection(db, 'misa'), doc => {
        doc.docChanges().forEach((change) => {
          if (change.type === "added") {
            let valorTextoMisa = change.doc.data()
            this.textoLive = valorTextoMisa.textoMisa
            this.idTextoLive = change.doc.id
            this.misaCargada = valorTextoMisa.misaCargada
            this.textoFullScreen = valorTextoMisa.textoFullScreen
            this.cargandoMisa = false
            // console.log(this.textoFullScreen)
          } else if (change.type === "modified") {
            let cambioTextoMisa = change.doc.data()
            this.textoLive = cambioTextoMisa.textoMisa
            this.idTextoLive = change.doc.id
            this.misaCargada = cambioTextoMisa.misaCargada
            this.textoFullScreen = cambioTextoMisa.textoFullScreen
            this.cargandoMisa = false
            // this.actualizarRotulos(nuevo_rotulo)
            // console.log("ACTUALIZANDO ID TEXTO MISA")
          } 
        })
      })
    },
    async actualizarTextoFullScreen (payload) {
      const docRef = doc(db, "misa", this.idTextoLive)
      await updateDoc(docRef, {
        textoFullScreen: payload
      })

    },

    async actualizarTextoLive (val) {      
      const docRef = doc(db, "misa", this.idTextoLive)
      // console.log(docRef)
      await updateDoc(docRef, {
        textoMisa: val
      })
    },
    async actualizarMisaCargada (val) {      
      const docRef = doc(db, "misa", this.idTextoLive)
      await updateDoc(docRef, {
        misaCargada: val
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
    },
    crearMisaGsheet(payload) {
      
      const encabezados = payload.slice(1)
      const textoEncabezado = encabezados.shift()
      const fecha = textoEncabezado[0]
      const nombreMisa = textoEncabezado[1] || "Misa Gsheet"
      const textos = encabezados.slice(1)
      // const encabezados = textos.shift()
      // textos.slice(1)
      // console.log(textos)

      let index = 0
      let textosMisaGSheet = {
        id: Date.now(),
        idTextos:[],
        fecha,
        nombreMisa
      }
      
      textos.forEach(el => {
        // console.log(el)
        let texto = {
          id: 0,
          titulo: "NEGRO",
          texto: "",
          tamaño: 0,
          color: '#FFFFFF'
        }
        texto.id = `GS${index}`
        if(el[0]) texto.texto = el[0]
        if(el[1]) {
          if(el[1] == "TRUE") texto.color = "#00FF00"
        }
        if(el[2]) texto.titulo = el[2]
        texto.tamaño = 70
        textosMisaGSheet.idTextos.push(`GS${index}`)
        this.textos.push(texto)

        index++
        // console.log(this.textos)
      })
      this.textos.push({
        id: `GS${index}`,
        titulo: "NEGRO",
        texto: "",
        tamaño: 0,
        color: '#FFFFFF'
      })
      textosMisaGSheet.idTextos.push(`GS${index}`)
      this.textosMisa.push(textosMisaGSheet)
      // this.misaCargada = textosMisaGSheet.id
      // console.log(textosMisaGSheet)

    }

    

  }
})