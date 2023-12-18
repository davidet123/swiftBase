
import { defineStore } from 'pinia'

import { usegFutbolStore } from './futbol'

// import { doc, collection, onSnapshot, addDoc, updateDoc } from "firebase/firestore"
// the firestore instance
// import db from '../firebase/init.js'

export const useFutbolWebsocketStore = defineStore('futbolWebsocket', {


  state: () => ({
    connectionState: null,
    socket: null,
    URLWebsocket: 'ws://localhost:8001',
    wsData: null,
    wsPartido: null,
    wsMarcador: null,
    minutosPartido: null
  }),
  getters: {
    getTest (state) {
      return state.test
    },
    errorMSG (state) {
      switch (state.connectionState) {
        case 0:
          return "Conectando..."
          break
        case 1:
          return "CONECTADO"
          break
        case 2:
          return "Cerrando conexión..."
          break
        case 3:
          return "NO HAY CONEXIÓN"
          break
        default:
          return "ESPERANDO CONEXIÓN"
          break
      }
    },
    isConnected: (state) => !!state.socket,
    getMinutosPartido: state => state.minutosPartido,

  },
  actions: {
    setMinutosPartido(tiempo) {
      this.minutosPartido = tiempo
    },
    
    conectarWS() {
      if (this.isConnected) return;

      this.socket = new WebSocket(this.URLWebsocket);

      this.socket.addEventListener('open', () => {
        console.log('Connected to WebSocket server.');
      });

      this.socket.addEventListener('message', (event) => {

        const res = JSON.parse(event.data)
        if (res.hasOwnProperty('partido')) {
          this.wsPartido = res.partido
          localStorage.setItem('partido', JSON.stringify(res.partido))
        } 
        if (res.hasOwnProperty('marcador')) {
          this.wsMarcador = res.marcador
          localStorage.setItem('marcador', JSON.stringify(res.marcador))
        }


        // this.wsData = JSON.parse(event.data)
        // localStorage.setItem('partido', JSON.stringify(this.wsData))
        // console.log(this.test)
      });

      this.socket.addEventListener('close', (event) => {
        console.log(`WebSocket closed with code: ${event.code}, reason: ${event.reason}`);
        this.socket = null;
      });
    },
    enviarWS(mensaje) {
      // console.log(mensaje)
      // Enviar mensaje al servidor
      // const mensaje = {mensaje: 'test'}
      if (this.isConnected) {
        this.socket.send(JSON.stringify(mensaje));
      }
    },
    pararWS() {
      // Desconectar el WebSocket
      if (this.isConnected) {
        this.socket.close();
      }
    },
    getLocalStorage() {
      if(localStorage.getItem('partido') !== null && localStorage.getItem('marcador') !== null) {
        const partido = JSON.parse(localStorage.getItem('partido'))
        const marcador = JSON.parse(localStorage.getItem('marcador'))
        this.wsPartido = partido
        this.wsMarcador = marcador
        const futbolStore = usegFutbolStore()
        // futbolStore.addPartidoWS(partido)
        // futbolStore.addMarcadorWS(marcador)
      } else {
        this.resetLocalStorage()
      }
    },
    setMarcadorLS() {

    },
    resetLocalStorage() {
      console.log("reset Local Storage")
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
        tiempo: {
          primeraParte: null,
          segundaParte: null,
          añadidoPrimera: null,
          añadidoSegunda: null
        },
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
        goles: {
          local: 0,
          visitante: 0
        },
        temporizador: {
          inicio_tiempo: false,
          inicio_prorroga: false,
          parte_en_juego: 1,
          añadido: {
            primera: 0,
            segunda: 0,
            segunda_prorroga: 0,
            primera_prorroga: 0
          },
          tiempo: {
            primera: 0,
            segunda: 2700,
            segunda_prorroga: 5400,
            primera_prorroga: 6300
          },
          prorroga: {
            primera: 0,
            segunda: 0
          },
          posesion: {
            local: 0,
            visitante: 0,
            equipo_en_posesion: "local"
          }
        }
      }
      partido.equipo_local = this.crearEquipo('local')
      partido.equipo_visitante = this.crearEquipo('visitante')
      // console.log(marcador)

      
      localStorage.setItem('partido', JSON.stringify(partido))
      localStorage.setItem('marcador', JSON.stringify(marcador))
      this.enviarWS({partido})
      this.enviarWS({marcador})
    },
    crearEquipo(equipo) {
      let equipo_temp = {
        id_equipo: `localStorage_${equipo}`,
        nombre_equipo: null,
        display_name: null,
        localidad: null,
        estadistica_equipo: {
          fueras_de_juego: 0,
          corners: 0,
          tiros_a_puerta: 0,
          posesión: "0%",
          disparos: 0,
          disparos_al_arco: 0,
          saques_de_esquina: 0
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
          tarjetas_amarillas: 0,
          tarjeta_roja: 0,
          goles: 0,
          faltas: 0,
          disparos: 0,
          disparos_al_arco: 0,
          goles: []
        },
        fecha_nacimiento: null,
        id_jugador: null,
        nacionalidad: null,
        nombre_jugador: null,
        numero: null,
        posicion: null
      }

      for(let i = 0; i < 25; i++) {
        let jugador_temp = {...jugador}
        jugador_temp.equipo = `localStorage_${equipo}`
        jugador_temp.id_jugador = `${equipo}_${i}`
        equipo_temp.jugadores.push(jugador_temp)

      }

      return equipo_temp

    },
    editarPartido(partido) {
      this.wsPartido = partido
      localStorage.setItem('partido', JSON.stringify(partido))
      this.enviarWS({partido: partido})
    }
  }
})


