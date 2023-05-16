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

  const futbolStore = usegFutbolStore()

  // Cargar desde firebase
  // futbolStore.cargarEquipo()

  
</script>

<style>
  v-.main_bg {
    background-color: black 
  }
</style>


