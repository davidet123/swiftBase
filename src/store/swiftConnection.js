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
  fileName: null
}),

getters: {

},
actions: {
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
      trace("Connection opened");
      self.rtRemote = new RTRemote(rtConnection1, "remote");
      // self.rtRemote.getStatus("Project","Current")
      self.swiftConnectionStatus = 1
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


      }
      // self.rtRemote.getStatus("Project","Current")
      self.swiftConnectionStatus = 1
      // console.log(self.rtRemote)
      // return {videoStream, rtRemote}
    }
    rtConnection.onClose = function() {
      trace("Connection Closed, try again…");
      // If the connection closes, attempt to reopen it.
      this.swiftConnectionStatus = 0
      self.OpenConnection();
      }
  },
  getStatus(type, filter) {
    // console.log(type, filter)
    console.log("status store")
    this.rtRemote.getStatus(type, filter)
    // console.log(status)

  },
  cambiarImagen() {
    // console.log(this.rtRemote)
    const grafico = 'Estadistica'
    const node = 'grafica'
    const ruta = 'C:\\Users\\deimo\\Downloads\\' + this.fileName
    // console.log(ruta)
    this.rtRemote.updateFields(grafico + "::" + node + "SHDR", "TextureImage", ruta)
  },
  cueGraphic (metodo) {
    // console.log(metodo)
    this.rtRemote.playMethod(metodo + "::cueGraphic")
  },
  bringOn (metodo) {
    console.log(metodo + "::bringOn")
    this.rtRemote.playGraphic(metodo)
    this.rtRemote.playMethod(metodo + "::bringOn")
  },
  takeOff (metodo) {
    console.log(metodo + "::takeOff")
      this.rtRemote.playMethod(metodo + "::takeOff")
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
    this.rtRemote.playMethod("TICKER::oratgeOn")
  },
  oratgeOff () {
    this.rtRemote.playMethod("TICKER::oratgeOff")
  },
  añadidoOn(tiempo) {
    this.rtRemote.updateFields("MARCADOR::DESCUENTOTEXT", "String", `${tiempo}'`)
    this.rtRemote.playMethod("MARCADOR::descuentoOn")
  },
  añadidoOff() {
    this.rtRemote.playMethod("MARCADOR::descuentoOff")
  },
  


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