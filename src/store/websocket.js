
import { defineStore } from 'pinia'

export const useWebsocketStore = defineStore('websocket', {

  state: () => ({
    valor: 0,
    state: null,
    socket: null,
    maxValue: 0,
    minIn: 0,
    maxIn: 150,
    minOut: 0,
    maxOut: 15
  }),
  getters: {
    nivelVumetro (state) {
      // (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
      const valor = parseFloat(state.valor)
      return Math.round((valor - state.minIn) * (state.maxOut - state.minIn) / (state.maxIn - state.minIn) + state.minOut)
    },
    textoVumetro (state) {
      return parseFloat(state.valor).toFixed(2)
    }

  },
  actions: {
    conectarWS() {
      // Crea una nueva conexión.
      this.socket = new WebSocket('ws://localhost:8080');
      // let state = document.querySelector(".websocketOff")
      const self = this

      console.log(this.socket)
      
      // Abre la conexión
      this.socket.addEventListener('open', function (event) {
        self.state = event.currentTarget.readyState
        self.socket.send('Conexión websocket establecida');
      })
      this.socket.addEventListener('close', function(event) {
        console.log(event)
        self.valor = 0
        // incializar_vumetro(0)
        // state.classList.remove("websocketOn")
        // state.classList.add("websocketOff")
      })
      this.socket.addEventListener('error', function (event) {
        // incializar_vumetro(0)
        self.valor = 0
        self.socket.close()
      })
      
      // Escucha por mensajes
      this.socket.addEventListener('message', function (event) {
        // incializar_vumetro(event.data)
        self.valor = parseFloat(event.data)
        if (self.valor >= self.maxValue) {
          self.maxValue = parseFloat(event.data)
        }
      
      });
    },
    pararWS() {
      // if(this.socket) {
        
        this.socket.close()

      // }
    }
  }
})


