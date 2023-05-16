<template>
  
  
  <v-card class="mx-4">
    <v-card-item>
      <v-card-title>
       {{ partido.equipo_local }} vs {{ partido.equipo_visitante }}
      </v-card-title>
      <v-card-subtitle>
        
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <v-row>
        <v-col cols="8">
          {{ partido.fecha }} | {{ partido.hora }} | {{ partido.lugar }}
        </v-col>
        <v-col cols="4">
          <v-btn color="success" @click="irPartido(partido.id_partido)">ESTADISTICA</v-btn>
          <v-btn color="success" @click="editarPartido(partido.id_partido)">editar</v-btn>
        </v-col>

      </v-row>
    </v-card-text>

  </v-card>

</template>


<script setup>

import { useRouter, useRoute } from 'vue-router';


const router = useRouter()
const route = useRoute()

const id = route.params.id

const props = defineProps(["partido"])




const irPartido = id => {
  router.push(`/futbol/estfutbol/${id}`)
}

const editarPartido = id => {
  router.push(`/futbol/editarpartidofutbol/${id}`)
}

</script>