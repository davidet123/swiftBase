<template>
  <v-app>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup>
  import {  RouterView } from 'vue-router'
  import { usegFutbolStore } from "./store/futbol"

  const futbolStore = usegFutbolStore()
  futbolStore.cargarEquipo()

  
</script>


