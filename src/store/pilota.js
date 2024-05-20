import { defineStore } from 'pinia'



export const usePilotaStore = defineStore('pilotaStore', {
  state: () => ({
   datosPartida: {
    fecha: "13/05/2024",
    hora: "12:00",
    tipo_partida: "Raspall",
    nom_equip_roig: "Pepet",
    nom_equip_blau: "Pepet",
    equip_roig: {
      nom_equip: "Pepet",
      jugadores: [{
        id_jugador: "roig1",
        nombre: "Pepe Garcia",
        apodo: "Pepet",
        tecla: "f"
      }]
    },
    equip_blau: {
      nom_equip: "Antoniet",
      jugadores: [{
        id_jugador: "blau1",
        nombre: "Antonio Gomez",
        apodo: "Antoniet",
        tecla: "j"
      }]
    },
    marcador: {
        equip_roig: {
          jocs: 0,
          puntos: 0,
          marcadorInicial: 0
        },
        equip_blau: {
          jocs: 0,
          puntos: 0,
          marcadorInicial: 0
        }
    },
    partidaA: 25
   },
   tipo_partida: ["Raspall", "Escala i corda", "Llargues", "Palma", "Galotxa"]
  }),
  getters: {

  },
  actions: {
    crearPartida(payload) {
      this.datosPartida = payload
    }
  }

})