import { defineStore } from 'pinia'



export const useRetransmisionStore = defineStore('retransmisionStore', {
  state: () => ({
    onair: ["MOSCA", "DIRECTE"],
    listaRotulos: [],
    control: [],
    likstaGraficos: [],
    secciones: [
      {
        id:'s01',
        activo: false,
        titulo: "FIJOS",
        elementoLive: true
      },
      {
        id:'s02',
        activo: true,
        titulo: "LISTADO",
        elementoLive: false
      },
      {
      id:'splus',
      activo: false,
      titulo: "AÑADIR",
      elementoLive: false
      },
      
    ]
  }),
  getters: {

  },
  actions: {
  }

})