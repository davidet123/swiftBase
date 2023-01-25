<template>
  <v-row class="my-3">
    <v-col class="text-center">
      <h1>SETTINGS</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="4" offset="4" class="text-center">
      <h2>Control Swift</h2>
      <v-row>
        <v-col cols="3"><v-text-field
          label="protocolo"
          v-model="protocoloSwift"
        ></v-text-field></v-col>
        <v-col cols="6"><v-text-field
          label="URL Swift"
          v-model="urlSwift"
        ></v-text-field></v-col>
        <v-col cols="3">
          <v-text-field
          label="puerto"
          v-model="puertoSwift"
        ></v-text-field>
        </v-col>
      </v-row>
      <h2>Conexion Websocket</h2>
      <v-row>
        <v-col cols="3"><v-text-field
          label="protocolo"
          v-model="protocoloWebsocket"
        ></v-text-field></v-col>
        <v-col cols="6">
          <v-text-field
            label="URL Websocket"
            v-model="urlWebsocket"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field 
            label="puerto"
            v-model="puertoWebsocket"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn v-if="!guardado" :disabled="guardado" color="success" @click="guardarAjustes()">GUARDAR</v-btn>
          <v-btn v-else color="success" to="/">VOLVER</v-btn>
        </v-col>
      </v-row>
    </v-col>

  </v-row>


</template>

<script setup>
  import { ref, computed, watch } from 'vue'

  import { useWebsocketStore } from "../store/websocket"
  import { useSwiftConnectionStore } from "../store/swiftConnection"

  let guardado = ref(false)

  const websocketStore = useWebsocketStore()
  const swiftConnectionStore = useSwiftConnectionStore()


  const protocoloSwift = ref(swiftConnectionStore.URLSwift.split(":")[0])
  const urlSwift = ref(swiftConnectionStore.URLSwift.split(":")[1])
  const puertoSwift = ref(swiftConnectionStore.URLSwift.split(":")[2])
  
  const protocoloWebsocket = ref(websocketStore.URLWebsocket.split(":")[0])
  const urlWebsocket = ref(websocketStore.URLWebsocket.split(":")[1])
  const puertoWebsocket = ref(websocketStore.URLWebsocket.split(":")[2])
  // const urlSwift = ref('ws:localhost')
  // const puertoSwift = ref('5555')
  // const urlWebsocket = ref('ws://localhost')
  // const puertoWebsocket = ref('8080')

  const conexionSwift = computed(() => {
    return protocoloSwift.value + ":" +  urlSwift.value + ":" + puertoSwift.value
  })
  const conexionWebsocket = computed(() => {
    return protocoloWebsocket.value + ":" +  urlWebsocket.value + ":" + puertoWebsocket.value
  })

  const guardarAjustes = () => {
    websocketStore.setUrl(conexionWebsocket.value)
    swiftConnectionStore.setUrl(conexionSwift.value)
    guardado.value = true
  }

  watch(() => conexionSwift.value, () => {
    guardado.value = false
  })
  watch(() => conexionWebsocket.value, () => {
    guardado.value = false
  })



</script>