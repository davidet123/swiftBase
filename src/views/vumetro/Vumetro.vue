
<template>
  <main>
    <h1 class="text-center">Vumetro Swift</h1>
    <v-row>
      <v-col cols="3">
        <v-row>
          <v-col class="d-flex flex-column ma-3 align-center"  cols="12">
            <h4>CONEXION SWIFT</h4>
            <p>Status Swift: {{ swiftConnectionStatus }}</p>
            <v-btn class="ma-1 mb-5" width="80%" color="success" x-small @click="OpenConnection()">Open Connection</v-btn>
            <h4>CONEXIONES DATOS</h4>
            <v-btn class="ma-1" width="80%" :color="captura.color" x-small @click="capturar()">{{ captura.texto }}</v-btn>
            <p>{{ websocketStore.errorMSG }}</p>
            <!-- <p>Status swift {{ swiftConnectionStatus }}</p> -->
          </v-col>
          <v-col class="d-flex flex-column ma-3 align-center"  cols="12">
            <h4>CONTROL SWIFT</h4>
            <v-btn class="ma-1 botonSwift" color="success" x-small @click="bringOn()">Insertar vumetro</v-btn>
            <v-btn class="ma-1 botonSwift" color="success" x-small @click="takeOff()">Quitar vumetro</v-btn>
            
          </v-col>
          <v-col>
            <v-switch
            class="d-flex justify-center"
              v-model="entrada"
              :label=' entrada ? "AUDIO" : "WEBSOCKET" '
              color="red"
              inset
            ></v-switch>
          </v-col>
        </v-row>

      </v-col>
      <v-col cols="9">
        <v-row>
          <v-col class="text-center">
            <video id="myVideoId" width="620" height="480" autoplay muted playsinline/>

          </v-col>
        </v-row>
      </v-col>
    </v-row>
    
    

    <v-row>
      <v-col class="text-center">
        <h1>Valor {{ entrada ? " AUDIO" : " WEBSOCKET"}} => {{ textoVumetro }}</h1>
        <h1>Nivel {{ entrada ? " AUDIO" : " WEBSOCKET"}} => {{ nivelVumetro }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <grafica />
      </v-col>
    </v-row>
  </main>
</template>

<script setup>
import { ref, watch, computed, reactive } from 'vue';

import {OpenConnection, rtRemote, videoStream, swiftConnectionStatus} from '@/composables/swiftConnection.js'

import { useCaptureAudioStore } from "../../store/captureAudio"
import { useWebsocketStore } from "../../store/websocket"
import { storeToRefs } from "pinia";

import grafica from '@/components/vumetro/Grafica.vue'


const audioStore = useCaptureAudioStore()
const websocketStore = useWebsocketStore()

const { valorVumetro } = storeToRefs(audioStore)


// Inicializar la conexión con Swift
console.log(swiftConnectionStatus)

// OpenConnection()


// Selector entrada
// true = AUDIO | false = WEBSOCKET
let errorMsg = ref(null)
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

let captura = reactive({
  texto: "CAPTURAR DATOS",
  color: "success"
})
console.log(websocketStore.recording)
const capturar = () => {
  if (!websocketStore.recording) {
    startCaptureData()
    
  } else {
    stopCaptureData()
    
  }
}

const startCaptureData = () => {
  if(entrada.value) {
    audioStore.captureAudio()
  } else {
    websocketStore.connectionState = 0
    websocketStore.conectarWS()
    websocketStore.recording = true
    captura.texto = "DETENER CAPTURA"
    captura.color = "error"
  }
}

const stopCaptureData = () => {
  if (entrada.value) {
    audioStore.stopCaptureAudio()
  } else {
    websocketStore.pararWS()
    websocketStore.recording = false
    captura.texto = "CAPTURAR DATOS"
    captura.color = "success"
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
  try {
    rtRemote.updateFields(grafico + "::" + node + "TEXT", "String", val)
  } catch (err) {
    console.log(err)
  }
})
watch(() => nivelVumetro.value, (val) => {
  try {
  rtRemote.updateFields(grafico + "::n1_DUPL", "NumDuplicates", val);
} catch (err) {
    console.log(err)
  }
})

watch(() => websocketStore.connectionState, val => {
  switch (val) {
    case 0:
      errorMsg.value = "Conectando..."
      break
    case 1:
      errorMsg.value = "CONECTADO"
      break
    case 2:
      errorMsg.value = "Cerrando conexión..."
      break
    case 3:
      console.log(val)
      stopCaptureData()
      break
    default:
      errorMsg.value = "ESPERANDO CONEXIÓN"
      break
  }

})

</script>

<style>
  main {
    background-color: #567189;
    color: white;
    
  }

  .boton {
    background-color: #FAD6A5;
    color: #2b2b2b;
    font-weight: 800;
  }

  .botonSwift {
    width: 50%;
    height: 6em !important;
  }
   
  .activo {
    color: rgb(189, 9, 9)
  }
</style>