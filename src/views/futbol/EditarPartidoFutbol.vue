<template>
  <!-- {{ !cargando_equipos  && !cargando_partidos }} -->

  <div v-if="cargando_equipos || cargando_partidos" class="text-center" style="margin-top:200px;">
    <v-progress-circular
      indeterminate
      color="primary"
      size="50"
    ></v-progress-circular>
  </div>

  <div v-if="!cargando_equipos && !cargando_partidos">
    <!-- {{ partido.id_partido }} -->

    <v-row>
      <v-col cols="12" class="text-center">
        <h3>EDITAR PARTIDO {{ partido.equipo_local.nombre_equipo }} vs {{ partido.equipo_visitante.nombre_equipo }}</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-select
          v-model="nuevoPartido.equipo_local.nombre_equipo"
          :items="equipos"
          item-title="nombre_equipo"
          item-value="nombre_equipo"
          density="compact"
          label="Equipo Local"
        ></v-select> 
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="nuevoPartido.equipo_visitante.nombre_equipo"
          :items="equipos"
          item-title="nombre_equipo"
          item-value="nombre_equipo"
          density="compact"
          label="Equipo Visitante"
        ></v-select>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="nuevoPartido.estadio"
          label="Estadio"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="nuevoPartido.lugar"
          label="Lugar"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="nuevoPartido.fecha"
          label="Fecha"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="nuevoPartido.hora"
          label="Hora"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="success" @click="editarPartido()">ACEPTAR</v-btn>
      </v-col>
    </v-row>
  </div>
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

  import { storeToRefs } from "pinia";
  import { computed } from 'vue';

  
  const futbolStore = usegFutbolStore()
  const route = useRoute()
  
  // const cargandoPartidos = futbolStore.cargandoPartidos
  // const loading = futbolStore.loading
  
  const id = route.params.id
  
  const { cargando_equipos, cargando_partidos, equipos, partidos } = storeToRefs(futbolStore)
  
  // futbolStore.cargarEquipos()
  // futbolStore.cargarPartidos()

  
  let nuevoPartido = ref({
    equipo_local: null,
    id_equipo_local: null,
    equipo_visitante: null,
    id_equipo_visitante: null,
    fecha: null,
    hora: null,
    lugar: null,
    estadio: null,
    })
  
  const partido = computed(() => {
    const refPartido =  partidos.value.find(partido=> {
    return partido.id_partido == id
    })

    console.log(refPartido)
   
    nuevoPartido.value = {...refPartido}
    return refPartido
  })


 /*  const refPartido = computed(() => {
    return partidos.value.find(partido => {
    console.log(partido)
    return partido.id_partido == id
    })
  }) */
 

  const editarPartido = () => {
    // console.log(nuevoPartido.value)
    futbolStore.editarPartido(nuevoPartido.value)
  }
/* 
  const equipo_local = futbolStore.buscarEquipo(partido.id_equipo_local)
  const equipo_visitante = futbolStore.buscarEquipo(partido.id_equipo_visitante)  

  const posiciones = futbolStore.getPosiciones */

</script>