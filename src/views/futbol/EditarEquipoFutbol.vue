<template>
  <h1>EDITAREQUIOFUTBOL</h1>
  {{ equipo }}
</template>

<script setup>
import {  useRoute } from 'vue-router';
import { usegFutbolStore } from "../../store/futbol"

const futbolStore = usegFutbolStore()

const route = useRoute()

const id = route.params.id

const equipo = futbolStore.buscarEquipo(id)

</script>