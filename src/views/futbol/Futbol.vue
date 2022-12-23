<template>
  <v-main>
    <h1>FUTBOL</h1>
  </v-main>
</template>

<script setup>
import { usegFutbolStore } from "../../store/futbol"

const futbolStore = usegFutbolStore()
futbolStore.inicializar()
console.log(futbolStore.local)
</script>

<style>

</style>