<template>
   <v-row>
        <v-col class="text-center">
          <img src="@/assets/loao_a_punt.svg" alt="logo a punt" class="logo">
        </v-col>
      </v-row>
  <v-row>
    <v-col class="text-center">
      <h1>Aplicación estadística futbol</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="text-center">
      <div v-if="cargando_equipos || cargando_partidos">
        <v-progress-circular
          indeterminate
          color="primary"
          size="50"
        ></v-progress-circular>
      </div>
      <div v-if="!cargando_equipos && !cargando_partidos">
        <v-btn  to="/futbol">EMPEZAR APLICACION FUTBOL</v-btn>
      </div>
    </v-col>
  </v-row>


</template>

<script setup>

import { storeToRefs } from "pinia"
import { usegFutbolStore } from "../../store/futbol"


const futbolStore = usegFutbolStore()
const { cargando_equipos, cargando_partidos } = storeToRefs(futbolStore)


// futbolStore.cargarEquipos()

// futbolStore.cargarPartidos()



</script>