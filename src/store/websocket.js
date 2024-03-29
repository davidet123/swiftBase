
import { defineStore } from 'pinia'

import { doc, collection, onSnapshot, addDoc, updateDoc } from "firebase/firestore"
// the firestore instance
import db from '../firebase/init.js'

export const useWebsocketStore = defineStore('websocket', {

  state: () => ({
    valor: 0,
    connectionState: null,
    socket: null,
    maxValue: 0,
    minIn: 0,
    maxIn: 150,
    minOut: 0,
    maxOut: 15,
    recording: false,
    dataValue: null,
    arrayValues: [],
    factorVolumen: 0.7,
    URLWebsocket: 'ws://localhost:8080',
    texto: null
  }),
  getters: {
    nivelVumetro (state) {
      // (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
      const valor = parseFloat(state.valor)
      return Math.round((valor - state.minIn) * (state.maxOut - state.minIn) / (state.maxIn - state.minIn) + state.minOut)
    },
    textoVumetro (state) {
      return parseFloat(state.valor).toFixed(2)
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
    }

  },
  actions: {
    async setUrl(payload) {
      this.URLWebsocket = payload
      const docRef = doc(db, 'settings', 'websocket')
      await updateDoc(docRef, {url: payload})
    },
    conectarWS() {
      // Crea una nueva conexión.
      this.socket = new WebSocket(this.URLWebsocket);
      // let state = document.querySelector(".websocketOff")
      const self = this

      // console.log(this.socket)
      
      // Abre la conexión
      this.socket.addEventListener('open', function (event) {
        self.connectionState = event.currentTarget.readyState
        self.socket.send('Conexión websocket establecida');
      })
      this.socket.addEventListener('close', function(event) {
        self.connectionState = event.currentTarget.readyState
        console.log(event)
        self.valor = 0
        // incializar_vumetro(0)
        // state.classList.remove("websocketOn")
        // state.classList.add("websocketOff")
      })
      this.socket.addEventListener('error', function (event) {
        // incializar_vumetro(0)
        self.connectionState = event.currentTarget.readyState
        self.valor = 0
        self.socket.close()
      })
      
      // Escucha por mensajes
      this.socket.addEventListener('message', function (event) {
        // console.log("mensaje")
        // incializar_vumetro(event.data)
        // self.valor = parseFloat(event.data)
        // console.log(JSON.parse(event.data))
        self.texto = JSON.parse(event.data)
        // console.log(JSON.parse(event.data))
        // Añadir valores al array
        self.dataValue = Math.floor(event.data * self.factorVolumen)
        if (self.recording) {
          // chartjsArray.push(dataValue)
          self.arrayValues.push({x:Date.now(), y: self.dataValue})
          // localCounter++
        }

        if (self.valor >= self.maxValue) {
          self.maxValue = parseFloat(event.data)
        }
      
      });
    },
    pararWS() {
      // if(this.socket) {
        
        this.socket.close()
        console.log("parar ws")
        // this.addDatos(this.arrayValues)


      // }
    },
    borrarDatos() {
      this.arrayValues = []
    },
    async addDatos(datos) {
      const docRef = await addDoc(collection(db, 'graficas'), {
        arrayDatos: datos
      })
      console.log("añadido documento: ", docRef.id)
    }
  }
})


