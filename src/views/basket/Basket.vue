<template>
  <v-main>
    <v-row>
      <v-col class="text-center pa-3">
        <h1>BASKET</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2" offset="2" class="text-center"><v-btn color="success"  @click="router.push(`/basket/editarpartidobasket/localstorage`)">EDITAR PARTIDO</v-btn></v-col>
      <!-- <v-col cols="12" class="text-center"><v-btn color="success" @click="crono">CRONO</v-btn></v-col> -->
    </v-row>
    <v-row>
      <v-col>
        <PartidoBasketIndividual />
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col class="text-center">
        <video id="myVideoId" width="620" height="480" autoplay muted playsinline/>

      </v-col>
    </v-row> -->
    <!-- <v-row>
      <v-col cols="12" class="text-center"><h2>Listado partidos</h2></v-col>
      <v-col cols="8" offset="2" v-for="partido in partidos" :id="partido.id_partido">
        <PartidoIndividual :partido="partido"/> 
        <JugadorFutbolnd :jugador="jugador" @borrarJugador="id => borrarJugador(id)"/> 
      </v-col>
    </v-row>-->
    <!-- <v-row v-if="wsPartido">
      <v-col cols="12" class="text-center"><h2>Partido WS</h2></v-col>
      <v-col cols="8" offset="2" >
        <PartidoIndividualWS :partido="wsPartido" :marcador="wsMarcador"/> 
      </v-col>
    </v-row> -->
  </v-main>

</template>

<script setup>

import { useRouter } from 'vue-router';
import { usegBasketStore } from "../../store/basket"
import { storeToRefs } from 'pinia'
import PartidoBasketIndividual from "../../components/basket/PartidoBasketIndividual.vue"


const router = useRouter()

const basketStore = usegBasketStore()

const { partidoBasket, marcadorBasket } = storeToRefs(basketStore)

basketStore.setPartidoBasket()

// basketStore.resetPartidoBasket()
console.log(partidoBasket.value)





</script>