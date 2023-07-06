<template>
  
  
  <v-card class="mx-4">
    <v-card-item>
      <v-card-title>
       {{ partido.equipo_local.nombre_equipo }} vs {{ partido.equipo_visitante.nombre_equipo }}
      </v-card-title>
      <v-card-subtitle>
        
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          {{ partido.fecha }} | {{ partido.hora }} | {{ partido.lugar }}
        </v-col>
        <v-col cols="2">
          <v-btn color="success" @click="irPartido(partido.id_partido)">ESTADISTICA</v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn color="success" @click="editarPartido(partido.id_partido)">editar</v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn color="success" @click="resumenFutbol(partido.id_partido)">RESUMEN</v-btn>
        </v-col>
      </v-row>
    </v-card-text>

  </v-card>

</template>


<script setup>

import { useRouter, useRoute } from 'vue-router';
import { usegFutbolStore } from "../../store/futbol"


const futbolStore = usegFutbolStore()

const router = useRouter()
const route = useRoute()

const id = route.params.id

const props = defineProps(["partido"])




const irPartido = id => {
  futbolStore.setPartidoEnJuego(id)
  router.push(`/futbol/estfutbol/${id}`)
}

const editarPartido = id => {
  router.push(`/futbol/editarpartidofutbol/${id}`)
}

const resumenFutbol = id => {
  router.push(`/futbol/resumenfutbol/${id}`)
}

// console.log(props.partido)

</script>