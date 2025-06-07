import { defineStore } from "pinia";
import { useSwiftConnectionStore } from "./swiftConnection"



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
    // marcador: {
    //   local: 0,
    //   visitante: 0,
    //   parte: 1,
    //   tiempo: 0,
    //   tiempoUltimoGolLocal: 0,
    //   tiempoUltimoGolVisitante: 0,
    // },
    marcador: null,
    partidoCreado: false,
    estadoBotonesMarcador: null,
    estadoBotonesMarcadorCargados: false,
    estadoCronosMarcador: null,
    estadoCronosMarcadorCargados: false,



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
    guardarEstadoBotonesMarcador(estado) {
      if(estado) localStorage.setItem('estadoBotonesMarcadorBalonmano', JSON.stringify(estado))
    },
    cargarEstadoBotonesMarcador() {
      const datos = JSON.parse(localStorage.getItem('estadoBotonesMarcadorBalonmano'))
      if(!datos) return
      this.estadoBotonesMarcador = datos
    },
    setEstadoBotonesMarcadorCargados(val) {
      this.estadoBotonesMarcadorCargados = val
    },
    guardarEstadoCronosMarcador(estado) {
      if(estado) localStorage.setItem('estadoCronosMarcadorBalonmano', JSON.stringify(estado))
    },
    cargarEstadoCronosMarcador() {
      const datos = JSON.parse(localStorage.getItem('estadoCronosMarcadorBalonmano'))
      if(!datos) return
      this.estadoCronosMarcador = datos
    },
    setEstadoCronosMarcadorCargados(val) {
      this.estadoCronosMarcadorCargados = val
    },
    cargarDatosLS() {
      const datos = JSON.parse(localStorage.getItem('datosBalonmano'))
      this.cargarEstadoBotonesMarcador()
      this.cargarEstadoCronosMarcador()
      // localStorage.setItem('datosBalonmanoTest', JSON.stringify(datos))
      if(!datos) this.resetBalonmanoLS()
      this.partido = datos.partido
      this.marcador = datos.marcador
      this.partidoCreado = datos.partidoCreado
      // console.log(this.marcador)
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
          tiempo: 0,
          tiempoUltimoGolLocal: 0,
          tiempoUltimoGolVisitante: 0,
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
    },
    // METODOS COMPARTIDOS
    
    mostrarInfoLiveTarjeta (tipo, jugador, equipo, live)  {
      const swiftConnectionStore = useSwiftConnectionStore()
      let equipoAMostrar
      let metodoInfoPlayer
      let tarjetaAmarilla  = "false"
      let tarjetaRoja  = "false"
      let tarjetaAzul  = "false"
  
      if(equipo === "local") {
        equipoAMostrar = "HOME"
        metodoInfoPlayer = "infoPlayerHome"
      }
      if(equipo === "visitante") {
        equipoAMostrar = "AWAY"
        metodoInfoPlayer = "infoPlayerAway"
      }
      if(!live) {

        const textoTop = `${jugador.dorsal} ${jugador.nombre} ${jugador.apellido.toUpperCase()}`
        let textoBot
    
        if(tipo === "info_tarjeta_amarilla") {
          textoBot = "YELLOW CARD"
          tarjetaAmarilla = "true"
        }
        if(tipo === "info_tarjeta_roja") {
          textoBot = "RED CARD"
          tarjetaRoja = "true"
        }
        if(tipo === "info_tarjeta_azul") {
          textoBot = "BLUE CARD"
          tarjetaAzul = "true"
        }
        
    
        swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GRUPO_GOL`, "Display", "false")
        swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GRUPO_TARJETA`, "Display", "true")
        swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_TARJETA_TOPTEXT`, "String", textoTop)
        swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_TARJETA_BOTTEXT`, "String", textoBot)
        swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_TARJETA_AMARILLA_GRUPO`, "Display", tarjetaAmarilla)
        swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_TARJETA_ROJA_GRUPO`, "Display", tarjetaRoja)
        swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_TARJETA_AZUL_GRUPO`,"Display", tarjetaAzul)
    
        swiftConnectionStore.customMetodo("MARCADOR", `${metodoInfoPlayer}In`)
      } else {
        
        swiftConnectionStore.customMetodo("MARCADOR", `${metodoInfoPlayer}Out`)
      }
  
        
    },
    mostrarLiveParadas  (jugador, equipo, partido, live)  {
      
      const swiftConnectionStore = useSwiftConnectionStore()
      let equipoAMostrar
      let metodoInfoPlayer
      let tirosContrario
      
      if(equipo === "local") {
        equipoAMostrar = "HOME"
        metodoInfoPlayer = "infoPlayerHome"
        tirosContrario = partido.visitante.estadistica_equipo.tiros
      }
      if(equipo === "visitante") {
        equipoAMostrar = "AWAY"
        metodoInfoPlayer = "infoPlayerAway"
        tirosContrario = partido.local.estadistica_equipo.tiros
      }
      if(!live) {
        const acierto = parseInt((jugador.estadistica.paradas / tirosContrario)*100)
        const textoTop = `${jugador.dorsal} ${jugador.nombre} ${jugador.apellido.toUpperCase()}`
        const textoBot = `${jugador.estadistica.paradas} SAVE${jugador.estadistica.paradas === 1 ? '' : 'S'}, pct ${acierto}% `
        swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GRUPO_GOL`, "Display", "true")
        swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GRUPO_TARJETA`, "Display", "false")
        swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GOL_TOPTEXT`, "String", textoTop)
        swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GOL_BOTTEXT`, "String", textoBot)
        swiftConnectionStore.customMetodo("MARCADOR", `${metodoInfoPlayer}In`)

      } else {
        swiftConnectionStore.customMetodo("MARCADOR", `${metodoInfoPlayer}Out`)
      }

    },
    mostrarInfoGoles (jugador, equipo, live) {
      const swiftConnectionStore = useSwiftConnectionStore()
      let equipoAMostrar
      let metodoInfoPlayer
      
      if(equipo === "local") {
        equipoAMostrar = "HOME"
        metodoInfoPlayer = "infoPlayerHome"
      }
      if(equipo === "visitante") {
        equipoAMostrar = "AWAY"
        metodoInfoPlayer = "infoPlayerAway"
      }
      if(!live) {
        const acierto = parseInt((jugador.estadistica.goles / jugador.estadistica.tiros)*100) ||"0"
        const textoTop = `${jugador.dorsal} ${jugador.nombre} ${jugador.apellido.toUpperCase()}`
        const textoBot = `${jugador.estadistica.goles} GOAL${jugador.estadistica.goles === 1 ? '' : 'S'}, ${jugador.estadistica.tiros} ATTEMPTS, pct ${acierto}%`
        swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GRUPO_GOL`, "Display", "true")
        swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GRUPO_TARJETA`, "Display", "false")
        swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GOL_TOPTEXT`, "String", textoTop)
        swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GOL_BOTTEXT`, "String", textoBot)
        swiftConnectionStore.customMetodo("MARCADOR", `${metodoInfoPlayer}In`)
      } else {
        swiftConnectionStore.customMetodo("MARCADOR", `${metodoInfoPlayer}Out`)
      }

      
    },
    mostratLiveTarjeta (jugador, equipo, color, partido, live) {
      const swiftConnectionStore = useSwiftConnectionStore()
      console.log(live)
      if(!live) {

        let tarjetaAmarilla  = "false"
        let tarjetaRoja  = "false"
        let tarjetaAzul  = "false"
        
        if(color === "amarilla") tarjetaAmarilla = "true"
        if(color === "roja") tarjetaRoja = "true"
        if(color === "azul") tarjetaAzul = "true"
        const textoTop = `${jugador.dorsal} ${jugador.nombre} ${jugador.apellido.toUpperCase()}`
  
  
        swiftConnectionStore.playGraphic('DSK_INFO_TARJETA')
        swiftConnectionStore.cueGraphic('DSK_INFO_TARJETA')
    
        swiftConnectionStore.rtRemote.updateFields("DSK_INFO_TARJETA::SUPERIORTEXT","String", textoTop)
        swiftConnectionStore.rtRemote.updateFields("DSK_INFO_TARJETA::ESCUDOSHDR", "Shader", partido[equipo].escudo)
        swiftConnectionStore.rtRemote.updateFields("DSK_INFO_TARJETA::TARJETA_AMARILLA_GRUPO", "Display", tarjetaAmarilla)
        swiftConnectionStore.rtRemote.updateFields("DSK_INFO_TARJETA::TARJETA_ROJA_GRUPO", "Display", tarjetaRoja)
        swiftConnectionStore.rtRemote.updateFields("DSK_INFO_TARJETA::TARJETA_AZUL_GRUPO","Display", tarjetaAzul)
  
        swiftConnectionStore.bringOn('DSK_INFO_TARJETA')
      } else {
        swiftConnectionStore.takeOff('DSK_INFO_TARJETA')
      }
    },
    mostrarInfoLiveTiro7m (jugador, equipo, live) {
      const swiftConnectionStore = useSwiftConnectionStore()
      let equipoAMostrar
      let metodoInfoPlayer
      
      if(equipo === "local") {
        equipoAMostrar = "HOME"
        metodoInfoPlayer = "infoPlayerHome"
      }
      if(equipo === "visitante") {
        equipoAMostrar = "AWAY"
        metodoInfoPlayer = "infoPlayerAway"
      }
      if(!live) {

        const acierto = parseInt((jugador.estadistica.penalti7m_anotados / jugador.estadistica.penalti7m_efectuados)*100) ||"0"
        const textoTop = `${jugador.dorsal} ${jugador.nombre} ${jugador.apellido.toUpperCase()}`
        const textoBot = `7m - ${jugador.estadistica.penalti7m_anotados} GOAL${jugador.estadistica.penalti7m_anotados === 1 ? '' : 'S'}, EFFICIENCY ${acierto}%`
        // const textoBot = `7m - ${jugador.estadistica.penalti7m_anotados} GOALS, ${jugador.estadistica.penalti7m_efectuados} ATTEMPTS, pct ${acierto}%`
        swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GRUPO_GOL`, "Display", "true")
        swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GRUPO_TARJETA`, "Display", "false")
        swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GOL_TOPTEXT`, "String", textoTop)
        swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GOL_BOTTEXT`, "String", textoBot)
        swiftConnectionStore.customMetodo("MARCADOR", `${metodoInfoPlayer}In`)
      } else {
        swiftConnectionStore.customMetodo("MARCADOR", `${metodoInfoPlayer}Out`)
      }

    },
    mostrarInfoLiveSuspension (jugador, equipo, live) {
      const swiftConnectionStore = useSwiftConnectionStore()
      let equipoAMostrar
      let metodoInfoPlayer
      const suspensiones = jugador.estadistica.suspensiones
      
      if(equipo === "local") {
        equipoAMostrar = "HOME"
        metodoInfoPlayer = "infoPlayerHome"
      }
      if(equipo === "visitante") {
        equipoAMostrar = "AWAY"
        metodoInfoPlayer = "infoPlayerAway"
      }
      const ordinal = ['1st', '2nd', '3rd']
      if(!live) {

        const textoTop = `${jugador.dorsal} ${jugador.nombre} ${jugador.apellido.toUpperCase()}`
        const textoBot = `${ordinal[suspensiones -1]} SUSPENSION`
        
        swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GRUPO_GOL`, "Display", "true")
        swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GRUPO_TARJETA`, "Display", "false")
        swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GOL_TOPTEXT`, "String", textoTop)
        swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GOL_BOTTEXT`, "String", textoBot)
        swiftConnectionStore.customMetodo("MARCADOR", `${metodoInfoPlayer}In`)
      } else {
        swiftConnectionStore.customMetodo("MARCADOR", `${metodoInfoPlayer}Out`)
      }

    }
    
      
  }
})