
import { defineStore } from 'pinia'


export const useVoleiStore = defineStore('voleiStore', {

  state: () => ({
    test: "voileibol",
    equipos: {
      local: {
        nombre: "Equipo Local",
        abreviatura: "LOC",
        ciudad: "Ciudad Local",
        color: "#ffffff",
        jugadores: [
          {dorsal: null, nombre: null}
        ]
  
      },
      visitante: {
        nombre: "Equipo Visitante",
        abreviatura: "VIS",
        ciudad: "Ciudad Visitante",
        color: "#ffffff",
        jugadores: [
          {dorsal: null, nombre: null}
        ]
  
      },
    },
    infoPartido: {
      fecha: null,
      hora: null,
      lugar: null,
    },
    marcador: {
      setsLocal: 0,
      setsVisitante: 0,
      puntosLocal: 0,
      puntosVisitante: 0,
      parcialesLocal: [0,0,0,0,0],
      parcialesVisitante: [0,0,0,0,0],
      saque: 'local',
      setActivo: 1
    }
  }),
  getters: {
    getEquipoLocal(state) {
      return state.equipos.local
    }

  },
  actions: {
    resetPartidoVoleibol() {
      this.equipos = {
        local: {
          nombre: "Equipo Local",
          abreviatura: "LOC",
          ciudad: "Ciudad Local",
          color: "#ffffff",
          jugadores: [
            {dorsal: null, nombre: null}
          ]
    
        },
        visitante: {
          nombre: "Equipo Visitante",
          abreviatura: "VIS",
          ciudad: "Ciudad Visitante",
          color: "#ffffff",
          jugadores: [
            {dorsal: null, nombre: null}
          ]
    
        },
      }
      this.infoPartido = {
        fecha: null,
        hora: null,
        lugar: null,
      }
      this.marcador = {
        setsLocal: 0,
        setsVisitante: 0,
        puntosLocal: 0,
        puntosVisitante: 0,
        parcialesLocal: [0,0,0,0,0],
        parcialesVisitante: [0,0,0,0,0],
        saque: 'local',
        setActivo: 1
      }
      this.guardarPartidoVoleibol()
    },
    // ACTUALIZCIONES MARCADOR
    actualizarPunto(equipo, val) {
      if (equipo === 'local') {
        this.marcador.puntosLocal += val
        if (this.marcador.puntosLocal < 0) this.marcador.puntosLocal = 0
        this.marcador.parcialesLocal[this.marcador.setActivo - 1] = this.marcador.puntosLocal
        if(this.marcador.saque === 'visitante') this.marcador.saque = 'local'
      } else if (equipo === 'visitante') {
        this.marcador.puntosVisitante += val
        if (this.marcador.puntosVisitante < 0) this.marcador.puntosVisitante = 0
        this.marcador.parcialesVisitante[this.marcador.setActivo - 1] = this.marcador.puntosVisitante
        if(this.marcador.saque === 'local') this.marcador.saque = 'visitante'
      }

      this.guardarPartidoVoleibol()

    },
    actualizarSet(equipo, val) {
      if (equipo === 'local') {
        this.marcador.setsLocal += val
        if (this.marcador.setsLocal < 0) this.marcador.setsLocal = 0
      } else if (equipo === 'visitante') {
        this.marcador.setsVisitante += val
        if (this.marcador.setsVisitante < 0) this.marcador.setsVisitante = 0
      }
      this.marcador.setActivo = this.marcador.setsLocal + this.marcador.setsVisitante + 1
      this.marcador.puntosLocal = 0
      this.marcador.puntosVisitante = 0
      this.guardarPartidoVoleibol()
    },
    cambiarSaque() {
      if (this.marcador.saque === 'local') {
        this.marcador.saque = 'visitante' 
      } else  if (this.marcador.saque === 'visitante') {
        this.marcador.saque = 'local' 
      }
    },

    // ACCIONES EQUIPOS
    addJugadorVoleibol(equipo) {
      if (equipo === 'local') {
        this.equipos.local.jugadores.push({dorsal: null, nombre: null})
      } else if (equipo === 'visitante') {
        this.equipos.visitante.jugadores.push({dorsal: null, nombre: null})
      }
    },

    crearPartido() {
      console.log("Creando partido de voleibol")
    },
    guardarPartidoVoleibol() {
      const partido = {
        equipos: this.equipos,
        infoPartido: this.infoPartido,
        marcador: this.marcador,
      }
      localStorage.setItem('partidoVoleibol', JSON.stringify(partido))
    },
    cargarPartidoVoleibol() {
      const partido = JSON.parse(localStorage.getItem('partidoVoleibol')) 
      if (partido) {
        this.equipos = partido.equipos
        this.infoPartido = partido.infoPartido
        this.marcador = partido.marcador
      } 
    },
    guardarDatos(fecha) { 
      this.infoPartido.fecha = fecha
      this.guardarLocalStorage()
    }
  }
})


