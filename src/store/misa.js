import { defineStore } from 'pinia'
// import { collection, onSnapshot, addDoc } from "firebase/firestore"
// the firestore instance
// import db from '../firebase/init.js'




export const useMisaStore = defineStore('misa', {
  state: () => ({
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
      id: 3,
      titulo: "Comunion",
      texto: "uiunasdunfakjdn",
      tamaño: 20,
      color: '#ff0000'
    },
   ] ,
   textosMisa:[
    {
      id: 0,
      idTextos:[3,0,1]
    }
   ]
  }),
  getters: {


  },
  actions: {
    getMisaById(id) {
      const misa = this.textosMisa.find(el => {
        return el.id === id
      })
      const listado = misa.idTextos
      const resultado = listado.map(id => this.textos.find(item => item.id === id))
      return resultado.filter(item => item !== undefined)
    }

  }

})