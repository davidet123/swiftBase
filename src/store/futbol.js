import { defineStore } from 'pinia'

export const usegFutbolStore = defineStore('futbol', {
  state: () => ({
    local: [],
    visitante: []
  }),
  getters: {

  },
  actions: {
    inicializar() {

      this.local.push({
        id: 0,
        nombre: "Pepe",
        numero: 1,
        posicion: "GK"
      })
    }

  }

})