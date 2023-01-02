<template>
  <v-main>
    <v-row>
      <v-col class="text-center pa-3">
        <h1>FUTBOL</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center"><v-btn>NUEVO PARTIDO</v-btn></v-col>
      <v-col cols="12" class="text-center">LISTADO PARTIDOS</v-col>
    </v-row>
    <v-row>
      <v-col cols="12">Listado jugadores</v-col>
      <v-col cols="12" v-for="jugador in jugadores" :id="jugador.id">
        <JugadorFutbolnd :jugador="jugador" @borrarJugador="id => borrarJugador(id)"/>
        <!-- {{ jugador }} -->
      </v-col>
    </v-row>
  </v-main>
</template>

<script setup>
import { ref, computed } from "vue"

import { usegFutbolStore } from "../../store/futbol"
import JugadorFutbolnd from "../../components/futbol/JugadorFutbolInd.vue"
import { storeToRefs } from "pinia";

const futbolStore = usegFutbolStore()
const { equipos } = storeToRefs(futbolStore)
const jugadores = computed(() => equipos.value[0].jugadores)
// console.log(equipos.value[0])
/* console.log(futbolStore.equipos[0].jugadores[0].apodo) */
const borrarJugador = (id) => {
  console.log(id)
  futbolStore.eliminarJugador(id)
}


</script>

<style>

</style>