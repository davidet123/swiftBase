<template>
  <v-card class="card" >
    <v-card-text class="ma-0">
      <v-row class="my-0 py-0">
        <v-col cols="7" >
          <h5>{{ tecnico.rol }}</h5>
          <h4>{{ tecnico.nombre }} {{  tecnico.apellido }}</h4>
        </v-col>
        <v-col cols="5">
          <BotonLive nombre="DSK_INFO" @activar="activarGrafico"/>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>


</template>

<script setup>

import { toRefs } from 'vue'
import BotonLive from '@/components/simple/botonLive.vue' 
import { useBalonmanoStore } from "../../store/balonmano"
import { useSwiftConnectionStore } from "../../store/swiftConnection"

const balonmanoStore = useBalonmanoStore()
const swiftConnectionStore = useSwiftConnectionStore()


const props = defineProps(["tecnico", "escudo"])

const { tecnico, escudo } = toRefs(props)


const activarGrafico = payload => {
  // console.log(payload)
  if (payload.live) {
    // console.log("bringon")
    bringOn(payload.nombre)
  } else {
    takeOff(payload.nombre)
    // console.log("bringon")
  }
}
const bringOn = (metodo) => {
  swiftConnectionStore.playGraphic(metodo)
  swiftConnectionStore.cueGraphic(metodo)


  swiftConnectionStore.rtRemote.updateFields("DSK_INFO::SUPERIOR_NOMBRETEXT","String", tecnico.value.nombre)
  swiftConnectionStore.rtRemote.updateFields("DSK_INFO::SUPERIOR_APELLIDOTEXT","String", tecnico.value.apellido)



  swiftConnectionStore.rtRemote.updateFields("DSK_INFO::INFERIORTEXT","String", tecnico.value.rol)
  swiftConnectionStore.rtRemote.updateFields("DSK_INFO::ESCUDOSHDR", "Shader", escudo.value)
  swiftConnectionStore.bringOn(metodo)
  // swiftConnectionStore.playMethod(metodo + "::bringOn")
}
const takeOff = (metodo) => {
  // swiftConnectionStore.rtRemote.playGraphic(metodo)
  swiftConnectionStore.takeOff(metodo)
  // swiftConnectionStore.rtRemote.playMethod(metodo + "::takeOff")
}

</script>

<style scoped>
  .card {
    color: white;
    background-color: #303030;
  }
</style>