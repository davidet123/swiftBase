
<template>
  <main>
    <h1>Vumetro Swift</h1>
    <v-row>
      <v-col class="text-center" cols="12">
        <v-btn @click="bringOn()">Insertar</v-btn>
        <v-btn @click="takeOff()">Quitar vumetro</v-btn>
        <v-btn @click="startCaptureData()">Start capture</v-btn>
        <v-btn @click="stopCaptureData()">Stop capture</v-btn>
      </v-col>
      <v-col class="text-center">
        <v-switch
          v-model="entrada"
          :label=' entrada ? "AUDIO" : "WEBSOCKET" '
          color="red"
          inset
        ></v-switch>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <video id="myVideoId" width="620" height="480" autoplay muted playsinline/>

      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-center">
        <h1>Valor {{ entrada ? " AUDIO" : " WEBSOCKET"}} => {{ textoVumetro }}</h1>
        <h1>Nivel {{ entrada ? " AUDIO" : " WEBSOCKET"}} => {{ nivelVumetro }}</h1>
      </v-col>
    </v-row>
    
  </main>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

import {OpenConnection, rtRemote, videoStream} from '@/composables/swiftConnection.js'

import { useCaptureAudioStore } from "../../store/captureAudio"
import { useWebsocketStore } from "../../store/websocket"
import { storeToRefs } from "pinia";


const audioStore = useCaptureAudioStore()
const websocketStore = useWebsocketStore()

const { valorVumetro } = storeToRefs(audioStore)


// Inicializar la conexión con Swift

// OpenConnection()


// Selector entrada
// true = AUDIO | false = WEBSOCKET
let entrada = ref(false)

let grafico = "Vumetro"
let node = "valor_vumetro"

// Métodos Swift
const bringOn = () => {
  rtRemote.playGraphic(grafico)
  rtRemote.playMethod(grafico + "::bringOn")
  rtRemote.updateFields(grafico + "::n1_DUPL", "NumDuplicates", 0)
}
const takeOff = () => {
  rtRemote.playGraphic(grafico)
  rtRemote.playMethod(grafico + "::takeOff")
}

// Iniciar captura de audio en audio store
const startCaptureData = () => {
  if(entrada.value) {
    audioStore.captureAudio()
  } else {
    websocketStore.conectarWS()
  }
}

const stopCaptureData = () => {
  if (entrada.value) {
    audioStore.stopCaptureAudio()
  } else {
    websocketStore.pararWS()
  }
}

const textoVumetro = computed( () => {
  return entrada.value ? audioStore.textoVumetro : websocketStore.textoVumetro
})

const nivelVumetro = computed(() => {
  return entrada.value ? audioStore.nivelVumetro : websocketStore.nivelVumetro 
})


// Envío de datos a swift

watch(() => textoVumetro.value, (val) => {
  console.log(val)
  rtRemote.updateFields(grafico + "::" + node + "TEXT", "String", val)
})
watch(() => nivelVumetro.value, (val) => {
  rtRemote.updateFields(grafico + "::n1_DUPL", "NumDuplicates", val);
})
</script>