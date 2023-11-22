import { defineStore } from 'pinia'
// import { collection, onSnapshot, addDoc } from "firebase/firestore"
// the firestore instance
// import db from '../firebase/init.js'




export const useMisaStore = defineStore('misa', {
  state: () => ({
    live: 1,
    textos: [
      {
        id: 0,
        titulo: "Comunion",
        texto: "asdfasdfaasdfasdf&#10;asdfasdfadf&#10;asdfasdfadsf",
        tamaño: 12,
        color: '#ffffff'
      },
      {
        id: 1,
        titulo: "Comunion",
        texto: "opipoaifsdpoifapsodifa",
        tamaño: 12,
        color: '#ff0000'
      },
      {
        id: 2,
        titulo: "Comunion",
        texto: "uiunasdunfakjdn",
        tamaño: 20,
        color: '#ff0000'
      },
    ] ,
    textosMisa:[
      {
        id: 0,
        idTextos:[2,0,1]
      }
    ]
  }),
  getters: {
    getTextoLive: state => state.textoLive


  },
  actions: {
    getMisaById(id) {
      const misa = this.textosMisa.find(el => {
        return el.id === id
      })
      const listado = misa.idTextos
      const resultado = listado.map(id => this.textos.find(item => item.id === id))
      return resultado.filter(item => item !== undefined)
    },
    addTexto(texto) {
      // console.log(this.textosMisa.idTextos)
      this.textos.push(texto)
      this.textosMisa[0].idTextos.push(texto.id)
    },
    setTextoLive(id) {
      this.live = id
      console.log(this.live)
    }

  }

})