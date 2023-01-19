import { defineStore } from 'pinia'

export const useSwiftConnectionStore = defineStore('swiftConnection', {

state: () => ({
  url: "ws:localhost:5555",
  videoStream: null,
  rtRemote: null,
  swiftConnectionStatus: 0,
  fileName: null
}),

getters: {

},
actions: {
  OpenConnection()
  {
    const rtConnection = new RTConnection(this.url, 5, 2);
    const self = this
    rtConnection.onOpen = function() {
      trace("Connection opened");
      self.videoStream = new RTVideoStream(rtConnection, "videoProtocol", "myVideoId");
      self.rtRemote = new RTRemote(rtConnection, "remote");
      self.rtRemote.getStatus("Project","Current")
      self.swiftConnectionStatus = 1
      // console.log(self.rtRemote)
      // return {videoStream, rtRemote}
    }
    rtConnection.onClose = function() {
      trace("Connection Closed, try again…");
      // If the connection closes, attempt to reopen it.
      this.swiftConnectionStatus = 0
      OpenConnection();
      }
  },
  cambiarImagen() {
    console.log(this.rtRemote)
    const grafico = 'Estadistica'
    const node = 'grafica'
    const ruta = 'C:\\Users\\deimo\\Downloads\\' + this.fileName
    console.log(ruta)
    this.rtRemote.updateFields(grafico + "::" + node + "SHDR", "TextureImage", ruta)
  }

}



})