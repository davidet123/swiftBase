import { defineStore } from 'pinia'

import { collection, onSnapshot, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytes } from "firebase/storage";
// the firestore instance
import db from '../firebase/init.js'


export const usegFutbolStore = defineStore('futbol', {
  state: () => ({
    cargando_partidos: false,
    cargando_equipos: false,
    cargando_marcadores: false,

    loading_state: false,
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
    partidos: [],
    marcadores: [],
    competiciones: [],
    partido_cargado: null,
    /* partidos: [{
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
    ], */
    equipos: [],
    /*equipos: [
      {
        // id_equipo: "1234",
        nombre_equipo: "Gandia CF",
        display_name: "GCF",
        localidad: "Gandia",
        estadistica_equipo: {
          fueras_de_juego: 0,
          corners: 0,
          tiros_a_puerta: 0,
          posesión: "0%",
          disparos: 0,
          disparos_al_arco: 0,
          saques_de_esquina: 0
        }, 
        jugadores: ['GCF1', 'GCF2', 'GCF3'],
        cuerpo_tecnico: [
          {
            id_cuerpo_tecnico: 'GCFENT',
            titulo: "Entrenador",
            nombre: null,
            fecha_nacimiento: null,
            nacionalidad: null
          },
          {
            id_cuerpo_tecnico: 'GCFSENT',
            titulo: "Segundo entrenador",
            nombre: null,
            fecha_nacimiento: null,
            nacionalidad: null
          },
          {
            id_cuerpo_tecnico: 'GCFDEL',
            titulo: "Delegado",
            nombre: null,
            fecha_nacimiento: null,
            nacionalidad: null
          }
        ]
         jugadores: [
          {
            id_jugador: 'GCF1',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'GCF2',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'GCF3',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'GCF4',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'GCF5',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'GCF6',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'GCF7',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'GCF8',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'GCF9',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'GCF10',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'GCF11',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'GCF12',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'GCF13',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'GCF14',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'GCF15',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'GCF16',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'GCF17',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'GCF18',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'GCF19',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
        ] 
      },
      {
        // id_equipo: "4567",
        nombre_equipo: "Oliva CF",
        display_name: "OLI",
        localidad: "Oliva",
        estadistica_equipo: {
          fueras_de_juego: 0,
          corners: 0,
          tiros_a_puerta: 0,
          posesión: "0%",
          disparos: 0,
          disparos_al_arco: 0,
          saques_de_esquina: 0
        }, 
        jugadores: ['OLI1', 'OLI2', 'OLI3', 'OLI4'],
        cuerpo_tecnico: [
          {
            id_cuerpo_tecnico: 'OLIENT',
            titulo: "Entrenador",
            nombre: null,
            fecha_nacimiento: null,
            nacionalidad: null
          },
          {
            id_cuerpo_tecnico: 'OLISENT',
            titulo: "Segundo entrenador",
            nombre: null,
            fecha_nacimiento: null,
            nacionalidad: null
          },
          {
            id_cuerpo_tecnico: 'OLIDEL',
            titulo: "Delegado",
            nombre: null,
            fecha_nacimiento: null,
            nacionalidad: null
          }
        ]
         jugadores: [
          {
            id_jugador: "OLI1",
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: "OLI2",
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'OLI3',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'OLI4',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'OLI5',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'OLI6',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'OLI7',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'OLI8',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'OLI9',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'OLI10',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'OLI11',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'OLI12',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'OLI13',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'OLI14',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'OLI15',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'OLI16',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'OLI17',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'OLI18',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
          {
            id_jugador: 'OLI19',
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
              faltas: 0,
              disparos: 0,
              disparos_al_arco: 0
            }
          },
        ] 
      },
    ],*/
    jugadores: [],
    /* jugadores: [
      {
        id_jugador: 'GCF1',
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
          faltas: 0,
          disparos: 0,
          disparos_al_arco: 0
        }
      },
      {
        id_jugador: 'GCF2',
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
          faltas: 0,
          disparos: 0,
          disparos_al_arco: 0
        }
      },
      {
        id_jugador: 'GCF3',
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
          faltas: 0,
          disparos: 0,
          disparos_al_arco: 0
        }
      },
      {
        id_jugador: "OLI1",
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
          faltas: 0,
          disparos: 0,
          disparos_al_arco: 0
        }
      },
      {
        id_jugador: "OLI2",
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
          faltas: 0,
          disparos: 0,
          disparos_al_arco: 0
        }
      },
      {
        id_jugador: 'OLI3',
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
          faltas: 0,
          disparos: 0,
          disparos_al_arco: 0
        }
      },
      {
        id_jugador: 'OLI4',
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
          faltas: 0,
          disparos: 0,
          disparos_al_arco: 0
        }
      },
      {
        id_jugador: 'OLI5',
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
          faltas: 0,
          disparos: 0,
          disparos_al_arco: 0
        }
      },
      {
        id_jugador: 'OLI6',
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
          faltas: 0,
          disparos: 0,
          disparos_al_arco: 0
        }
      },
    ] */

  }),
  getters: {
    marcador: state => state.partidos[0].marcador,
    tiempo: state => state.partidos[0].tiempo,
    getPosiciones: state => state.posiciones,
    getEquipos: state => state.equipos,
    getJugadores: state => state.jugadores,
    cargandoPartidos: state => state.cargando_partidos,
    cargandoEquipos: state => state.cargando_equipos,
    loading: state => state.loading_state,
    getPartidos: state => state.partidos,
    getCompeticiones: state => state.competiciones
    // getEquipoById: state => {
    //   return id => state.partidos.find(partido => id === partido.id)
    // }

  },
  actions: {

    
    getIdEquipo(equipo) {
      const target = this.equipos.find(el => {
        return el.nombre_equipo == equipo
      })
      return target.id_equipo
      
    },
    
    // PARTIDOS --------------------------------------------

    setPartidoEnJuego(id) {
      this.partido_cargado = id
    },
    buscarPartido(id) {
      return this.partidos.find(partido => {
        return partido.id_partido == id
      })
    },
    
    async addPartido(partido, marcador) {
      const docRef = await addDoc(collection(db, 'partidos_futbol'), partido)
      partido.id_partido = docRef.id 
      marcador.id_partido = docRef.id
      this.addMarcadorDB(marcador) 
      this.addIdPartidoAJugador(partido)
    },

    async editarPartido(partido) {

      let nuevoPartido = this.buscarPartido(partido.id_partido)

      nuevoPartido.equipo_local = partido.equipo_local
      nuevoPartido.id_equipo_local = partido.id_equipo_local
      nuevoPartido.equipo_visitante = partido.equipo_visitante
      nuevoPartido.id_equipo_visitante = partido.equipo_visitante

      nuevoPartido.estadio = partido.estadio
      nuevoPartido.lugar = partido.lugar
      nuevoPartido.fecha = partido.fecha
      nuevoPartido.hora = partido.hora


      const docRef = doc(db, "partidos_futbol", partido.id_partido)
      await updateDoc(docRef, nuevoPartido)

    },
    async updateAlineacionDB(partido) {
      let nuevoPartido = this.buscarPartido(partido.id_partido)

      nuevoPartido.equipo_local = partido.equipo_local
      nuevoPartido.id_equipo_local = partido.id_equipo_local
      nuevoPartido.equipo_visitante = partido.equipo_visitante
      nuevoPartido.id_equipo_visitante = partido.equipo_visitante

      const docRef = doc(db, "partidos_futbol", partido.id_partido)
      await updateDoc(docRef, nuevoPartido)

    },

    async cargarPartidos() {
      this.cargando_partidos = true
      console.log("CARGANDO PARTIDOS...")
      this.partidos = []
      try {
        const docSnap = onSnapshot(collection(db, "partidos_futbol"), (doc) => {
          doc.docChanges().forEach((change) => {
            if (change.type === "added") {
              let partido = change.doc.data()
              partido.id_partido = change.doc.id
              this.partidos.push(partido)
            } else if (change.type === "modified") {
              let nuevo_partido = change.doc.data()
              nuevo_partido.id_partido = change.doc.id
              this.actualizarPartido(nuevo_partido)
              console.log("ACTIALIADNDO PARTIDO")
            }
          })
        })
        
      } catch (err) {
        console.log(err)
      } finally {
        this.cargando_partidos = false
      }
    },
    actualizarPartido(partido) {
      console.log(partido)
      let part = this.partidos.find(p => {
        return p.id_partido === partido.id_partido
      })
      console.log(part)
      part.equipo_local = partido.equipo_local
      part.equipo_visitante = partido.equipo_visitante
      part.estadio = partido.estadio
      part.fecha = partido.fecha
      part.hora = partido.hora
      part.lugar = partido.lugar
      // part.titulares = partido.titulares
      
    },

    async updateEstGeneralPartido(partido) {
      let part = this.partidos.find(p => {
        return p.id_partido === partido.id_partido
      })

    },

    async updateEstPartido(id_partido, jugador) {

      const docRef = doc(db, "partidos_futbol", id_partido)
      
      const partido = this.partidos.find(part => {
        return part.id_partido === id_partido
      })
      
      let buscaJugador
      buscaJugador = partido.equipo_local.jugadores.find(jug => {
        return jug.id_jugador === jugador.id_jugador
      })
      
      if (!buscaJugador) {
        buscaJugador = partido.equipo_visitante.jugadores.find(jug => {
          return jug.id_jugador === jugador.id_jugador
        })
      }
      buscaJugador.estadistica = jugador.estadistica

      console.log(buscaJugador)
      await updateDoc(docRef, {
        equipo_local: partido.equipo_local,
        equipo_visitante: partido.equipo_visitante
      })
    },
    async eliminarPartido (id) {
      await deleteDoc(doc(db, 'partidos_futbol', id))
      this.partidos = this.partidos.filter(el => el.id_partido !== id)
      this.eliminarMarcador(id)
    },
    /* async cargarPartidos() {
      this.loading_state = true
      console.log("CARGANDO PARTIDOS...")
      this.partidos = []
      const docSnap = onSnapshot(collection(db, "partidos_futbol"), (doc) => {
        doc.docChanges().forEach((change) => {
          if (change.type === "added") {
            let partido = change.doc.data()
            partido.id_partido = change.doc.id
            // console.log(change.doc.id)
            this.partidos.push(partido)
          } else if (change.type == "modified") {
            let equipo = change.doc.data()
            console.log(equipo)
          }
        })
      })

      this.loading_state = false
    }, */



    // MARCADOR --------------------------------------------------------
    gol(equipo, id) {
      // BUSCAR EQUIPO

      this.partidos[0].marcador[equipo] += 1
    },
    setTiempoPrimera(tiempo) {
      // console.log(tiempo)
      this.partidos[0].tiempo.primeraParte = tiempo
    },
    actualizarMarcador(marcador) {
      const m = this.marcadores.find(el => {
        return el.id_marcador === marcador.id_marcador
      })

      m.goles = marcador.goles
      m.temporizador = marcador.temporizador
    },
    buscarMarcador(id) {
      return this.marcadores.find(marcador => {
        return marcador.id_partido == id
      })

    },

    updateMarcadorDB(id_partido, marcador) {

      console.log(marcador)
    },

    async addMarcadorDB(marcador) {
      const docRef = await addDoc(collection(db, 'marcadores_futbol'), marcador)
      marcador.id_marcador = docRef.id 

    },

    async cargarMarcadores() {
      this.cargando_marcadores = true
      console.log("CARGANDO MARCADORES...")
      this.partidos = []
      try {
        const docSnap = onSnapshot(collection(db, "marcadores_futbol"), (doc) => {
          doc.docChanges().forEach((change) => {
            if (change.type === "added") {
              let marcador = change.doc.data()
              marcador.id_marcador = change.doc.id
              this.marcadores.push(marcador)
            } else if (change.type === "modified") {
              let nuevo_marcador = change.doc.data()
              nuevo_marcador.id_marcador = change.doc.id
              this.actualizarMarcador(nuevo_marcador)
              console.log("Marcador actualizado")
            }
          })
        })
        
      } catch (err) {
        console.log(err)
      } finally {
        this.cargando_marcadores = false
      }
    },

    async updateMarcadorDB(id, payload) {
      const docRef = doc(db, "marcadores_futbol", id)
      console.log(payload.temporizador)
      await updateDoc(docRef, {
        goles: payload.goles,
        temporizador: payload.temporizador
      })
    },
    getMarcador(id) {
      return this.marcadores.find(marcador => {
        return marcador.id_partido == id
      })
    },
    async eliminarMarcador(id) {
      console.log(this.marcadores)
      const marcador = this.marcadores.find(m => {
        return m.id_partido === id
      })
      console.log(marcador.id_marcador)

      await deleteDoc(doc(db, 'marcadores_futbol', marcador.id_marcador))

      this.marcadores= this.marcadores.filter(el => el.id_marcador !== marcador.id_marcador)

    },



    // EQUIPOS ---------------------------------------------------------

    async addEquipo(equipo) {
      const docRef = await addDoc(collection(db, 'equipos_futbol'), equipo)
      // equipo.id_equipo = docRef.id      
      // this.equipos.push(equipo)
    },

    buscarEquipo(id) {
      return this.equipos.find(equipo => {
        return equipo.id_equipo == id
      })
    },
    /* addEquiposToDb() {
      this.equipos.forEach(equipo=> {
        this.addEquipo(equipo)
      })
    }, */


    async editarEquipo(id) {
      


    },

    getEquipoById(id) {
      return this.equipos.find(equipo => {
        return equipo.id_equipo == id
      })
    },
    async cargarEquipos() {
      console.log("CARGANDO EQUIPOS...")
      this.cargando_equipos = true
      this.equipos = []
      const docSnap = onSnapshot(collection(db, "equipos_futbol"), (doc) => {
        doc.docChanges().forEach((change) => {
          if (change.type === "added") {
            let equipo = change.doc.data()
            equipo.id_equipo = change.doc.id
            this.equipos.push(equipo)
          }
          // if (change.type == "modified") {
          //   let equipo = change.doc.data()
          //   console.log(equipo)
          // }
        })
        this.cargando_equipos = false
      })
    },

    uploadImage(file, nombre) {
      const storage = getStorage();
      const storageRef = ref(storage, nombre);

      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
    },

   




    // JUGADORES -----------------------------------------------------


    async cargarJugadores() {
      this.loading_state = true
      const docSnap = onSnapshot(collection(db, "jugadores_futbol"), (doc) => {
        doc.docChanges().forEach((change) => {
          if (change.type === "added") {
            let jugador = change.doc.data()
            jugador.id_db = change.doc.id
            // console.log(change.doc.id)
            this.jugadores.push(jugador)
          }
        })
      })
      this.loading_state = false

    },
    addJugadores(jugadores) {
      jugadores.forEach(jugador => {
        this.addJugadorToDb(jugador)
        this.jugadores.push(jugador)
      })
    },
    async addToDb(jugador) {

      const docRef = await addDoc(collection(db, 'jugadores_futbol'), jugador)
      jugador.id_jugador = docRef.id
      
      // this.partidos.push(partido)
    },
    async addJugadorToDb(jugador) {

      const docRef = await addDoc(collection(db, 'jugadores_futbol'), jugador)
      jugador.id_jugador_db = docRef.id
      
      // this.jugadores.push(jugadores)
    },
    async updateJugador(jugador) {
      const docRef = doc(db, "jugadores_futbol", jugador.id_db) 

      await updateDoc(docRef, {
          nombre_jugador: jugador.nombre_jugador,
          apodo: jugador.apodo,
          numero: jugador.numero,
          posicion: jugador.posicion,
          nacionalidad: jugador.nacionalidad,
          fecha_nacimiento: jugador.fecha_nacimiento,
          altura: jugador.altura,
          partidos: jugador.partidos
      })

    },
    addIdPartidoAJugador (partido) {
      const listadoJugadores = [...partido.equipo_local.jugadores, ...partido.equipo_visitante.jugadores]
      listadoJugadores.forEach(jugador => {
        jugador.partidos.push(partido.id_partido)
        this.updateJugador(jugador)
      })

    },

    

    buscarJugador(id_jugador) {
      const id_partido = this.partido_cargado
      const partido = this.partidos.find(part => {
        return part.id_partido === id_partido
      })
      let buscaJugador
      buscaJugador = partido.equipo_local.jugadores.find(jug => {
        return jug.id_jugador === id_jugador
      })
      // console.log(buscaJugador)
      if (!buscaJugador) {
        buscaJugador = partido.equipo_visitante.jugadores.find(jug => {
          return jug.id_jugador === id_jugador
        })
      }
      console.log(buscaJugador)

      return buscaJugador
    },
    BuscarJugadorPorEquipo(equipo) {
      return this.jugadores.filter(jug => {
        return jug.id_equipo !== equipo
      })
    },

    cargarJugadoresEquipo(equipo) {
      let tempEquipo = []
      const q = query(collection(db, "jugadores_futbol"), where("equipo", "==", equipo));
      const querySnapshot = getDocs(q)
      .then(res => {
        res.forEach(doc => {
          let jugador = doc.data()
          jugador.id_db = doc.id
            // console.log(change.doc.id)
          tempEquipo.push(jugador)
          // console.log(doc.data())
          // tempEquipo.push(doc.data())
        })
      })
      return tempEquipo
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


    // COMPETICIONES -----------------------------------------------------------
    async cargarCompeticiones() {
      const docSnap = onSnapshot(collection(db, "competiciones"), (doc) => {
        doc.docChanges().forEach((change) => {
          if (change.type === "added") {
            let competicion = change.doc.data()
            competicion.id_competicion = change.doc.id
            // console.log(change.doc.id)
            this.competiciones.push(competicion)
          } else if (change.type === "modified") {
            let nueva_competicion = change.doc.data()
            nueva_competicion.id_competicion = change.doc.id
            this.actualizarCompeticion(nueva_competicion)
            console.log("Competicion actualizada")
          } else if (change.type === "removed") {
            let nueva_competicion = change.doc.data()
            nueva_competicion.id_competicion = change.doc.id
            this.competiciones = this.competiciones.filter(el => el.id_competicion !== nueva_competicion.id_competicion)
          }
        })
      })

    },
    async addCompeticion(comp) {
      console.log(comp)
      const docRef = await addDoc(collection(db, 'competiciones'), comp)      
    },

    async eliminarCompeticion(comp) {
      await deleteDoc(doc(db, 'competiciones', comp.id_competicion))
      // this.competiciones = this.competiciones.filter(el => el.id_competicion !== comp.id_competicion)
      // console.log(this.competiciones)
    },
    async updateCompeticionDB(comp) {
      console.log(comp)
      const docRef = doc(db, "competiciones", comp.id_competicion)
      await updateDoc(docRef, {
        nombre: comp.nombre
      })
    },
    actualizarCompeticion(comp) {
      const c = this.competiciones.find(el => {
        return el.id_competicion === comp.id_competicion
      })
      c.nombre = comp.nombre
    }
  }

})