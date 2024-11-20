import { defineStore } from "pinia";

export const useBalonmanoStore = defineStore('balonmanoStore', {
  state: () => ({
    editando: false,
    editarEstadisticas: false,
    estadisticaManual: false,
    marcadorManual: false,
    ultimoJugador: null,
    tipoEquipo: ["local", "visitante"],
    partido: null,
    // partido: {
    //   fecha: null,
    //   hora: null,
    //   lugar: null,
    //   competicion: null,
    //   equipo_arbitral: {
    //       arbitro1: {},
    //       arbitro2: {}
    //     },
    //   local: {
    //     suspensiones_activas: 0,
    //     jugadores: [],
    //     cuerpo_tecnico: [],
    //     estadistica_equipo: {
    //       goles: 0,
    //       tiros: 0,
    //       paradas: 0,
    //       penalti7m_efectuados: 0,
    //       penalti7m_anotados: 0,
    //       suspensiones: 0,
    //       tarjetas_amarillas: 0,
    //       tarjetas_rojas: 0,
    //       tarjetas_azules: 0
    //     }
    //   },
    //   visitante: {
    //     suspensiones_activas: 0,
    //     jugadores: [],
    //     cuerpo_tecnico: [],
    //     estadistica_equipo: {
    //       goles: 0,
    //       tiros: 0,
    //       paradas: 0,
    //       penalti7m_efectuados: 0,
    //       penalti7m_anotados: 0,
    //       suspensiones: 0,
    //       tarjetas_amarillas: 0,
    //       tarjetas_rojas: 0,
    //       tarjetas_azules: 0
    //     }
    //   }
    // },
    marcador: {
      local: 0,
      visitante: 0,
      parte: 1,
      tiempo: 0
    },
    partidoCreado: false

  }),
  getters: {
    totalSuspensionesLocal: state => state.partido.local.jugadores.reduce((total, jugador) => total += jugador.estadistica.suspensiones2min, 0),
    totalSuspensionesVisitante: state => state.partido.visitante.jugadores.reduce((total, jugador) => total += jugador.estadistica.suspensiones2min, 0),
    suspensionesActivasLocal: state => state.partido.local.suspensiones_activas,
    suspensionesActivasVisitante: state => state.partido.visitante.suspensiones_activas,
    
  },
  actions: {
    setEditando(val) {
      // console.log(e)
      this.editando = val
    },
    toggleEditarEstadisticas() {
      this.editarEstadisticas = !this.editarEstadisticas
    },
    setEstadisticaManual (val) {
      this.estadisticaManual = val
    },
    setUltimoJugador (val) {
      this.ultimoJugador = val
    },
    setMarcadorManual (val) {
      this.marcadorManual = val
    },
    suspensionesActivas(equipo) {
      if(equipo === "local") return this.suspensionesActivasLocal
      if(equipo === "visitante") return this.suspensionesActivasVisitante
    },




    cargarDatosLS() {
      const datos = JSON.parse(localStorage.getItem('datosBalonmano'))
      // localStorage.setItem('datosBalonmanoTest', JSON.stringify(datos))
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
          equipo_arbitral: {
            arbitro1: {},
            arbitro2: {}
          },
          local: {
            suspensiones_activas: 0,
            jugadores: [], 
            cuerpo_tecnico: [],
            estadistica_equipo: {
              goles: 0,
              tiros: 0,
              paradas: 0,
              penalti7m_efectuados: 0,
              penalti7m_anotados: 0,
              suspensiones: 0,
              tarjetas_amarillas: 0,
              tarjetas_rojas: 0,
              tarjetas_azules: 0,
              perdidas: 0
            }
          },
          visitante: {
            suspensiones_activas: 0,
            jugadores: [],
            cuerpo_tecnico: [],
            estadistica_equipo: {
              goles: 0,
              tiros: 0,
              paradas: 0,
              penalti7m_efectuados: 0,
              penalti7m_anotados: 0,
              suspensiones: 0,
              tarjetas_amarillas: 0,
              tarjetas_rojas: 0,
              tarjetas_azules: 0,
              perdidas: 0
            }
          }
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
    },
    porcentaje (a,b)  {
      if(b === 0) return "0%"
      const valor = Math.round(a/b*100)
      return `${valor}%`
    }
  }
})