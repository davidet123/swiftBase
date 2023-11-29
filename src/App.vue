<template>
  <v-app class="main_bg">
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup>
  import {  RouterView } from 'vue-router'
  import { usegFutbolStore } from "./store/futbol"
  import { usegBasketStore } from "./store/basket"
  import { useFutbolWebsocketStore } from "./store/futbolWebsocket"
  import { useRotulosStore } from "./store/rotulos"
  import { usegSheetStore } from "./store/gSheet"
  import { useMisaStore } from "./store/misa"
  import { onMounted, onBeforeMount } from 'vue'

  const futbolStore = usegFutbolStore()
  const basketStore = usegBasketStore()
  const rotulosStore = useRotulosStore()
  const gSheetStore = usegSheetStore()
  const futbolWebsocket = useFutbolWebsocketStore()
  const misaStore = useMisaStore()

  // Cargar desde firebase

  onBeforeMount(async () => {
    // console.log(futbolStore.getPartidos)
    futbolWebsocket.getLocalStorage()
    futbolWebsocket.conectarWS()
    if(futbolStore.getPartidos.length == 0) {
      console.log("onbeforemount")
      await futbolStore.cargarJugadores()
      await futbolStore.cargarEquipos()
      await futbolStore.cargarCompeticiones()
    
      await futbolStore.cargarPartidos()
      await futbolStore.cargarMarcadores()
      await rotulosStore.cargarRotulos()
      await gSheetStore.getLista()
      // await misaStore.cargartextoMisa()

      basketStore.setPartidoBasket()
      // basketStore.resetPartidoBasket()
    }

  })


  
</script>

<style>
  v-.main_bg {
    background-color: black ;
  }
  body::-webkit-scrollbar {
    display: none; 
  }
  
</style>


