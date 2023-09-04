import { defineStore } from "pinia";

export const useSimpleStore = defineStore('simpleStore', {
  state: () => ({
    listado: ['DIRECTE', 'RETORS']
  }),
  actions: {
    addItem(item) {
      this.listado.push(item)
    },
    eliminarRotulo(nombre) {
      const nuevo_listado = this.listado.filter(el => el !== nombre)
      this.listado = nuevo_listado
    }
  }

})