<template>
  <v-card class="card" >
    <v-card-title>
      <p>{{ arbitro }}</p>
    </v-card-title>
    <v-card-subtitle class="ma-0">
      <v-row class="my-0 py-0">
        <v-col cols="6" >
          <p>{{ nombre }}</p>
        </v-col>
        <v-col cols="6">
          <BotonLive nombre="DSK_ARBITROS" @activar="activarGrafico"/>
        </v-col>
      </v-row>
    </v-card-subtitle>
  </v-card>


</template>

<script setup>

import { toRefs } from 'vue'
import BotonLive from '@/components/simple/botonLive.vue' 
import { useSwiftConnectionStore } from "../../store/swiftConnection"


const swiftConnectionStore = useSwiftConnectionStore()


const props = defineProps(["arbitro", "nombre"])

const { arbitro, nombre } = toRefs(props)

console.log(props)


const activarGrafico = payload => {
  console.log(payload)
  if (payload.live) {
    console.log("bringon")
    bringOn(payload.nombre)
  } else {
    takeOff(payload.nombre)
    console.log("bringon")
  }
}
const bringOn = (metodo) => {
  swiftConnectionStore.rtRemote.playGraphic(metodo)
  swiftConnectionStore.rtRemote.updateFields("DSK_INDIVIDUAL::SUPERIORTEXT","String", tecnico.value.titulo)
  swiftConnectionStore.rtRemote.updateFields("DSK_INDIVIDUAL::INFERIORTEXT","String", tecnico.value.nombre)
  swiftConnectionStore.rtRemote.playMethod(metodo + "::bringOn")
}
const takeOff = (metodo) => {
  swiftConnectionStore.rtRemote.playGraphic(metodo)
  swiftConnectionStore.rtRemote.playMethod(metodo + "::takeOff")
}

</script>

<style scoped>
  .card {
    color: white;
    background-color: #303030;
  }
</style>