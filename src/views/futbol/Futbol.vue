<template>
  <v-main>
    <v-row>
      <v-col class="text-center pa-3">
        <h1>FUTBOL</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2" offset="2" class="text-center"><v-btn color="success"  @click="router.push(`/futbol/addpartidofutbol`)">NUEVO PARTIDO</v-btn></v-col>
      <v-col cols="2" class="text-center"><v-btn color="success"  @click="router.push(`/futbol/addequipofutbol`)">NUEVO EQUIPO</v-btn></v-col>
      <v-col cols="2" class="text-center"><v-btn color="success" @click="router.push(`/futbol/listaequiposfutbol`)">EDITAR EQUIPO</v-btn></v-col> 
      <v-col cols="2" class="text-center"><v-btn color="success" @click="router.push(`/futbol/addcompeticionfutbol`)">COMPETICIONS</v-btn></v-col> 
      <!-- <v-col cols="12" class="text-center"><v-btn color="success" @click="crono">CRONO</v-btn></v-col> -->
    </v-row>
    <!-- <v-row>
      <v-col class="text-center">
        <video id="myVideoId" width="620" height="480" autoplay muted playsinline/>

      </v-col>
    </v-row> -->
    <v-row>
      <v-col cols="12" class="text-center"><h2>Listado partidos</h2></v-col>
      <v-col cols="8" offset="2" v-for="partido in partidos" :id="partido.id_partido">
        <PartidoIndividual :partido="partido"/> 
        <!-- <JugadorFutbolnd :jugador="jugador" @borrarJugador="id => borrarJugador(id)"/> -->
      </v-col>
    </v-row>
    <v-row v-if="wsPartido">
      <v-col cols="12" class="text-center"><h2>Partido WS</h2></v-col>
      <v-col cols="8" offset="2" >
        <PartidoIndividualWS :partido="wsPartido" :marcador="wsMarcador"/> 
      </v-col>
    </v-row>
  </v-main>
</template>

<script setup>
import { ref, computed } from "vue"

import { usegFutbolStore } from "../../store/futbol"
import { useFutbolWebsocketStore } from "../../store/futbolWebsocket"
import PartidoIndividual from "../../components/futbol/PartidoIndividual.vue"
import PartidoIndividualWS from "../../components/futbol/PartidoIndividualWS.vue"
import { storeToRefs } from "pinia";


// import { useSwiftConnectionStore } from "../../store/swiftConnection"
import { useRouter } from 'vue-router';


const router = useRouter()



// const swiftConnectionStore = useSwiftConnectionStore()
// swiftConnectionStore.OpenConnection()


const futbolStore = usegFutbolStore()
const futbolWebsocket = useFutbolWebsocketStore()

// futbolStore.cargarEquipos()

// futbolStore.cargarPartidos()


// CARGAR JUGADORES
// futbolStore.cargarJugadores()
// console.log(futbolStore.jugadores)

// CARGAR PARTIDOS 

// futbolStore.addEquiposToDb()
// futbolWebsocket.resetLocalStorage()


const { partidos } = storeToRefs(futbolStore)
const { wsPartido, wsMarcador } = storeToRefs(futbolWebsocket)
console.log(wsPartido.value)

// const jugadores = computed(() => equipos.value[0].jugadores)

// const borrarJugador = (id) => {
//   console.log(id)
//   futbolStore.eliminarJugador(id)
// }

/* const crono = () => {
  swiftConnectionStore.rtRemote.playGraphic("Crono")
  swiftConnectionStore.rtRemote.playMethod("Crono::bringOn")
  swiftConnectionStore.rtRemote.updateFields("Crono::text1TEXT", "String", "testads")

} */


// Enviar jugadores a la base de datos temporal -----------------------------
// futbolStore.addJugsToDb()


</script>

<style>

</style>