
<template>
  <main>
    <h1>Vumetro Swift</h1>
    <v-row>
      <v-col class="text-center">
        <v-btn @click="bringOn()">Insertar</v-btn>
        <v-btn @click="takeOff()">Quitar vumetro</v-btn>
        <v-btn @click="startCaptureAudio()">Start capture</v-btn>
        <v-btn @click="stopCapture()">Stop capture</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <video id="myVideoId" width="620" height="480" autoplay muted playsinline/>

      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h1>{{ valorVumetro }}</h1>
        <h1>{{ audioStore.nivelVumetro }}</h1>
      </v-col>
    </v-row>
    
  </main>
</template>

<script setup>
import { watch } from 'vue';

import {OpenConnection, rtRemote, videoStream} from '@/composables/swiftConnection.js'

import { useCaptureAudioStore } from "../../store/captureAudio"
import { storeToRefs } from "pinia";


const audioStore = useCaptureAudioStore()
const { valorVumetro } = storeToRefs(audioStore)


// Inicializar la conexión con Swift

OpenConnection()


let grafico = "Vumetro"
let node = "valor_vumetro"

// Métodos Swift
const bringOn = () => {
  rtRemote.playGraphic(grafico)
  rtRemote.playMethod(grafico + "::bringOn")
}
const takeOff = () => {
  rtRemote.playGraphic(grafico)
  rtRemote.playMethod(grafico + "::takeOff")
}

// Iniciar captura de audio en audio store
const startCaptureAudio = () => {
  audioStore.captureAudio()
}

const stopCapture = () => {
  audioStore.stopCaptureAudio()
}

// Envío de datos a swift

watch(() => audioStore.nivelVumetro, (val) => {
  rtRemote.updateFields(grafico + "::n1_DUPL", "NumDuplicates", val);
})
watch(() => audioStore.textoVumetro, (val) => {
  console.log(val)
  rtRemote.updateFields(grafico + "::" + node + "TEXT", "String", val)
})
</script>