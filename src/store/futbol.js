import { defineStore } from 'pinia'

import { collection, onSnapshot, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytes } from "firebase/storage";
// the firestore instance
import db from '../firebase/init.js'

import { useFutbolWebsocketStore } from "./futbolWebsocket"


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
      descripcion: "Interior Derecho",
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
    ],
    local: [],
    visitante: [],
    partidos: [],
    marcadores: [],
    competiciones: [],
    partido_cargado: null,
    equipos: [],
    jugadores: [],
    minutosPartido: null,
    partido_LS: null,
    plantilla_partido: {
      estadio: "San Mamés",
      id_equipo_visitante: {
          "id_equipo": "ZqobmOXFkOgURYzsg0IE",
          "titulares": [
              "23",
              "2",
              "17",
              "12",
              "18",
              "6",
              "7",
              "8",
              "9",
              "3",
              "11"
          ],
          "formacion": [
              {
                  "pos": {
                      "y": 170,
                      "x": 0
                  },
                  "dorsal": "1",
                  "apodo": "Casillas"
              },
              {
                  "pos": {
                      "y": 78,
                      "x": -400
                  },
                  "apodo": "Albiol",
                  "dorsal": "2"
              },
              {
                  "pos": {
                      "x": -125,
                      "y": 78
                  },
                  "dorsal": "3",
                  "apodo": "Piqué"
              },
              {
                  "apodo": "Marchena",
                  "pos": {
                      "x": 125,
                      "y": 78
                  },
                  "dorsal": "4"
              },
              {
                  "apodo": "Puyol",
                  "pos": {
                      "y": 78,
                      "x": 400
                  },
                  "dorsal": "5"
              },
              {
                  "apodo": "Iniesta",
                  "pos": {
                      "x": -265,
                      "y": -90
                  },
                  "dorsal": "6"
              },
              {
                  "apodo": "Villa",
                  "pos": {
                      "x": 0,
                      "y": -90
                  },
                  "dorsal": "7"
              },
              {
                  "apodo": "Xavi",
                  "pos": {
                      "x": 265,
                      "y": -90
                  },
                  "dorsal": "8"
              },
              {
                  "apodo": "Torres",
                  "pos": {
                      "x": 0,
                      "y": -221
                  },
                  "dorsal": "9"
              },
              {
                  "pos": {
                      "y": -350,
                      "x": -140
                  },
                  "apodo": "Cesc",
                  "dorsal": "10"
              },
              {
                  "dorsal": "11",
                  "apodo": "Capdevila",
                  "pos": {
                      "x": 140,
                      "y": -350
                  }
              }
          ],
          "cuerpo_tecnico": [
              {
                  "nombre": "Vicente del Bosque",
                  "fecha_nacimiento": null,
                  "id_cuerpo_tecnico": "ent_1692622282391",
                  "titulo": "Entrenador",
                  "nacionalidad": null
              },
              {
                  "nombre": "Toni Grande",
                  "id_cuerpo_tecnico": "seg_ent_1692622282391",
                  "nacionalidad": null,
                  "fecha_nacimiento": null,
                  "titulo": "Segundo entrenador"
              },
              {
                  "fecha_nacimiento": null,
                  "titulo": "Delegado",
                  "id_cuerpo_tecnico": "del_1692622282391",
                  "nombre": "Silvia Dorschnerova",
                  "nacionalidad": null
              }
          ],
          "jugadores": [
              {
                  "altura": null,
                  "id_db": "Ys0VyrZNEP9y16JhGPvh",
                  "apodo": "Casillas",
                  "id_jugador": "ESP0",
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "equipo": "ESP",
                  "nacionalidad": null,
                  "fecha_nacimiento": null,
                  "estadistica": {
                      "disparos": 0,
                      "disparos_al_arco": 0,
                      "faltas": 0,
                      "tarjeta_roja": 0,
                      "tarjetas_amarillas": 0,
                      "goles": []
                  },
                  "nombre_jugador": "Iker Casillas",
                  "numero": "1",
                  "posicion": "Portero"
              },
              {
                  "numero": "2",
                  "estadistica": {
                      "disparos_al_arco": 0,
                      "tarjetas_amarillas": 0,
                      "tarjeta_roja": 0,
                      "goles": [],
                      "faltas": 0,
                      "disparos": 0
                  },
                  "id_db": "A7nKdmz6hsfBSiLA1oTE",
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "nacionalidad": null,
                  "id_jugador": "ESP1",
                  "nombre_jugador": "Raúl Albiol",
                  "fecha_nacimiento": null,
                  "equipo": "ESP",
                  "apodo": "Albiol",
                  "posicion": "Defensa central",
                  "altura": null
              },
              {
                  "apodo": "Piqué",
                  "nombre_jugador": "Gerad Piqué",
                  "nacionalidad": null,
                  "numero": "3",
                  "posicion": "Defensa central",
                  "equipo": "ESP",
                  "estadistica": {
                      "disparos": 0,
                      "tarjetas_amarillas": 1,
                      "goles": [],
                      "tarjeta_roja": 0,
                      "disparos_al_arco": 0,
                      "faltas": 0
                  },
                  "id_db": "KhkE5w0xkTvUptXhObzC",
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "id_jugador": "ESP2",
                  "altura": null,
                  "fecha_nacimiento": null
              },
              {
                  "estadistica": {
                      "disparos_al_arco": 0,
                      "faltas": 0,
                      "tarjetas_amarillas": 0,
                      "goles": [],
                      "tarjeta_roja": 0,
                      "disparos": 0
                  },
                  "fecha_nacimiento": null,
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "altura": null,
                  "posicion": "Defensa central",
                  "nacionalidad": null,
                  "equipo": "ESP",
                  "apodo": "Marchena",
                  "id_jugador": "ESP3",
                  "nombre_jugador": "Carlos Marchena",
                  "numero": "4",
                  "id_db": "tFXg4dDmjQimbmQS44Y2"
              },
              {
                  "id_db": "8yFVOjiPag27utQgprkm",
                  "nacionalidad": null,
                  "fecha_nacimiento": null,
                  "nombre_jugador": "Carles Puyol",
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "numero": "5",
                  "estadistica": {
                      "goles": [],
                      "disparos_al_arco": 0,
                      "tarjetas_amarillas": 0,
                      "faltas": 0,
                      "disparos": 0,
                      "tarjeta_roja": 0
                  },
                  "altura": null,
                  "id_jugador": "ESP4",
                  "posicion": "Defensa central",
                  "apodo": "Puyol",
                  "equipo": "ESP"
              },
              {
                  "fecha_nacimiento": null,
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "id_db": "iSPIa5OPifMTAS8j7sLE",
                  "estadistica": {
                      "disparos_al_arco": 0,
                      "faltas": 0,
                      "tarjetas_amarillas": 0,
                      "goles": [],
                      "disparos": 0,
                      "tarjeta_roja": 0
                  },
                  "id_jugador": "ESP5",
                  "posicion": "Medio Centro",
                  "equipo": "ESP",
                  "altura": null,
                  "apodo": "Iniesta",
                  "numero": "6",
                  "nombre_jugador": "Andrés Iniesta",
                  "nacionalidad": null
              },
              {
                  "estadistica": {
                      "disparos": 0,
                      "disparos_al_arco": 0,
                      "faltas": 0,
                      "tarjeta_roja": 0,
                      "goles": [],
                      "tarjetas_amarillas": 0
                  },
                  "posicion": "Delantero Centro",
                  "equipo": "ESP",
                  "numero": "7",
                  "nombre_jugador": "David villa",
                  "id_jugador": "ESP6",
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "apodo": "Villa",
                  "fecha_nacimiento": null,
                  "nacionalidad": null,
                  "id_db": "WNP46SLNXVjLvn1K5dWf",
                  "altura": null
              },
              {
                  "id_db": "BCBoY8iRh7rgxoP0ngCc",
                  "altura": null,
                  "posicion": "Medio Centro",
                  "apodo": "Xavi",
                  "nombre_jugador": "Xavi Hernández",
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "fecha_nacimiento": null,
                  "id_jugador": "ESP7",
                  "estadistica": {
                      "tarjeta_roja": 0,
                      "disparos": 0,
                      "goles": [],
                      "tarjetas_amarillas": 0,
                      "faltas": 0,
                      "disparos_al_arco": 0
                  },
                  "numero": "8",
                  "nacionalidad": null,
                  "equipo": "ESP"
              },
              {
                  "posicion": "Delantero Centro",
                  "id_db": "lPqnlVduc430RSAMoTeX",
                  "apodo": "Torres",
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "estadistica": {
                      "disparos_al_arco": 0,
                      "goles": [],
                      "tarjetas_amarillas": 0,
                      "disparos": 0,
                      "faltas": 0,
                      "tarjeta_roja": 0
                  },
                  "fecha_nacimiento": null,
                  "equipo": "ESP",
                  "altura": null,
                  "nacionalidad": null,
                  "nombre_jugador": "Fernando Torres",
                  "id_jugador": "ESP8",
                  "numero": "9"
              },
              {
                  "estadistica": {
                      "disparos": 0,
                      "faltas": 0,
                      "tarjeta_roja": 0,
                      "goles": [],
                      "tarjetas_amarillas": 0,
                      "disparos_al_arco": 0
                  },
                  "altura": null,
                  "equipo": "ESP",
                  "fecha_nacimiento": null,
                  "nombre_jugador": "Cesc Fàbregas",
                  "id_db": "vYNaW33scm4C9ZTZSHLN",
                  "posicion": "Medio Centro",
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "apodo": "Cesc",
                  "nacionalidad": null,
                  "numero": "10",
                  "id_jugador": "ESP9"
              },
              {
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "fecha_nacimiento": null,
                  "apodo": "Capdevila",
                  "estadistica": {
                      "faltas": 0,
                      "goles": [],
                      "tarjeta_roja": 0,
                      "disparos": 0,
                      "disparos_al_arco": 0,
                      "tarjetas_amarillas": 0
                  },
                  "posicion": "Lateral izquierdo",
                  "nombre_jugador": "Joan Capdevila",
                  "numero": "11",
                  "altura": null,
                  "id_jugador": "ESP10",
                  "nacionalidad": null,
                  "equipo": "ESP",
                  "id_db": "XiVB63SJyjUGTcoSZ3Ul"
              },
              {
                  "estadistica": {
                      "tarjetas_amarillas": 0,
                      "tarjeta_roja": 0,
                      "disparos": 0,
                      "faltas": 0,
                      "goles": [],
                      "disparos_al_arco": 0
                  },
                  "equipo": "ESP",
                  "fecha_nacimiento": null,
                  "nacionalidad": null,
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "altura": null,
                  "id_jugador": "ESP11",
                  "apodo": "Valdés",
                  "id_db": "UEy1ARcc2j2ETqlLN5Vz",
                  "numero": "12",
                  "posicion": "Portero",
                  "nombre_jugador": "Victor Valdés"
              },
              {
                  "id_db": "kNFguGg43YCvmH4MWuKi",
                  "id_jugador": "ESP12",
                  "posicion": "Medio Centro",
                  "numero": "13",
                  "nacionalidad": null,
                  "estadistica": {
                      "disparos_al_arco": 0,
                      "tarjetas_amarillas": 0,
                      "tarjeta_roja": 0,
                      "faltas": 0,
                      "goles": [],
                      "disparos": 0
                  },
                  "apodo": "Mata",
                  "equipo": "ESP",
                  "nombre_jugador": "Juan Mata",
                  "fecha_nacimiento": null,
                  "altura": null,
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ]
              },
              {
                  "altura": null,
                  "nacionalidad": null,
                  "posicion": "Medio Centro",
                  "estadistica": {
                      "faltas": 0,
                      "tarjetas_amarillas": 0,
                      "tarjeta_roja": 0,
                      "goles": [],
                      "disparos_al_arco": 0,
                      "disparos": 0
                  },
                  "numero": "14",
                  "nombre_jugador": "Xabi Alonso",
                  "apodo": "Xabi",
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "fecha_nacimiento": null,
                  "equipo": "ESP",
                  "id_jugador": "ESP13",
                  "id_db": "oCX7e9iU3BqsDB8YuIPE"
              },
              {
                  "altura": null,
                  "numero": "15",
                  "id_db": "XGAQr64P6IgZIQcmUMRb",
                  "nombre_jugador": "Sergio Ramos",
                  "fecha_nacimiento": null,
                  "apodo": "Ramos",
                  "equipo": "ESP",
                  "id_jugador": "ESP14",
                  "posicion": "Defensa central",
                  "estadistica": {
                      "disparos_al_arco": 0,
                      "disparos": 0,
                      "faltas": 0,
                      "goles": [],
                      "tarjetas_amarillas": 0,
                      "tarjeta_roja": 0
                  },
                  "nacionalidad": null,
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ]
              },
              {
                  "numero": "16",
                  "fecha_nacimiento": null,
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "estadistica": {
                      "disparos_al_arco": 0,
                      "tarjeta_roja": 0,
                      "goles": [],
                      "tarjetas_amarillas": 0,
                      "disparos": 0,
                      "faltas": 0
                  },
                  "altura": null,
                  "equipo": "ESP",
                  "posicion": "Medio Centro",
                  "id_db": "IPtDpOiCKamTnr0wmTeA",
                  "apodo": "Busquets",
                  "nacionalidad": null,
                  "nombre_jugador": "Sergio Busquets",
                  "id_jugador": "ESP15"
              },
              {
                  "altura": null,
                  "apodo": "Arbeloa",
                  "equipo": "ESP",
                  "nombre_jugador": "Álvaro Arbeloa",
                  "numero": "17",
                  "id_jugador": "ESP16",
                  "nacionalidad": null,
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "fecha_nacimiento": null,
                  "estadistica": {
                      "tarjeta_roja": 0,
                      "tarjetas_amarillas": 0,
                      "faltas": 0,
                      "disparos": 0,
                      "goles": [],
                      "disparos_al_arco": 0
                  },
                  "id_db": "9LGYYZzu3ralUwsTHApO",
                  "posicion": "Lateral derecho"
              },
              {
                  "id_db": "o60htaLB6bWwErHFOy00",
                  "posicion": "Extremo Derecho",
                  "fecha_nacimiento": null,
                  "apodo": "Pedro",
                  "equipo": "ESP",
                  "nombre_jugador": "Pedro Rodríquez",
                  "altura": null,
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "numero": "18",
                  "estadistica": {
                      "disparos": 0,
                      "disparos_al_arco": 0,
                      "goles": [],
                      "tarjetas_amarillas": 0,
                      "tarjeta_roja": 0,
                      "faltas": 0
                  },
                  "nacionalidad": null,
                  "id_jugador": "ESP17"
              },
              {
                  "id_db": "Awq2AJn8jNh3Vhag4vYc",
                  "fecha_nacimiento": null,
                  "apodo": "Llorente",
                  "estadistica": {
                      "faltas": 0,
                      "tarjetas_amarillas": 0,
                      "goles": [],
                      "disparos_al_arco": 0,
                      "tarjeta_roja": 0,
                      "disparos": 0
                  },
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "numero": "19",
                  "posicion": "Delantero Centro",
                  "id_jugador": "ESP18",
                  "equipo": "ESP",
                  "altura": null,
                  "nombre_jugador": "Fernando Llorente",
                  "nacionalidad": null
              },
              {
                  "numero": "20",
                  "nombre_jugador": "Javi Martínez",
                  "id_jugador": "ESP19",
                  "equipo": "ESP",
                  "altura": null,
                  "posicion": "Medio Centro",
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "apodo": "Javi",
                  "id_db": "SFm1AJXsysfbYwUGpaNP",
                  "fecha_nacimiento": null,
                  "estadistica": {
                      "tarjeta_roja": 0,
                      "disparos": 0,
                      "faltas": 0,
                      "tarjetas_amarillas": 0,
                      "disparos_al_arco": 0,
                      "goles": []
                  },
                  "nacionalidad": null
              },
              {
                  "nacionalidad": null,
                  "fecha_nacimiento": null,
                  "nombre_jugador": "David Silva",
                  "altura": null,
                  "numero": "21",
                  "id_db": "2M6g2UeYOascPXMf0v6m",
                  "equipo": "ESP",
                  "estadistica": {
                      "faltas": 0,
                      "disparos_al_arco": 0,
                      "tarjeta_roja": 0,
                      "disparos": 0,
                      "tarjetas_amarillas": 0,
                      "goles": []
                  },
                  "posicion": "Delantero Centro",
                  "id_jugador": "ESP20",
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "apodo": "Silva"
              },
              {
                  "nacionalidad": null,
                  "fecha_nacimiento": null,
                  "numero": "22",
                  "posicion": "Extremo Derecho",
                  "id_jugador": "ESP21",
                  "apodo": "Navas",
                  "estadistica": {
                      "tarjeta_roja": 0,
                      "tarjetas_amarillas": 0,
                      "disparos": 0,
                      "goles": [],
                      "disparos_al_arco": 0,
                      "faltas": 0
                  },
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "nombre_jugador": "Jesús Navas",
                  "id_db": "myA8cGTS1UubIXtu621d",
                  "equipo": "ESP",
                  "altura": null
              },
              {
                  "nombre_jugador": "Pepe Reina",
                  "posicion": "Portero",
                  "nacionalidad": null,
                  "id_jugador": "ESP22",
                  "altura": null,
                  "apodo": "Reina",
                  "estadistica": {
                      "disparos": 0,
                      "disparos_al_arco": 0,
                      "tarjeta_roja": 0,
                      "goles": [],
                      "faltas": 0,
                      "tarjetas_amarillas": 0
                  },
                  "id_db": "tMEyEVy4UIgZwBZZS6IP",
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "fecha_nacimiento": null,
                  "equipo": "ESP",
                  "numero": "23"
              }
          ],
          "tipoFormacion": "4-3-1-2",
          "display_name": "ESP",
          "localidad": "ESPAÑA",
          "nombre_equipo": "ESPAÑA",
          "estadistica_equipo": {
              "saques_de_esquina": 0,
              "disparos": 0,
              "corners": 0,
              "tiros_a_puerta": 0,
              "posesión": "0%",
              "fueras_de_juego": 2,
              "disparos_al_arco": 0
          },
          "sustituciones": [
              {
                  "entra": "23",
                  "sale": "1",
                  "rotulo": true,
                  "tiempo": 1692869476682
              },
              {
                  "entra": "17",
                  "rotulo": true,
                  "sale": "4",
                  "tiempo": 1692872403425
              },
              {
                  "entra": "19",
                  "tiempo": 1692872418029,
                  "rotulo": true,
                  "sale": "7"
              },
              {
                  "entra": "18",
                  "rotulo": true,
                  "sale": "8",
                  "tiempo": 1692873604121
              },
              {
                  "rotulo": true,
                  "tiempo": 1692873623008,
                  "entra": "3",
                  "sale": "18"
              },
              {
                  "entra": "12",
                  "tiempo": 1692873664515,
                  "sale": "6",
                  "rotulo": true
              }
          ]
      },
      "equipo_local": {
          "tipoFormacion": "4-4-2",
          "jugadores": [
              {
                  "numero": "1",
                  "id_jugador": "HOL0",
                  "estadistica": {
                      "disparos": 0,
                      "disparos_al_arco": 0,
                      "faltas": 0,
                      "tarjetas_amarillas": 0,
                      "tarjeta_roja": 0,
                      "goles": []
                  },
                  "apodo": "Stekelenburg",
                  "nombre_jugador": "Maarten Stekelenburg",
                  "altura": null,
                  "fecha_nacimiento": null,
                  "nacionalidad": null,
                  "partidos": [
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "posicion": "Portero",
                  "equipo": "HOL",
                  "id_db": "tBeaWpGbE0HnGZuDmIAZ"
              },
              {
                  "numero": "2",
                  "id_db": "f9xkvZ5tYVuEc0hbPcoi",
                  "posicion": "Defensa central",
                  "fecha_nacimiento": null,
                  "partidos": [
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "estadistica": {
                      "tarjetas_amarillas": 0,
                      "disparos": 0,
                      "tarjeta_roja": 0,
                      "disparos_al_arco": 0,
                      "goles": [],
                      "faltas": 0
                  },
                  "equipo": "HOL",
                  "id_jugador": "HOL9",
                  "apodo": "van der Wiel",
                  "altura": null,
                  "nombre_jugador": "Gregory van der Wiel",
                  "nacionalidad": null
              },
              {
                  "nombre_jugador": "John Heitinga",
                  "altura": null,
                  "partidos": [
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "equipo": "HOL",
                  "numero": "3",
                  "fecha_nacimiento": null,
                  "nacionalidad": null,
                  "posicion": "Defensa central",
                  "id_db": "Cr3vGmIn8B0CtG2PfGrD",
                  "id_jugador": "HOL6",
                  "estadistica": {
                      "tarjeta_roja": 0,
                      "tarjetas_amarillas": 0,
                      "goles": [],
                      "faltas": 0,
                      "disparos": 0,
                      "disparos_al_arco": 0
                  },
                  "apodo": "Heitinga"
              },
              {
                  "id_jugador": "HOL7",
                  "fecha_nacimiento": null,
                  "posicion": "Defensa central",
                  "apodo": "Mathijsen",
                  "partidos": [
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "equipo": "HOL",
                  "numero": "4",
                  "nacionalidad": null,
                  "id_db": "Ok3Iv7p375opXVYILUSN",
                  "nombre_jugador": "Joris Mathijsen",
                  "estadistica": {
                      "faltas": 1,
                      "disparos": 0,
                      "disparos_al_arco": 0,
                      "tarjetas_amarillas": 0,
                      "goles": [],
                      "tarjeta_roja": 0
                  },
                  "altura": null
              },
              {
                  "nacionalidad": null,
                  "fecha_nacimiento": null,
                  "altura": null,
                  "id_jugador": "HOL5",
                  "posicion": "Defensa central",
                  "estadistica": {
                      "tarjeta_roja": 0,
                      "disparos": 0,
                      "faltas": 0,
                      "goles": [],
                      "disparos_al_arco": 0,
                      "tarjetas_amarillas": 0
                  },
                  "equipo": "HOL",
                  "partidos": [
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "id_db": "HUjzEgnTHANuKGEwOYK5",
                  "nombre_jugador": "Giovanni van Bronckhorst",
                  "apodo": "Bronckhorst",
                  "numero": "5"
              },
              {
                  "altura": null,
                  "partidos": [
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "estadistica": {
                      "tarjeta_roja": 0,
                      "disparos_al_arco": 0,
                      "tarjetas_amarillas": 0,
                      "faltas": 0,
                      "disparos": 0,
                      "goles": []
                  },
                  "nombre_jugador": "Mark van Bommel",
                  "id_jugador": "HOL11",
                  "apodo": "Bommel",
                  "fecha_nacimiento": null,
                  "id_db": "wTT85PoXv6Ktqbx9P8Zv",
                  "equipo": "HOL",
                  "numero": "6",
                  "nacionalidad": null,
                  "posicion": "Medio Centro"
              },
              {
                  "apodo": "Kuyt",
                  "estadistica": {
                      "tarjetas_amarillas": 0,
                      "faltas": 0,
                      "goles": [],
                      "disparos": 0,
                      "disparos_al_arco": 0,
                      "tarjeta_roja": 0
                  },
                  "id_jugador": "HOL20",
                  "nombre_jugador": "Dirk Kuyt",
                  "altura": null,
                  "fecha_nacimiento": null,
                  "partidos": [
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "numero": "7",
                  "posicion": "Delantero Centro",
                  "nacionalidad": null,
                  "equipo": "HOL",
                  "id_db": "lUdswBiwk2XDTKGu0SPj"
              },
              {
                  "partidos": [
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "estadistica": {
                      "goles": [],
                      "tarjetas_amarillas": 0,
                      "tarjeta_roja": 0,
                      "disparos_al_arco": 0,
                      "disparos": 0,
                      "faltas": 0
                  },
                  "altura": null,
                  "apodo": "De Jong",
                  "id_jugador": "HOL12",
                  "nacionalidad": null,
                  "id_db": "iUhneYksX9yfo1CnvudE",
                  "numero": "8",
                  "posicion": "Medio Centro",
                  "equipo": "HOL",
                  "fecha_nacimiento": null,
                  "nombre_jugador": "Nigel de Jong"
              },
              {
                  "posicion": "Delantero Centro",
                  "equipo": "HOL",
                  "numero": "9",
                  "id_jugador": "HOL21",
                  "altura": null,
                  "apodo": "Van Persie",
                  "nacionalidad": null,
                  "fecha_nacimiento": null,
                  "partidos": [
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "nombre_jugador": "Robin van Persie",
                  "id_db": "8o0Bwx7YtiKm13DkilYl",
                  "estadistica": {
                      "goles": [],
                      "disparos": 0,
                      "tarjeta_roja": 0,
                      "tarjetas_amarillas": 0,
                      "faltas": 0,
                      "disparos_al_arco": 0
                  }
              },
              {
                  "apodo": "Sneijder",
                  "id_db": "xsfAtirvd7jZ3EmK06Th",
                  "estadistica": {
                      "disparos_al_arco": 0,
                      "faltas": 0,
                      "disparos": 0,
                      "goles": [],
                      "tarjeta_roja": 0,
                      "tarjetas_amarillas": 0
                  },
                  "fecha_nacimiento": null,
                  "id_jugador": "HOL14",
                  "nombre_jugador": "Wesley Sneijder",
                  "altura": null,
                  "equipo": "HOL",
                  "numero": "10",
                  "posicion": "Medio Centro",
                  "partidos": [
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "nacionalidad": null
              },
              {
                  "nacionalidad": null,
                  "posicion": "Delantero Centro",
                  "numero": "11",
                  "partidos": [
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "altura": null,
                  "id_jugador": "HOL22",
                  "id_db": "wP8uMdaqzoUj9Fas7zHF",
                  "equipo": "HOL",
                  "estadistica": {
                      "tarjeta_roja": 0,
                      "goles": [],
                      "tarjetas_amarillas": 0,
                      "faltas": 0,
                      "disparos": 0,
                      "disparos_al_arco": 0
                  },
                  "apodo": "Robben",
                  "fecha_nacimiento": null,
                  "nombre_jugador": "Arjen Robben"
              },
              {
                  "partidos": [
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "nacionalidad": null,
                  "fecha_nacimiento": null,
                  "id_db": "8AOc0M8JaHVXYfFD3cZu",
                  "altura": null,
                  "equipo": "HOL",
                  "apodo": "Boulahrouz",
                  "estadistica": {
                      "disparos": 0,
                      "goles": [],
                      "faltas": 0,
                      "disparos_al_arco": 0,
                      "tarjeta_roja": 0,
                      "tarjetas_amarillas": 0
                  },
                  "numero": "12",
                  "posicion": "Defensa central",
                  "id_jugador": "HOL3",
                  "nombre_jugador": "Khalid Boulahrouz"
              },
              {
                  "nacionalidad": null,
                  "apodo": "Ooijer",
                  "id_jugador": "HOL8",
                  "altura": null,
                  "partidos": [
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "posicion": "Defensa central",
                  "estadistica": {
                      "disparos_al_arco": 0,
                      "faltas": 0,
                      "disparos": 0,
                      "goles": [],
                      "tarjetas_amarillas": 0,
                      "tarjeta_roja": 0
                  },
                  "equipo": "HOL",
                  "fecha_nacimiento": null,
                  "id_db": "Zz6WwjGwLbsU3naXP1Tv",
                  "numero": "13",
                  "nombre_jugador": "Andre Ooijer"
              },
              {
                  "equipo": "HOL",
                  "apodo": "Demy",
                  "posicion": "Medio Centro",
                  "nombre_jugador": "Demy de Zeeuw",
                  "altura": null,
                  "numero": "14",
                  "fecha_nacimiento": null,
                  "id_db": "tnLyVTyy8QUfrqNBOXXE",
                  "nacionalidad": null,
                  "partidos": [
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "estadistica": {
                      "faltas": 0,
                      "tarjetas_amarillas": 0,
                      "disparos_al_arco": 0,
                      "tarjeta_roja": 0,
                      "goles": [],
                      "disparos": 0
                  },
                  "id_jugador": "HOL16"
              },
              {
                  "numero": "15",
                  "posicion": "Defensa central",
                  "id_db": "SKedc7SMsoZon2fE3sBR",
                  "equipo": "HOL",
                  "partidos": [
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "id_jugador": "HOL4",
                  "nombre_jugador": "Edson Braafheid",
                  "apodo": "Braafheid",
                  "estadistica": {
                      "tarjetas_amarillas": 0,
                      "disparos": 0,
                      "tarjeta_roja": 0,
                      "faltas": 0,
                      "disparos_al_arco": 0,
                      "goles": []
                  },
                  "altura": null,
                  "fecha_nacimiento": null,
                  "nacionalidad": null
              },
              {
                  "estadistica": {
                      "tarjeta_roja": 0,
                      "tarjetas_amarillas": 0,
                      "disparos": 0,
                      "faltas": 0,
                      "disparos_al_arco": 0,
                      "goles": []
                  },
                  "fecha_nacimiento": null,
                  "nacionalidad": null,
                  "partidos": [
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "altura": null,
                  "equipo": "HOL",
                  "apodo": "Vorm",
                  "id_db": "r3Df5zKQp1ZdQs7mh5WH",
                  "nombre_jugador": "Michel Vorm",
                  "posicion": "Portero",
                  "id_jugador": "HOL2",
                  "numero": "16"
              },
              {
                  "estadistica": {
                      "faltas": 0,
                      "tarjetas_amarillas": 0,
                      "disparos_al_arco": 0,
                      "goles": [],
                      "disparos": 0,
                      "tarjeta_roja": 0
                  },
                  "fecha_nacimiento": null,
                  "nacionalidad": null,
                  "apodo": "Elia",
                  "id_db": "KTTzJIUbCxpbybWaO5Dz",
                  "numero": "17",
                  "altura": null,
                  "posicion": "Delantero Centro",
                  "nombre_jugador": "Eljero Elia",
                  "equipo": "HOL",
                  "id_jugador": "HOL18",
                  "partidos": [
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ]
              },
              {
                  "numero": "18",
                  "equipo": "HOL",
                  "partidos": [
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "apodo": "Schaars",
                  "nombre_jugador": "Stijn Schaars",
                  "estadistica": {
                      "disparos_al_arco": 0,
                      "faltas": 0,
                      "disparos": 0,
                      "goles": [],
                      "tarjeta_roja": 0,
                      "tarjetas_amarillas": 0
                  },
                  "fecha_nacimiento": null,
                  "posicion": "Medio Centro",
                  "id_db": "GpSTINwCZAB3r3RZB7lG",
                  "altura": null,
                  "id_jugador": "HOL13",
                  "nacionalidad": null
              },
              {
                  "estadistica": {
                      "tarjetas_amarillas": 0,
                      "tarjeta_roja": 0,
                      "faltas": 0,
                      "disparos_al_arco": 0,
                      "disparos": 0,
                      "goles": []
                  },
                  "id_db": "SsBazoSjmQ3B53WVMO8I",
                  "numero": "19",
                  "altura": null,
                  "partidos": [
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "nacionalidad": null,
                  "id_jugador": "HOL17",
                  "nombre_jugador": "Ryan Babel",
                  "apodo": "Babel",
                  "posicion": "Delantero Centro",
                  "fecha_nacimiento": null,
                  "equipo": "HOL"
              },
              {
                  "nacionalidad": null,
                  "numero": "20",
                  "equipo": "HOL",
                  "apodo": "Afellay",
                  "fecha_nacimiento": null,
                  "id_db": "Z6TehYsInHW5zNhD7rbj",
                  "id_jugador": "HOL10",
                  "posicion": "Medio Centro",
                  "altura": null,
                  "nombre_jugador": "Ibrahim Afellay",
                  "partidos": [
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "estadistica": {
                      "disparos_al_arco": 0,
                      "tarjetas_amarillas": 0,
                      "goles": [],
                      "faltas": 0,
                      "disparos": 0,
                      "tarjeta_roja": 0
                  }
              },
              {
                  "nacionalidad": null,
                  "partidos": [
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "id_db": "HLMKuWcQCZPyNrJht4Ci",
                  "numero": "21",
                  "fecha_nacimiento": null,
                  "nombre_jugador": "Klaas Jan Huntelaar",
                  "equipo": "HOL",
                  "altura": null,
                  "posicion": "Delantero Centro",
                  "apodo": "Huntelaar",
                  "estadistica": {
                      "tarjetas_amarillas": 0,
                      "disparos_al_arco": 0,
                      "faltas": 0,
                      "goles": [],
                      "disparos": 0,
                      "tarjeta_roja": 0
                  },
                  "id_jugador": "HOL19"
              },
              {
                  "equipo": "HOL",
                  "id_jugador": "HOL1",
                  "numero": "22",
                  "altura": null,
                  "nombre_jugador": "Sander Boschker",
                  "fecha_nacimiento": null,
                  "partidos": [
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "apodo": "Boschker",
                  "estadistica": {
                      "tarjeta_roja": 0,
                      "goles": [],
                      "disparos_al_arco": 0,
                      "disparos": 0,
                      "tarjetas_amarillas": 0,
                      "faltas": 0
                  },
                  "posicion": "Portero",
                  "nacionalidad": null,
                  "id_db": "WHZZLq13wmB5P8ojxMIQ"
              },
              {
                  "nacionalidad": null,
                  "nombre_jugador": "Rafael van der Vaart",
                  "equipo": "HOL",
                  "numero": "23",
                  "estadistica": {
                      "tarjetas_amarillas": 0,
                      "tarjeta_roja": 0,
                      "disparos_al_arco": 0,
                      "goles": [],
                      "disparos": 0,
                      "faltas": 0
                  },
                  "id_jugador": "HOL15",
                  "posicion": "Medio Centro",
                  "partidos": [
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "altura": null,
                  "fecha_nacimiento": null,
                  "apodo": "Van der Vaart",
                  "id_db": "mfqGMRpBnsgGzMIWIthE"
              }
          ],
          "sustituciones": [
              {
                  "rotulo": true,
                  "tiempo": 1692869397946,
                  "sale": "3",
                  "entra": "17"
              },
              {
                  "tiempo": 1692872289377,
                  "rotulo": true,
                  "entra": "15",
                  "sale": "2"
              },
              {
                  "rotulo": true,
                  "entra": "13",
                  "tiempo": 1692872298887,
                  "sale": "10"
              },
              {
                  "rotulo": true,
                  "entra": "14",
                  "sale": "10",
                  "tiempo": 1693645591281
              }
          ],
          "titulares": [
              "1",
              "15",
              "17",
              "4",
              "5",
              "6",
              "14",
              "13",
              "9",
              "10",
              "11"
          ],
          "nombre_equipo": "HOLANDA",
          "id_equipo": "yoEdVZFqI5YyXYXrMW0P",
          "formacion": [
              {
                  "dorsal": "1",
                  "apodo": "Stekelenburg",
                  "pos": {
                      "x": 0,
                      "y": 170
                  }
              },
              {
                  "dorsal": "2",
                  "apodo": "van der Wiel",
                  "pos": {
                      "y": 78,
                      "x": -400
                  }
              },
              {
                  "dorsal": "3",
                  "apodo": "Heitinga",
                  "pos": {
                      "x": -125,
                      "y": 78
                  }
              },
              {
                  "dorsal": "4",
                  "apodo": "Mathijsen",
                  "pos": {
                      "y": 78,
                      "x": 125
                  }
              },
              {
                  "pos": {
                      "y": 78,
                      "x": 400
                  },
                  "dorsal": "5",
                  "apodo": "Bronckhorst"
              },
              {
                  "pos": {
                      "y": -90,
                      "x": -265
                  },
                  "apodo": "Bommel",
                  "dorsal": "6"
              },
              {
                  "apodo": "Kuyt",
                  "pos": {
                      "y": -90,
                      "x": 0
                  },
                  "dorsal": "7"
              },
              {
                  "apodo": "De Jong",
                  "dorsal": "8",
                  "pos": {
                      "x": 265,
                      "y": -90
                  }
              },
              {
                  "pos": {
                      "y": -221,
                      "x": -265
                  },
                  "dorsal": "9",
                  "apodo": "Van Persie"
              },
              {
                  "dorsal": "10",
                  "pos": {
                      "y": -221,
                      "x": 0
                  },
                  "apodo": "Sneijder"
              },
              {
                  "pos": {
                      "x": 265,
                      "y": -221
                  },
                  "dorsal": "11",
                  "apodo": "Robben"
              }
          ],
          "display_name": "HOL",
          "localidad": "HOLANDA",
          "cuerpo_tecnico": [
              {
                  "nombre": "Bert van Marwijk",
                  "id_cuerpo_tecnico": "ent_1692859381659",
                  "fecha_nacimiento": null,
                  "nacionalidad": "HOLANDA",
                  "titulo": "Entrenador"
              },
              {
                  "id_cuerpo_tecnico": "seg_ent_1692859381659",
                  "fecha_nacimiento": null,
                  "nacionalidad": "HOLANDA",
                  "titulo": "Segundo entrenador",
                  "nombre": "Sipke Hulshoff"
              },
              {
                  "id_cuerpo_tecnico": "del_1692859381659",
                  "fecha_nacimiento": null,
                  "nacionalidad": "HOLANDA",
                  "nombre": "Patrick Lodewijks",
                  "titulo": "Delegado"
              }
          ],
          "estadistica_equipo": {
              "disparos": 0,
              "fueras_de_juego": 4,
              "tiros_a_puerta": 0,
              "saques_de_esquina": 0,
              "corners": 0,
              "disparos_al_arco": 0,
              "posesión": "0%"
          }
      },
      "id_equipo_local": "yoEdVZFqI5YyXYXrMW0P",
      "lugar": "Bilbao",
      "tiempo": {
          "añadidoPrimera": null,
          "primeraParte": null,
          "añadidoSegunda": null,
          "segundaParte": null
      },
      "fecha": "25 de abril",
      "competicion": "Primera Federación",
      "equipo_arbitral": {
          "segundo_arbitro": "12",
          "cuarto_arbitro": "12",
          "tercer_arbitro": "12",
          "primer_arbitro": "pepet"
      },
      "id_partido": "Y4YkWiqYxefXFhvCALAD",
      "marcador": {
          "visitante": 0,
          "local": 0
      },
      "hora": "21:00",
      "equipo_visitante": {
          "id_equipo": "ZqobmOXFkOgURYzsg0IE",
          "titulares": [
              "23",
              "2",
              "17",
              "12",
              "18",
              "6",
              "7",
              "8",
              "9",
              "3",
              "11"
          ],
          "formacion": [
              {
                  "pos": {
                      "y": 170,
                      "x": 0
                  },
                  "dorsal": "1",
                  "apodo": "Casillas"
              },
              {
                  "pos": {
                      "y": 78,
                      "x": -400
                  },
                  "apodo": "Albiol",
                  "dorsal": "2"
              },
              {
                  "pos": {
                      "x": -125,
                      "y": 78
                  },
                  "dorsal": "3",
                  "apodo": "Piqué"
              },
              {
                  "apodo": "Marchena",
                  "pos": {
                      "x": 125,
                      "y": 78
                  },
                  "dorsal": "4"
              },
              {
                  "apodo": "Puyol",
                  "pos": {
                      "y": 78,
                      "x": 400
                  },
                  "dorsal": "5"
              },
              {
                  "apodo": "Iniesta",
                  "pos": {
                      "x": -265,
                      "y": -90
                  },
                  "dorsal": "6"
              },
              {
                  "apodo": "Villa",
                  "pos": {
                      "x": 0,
                      "y": -90
                  },
                  "dorsal": "7"
              },
              {
                  "apodo": "Xavi",
                  "pos": {
                      "x": 265,
                      "y": -90
                  },
                  "dorsal": "8"
              },
              {
                  "apodo": "Torres",
                  "pos": {
                      "x": 0,
                      "y": -221
                  },
                  "dorsal": "9"
              },
              {
                  "pos": {
                      "y": -350,
                      "x": -140
                  },
                  "apodo": "Cesc",
                  "dorsal": "10"
              },
              {
                  "dorsal": "11",
                  "apodo": "Capdevila",
                  "pos": {
                      "x": 140,
                      "y": -350
                  }
              }
          ],
          "cuerpo_tecnico": [
              {
                  "nombre": "Vicente del Bosque",
                  "fecha_nacimiento": null,
                  "id_cuerpo_tecnico": "ent_1692622282391",
                  "titulo": "Entrenador",
                  "nacionalidad": null
              },
              {
                  "nombre": "Toni Grande",
                  "id_cuerpo_tecnico": "seg_ent_1692622282391",
                  "nacionalidad": null,
                  "fecha_nacimiento": null,
                  "titulo": "Segundo entrenador"
              },
              {
                  "fecha_nacimiento": null,
                  "titulo": "Delegado",
                  "id_cuerpo_tecnico": "del_1692622282391",
                  "nombre": "Silvia Dorschnerova",
                  "nacionalidad": null
              }
          ],
          "jugadores": [
              {
                  "altura": null,
                  "id_db": "Ys0VyrZNEP9y16JhGPvh",
                  "apodo": "Casillas",
                  "id_jugador": "ESP0",
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "equipo": "ESP",
                  "nacionalidad": null,
                  "fecha_nacimiento": null,
                  "estadistica": {
                      "disparos": 0,
                      "disparos_al_arco": 0,
                      "faltas": 0,
                      "tarjeta_roja": 0,
                      "tarjetas_amarillas": 0,
                      "goles": []
                  },
                  "nombre_jugador": "Iker Casillas",
                  "numero": "1",
                  "posicion": "Portero"
              },
              {
                  "numero": "2",
                  "estadistica": {
                      "disparos_al_arco": 0,
                      "tarjetas_amarillas": 0,
                      "tarjeta_roja": 0,
                      "goles": [],
                      "faltas": 0,
                      "disparos": 0
                  },
                  "id_db": "A7nKdmz6hsfBSiLA1oTE",
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "nacionalidad": null,
                  "id_jugador": "ESP1",
                  "nombre_jugador": "Raúl Albiol",
                  "fecha_nacimiento": null,
                  "equipo": "ESP",
                  "apodo": "Albiol",
                  "posicion": "Defensa central",
                  "altura": null
              },
              {
                  "apodo": "Piqué",
                  "nombre_jugador": "Gerad Piqué",
                  "nacionalidad": null,
                  "numero": "3",
                  "posicion": "Defensa central",
                  "equipo": "ESP",
                  "estadistica": {
                      "disparos": 0,
                      "tarjetas_amarillas": 1,
                      "goles": [],
                      "tarjeta_roja": 0,
                      "disparos_al_arco": 0,
                      "faltas": 0
                  },
                  "id_db": "KhkE5w0xkTvUptXhObzC",
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "id_jugador": "ESP2",
                  "altura": null,
                  "fecha_nacimiento": null
              },
              {
                  "estadistica": {
                      "disparos_al_arco": 0,
                      "faltas": 0,
                      "tarjetas_amarillas": 0,
                      "goles": [],
                      "tarjeta_roja": 0,
                      "disparos": 0
                  },
                  "fecha_nacimiento": null,
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "altura": null,
                  "posicion": "Defensa central",
                  "nacionalidad": null,
                  "equipo": "ESP",
                  "apodo": "Marchena",
                  "id_jugador": "ESP3",
                  "nombre_jugador": "Carlos Marchena",
                  "numero": "4",
                  "id_db": "tFXg4dDmjQimbmQS44Y2"
              },
              {
                  "id_db": "8yFVOjiPag27utQgprkm",
                  "nacionalidad": null,
                  "fecha_nacimiento": null,
                  "nombre_jugador": "Carles Puyol",
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "numero": "5",
                  "estadistica": {
                      "goles": [],
                      "disparos_al_arco": 0,
                      "tarjetas_amarillas": 0,
                      "faltas": 0,
                      "disparos": 0,
                      "tarjeta_roja": 0
                  },
                  "altura": null,
                  "id_jugador": "ESP4",
                  "posicion": "Defensa central",
                  "apodo": "Puyol",
                  "equipo": "ESP"
              },
              {
                  "fecha_nacimiento": null,
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "id_db": "iSPIa5OPifMTAS8j7sLE",
                  "estadistica": {
                      "disparos_al_arco": 0,
                      "faltas": 0,
                      "tarjetas_amarillas": 0,
                      "goles": [],
                      "disparos": 0,
                      "tarjeta_roja": 0
                  },
                  "id_jugador": "ESP5",
                  "posicion": "Medio Centro",
                  "equipo": "ESP",
                  "altura": null,
                  "apodo": "Iniesta",
                  "numero": "6",
                  "nombre_jugador": "Andrés Iniesta",
                  "nacionalidad": null
              },
              {
                  "estadistica": {
                      "disparos": 0,
                      "disparos_al_arco": 0,
                      "faltas": 0,
                      "tarjeta_roja": 0,
                      "goles": [],
                      "tarjetas_amarillas": 0
                  },
                  "posicion": "Delantero Centro",
                  "equipo": "ESP",
                  "numero": "7",
                  "nombre_jugador": "David villa",
                  "id_jugador": "ESP6",
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "apodo": "Villa",
                  "fecha_nacimiento": null,
                  "nacionalidad": null,
                  "id_db": "WNP46SLNXVjLvn1K5dWf",
                  "altura": null
              },
              {
                  "id_db": "BCBoY8iRh7rgxoP0ngCc",
                  "altura": null,
                  "posicion": "Medio Centro",
                  "apodo": "Xavi",
                  "nombre_jugador": "Xavi Hernández",
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "fecha_nacimiento": null,
                  "id_jugador": "ESP7",
                  "estadistica": {
                      "tarjeta_roja": 0,
                      "disparos": 0,
                      "goles": [],
                      "tarjetas_amarillas": 0,
                      "faltas": 0,
                      "disparos_al_arco": 0
                  },
                  "numero": "8",
                  "nacionalidad": null,
                  "equipo": "ESP"
              },
              {
                  "posicion": "Delantero Centro",
                  "id_db": "lPqnlVduc430RSAMoTeX",
                  "apodo": "Torres",
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "estadistica": {
                      "disparos_al_arco": 0,
                      "goles": [],
                      "tarjetas_amarillas": 0,
                      "disparos": 0,
                      "faltas": 0,
                      "tarjeta_roja": 0
                  },
                  "fecha_nacimiento": null,
                  "equipo": "ESP",
                  "altura": null,
                  "nacionalidad": null,
                  "nombre_jugador": "Fernando Torres",
                  "id_jugador": "ESP8",
                  "numero": "9"
              },
              {
                  "estadistica": {
                      "disparos": 0,
                      "faltas": 0,
                      "tarjeta_roja": 0,
                      "goles": [],
                      "tarjetas_amarillas": 0,
                      "disparos_al_arco": 0
                  },
                  "altura": null,
                  "equipo": "ESP",
                  "fecha_nacimiento": null,
                  "nombre_jugador": "Cesc Fàbregas",
                  "id_db": "vYNaW33scm4C9ZTZSHLN",
                  "posicion": "Medio Centro",
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "apodo": "Cesc",
                  "nacionalidad": null,
                  "numero": "10",
                  "id_jugador": "ESP9"
              },
              {
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "fecha_nacimiento": null,
                  "apodo": "Capdevila",
                  "estadistica": {
                      "faltas": 0,
                      "goles": [],
                      "tarjeta_roja": 0,
                      "disparos": 0,
                      "disparos_al_arco": 0,
                      "tarjetas_amarillas": 0
                  },
                  "posicion": "Lateral izquierdo",
                  "nombre_jugador": "Joan Capdevila",
                  "numero": "11",
                  "altura": null,
                  "id_jugador": "ESP10",
                  "nacionalidad": null,
                  "equipo": "ESP",
                  "id_db": "XiVB63SJyjUGTcoSZ3Ul"
              },
              {
                  "estadistica": {
                      "tarjetas_amarillas": 0,
                      "tarjeta_roja": 0,
                      "disparos": 0,
                      "faltas": 0,
                      "goles": [],
                      "disparos_al_arco": 0
                  },
                  "equipo": "ESP",
                  "fecha_nacimiento": null,
                  "nacionalidad": null,
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "altura": null,
                  "id_jugador": "ESP11",
                  "apodo": "Valdés",
                  "id_db": "UEy1ARcc2j2ETqlLN5Vz",
                  "numero": "12",
                  "posicion": "Portero",
                  "nombre_jugador": "Victor Valdés"
              },
              {
                  "id_db": "kNFguGg43YCvmH4MWuKi",
                  "id_jugador": "ESP12",
                  "posicion": "Medio Centro",
                  "numero": "13",
                  "nacionalidad": null,
                  "estadistica": {
                      "disparos_al_arco": 0,
                      "tarjetas_amarillas": 0,
                      "tarjeta_roja": 0,
                      "faltas": 0,
                      "goles": [],
                      "disparos": 0
                  },
                  "apodo": "Mata",
                  "equipo": "ESP",
                  "nombre_jugador": "Juan Mata",
                  "fecha_nacimiento": null,
                  "altura": null,
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ]
              },
              {
                  "altura": null,
                  "nacionalidad": null,
                  "posicion": "Medio Centro",
                  "estadistica": {
                      "faltas": 0,
                      "tarjetas_amarillas": 0,
                      "tarjeta_roja": 0,
                      "goles": [],
                      "disparos_al_arco": 0,
                      "disparos": 0
                  },
                  "numero": "14",
                  "nombre_jugador": "Xabi Alonso",
                  "apodo": "Xabi",
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "fecha_nacimiento": null,
                  "equipo": "ESP",
                  "id_jugador": "ESP13",
                  "id_db": "oCX7e9iU3BqsDB8YuIPE"
              },
              {
                  "altura": null,
                  "numero": "15",
                  "id_db": "XGAQr64P6IgZIQcmUMRb",
                  "nombre_jugador": "Sergio Ramos",
                  "fecha_nacimiento": null,
                  "apodo": "Ramos",
                  "equipo": "ESP",
                  "id_jugador": "ESP14",
                  "posicion": "Defensa central",
                  "estadistica": {
                      "disparos_al_arco": 0,
                      "disparos": 0,
                      "faltas": 0,
                      "goles": [],
                      "tarjetas_amarillas": 0,
                      "tarjeta_roja": 0
                  },
                  "nacionalidad": null,
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ]
              },
              {
                  "numero": "16",
                  "fecha_nacimiento": null,
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "estadistica": {
                      "disparos_al_arco": 0,
                      "tarjeta_roja": 0,
                      "goles": [],
                      "tarjetas_amarillas": 0,
                      "disparos": 0,
                      "faltas": 0
                  },
                  "altura": null,
                  "equipo": "ESP",
                  "posicion": "Medio Centro",
                  "id_db": "IPtDpOiCKamTnr0wmTeA",
                  "apodo": "Busquets",
                  "nacionalidad": null,
                  "nombre_jugador": "Sergio Busquets",
                  "id_jugador": "ESP15"
              },
              {
                  "altura": null,
                  "apodo": "Arbeloa",
                  "equipo": "ESP",
                  "nombre_jugador": "Álvaro Arbeloa",
                  "numero": "17",
                  "id_jugador": "ESP16",
                  "nacionalidad": null,
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "fecha_nacimiento": null,
                  "estadistica": {
                      "tarjeta_roja": 0,
                      "tarjetas_amarillas": 0,
                      "faltas": 0,
                      "disparos": 0,
                      "goles": [],
                      "disparos_al_arco": 0
                  },
                  "id_db": "9LGYYZzu3ralUwsTHApO",
                  "posicion": "Lateral derecho"
              },
              {
                  "id_db": "o60htaLB6bWwErHFOy00",
                  "posicion": "Extremo Derecho",
                  "fecha_nacimiento": null,
                  "apodo": "Pedro",
                  "equipo": "ESP",
                  "nombre_jugador": "Pedro Rodríquez",
                  "altura": null,
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "numero": "18",
                  "estadistica": {
                      "disparos": 0,
                      "disparos_al_arco": 0,
                      "goles": [],
                      "tarjetas_amarillas": 0,
                      "tarjeta_roja": 0,
                      "faltas": 0
                  },
                  "nacionalidad": null,
                  "id_jugador": "ESP17"
              },
              {
                  "id_db": "Awq2AJn8jNh3Vhag4vYc",
                  "fecha_nacimiento": null,
                  "apodo": "Llorente",
                  "estadistica": {
                      "faltas": 0,
                      "tarjetas_amarillas": 0,
                      "goles": [],
                      "disparos_al_arco": 0,
                      "tarjeta_roja": 0,
                      "disparos": 0
                  },
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "numero": "19",
                  "posicion": "Delantero Centro",
                  "id_jugador": "ESP18",
                  "equipo": "ESP",
                  "altura": null,
                  "nombre_jugador": "Fernando Llorente",
                  "nacionalidad": null
              },
              {
                  "numero": "20",
                  "nombre_jugador": "Javi Martínez",
                  "id_jugador": "ESP19",
                  "equipo": "ESP",
                  "altura": null,
                  "posicion": "Medio Centro",
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "apodo": "Javi",
                  "id_db": "SFm1AJXsysfbYwUGpaNP",
                  "fecha_nacimiento": null,
                  "estadistica": {
                      "tarjeta_roja": 0,
                      "disparos": 0,
                      "faltas": 0,
                      "tarjetas_amarillas": 0,
                      "disparos_al_arco": 0,
                      "goles": []
                  },
                  "nacionalidad": null
              },
              {
                  "nacionalidad": null,
                  "fecha_nacimiento": null,
                  "nombre_jugador": "David Silva",
                  "altura": null,
                  "numero": "21",
                  "id_db": "2M6g2UeYOascPXMf0v6m",
                  "equipo": "ESP",
                  "estadistica": {
                      "faltas": 0,
                      "disparos_al_arco": 0,
                      "tarjeta_roja": 0,
                      "disparos": 0,
                      "tarjetas_amarillas": 0,
                      "goles": []
                  },
                  "posicion": "Delantero Centro",
                  "id_jugador": "ESP20",
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "apodo": "Silva"
              },
              {
                  "nacionalidad": null,
                  "fecha_nacimiento": null,
                  "numero": "22",
                  "posicion": "Extremo Derecho",
                  "id_jugador": "ESP21",
                  "apodo": "Navas",
                  "estadistica": {
                      "tarjeta_roja": 0,
                      "tarjetas_amarillas": 0,
                      "disparos": 0,
                      "goles": [],
                      "disparos_al_arco": 0,
                      "faltas": 0
                  },
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "nombre_jugador": "Jesús Navas",
                  "id_db": "myA8cGTS1UubIXtu621d",
                  "equipo": "ESP",
                  "altura": null
              },
              {
                  "nombre_jugador": "Pepe Reina",
                  "posicion": "Portero",
                  "nacionalidad": null,
                  "id_jugador": "ESP22",
                  "altura": null,
                  "apodo": "Reina",
                  "estadistica": {
                      "disparos": 0,
                      "disparos_al_arco": 0,
                      "tarjeta_roja": 0,
                      "goles": [],
                      "faltas": 0,
                      "tarjetas_amarillas": 0
                  },
                  "id_db": "tMEyEVy4UIgZwBZZS6IP",
                  "partidos": [
                      "JcCQtQwrMXvZysHLDGEj",
                      "sUZtyJjM5dyG8w9AJivf",
                      "sXDs59JbftEv0p8xHKJk",
                      "JWEC7oKn6jnJxdUAOhgp",
                      "5mO1SRQJGR8YWurEYyxi",
                      "5mO1SRQJGR8YWurEYyxi",
                      "r9AeTWCtHzRNWewp51NV",
                      "r9AeTWCtHzRNWewp51NV",
                      "TUwarDRkM2lcS7Ci9lfN",
                      "kmwjublTaVVoWByWgXCZ",
                      "AICqwcfGNVcEqffUjVi6"
                  ],
                  "fecha_nacimiento": null,
                  "equipo": "ESP",
                  "numero": "23"
              }
          ],
          "tipoFormacion": "4-3-1-2",
          "display_name": "ESP",
          "localidad": "ESPAÑA",
          "nombre_equipo": "ESPAÑA",
          "estadistica_equipo": {
              "saques_de_esquina": 0,
              "disparos": 0,
              "corners": 0,
              "tiros_a_puerta": 0,
              "posesión": "0%",
              "fueras_de_juego": 1,
              "disparos_al_arco": 0
          },
          "sustituciones": [
              {
                  "entra": "23",
                  "sale": "1",
                  "rotulo": true,
                  "tiempo": 1692869476682
              },
              {
                  "entra": "17",
                  "rotulo": true,
                  "sale": "4",
                  "tiempo": 1692872403425
              },
              {
                  "entra": "19",
                  "tiempo": 1692872418029,
                  "rotulo": true,
                  "sale": "7"
              },
              {
                  "entra": "18",
                  "rotulo": true,
                  "sale": "8",
                  "tiempo": 1692873604121
              },
              {
                  "rotulo": true,
                  "tiempo": 1692873623008,
                  "entra": "3",
                  "sale": "18"
              },
              {
                  "entra": "12",
                  "tiempo": 1692873664515,
                  "sale": "6",
                  "rotulo": true
              }
          ]
      }
  }
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
    getCompeticiones: state => state.competiciones,
    getMinutosPartido: state => state.minutosPartido
    // getEquipoById: state => {
    //   return id => state.partidos.find(partido => id === partido.id)
    // }

  },
  actions: {

    setMinutosPartido(tiempo) {
      this.minutosPartido = tiempo
    },

    
    getIdEquipo(equipo) {
      const target = this.equipos.find(el => {
        return el.nombre_equipo == equipo
      })
      return target.id_equipo
      
    },
    // id_equipo_visitante ZqobmOXFkOgURYzsg0IE
    // PARTIDOS --------------------------------------------

    setPartidoEnJuego(id) {
      this.partido_cargado = id
    },
    buscarPartido(id) {
      return this.partidos.find(partido => {
        return partido.id_partido == id
      })
    },
    addPartidoWS(payload) {
      this.partidos.push(payload)
      console.log(this.partidos)
    },
    addMarcadorWS(payload) {
      this.marcadores.push(payload)
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
      nuevoPartido.id_equipo_visitante = partido.id_equipo_visitante

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
        const futbolWebsocket = useFutbolWebsocketStore()
        futbolWebsocket.getLocalStorage()
        
      } catch (err) {
        console.log(err)
      } finally {
        this.cargando_partidos = false
      }
    },
    actualizarPartido(partido) {
      // console.log(partido)
      let part = this.partidos.find(p => {
        return p.id_partido === partido.id_partido
      })
      // console.log(part)
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

    async updateEstPartido(id_partido, jugador, equipo) {

      const docRef = doc(db, "partidos_futbol", id_partido)
      
      const partido = this.partidos.find(part => {
        return part.id_partido === id_partido
      })
      console.log(equipo)
      
      let buscaJugador

      if (equipo === 'local') {
        buscaJugador = partido.equipo_local.jugadores.find(jug => {
          return jug.id_jugador === jugador.id_jugador
        })
      } else if (equipo === 'visitante') {
        buscaJugador = partido.equipo_visitante.jugadores.find(jug => {
          return jug.id_jugador === jugador.id_jugador
        })        
      }
      
      buscaJugador.estadistica = jugador.estadistica
      
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

      // console.log(marcador)
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
              console.log("Settings cargados")
            } else if (change.type === "modified") {
              let nuevo_marcador = change.doc.data()
              nuevo_marcador.id_marcador = change.doc.id
              this.actualizarMarcador(nuevo_marcador)
              // console.log("Marcador actualizado")
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
      // console.log(payload.temporizador)
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
      // console.log(this.marcadores)
      const marcador = this.marcadores.find(m => {
        return m.id_partido === id
      })
      // console.log(marcador.id_marcador)

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
      // console.log(buscaJugador)

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
        return jug.id_jugador !== id
      })
      this.equipos[0].jugadores = nuevaLista
      
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
            // console.log("Competicion actualizada")
          } else if (change.type === "removed") {
            let nueva_competicion = change.doc.data()
            nueva_competicion.id_competicion = change.doc.id
            this.competiciones = this.competiciones.filter(el => el.id_competicion !== nueva_competicion.id_competicion)
          }
        })
      })

    },
    async addCompeticion(comp) {
      // console.log(comp)
      const docRef = await addDoc(collection(db, 'competiciones'), comp)      
    },

    async eliminarCompeticion(comp) {
      await deleteDoc(doc(db, 'competiciones', comp.id_competicion))
      // this.competiciones = this.competiciones.filter(el => el.id_competicion !== comp.id_competicion)
      // console.log(this.competiciones)
    },
    async updateCompeticionDB(comp) {
      // console.log(comp)
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
    },
    // LOCAL STORAGE
    // getLocalStorage() {
    //   const partido = localStorage.getItem('partido')
    //   const partido = localStorage.getItem('partido')
    //   // console.log(partido)
    // },
    // setMarcadorLS() {

    // }

  }
})