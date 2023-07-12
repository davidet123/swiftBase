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
  import { useRotulosStore } from "./store/rotulos"
  import { onMounted, onBeforeMount } from 'vue'

  const futbolStore = usegFutbolStore()
  const rotulosStore = useRotulosStore()

  // Cargar desde firebase

  onBeforeMount(async () => {
    console.log("onbeforemount")
    await futbolStore.cargarJugadores()
    await futbolStore.cargarEquipos()
  
    await futbolStore.cargarPartidos()
    await futbolStore.cargarMarcadores()
    await rotulosStore.cargarRotulos()

  })


  
</script>

<style>
  v-.main_bg {
    background-color: black 
  }
</style>


