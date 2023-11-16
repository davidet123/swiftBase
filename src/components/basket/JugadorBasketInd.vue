<template>
  <v-row class="pa-5 mx-5">
    <v-col cols="12">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title class="nombre_jugador">

            {{ jugador.apodo }} - {{ nombre_equipo }}
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            text
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

    </v-col>
    
  </v-row>

</template>

<script setup>

import { toRefs } from 'vue'


const props = defineProps(["jugador", "id_jugador", "fondo", "temporizador", "equipo", "nombre_equipo"])
const { jugador, equipo, nombre_equipo } = toRefs(props)

</script>

<style scoped>

.nombre_jugador {
    color: white;
    background-color: #303030;
  }

</style>