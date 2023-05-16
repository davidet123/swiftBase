<template>
  <v-row>
    <v-col cols="12" class="text-center">
      <h1>EDITAR PARTIDO</h1>
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
      <v-btn color="success" @click="editarPartido()">ACEPTAR</v-btn>
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
  </v-row> -->
 
</template>

<script setup>

  import { ref } from 'vue';

  import { useRoute } from 'vue-router';
  import { usegFutbolStore } from "../../store/futbol"
  
  
  const futbolStore = usegFutbolStore()
  const route = useRoute()

  const id = route.params.id

  const equipos = futbolStore.getEquipos

  const partido = ref({...futbolStore.buscarPartido(id)})

  const editarPartido = () => {
    // console.log(partido.value)
    futbolStore.editarPartido(partido.value)
  }
/* 
  const equipo_local = futbolStore.buscarEquipo(partido.id_equipo_local)
  const equipo_visitante = futbolStore.buscarEquipo(partido.id_equipo_visitante)  

  const posiciones = futbolStore.getPosiciones */

</script>