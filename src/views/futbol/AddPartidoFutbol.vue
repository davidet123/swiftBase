<template>
  <v-row>
    <v-col cols="12" class="text-center">
      <h1>CREAR NUEVO PARTIDO</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="6">
      <v-select
        v-model="partido.equipo_local"
        :items="equipos"
        item-title="nombre_equipo"
        item-value="nombre_equipo"
        density="compact"
        label="Equipo Local"
      ></v-select> 
    </v-col>
    <v-col cols="6">
      <v-select
        v-model="partido.equipo_visitante"
        :items="equipos"
        item-title="nombre_equipo"
        item-value="nombre_equipo"
        density="compact"
        label="Equipo Visitante"
      ></v-select>
    </v-col>
    <v-col cols="3">
      <v-text-field
        v-model="partido.estadio"
        label="Estadio"
      ></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field
        v-model="partido.lugar"
        label="Lugar"
      ></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field
        v-model="partido.fecha"
        label="Fecha"
      ></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field
        v-model="partido.hora"
        label="Hora"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-btn color="success" @click="crearPartido()">ACEPTAR</v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue';
import { usegFutbolStore } from "../../store/futbol"
import { computed } from 'vue';

const futbolStore = usegFutbolStore()


const partido = ref({
  id_partido: Date.now(),
  equipo_local: null,
  id_equipo_local: null,
  equipo_visitante: null,
  id_equipo_visitante: null,
  fecha: null,
  hora: null,
  lugar: null,
  estadio: null,
  marcador: {local: 0, visitante: 0},
  tiempo: {
    primeraParte: null,
    segundaParte: null,
    añadidoPrimera: null,
    añadidoSegunda: null
  }
})

const equipos = futbolStore.getEquipos

// const idLocal = futbolStore.getIdEquipo(partido.value.equipo_local)
// const idVisitante = futbolStore.getIdEquipo(partido.value.visitante)

const crearPartido = () => {
  // console.log(futbolStore.getIdEquipo(partido.value.equipo_visitante))
  if (partido.value.equipo_local) partido.value.id_equipo_local = futbolStore.getIdEquipo(partido.value.equipo_local)
  if (partido.value.equipo_visitante) partido.value.id_equipo_visitante = futbolStore.getIdEquipo(partido.value.equipo_visitante)
  console.log(partido.value)

  futbolStore.addPartido(partido.value)
}


</script>