import { defineStore } from 'pinia'

import { doc, updateDoc } from "firebase/firestore"
// the firestore instance
import db from '../firebase/init.js'

export const useSwiftConnectionStore = defineStore('swiftConnection', {

state: () => ({
  URLSwift: "ws:localhost:5555",
  videoStream: null,
  rtRemote: null,
  swiftConnectionStatus: 0,
  fileName: null,
  graficosLive: null,
  datosCargados: false
}),

getters: {
  botonesLive: state => state.graficosLive
},
actions: {
  setDatosCargados(val) {
    this.datosCargados = val
  },
  async setUrl(payload) {
    this.URLWebsocket = payload
    const docRef = doc(db, 'settings', 'swift')
    await updateDoc(docRef, {url: payload})
  },
  startVideo() {
    const rtConnection = new RTConnection(this.URLSwift, 5, 2);
    const self = this
    rtConnection.onOpen = function() {
      trace("Connection opened");
      self.videoStream = new RTVideoStream(rtConnection, "videoProtocol", "myVideoId");
      self.swiftConnectionStatus = 1
      // console.log(self.rtRemote)
      // return {videoStream, rtRemote}
    }
    rtConnection.onClose = function() {
      trace("Connection Closed, try again…");
      // If the connection closes, attempt to reopen it.
      this.swiftConnectionStatus = 0
      self.startVideo();
      }

  },
  startConnection() {
    const rtConnection1 = new RTConnection(this.URLSwift, 5, 2);
    const self = this
    rtConnection1.onOpen = function() {
      // console.log(this.graficosLive)
      trace("Connection opened");
      self.rtRemote = new RTRemote(rtConnection1, "remote");
      // self.rtRemote.getStatus("Project","Current")
      self.swiftConnectionStatus = 1
      self.rtRemote.callbackRecieve = function (e) {
        const res = JSON.parse(e.data);
        if(res.status === "undefined") return
        if(res.status === "") return
        // console.log(res.status)
        const elementos = res.status.split(";").filter(n => n)
        // elementos.map(e => JSON.parse(e))
        const graficos = []
        elementos.forEach(element => {
          graficos.push(element.split("=").pop().replace(/_OBJ/g, ''))
        })
        self.graficosLive = graficos
        console.log(self.graficosLive)
      }

      // console.log(self.rtRemote)
      // return {videoStream, rtRemote}
      
    }
    rtConnection1.onClose = function() {
      trace("Connection Closed, try again…");
      // If the connection closes, attempt to reopen it.
      this.swiftConnectionStatus = 0
      self.startConnection();
      }
    // rtConnection1.onRecieve = function (event) {

    //   console.log("callback")
    //   response = JSON.parse(event.data);
    //     if (typeof response.status === "undefined")
    //     return;
    //     if (response.status == "")
    //     return;
    // }
  },
  OpenConnection()
  {
    const rtConnection = new RTConnection(this.URLSwift, 5, 2);
    const self = this
    rtConnection.callbackRecieve = function (e) {
      console.log(e)
    }
    rtConnection.onOpen = function() {
      trace("Connection opened");
      self.videoStream = new RTVideoStream(rtConnection, "videoProtocol", "myVideoId");
      self.rtRemote = new RTRemote(rtConnection, "remote");

      self.rtRemote.callbackOpen = function()
      {
      console.log("callback open")
      }


      self.rtRemote.callbackRecieve = function(event) {
        const response = JSON.parse(event.data);
        console.log(response)
        if (typeof response.status === "undefined")
        return;
        if (response.status == "")
        return;

        // console.log(response)


      }
      // self.rtRemote.getStatus("Project","Current")
      self.swiftConnectionStatus = 1
      // console.log(self.rtRemote)
      // return {videoStream, rtRemote}
    }
    rtConnection.onClose = function() {
      if(this.rtRemote) trace("Connection Closed, try again…");
      // If the connection closes, attempt to reopen it.
      this.swiftConnectionStatus = 0
      self.OpenConnection();
      }
    rtConnection.callbackRecieve = function(e) {
      if(e.data.status === "undefined") return
      console.log(e)
    }
  },
  getStatus(type, filter) {
    // console.log(type, filter)
    // console.log("status store")

    if(this.rtRemote) {
      this.rtRemote.getStatus(type, filter)
      // this.rtRemote.callbackRecieve = function (e) {
      //   console.log(e.data)
      // }
      // return this.rtRemote.getStatus(type, filter)
      
    } 
    // console.log(status)

  },
  cambiarImagen() {
    // console.log(this.rtRemote)
    const grafico = 'Estadistica'
    const node = 'grafica'
    const ruta = 'C:\\Users\\deimo\\Downloads\\' + this.fileName
    // console.log(ruta)
    if(this.rtRemote) this.rtRemote.updateFields(grafico + "::" + node + "SHDR", "TextureImage", ruta)
  },
  startTransaction() {
    if(this.rtRemote) this.rtRemote.startTransaction()
  },
  endTransaction() {
    if(this.rtRemote) this.rtRemote.endTransaction()
  },
  cueGraphic (metodo) {
    // console.log(this.rtRemote)
    if (this.rtRemote) this.rtRemote.playMethod(metodo + "::cueGraphic")
  },
  bringOn (metodo) {
    console.log(metodo + "::bringOn")
    // if(this.rtRemote) this.rtRemote.playGraphic(metodo)
    if(this.rtRemote) this.rtRemote.playMethod(metodo + "::bringOn")
  },
  takeOff (metodo) {
    console.log(metodo + "::takeOff")
    if(this.rtRemote) this.rtRemote.playMethod(metodo + "::takeOff")
  },
  startClock (metodo) {
    console.log('Startclock')
    if(this.rtRemote) this.rtRemote.playMethod(metodo + "::startClock")
  },
  stopClock (metodo) {
    if(this.rtRemote) this.rtRemote.playMethod(metodo + "::stopClock")
  },
  resetClock (metodo) {
    if(this.rtRemote) this.rtRemote.playMethod(metodo + "::resetClock")
  },
  oratgeOn () {
    if(this.rtRemote) this.rtRemote.playMethod("TICKER::oratgeOn")
  },
  oratgeOff () {
    if(this.rtRemote) this.rtRemote.playMethod("TICKER::oratgeOff")
  },
  añadidoOn(tiempo) {
    if(this.rtRemote) this.rtRemote.updateFields("MARCADOR::DESCUENTOTEXT", "String", `${tiempo}'`)
    if(this.rtRemote) this.rtRemote.playMethod("MARCADOR::descuentoOn")
  },
  añadidoOff() {
    if(this.rtRemote) this.rtRemote.playMethod("MARCADOR::descuentoOff")
  },
  customMetodo(grafico, metodo) {
    if(this.rtRemote) this.rtRemote.playMethod(`${grafico}::${metodo}`)
  },

  playGraphic(metodo) {
    if(this.rtRemote) this.rtRemote.playGraphic(metodo)
  }
  


  // const bringOn = (metodo) => {
  //   swiftConnectionStore.rtRemote.playGraphic(metodo)
  //   swiftConnectionStore.rtRemote.playMethod(metodo + "::bringOn")
  // }
  // const takeOff = (metodo) => {
  //   swiftConnectionStore.rtRemote.playGraphic(metodo)
  //   swiftConnectionStore.rtRemote.playMethod(metodo + "::takeOff")
  // }


}



})