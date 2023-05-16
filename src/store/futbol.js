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
      descripcion: "Medio Centro",
      abreviatura: "MC"},
      {id: 6,
      descripcion: "Innterior Derecho",
      abreviatura: "ID"},
      {id: 7,
      descripcion: "Interior Izquierdo",
      abreviatura: "II"},
      {id: 8,
      descripcion: "Extremo Derecho",
      abreviatura: "ED"},
      {id: 9,
      descripcion: "Extremo Izquierdo",
      abreviatura: "EI"},
      {id: 10,
      descripcion: "Delantero Centro",
      abreviatura: "DC"},



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
      id_partido: "001",
      equipo_local: "Gandia",
      id_equipo_local: "1234",
      equipo_visitante: "Oliva",
      id_equipo_visitante: "4567",
      fecha: "23/12/2022",
      hora: "!7:00",
      lugar: "Gandia",
      estadio: "Guillermo Olagüe",
      marcador: {local: 0, visitante: 0},
      tiempo: {
        primeraParte: null,
        segundaParte: null,
        añadidoPrimera: null,
        añadidoSegunda: null
      }

    },
    {
      id_partido: "002",
      equipo_local: "Beniopa",
      id_equipo_local: "2345",
      equipo_visitante: "Bellreguard",
      id_equipo_visitante: "3456",
      fecha: "23/12/2022",
      hora: "!7:00",
      lugar: "Beniopa",
      estadio: "Pepito Martínez",
      marcador: {local: 0, visitante: 0},
      tiempo: {
        primeraParte: null,
        segundaParte: null,
        añadidoPrimera: null,
        añadidoSegunda: null
      }

    }
    ],
    equipos: [
      {
        id_equipo: "1234",
        nombre_equipo: "Gandia CF",
        display_name: "GCF",
        localidad: "Gandia",
        estadistica_equipo: {
          fueras_de_juego: 0,
          corners: 0,
          tiros_a_puerta: 0,
          posesión: "0%"
        },
        jugadores: [
          {
            id_jugador: 1,
            nombre_jugador: "Vicent Company Gregori",
            apodo: "Company",
            numero: 1,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 2,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 2,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 3,
            nombre_jugador: "Ayoze Espinar González",
            apodo: "Ayoze",
            numero: 3,
            posicion: "Lateral derecho",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 4,
            nombre_jugador: "Álvaro Escobar García",
            apodo: "Escobar",
            numero: 4,
            posicion: "Lateral derecho",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 5,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 5,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 6,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 6,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 7,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 7,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 8,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 8,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 9,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 9,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 10,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 10,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 11,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 11,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 12,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 12,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 13,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 13,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 14,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 14,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 15,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 15,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 16,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 16,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 17,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 17,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 18,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 18,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 19,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 19,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
        ]
      },
      {
        id_equipo: "4567",
        nombre_equipo: "Oliva CF",
        display_name: "OLI",
        localidad: "Oliva",
        estadistica_equipo: {
          fueras_de_juego: 0,
          corners: 0,
          tiros_a_puerta: 0,
          posesión: "0%"
        },
        jugadores: [
          {
            id_jugador: 1,
            nombre_jugador: "Pepet garcia gomez",
            apodo: "Pepet",
            numero: 22,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 2,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 2,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 3,
            nombre_jugador: "Ayoze Espinar González",
            apodo: "Ayoze",
            numero: 3,
            posicion: "Lateral derecho",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 4,
            nombre_jugador: "Álvaro Escobar García",
            apodo: "Escobar",
            numero: 4,
            posicion: "Lateral derecho",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 5,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 5,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 6,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 6,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 7,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 7,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 8,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 8,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 9,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 9,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 10,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 10,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 11,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 11,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 12,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 12,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 13,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 13,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 14,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 14,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 15,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 15,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 16,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 16,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 17,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 17,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 18,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 18,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
          {
            id_jugador: 19,
            nombre_jugador: "Vicent Puig Sendra",
            apodo: "Vicent Puig",
            numero: 19,
            posicion: "Portero",
            nacionalidad: "española",
            fecha_nacimiento: "12/13/2000",
            altura: "1,83 m",
            estadistica: {
              tarjetas_amarillas: 0,
              tarjeta_roja: 0,
              goles: 0,
              faltas: 0
            }
          },
        ]
      },
    ],

  }),
  getters: {
    marcador: state => {
      return state.partidos[0].marcador
    },
    tiempo: state => {
      return state.partidos[0].tiempo
    },
    getPosiciones: state => {
      return state.posiciones
    },
    getEquipos: state => {
      return state.equipos
    }

  },
  actions: {

    buscarPartido(id) {
      return this.partidos.find(partido => {
        return partido.id_partido == id
      })
    },
    buscarEquipo(id) {
      return this.equipos.find(equipo => {
        return equipo.id_equipo == id
      })
    },
    getIdEquipo(equipo) {
      const target = this.equipos.find(el => {
        return el.nombre_equipo == equipo
      })
      return target.id_equipo

    },

    // PARTIDOS --------------------------------------------

    addPartido(partido) {
      this.partidos.push(partido)
    },
    editarPartido(partido) {

      let partidoAntiguo = this.buscarPartido(partido.id_partido)


      partidoAntiguo.equipo_local = partido.equipo_local
      partidoAntiguo.id_equipo_local = partido.id_equipo_local
      partidoAntiguo.equipo_visitante = partido.equipo_visitante
      partidoAntiguo.id_equipo_visitante = partido.equipo_visitante
      partidoAntiguo.estadio = partido.estadio
      partidoAntiguo.lugar = partido.lugar
      partidoAntiguo.fecha = partido.fecha
      partidoAntiguo.hora = partido.hora


     /*  const nuevoPartido = {
        id_partido: partido.id_partido,
        equipo_local: partido.equipo_local,
        id_equipo_local: partido.id_equipo_local,
        equipo_visitante: partido.equipo_visitante,
        id_equipo_visitante: partido.id_equipo_visitante,
        fecha: partido.fecha,
        hora: partido.hora,
        lugar: partido.lugar,
        estadio: partido.estadio,
        marcador: {local: 0, visitante: 0},
        tiempo: {
          primeraParte: null,
          segundaParte: null,
          añadidoPrimera: null,
          añadidoSegunda: null
        }
  
      } 

      
      partidoAntiguo = nuevoPartido
      */
      // console.log(partidoAntiguo)

    },



    // MARCADOR --------------------------------------------------------
    gol(equipo, id) {
      // BUSCAR EQUIPO

      this.partidos[0].marcador[equipo] += 1
    },
    setTiempoPrimera(tiempo) {
      // console.log(tiempo)
      this.partidos[0].tiempo.primeraParte = tiempo
    },



    // EQUIPOS ---------------------------------------------------------

    addEquipo(equipo) {
      this.equipos.push(equipo)
    },





    // JUGADORES -----------------------------------------------------
    cargarEquipo() {
      const docSnap = onSnapshot(collection(db, "futbol_local"), (doc) => {
        doc.docChanges().forEach((change) => {
          if (change.type === "added") {
            let jugador = change.doc.data()
            jugador.id = change.doc.id
            // console.log(change.doc.id)
            this.local.push(jugador)
          }
        })
      })
    },


    eliminarJugador(id) {
      // console.log( this.equipos[0].jugadores)
      const nuevaLista = this.equipos[0].jugadores.filter(jug => {
        console.log(jug.id_jugador !== id)
        return jug.id_jugador !== id
      })
      this.equipos[0].jugadores = nuevaLista
      console.log( this.equipos[0].jugadores)
    },

    editarEquipo(id) {

    }
    

  }

})