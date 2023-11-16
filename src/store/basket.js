import { defineStore } from 'pinia'

export const usegBasketStore = defineStore('basket', {

  state: () => ({
    partidoBasket: null,
    marcadorBasket: null,
    posicionesBaloncesto: [
      "Base",
      "Escolta",
      "Alero",
      "Ala-Pívot",
      "Pívot"
    ]
    
  }),
  getters: {
    getPartidoBasket: state => state.partidoBasket,
    getPosicionesBasket: state => state.posicionesBaloncesto
  },
  actions: {
    setPartidoBasket() {
      const partido = localStorage.getItem('partidoBasket')
      const marcador = localStorage.getItem('marcadorBasket')
      if(partido !== null && marcador !== null) {
        console.log("recuperadndo datos localstorage")
        this.partidoBasket = JSON.parse(localStorage.getItem('partidoBasket'))
        this.marcadorBasket = JSON.parse(localStorage.getItem('marcadorBasket'))
      } else {
        console.log("Reseteando basket")
        this.resetPartidoBasket()
      }
    },
    resetPartidoBasket() {
      const partido = {
        id_partido: 'localStorage',
        competicion: null,
        equipo_local: null,
        id_equipo_local: 'localStorage_local',
        equipo_visitante: null,
        id_equipo_visitante: 'localStorage_visitante',
        fecha: null,
        hora: null,
        lugar: null,
        estadio: null,
        marcador: {local: 0, visitante: 0},
        equipo_arbitral: {
          primer_arbitro: null,
          segundo_arbitro: null,
          tercer_arbitro: null,
          cuarto_arbitro: null,
        }
      }
      const marcador = {
        id_partido: 'localStorage',
        id_marcador: 'localStorage',
        periodo: 1,
        tanteoLocal: {
          primerCuarto: 0,
          segundoCuarto: 0,
          tercerCuarto: 0,
          cuartoCuarto: 0,
          primeraProrroga: 0,
          segundaProrroga: 0
        },
        tanteoVisitante: {
          primerCuarto: 0,
          segundoCuarto: 0,
          tercerCuarto: 0,
          cuartoCuarto: 0,
          primeraProrroga: 0,
          segundaProrroga: 0
        },
        tiempoMuertoLocal: {
          primerCuarto: 0,
          segundoCuarto: 0,
          tercerCuarto: 0,
          cuartoCuarto: 0,
          primeraProrroga: 0,
          segundaProrroga: 0
        },
        tiempoMuertoVisitante: {
          primerCuarto: 0,
          segundoCuarto: 0,
          tercerCuarto: 0,
          cuartoCuarto: 0,
          primeraProrroga: 0,
          segundaProrroga: 0
        },
        temporizador: {
          inicio_tiempo: false,
          inicio_prorroga: false,
          cuarto_en_juego: 1,
          
          tiempo: {
            primerCuarto: null,
            segundoCuarto: null,
            tercerCuarto: null,
            cuartoCuarto: null,
            primeraProrroga: null,
            segundaProrroga: null
          }
        }
      }
      partido.equipo_local = this.crearEquipoBasket('local')
      partido.equipo_visitante = this.crearEquipoBasket('visitante')

      this.partidoBasket = partido
      // console.log(this.partidoBasket.estadio)
      this.marcadorBasket = marcador
      localStorage.setItem('partidoBasket', JSON.stringify(partido))
      localStorage.setItem('marcadorBasket', JSON.stringify(marcador))

    },
    crearEquipoBasket(equipo) {
      let equipo_temp = {
        id_equipo: `localStorage_${equipo}`,
        nombre_equipo: null,
        display_name: null,
        localidad: null,
        estadistica_equipo: {
          puntos: 0,
          tiempoMuerto: 0,
          faltas: 0,
          tiros2: 0,
          tiros2Total: 0,
          tiros1: 0,
          tiros1Total: 0,
          tiros3: 0,
          tiros3Total: 0,
          asistencias: 0
        }, 
        jugadores: [],
        cuerpo_tecnico: [
          {
            id_cuerpo_tecnico: `ent_localStorage_${equipo}`,
            titulo: "Entrenador",
            nombre: null,
            fecha_nacimiento: null,
            nacionalidad: null
          },
          {
            id_cuerpo_tecnico: `seg_ent_localStorage_${equipo}`,
            titulo: "Segundo entrenador",
            nombre: null,
            fecha_nacimiento: null,
            nacionalidad: null
          },
          {
            id_cuerpo_tecnico: `del_localStorage_${equipo}`,
            titulo: "Delegado",
            nombre: null,
            fecha_nacimiento: null,
            nacionalidad: null
          }
        ],
        formacion: [
          {dorsal: null, apodo: null, pos: null},
          {dorsal: null, apodo: null, pos: null},
          {dorsal: null, apodo: null, pos: null},
          {dorsal: null, apodo: null, pos: null},
          {dorsal: null, apodo: null, pos: null},
          {dorsal: null, apodo: null, pos: null},
          {dorsal: null, apodo: null, pos: null},
          {dorsal: null, apodo: null, pos: null},
          {dorsal: null, apodo: null, pos: null},
          {dorsal: null, apodo: null, pos: null},
          {dorsal: null, apodo: null, pos: null},
        ],
        tipoFormacion: null,
        titulares: [],
        sustituciones: null
      }
      const jugador = {
        altura: null,
        apodo: null,
        equipo: null,
        estadistica: {
          puntos: 0,
          faltas: 0,
          tiros2: 0,
          tiros2Total: 0,
          tiros1: 0,
          tiros1Total: 0,
          tiros3: 0,
          tiros3Total: 0,
          asistencias: 0
        },
        fecha_nacimiento: null,
        id_jugador: null,
        nacionalidad: null,
        nombre_jugador: null,
        numero: null,
        posicion: null
      }

      for(let i = 0; i < 12; i++) {
        let jugador_temp = {...jugador}
        jugador_temp.equipo = `localStorage_${equipo}`
        jugador_temp.id_jugador = `${equipo}_${i}`
        equipo_temp.jugadores.push(jugador_temp)

      }

      return equipo_temp

    },
    updatePartidoBasket(payload) {
      this.partido = payload
      localStorage.setItem('partidoBasket', JSON.stringify(payload))
    },
    updateMarcadorBasket(payload) {
      this.marcador = payload
      localStorage.setItem('marcadorBasket', JSON.stringify(payload))
    }
  }

})