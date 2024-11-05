import { defineStore } from "pinia";

export const useBalonmanoStore = defineStore('balonmanoStore', {
  state: () => ({
    partido: {
      fecha: null,
      hora: null,
      lugar: null,
      competicion: null,
      local: {jugadores: []},
      visitante: {jugadores: []}
    },
    marcador: {
      local: 0,
      visitante: 0,
      parte: 1,
      tiempo: 0
    },
    partidoCreado: false

  }),
  getters: {
    
  },
  actions: {
    cargarDatosLS() {
      const datos = JSON.parse(localStorage.getItem('datosBalonmano'))
      if(!datos) this.resetBalonmanoLS()
      this.partido = datos.partido
      this.marcador = datos.marcador
      this.partidoCreado = datos.partidoCreado
    },

    resetBalonmanoLS() {
      const datos = {
        partido: {
          fecha: null,
          hora: null,
          lugar: null,
          competicion: null,
          local: {jugadores: []},
          visitante: {jugadores: []}
        },
        marcador: {
          local: 0,
          visitante: 0,
          parte: 1,
          tiempo: 0
        },
        partidoCreado: false
      }
      this.partidoCreado = datos.partidoCreado
      this.partido = datos.partido
      this.marcador = datos.marcador
      localStorage.setItem('datosBalonmano', JSON.stringify(datos))
    },
    guardarPartido() {
      const datos = {
        partido: this.partido,
        marcador: this.marcador,
        partidoCreado: true
      }
      this.partidoCreado = datos.partidoCreado
      
      localStorage.setItem('datosBalonmano', JSON.stringify(datos))

    }
  }
})