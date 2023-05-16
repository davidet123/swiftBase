<template>
  <v-row>
    <v-col class="text-center">
      <h1>Listado equipos</h1>

    </v-col>
  </v-row>
  <v-row v-for="equipo in equipos" :key="equipo.id_equipo">
    <v-col cols="6" class="mx-auto">
      <EquipoFutbolIndividual :equipo="equipo"/>
    </v-col>
  </v-row>
  <!-- <v-row>
    <v-col cols="12" class="text-center">
      <h2>Editar Partido</h2>
      <h4>{{ equipo_local.nombre_equipo }} vs {{ equipo_visitante.nombre_equipo }}</h4>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="2" offset="4">
      <v-text-field v-model="partido.fecha"></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-text-field v-model="partido.hora"></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="6" class="ml-2 text-center">
      <v-text-field class="mb-2" density="compact" v-model="equipo_local.nombre_equipo"></v-text-field>
      <v-row v-for="jugador in equipo_local.jugadores" :key="jugador.id_jugador">
        <v-col cols="2" class="ma-0 pa-0">
          <v-text-field density="compact" v-model="jugador.numero"></v-text-field>
        </v-col>
        <v-col cols="6" class="ma-0 pa-0">
          <v-text-field density="compact" v-model="jugador.nombre_jugador"></v-text-field>
        </v-col>
        <v-col cols="4" class="ma-0 pa-0">  
          <v-select
            v-model="jugador.posicion"
            :items="posiciones"
            item-title="descripcion"
            item-value="descripcion"
            density="compact"
          ></v-select> 

        </v-col>
      </v-row>

    </v-col>
  </v-row>
  -->
</template>

<script setup>

import EquipoFutbolIndividual from "../../components/futbol/EquipoFutbolIndividual.vue"
import { usegFutbolStore } from "../../store/futbol"

const futbolStore = usegFutbolStore()

const equipos = futbolStore.getEquipos



  /* import { useRoute } from 'vue-router';
  
  
  const futbolStore = usegFutbolStore()
  const route = useRoute()

  const id = route.params.id

  const partido = futbolStore.buscarPartido(id)

  const equipo_local = futbolStore.buscarEquipo(partido.id_equipo_local)
  const equipo_visitante = futbolStore.buscarEquipo(partido.id_equipo_visitante)  

  const posiciones = futbolStore.getPosiciones */

</script>