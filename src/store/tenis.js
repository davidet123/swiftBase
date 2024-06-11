import { defineStore } from 'pinia'
// import { collection, onSnapshot, addDoc } from "firebase/firestore"
// the firestore instance
// import db from '../firebase/init.js'




export const useTenisStore = defineStore('tenisstore', {
  state: () => ({
    partidos: [], // LISTA PARTIDOS (OBJETO COMPLETO CREADO A PARTIR DE PLANTILLAS)
    partido: { // PLANTILLA PARTIDO
      id_partido_tenis: null,
      dia: null,
      hora: null,
      nombre_pista: null,
      lugar_partido: null,
      marcador_id: null,
      jugadores_id: [],
      competicion_id: null,
      num_sets: null


    },
    marcador: { //PLANTILLA MARCADORES
      num_set: null,
      juegos_local: null,
      juegos_visitante: null,
      puntos_local: null,
      puntos_visitante: null,
      texto_marcador: null

    },
    competiciones: [],
    jugador: { // PLANTILLA JUGADOR
      nombre: null,
      apellidos: null,
      edad: null,
      fecha_nacimiento: null,
      año_profesional: null,
      residencia: null,
      nacionalidad: null,
      mano: null,
      altura: null,
      peso: null
    }


   
  }),
  getters: {

  },
  actions: {
    

  }

})