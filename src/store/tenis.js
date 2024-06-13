import { defineStore } from 'pinia'
// import { collection, onSnapshot, addDoc } from "firebase/firestore"
// the firestore instance
// import db from '../firebase/init.js'




export const useTenisStore = defineStore('tenisstore', {
  state: () => ({
    partidos: [], // LISTA PARTIDOS (OBJETO COMPLETO CREADO A PARTIR DE PLANTILLAS)
    partido_en_juego: 'part1718181432430',
    partido: { // PLANTILLA PARTIDO
      id_partido_tenis: null,
      dia: null,
      hora: null,
      nombre_pista: null,
      lugar_partido: null,
      marcador_id: null,
      jugadores_id: [],
      jugadores: [],
      competicion: null,
      num_sets: null,
      tiempo_partido: null,
      marcador_partido: [],
      jugadores_por_equipo: 1,
      acabado: false,
      set_en_juego: 1
    },
    marcador: { //PLANTILLA MARCADORES
      num_set: null,
      juegos_local: 4,
      juegos_visitante: 4,
      puntos_local: 0,
      puntos_visitante: 0,
      texto_marcador: null,
      tiempo_set: 0,
      deuce: false,
      tie_break: false
    },
    competiciones: [],
    competicion: {
      id_competicion: null,
      nombre_competicion: null
    },
    jugadores: [], // LISTADO TODOS LOS JUGADORES
    jugador: { // PLANTILLA JUGADOR
      nombre: null,
      apellidos: null,
      edad: null,
      fecha_nacimiento: null,
      años_profesional: null,
      residencia: null,
      nacionalidad: null,
      mano: null,
      altura: null,
      peso: null,
      estadistica: {
        ace: 0,
        doble_falta: 0,
        ganadores: 0,
        errores: 0,
        breaks: 0,
        breaks_conseguidos: 0,
        puntos: 0,
      }
    }


   
  }),
  getters: {

  },
  actions: {
    cargarDatos () {
      const competiciones = JSON.parse(localStorage.getItem('competicionesTenis')) 
      const jugadores = JSON.parse(localStorage.getItem('jugadoresTenis'))
      const partidos = JSON.parse(localStorage.getItem('partidosTenis'))
      const partidoEnJuego = JSON.parse(localStorage.getItem('partidoTenisEnJuego'))
      if(competiciones) this.competiciones = competiciones
      if(jugadores) this.jugadores = jugadores
      if(partidos) this.partidos = partidos
      if(partidoEnJuego) this.partido_en_juego = partidoEnJuego
    },
    addCompeticionTenis (payload) {
      const nuevaCompeticion = JSON.parse(JSON.stringify(payload))
      this.competiciones.push(nuevaCompeticion)
      localStorage.setItem('competicionesTenis', JSON.stringify(this.competiciones))
      this.competicion.nombre_competicion = null
      this.competicion.pista_juego = null,
      this.competicion.id_competicion = null
    },
    addJugadorTenis (payload) {
      const nuevoJugador = JSON.parse(JSON.stringify(payload))
      this.jugadores.push(nuevoJugador)
      localStorage.setItem('jugadoresTenis', JSON.stringify(this.jugadores))
      this.jugador.nombre = null
      this.jugador.apellidos = null,
      this.jugador.edad = null,
      this.jugador.fecha_nacimiento = null,
      this.jugador.años_profesional = null,
      this.jugador.residencia = null,
      this.jugador.nacionalidad = null,
      this.jugador.mano = null,
      this.jugador.altura = null,
      this.jugador.peso = null
    },
    crearPartidoTenis(payload) {
      
      
      let partido = this.partidos.find(el => el.id_partido_tenis === payload.id_partido_tenis)
      console.log(payload.id_partido_tenis)
      if (!partido) {
        this.partidos.push(payload)
        } else {
          partido = {...payload}
        }
      localStorage.setItem('partidosTenis', JSON.stringify(this.partidos))

    },
    setIdPartidoTenis(id) {
      if(id) {
        this.partido_en_juego = id
        localStorage.setItem('partidoTenisEnJuego', JSON.stringify(this.partido_en_juego))
      }

    }
    

  }

})