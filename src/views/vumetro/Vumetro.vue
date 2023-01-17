
<template>
  <main>
    <h1>Vumetro Swift</h1>
    <v-row>
      <v-col>
        <v-btn @click="insertar()">Insertar</v-btn>
        <v-btn @click="startCaptureAudio()">Start capture</v-btn>
        <v-btn @click="stopCapture()">Stop capture</v-btn>

      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <video id="myVideoId" width="620" height="480" autoplay muted playsinline/>

      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h1>{{ valorVumetro }}</h1>
      </v-col>
    </v-row>
    
  </main>
</template>

<script setup>

  import {OpenConnection, rtRemote, videoStream} from '@/composables/swiftConnection.js'
  // import {captureAudio, valorVumetro, stopCaptureAudio } from '@/composables/capturaAudio.js'

  import { useCaptureAudioStore } from "../../store/captureAudio"
  import { storeToRefs } from "pinia";

  
  const audioStore = useCaptureAudioStore()
  const { valorVumetro } = storeToRefs(audioStore)



  OpenConnection()
  // console.log(rtRemote)
  // console.log(rtRemote)


  let grafico = "Vumetro"
  
  const insertar = () => {
    rtRemote.playGraphic(grafico)
    rtRemote.playMethod(grafico + "::bringOn")
  }

  const startCaptureAudio = () => {
    audioStore.captureAudio()
  }

  const stopCapture = () => {
    audioStore.stopCaptureAudio()
  }

  console.log()

  const animarVumetro = valor => {
  console.log(valor)
  // rtRemote.updateFields(grafico + "::rectangle1TRFM", "Display", true); 
  rtRemote.updateFields(grafico + "::n1_DUPL", "NumDuplicates", transform(valor));
}
</script>