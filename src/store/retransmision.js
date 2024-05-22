import { defineStore } from 'pinia'



export const useRetransmisionStore = defineStore('retransmisionStore', {
  state: () => ({
    onair: ["MOSCA", "DIRECTE"],
    listaRotulos: [
      {
        id: 'r01',
        numero: 1,
        titulo: 'FIJOS',
        grafico: 'g01',
        seccion: 's01'
      },
    ],
    rotuloActivo: 'null',
    control: [],
    listaGraficos: [
      {
        id:'g01',
        titulo: "FIJOS",
        clase: "MOVIE"
      },
      {
        id:'g02',
        titulo: "1 LINEA",
        clase: "DSK"
      },
      {
        id:'g03',
        titulo: "2 LINEA",
        clase: "DSK"
      },
      {
        id:'g04',
        titulo: "2 LINEA TITULAR",
        clase: "DSK"
      },
      {
        id:'g05',
        titulo: "3 LINEA",
        clase: "DSK"
      },
    ],
    secciones: [
      {
        id:'s01',
        activo: false,
        titulo: "INICIO",
        elementoLive: true
      },
      {
        id:'s02',
        activo: true,
        titulo: "LISTADO",
        elementoLive: false
      },
      {
        id:'s03',
        activo: true,
        titulo: "COPY",
        elementoLive: false
      },
      {
      id:'splus',
      activo: false,
      titulo: "AÑADIR",
      elementoLive: false
      },
      
    ],
    seccionActiva: 's01'
  }),
  getters: {

  },
  actions: {

    setSeccionActiva (payload) {
      this.seccionActiva = payload
    },
    addSeccion (titulo) {
      const item = {
        id:`s${this.secciones.length}`,
        activo: false,
        titulo,
        elementoLive: false
      }
      const index = this.secciones.length -1
      this.secciones.splice(index, 0,item)
    },
    setRotuloActivo (payload) {
      this.rotuloActivo = payload
    }
  }

})