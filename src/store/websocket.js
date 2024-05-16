
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
    URLWebsocket: 'ws://localhost:8001',
    texto: null,
    excelData: null
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
        // console.log(JSON.parse(event.data))

        const datos = JSON.parse(event.data)
        
        // console.log(datos["!ref"])
        const rango = datos["!ref"]

        // console.log(rango.split(":"))

        const match = rango.split(":")[1].match(/^([A-Za-z]+)([0-9]+)$/)

        const letra = rango.split(":")[1].charAt(0)
        const fila = parseInt(rango.split(":")[1].substring(1))

        const columna = letra.charCodeAt(0) - 64

        const encabezados = []

        for (let i = 1; i <= columna; i++) {
          const letraActual = String.fromCharCode(i + 64)
          encabezados.push(datos[`${letraActual}1`].v)
        }

        const resultado = []

        for (let i = 2; i <= fila; i++) {
          const tempRes = {}
          for (let j = 1; j <= columna; j++) {
            const letraActual = String.fromCharCode(j + 64)
            const tempTexto = datos[`${letraActual}${i}`]
            let texto = ""
            // console.log(letraActual)
            // console.log(texto)
            if(!tempTexto) {
              texto=""
            } else {
              texto = tempTexto.v
            }
            // const key = encabezados[j]
            tempRes[encabezados[j-1]] = texto
            // if(texto.hasOwnProperty("v")) console.log(texto.v)
          }
          resultado.push(tempRes)
        }
        this.excelData = resultado
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
    actualizarExcel() {
      console.log(this.socket)
      this.socket.send("actualizarExcel")
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


