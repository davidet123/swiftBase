
<template>
  <main class="main_vumetro">
    <h1 class="text-center">Vúmetro</h1>
    <v-row>
      <v-col cols="2">
        <v-row>
          <v-col class="d-flex flex-column ma-3 align-center"  cols="12">
            <h4>CONEXION SWIFT</h4>
            <p>Status Swift: {{ swiftConnectionStore.swiftConnectionStatus }}</p>
            <v-btn class="ma-1 mb-5" width="80%" color="success" x-small @click="swiftConnectionStore.OpenConnection()">Open Connection</v-btn>
            <h4>CONEXIONES DATOS</h4>
            <v-btn class="ma-1" width="80%" :color="captura.color" x-small @click="capturar()">{{ captura.texto }}</v-btn>
            <p>{{ websocketStore.errorMSG }}</p>
            <v-btn class="ma-1" width="80%" color="success" x-small @click="swiftConnectionStore.cambiarImagen()">Enviar gráfica a Swift</v-btn>
            <v-btn class="ma-1" width="80%" color="success" x-small @click="borrarDatos()">Borrar gráfica</v-btn>
            <v-col>
            <v-switch
            class="d-flex justify-center"
              v-model="entrada"
              :label=' entrada ? "AUDIO" : "WEBSOCKET" '
              color="red"
              inset
            ></v-switch>
          </v-col>
            <!-- <p>Status swift {{ swiftConnectionStatus }}</p> -->
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2">
        <v-row>
          <v-col class="d-flex flex-column ma-3 align-center"  cols="12">
            <h4>CONTROL SWIFT</h4>
            <v-row class="d-flex align-center justify-space-between mt-4">
              <h4>Vúmetro</h4>
              <v-col>
                <v-btn @click="insertarGrafico('Vumetro')" :class="graficosLive[0].class">LIVE</v-btn>
              </v-col>
            </v-row>
            <v-row class="d-flex align-center justify-space-between mt-4">
              <h4>Estadística</h4>
              <v-col>
                <v-btn @click="insertarGrafico('Estadistica')" :class="graficosLive[1].class">LIVE</v-btn>
              </v-col>
            </v-row>
            
            
            
          </v-col>
          
        </v-row>

      </v-col>
      <v-col cols="8">
        <v-row>
          <v-col class="text-center">
            <video id="myVideoId"  autoplay muted playsinline/>

          </v-col>
        </v-row>
      </v-col>
    </v-row>
    
    

   <!--  <v-row>
      <v-col class="text-center">
        <h1>Valor {{ entrada ? " AUDIO" : " WEBSOCKET"}} => {{ textoVumetro }}</h1>
        <h1>Nivel {{ entrada ? " AUDIO" : " WEBSOCKET"}} => {{ nivelVumetro }}</h1>
      </v-col>
    </v-row> -->
    <v-row>
      <v-col>
        <grafica />
      </v-col>
    </v-row>
  </main>
</template>

<script setup>
import { ref, watch, computed, reactive } from 'vue';

// import {OpenConnection, rtRemote, videoStream, swiftConnectionStatus} from '@/composables/swiftConnection.js'

import { useCaptureAudioStore } from "../../store/captureAudio"
import { useWebsocketStore } from "../../store/websocket"
import { useSwiftConnectionStore } from "../../store/swiftConnection"
import { storeToRefs } from "pinia";

import grafica from '@/components/vumetro/Grafica.vue'


const audioStore = useCaptureAudioStore()
const websocketStore = useWebsocketStore()
const swiftConnectionStore = useSwiftConnectionStore()

const { valorVumetro } = storeToRefs(audioStore)


// Inicializar la conexión con Swift
// console.log(swiftConnectionStatus)

swiftConnectionStore.OpenConnection()


// Selector entrada
// true = AUDIO | false = WEBSOCKET
let errorMsg = ref(null)
let entrada = ref(false)

let grafico = "Vumetro"
let node = "valor_vumetro"

// Métodos Swift

let vumetroIn = false
/* let swiftLive = computed(() => {
  if (vumetroIn) {
    return 'vumetroIn'
  } 
  return 'vumetroOut'

} ) */

const graficosLive = reactive([{
  nombre: "Vumetro",
  live: false,
  class: ref('vumetroOut')
  },
  {
    nombre: "Estadistica",
    live: false,
    class: ref('vumetroOut')
  }
])
// const vumetroLive = ref('vumetroOut')
// const estadisticaLive = ref('vumetroOut')

const insertarGrafico = (metodo => {
  grafico = graficosLive.find(el => {
    return el.nombre == metodo
  })
  if(!grafico.live) {
    bringOn(metodo)
    grafico.class = 'vumetroIn'

  } else {
    takeOff(metodo)
    grafico.class = 'vumetroOut'
  }
  grafico.live = !grafico.live

})


const bringOn = (metodo) => {
  console.log(swiftConnectionStore.rtRemote)
  swiftConnectionStore.rtRemote.playGraphic(metodo)
  swiftConnectionStore.rtRemote.playMethod(metodo + "::cueGraphic")
  swiftConnectionStore.rtRemote.playMethod(metodo + "::bringOn")
  swiftConnectionStore.rtRemote.updateFields(metodo + "::n1_DUPL", "NumDuplicates", 0)
}
const takeOff = (metodo) => {
  swiftConnectionStore.rtRemote.playGraphic(metodo)
  swiftConnectionStore.rtRemote.playMethod(metodo + "::takeOff")
}

// Iniciar captura de audio en audio store

let captura = reactive({
  texto: "CAPTURAR DATOS",
  color: "success"
})
// console.log(websocketStore.recording)
const capturar = () => {
  if(entrada.value) {
    if(!audioStore.recording) {
      audioStore.recording = true
      startCaptureData()
    } else {
      audioStore.recording = false
      startCaptureData()
    }
  } else {
    if (!websocketStore.recording) {
      websocketStore.recording = true
      startCaptureData()
      
    } else {
      websocketStore.recording = false
      stopCaptureData()
      
    }
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

const borrarDatos = () => {
  websocketStore.borrarDatos()
}

const textoVumetro = computed( () => {
  return entrada.value ? audioStore.textoVumetro : websocketStore.textoVumetro
})

const nivelVumetro = computed(() => {
  return entrada.value ? audioStore.nivelVumetro : websocketStore.nivelVumetro 
})


// Envío de datos a swift

watch(() => textoVumetro.value, (val) => {
  try {
    swiftConnectionStore.rtRemote.updateFields(grafico.nombre + "::" + node + "TEXT", "String", val)
  } catch (err) {
    console.log(err)
  }
})
watch(() => nivelVumetro.value, (val) => {
  try {
    swiftConnectionStore.rtRemote.updateFields(grafico.nombre + "::n1_DUPL", "NumDuplicates", val);
} catch (err) {
    console.log(err)
  }
})

/* watch(() => websocketStore.connectionState, val => {
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
      // console.log(val)
      stopCaptureData()
      break
    default:
      errorMsg.value = "ESPERANDO CONEXIÓN"
      break
  }

}) */

</script>

<style>
  .main_vumetro {
    background-color: #567189;
    color: white;
    
  }

  .boton {
    background-color: #FAD6A5;
    color: #2b2b2b;
    font-weight: 800;
  }

  .botonSwift {
    /* width: 60%; */
    height: 6em !important;
  }
   
  .activo {
    color: rgb(189, 9, 9)
  }

  .vumetroOut {
    background-color: white;
    color: rgb(189, 9, 9) !important;
  }

  .vumetroIn {
    background-color: rgb(189, 9, 9);
    color: white !important
  }
</style>