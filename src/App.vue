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
  import { onMounted, onBeforeMount } from 'vue'

  const futbolStore = usegFutbolStore()

  // Cargar desde firebase

  onBeforeMount(async () => {
    console.log("onbeforemount")
    await futbolStore.cargarEquipos()
  
    await futbolStore.cargarPartidos()

  })


  
</script>

<style>
  v-.main_bg {
    background-color: black 
  }
</style>


