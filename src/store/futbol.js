import { defineStore } from 'pinia'

import { collection, onSnapshot, addDoc } from "firebase/firestore"
// the firestore instance
import db from '../firebase/init.js'


export const usegFutbolStore = defineStore('futbol', {
  state: () => ({
    posiciones: [
      {id: 1,
      descripcion: "Portero",
      abreviatura: "p"},
      {id: 2,
      descripcion: "Defensa central",
      abreviatura: "DFC"},
      {id: 3,
      descripcion: "Lateral izquierdo",
      abreviatura: "DFI"},
      {id: 4,
      descripcion: "Lateral derecho",
      abreviatura: "DFD"},
      {id: 5,
      descripcion: "Portero",
      abreviatura: "GK"},
      {id: 6,
      descripcion: "Portero",
      abreviatura: "GK"},
      {id: 7,
      descripcion: "Portero",
      abreviatura: "GK"},
      {id: 8,
      descripcion: "Portero",
      abreviatura: "GK"},



      /* 
      "Defensa central",
      "Lateral izquierdo",
      "Lateral derecho",
      "Medio centro",
      "Interior derecho",
      "Interior izquierdo",
      "Delantero Centro" */
    ],
    local: [],
    visitante: [],
    partidos: [{
      equipo_local: "Gandia",
      id_equipo_local: "1234",
      equipo_visitante: "Oliva",
      id_equipo_visitante: "4567",
      fecha: "23/12/2022",
      hora: "!7:00",
      lugar: "Gandia",
      estadio: "Guillermo Olagüe"

    }],
    equipos: [
      {
        id_equipo: "1234",
        nombre_equipo: "Gandia CF",
        localidad: "Gandia",
        jugadores: [
          {
            id_jugador: 1,
            nombre_jugador: "Vicent Company Gregori",
            apodo: "Company",
            numero: 1,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m"
          },
          {
            id_jugador: 2,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 13,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m"
          },
          {
            id_jugador: 3,
            nombre_jugador: "Ayoze Espinar González",
            apodo: "Ayoze",
            numero: 4,
            posicion: "Lateral derecho",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m"
          },
          {
            id_jugador: 4,
            nombre_jugador: "Álvaro Escobar García",
            apodo: "Escobar",
            numero: 2,
            posicion: "Lateral derecho",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m"
          },
          {
            id_jugador: 5,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 13,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m"
          },
          {
            id_jugador: 6,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 13,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m"
          },
          {
            id_jugador: 7,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 13,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m"
          },
          {
            id_jugador: 8,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 13,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m"
          },
          {
            id_jugador: 9,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 13,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m"
          },
          {
            id_jugador: 10,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 13,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m"
          },
          {
            id_jugador: 11,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 13,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m"
          },
          {
            id_jugador: 12,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 13,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m"
          },
          {
            id_jugador: 13,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 13,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m"
          },
          {
            id_jugador: 14,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 13,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m"
          },
          {
            id_jugador: 15,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 13,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m"
          },
          {
            id_jugador: 16,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 13,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m"
          },
          {
            id_jugador: 17,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 13,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m"
          },
          {
            id_jugador: 18,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 13,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m"
          },
          {
            id_jugador: 19,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 13,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m"
          },
        ]
      },
      {
        id_equipo: "4567",
        nombre_equipo: "Oliva CF",
        localidad: "Oliva"
      },
    ],

  }),
  getters: {

  },
  actions: {
    cargarEquipo() {
      const docSnap = onSnapshot(collection(db, "futbol_local"), (doc) => {
        doc.docChanges().forEach((change) => {
          if (change.type === "added") {
            let jugador = change.doc.data()
            jugador.id = change.doc.id
            console.log(change.doc.id)
            this.local.push(jugador)
          }
        })
      })
    },
    eliminarJugador(id) {
      console.log( this.equipos[0].jugadores)
      const nuevaLista = this.equipos[0].jugadores.filter(jug => {
        console.log(jug.id_jugador !== id)
        return jug.id_jugador !== id
      })
      this.equipos[0].jugadores = nuevaLista
      console.log( this.equipos[0].jugadores)
    }
    

  }

})