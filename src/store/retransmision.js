import { defineStore } from 'pinia'



export const useRetransmisionStore = defineStore('retransmisionStore', {
  state: () => ({
    onair: ["MOSCA", "DIRECTE"],
    listaRotulos: [],
    control: [],
    likstaGraficos: []
  }),
  getters: {

  },
  actions: {
  }

})