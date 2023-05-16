import { defineStore } from "pinia";

export const useSimpleStore = defineStore('simpleStore', {
  state: () => ({
    listado: ['DIRECTE', 'RETORS']
  }),
  actions: {
    addItem(item) {
      this.listado.push(item)
    }
  }

})