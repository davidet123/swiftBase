<template>
  <v-row>
    <v-col cols="12" class="text-center">
      <h1>CREAR NUEVO PARTIDO</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="6">
      <v-select
        v-model="idLocal"
        :items="equipos"
        item-title="nombre_equipo"
        item-value="id_equipo"
        density="compact"
        label="Equipo Local"
      ></v-select> 
    </v-col>
    <v-col cols="6">
      <v-select
        v-model="idVisitante"
        :items="equipos"
        item-title="nombre_equipo"
        item-value="id_equipo"
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
      <v-btn color="success" :disabled="!activarBoton" @click="crearPartido()">ACEPTAR</v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, watch } from 'vue';
import { usegFutbolStore } from "../../store/futbol"
import { computed } from 'vue';

const futbolStore = usegFutbolStore()

const idLocal = ref(null)
const idVisitante = ref(null)

const listaEquipoLocal = ref(null)
const listaEquipoVisitante = ref(null)


const activarBoton = computed(() => listaEquipoLocal.value !== null && listaEquipoVisitante.value !== null)


// CARGAR JUGADORES
// futbolStore.cargarJugadores()



const partido = ref({
  // id_partido: null,
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


const crearPartido = () => {

  if(idLocal.value && idVisitante.value) {

    console.log(listaEquipoVisitante.value)

    let equipoLocal = futbolStore.getEquipoById(idLocal.value)
    let equipoVisitante = futbolStore.getEquipoById(idVisitante.value)   


    listaEquipoLocal.value.forEach(jug => {
      jug.estadistica = {
          tarjetas_amarillas: 0,
          tarjeta_roja: 0,
          goles: 0,
          faltas: 0,
          disparos: 0,
          disparos_al_arco: 0
        }
    })
    listaEquipoVisitante.value.forEach(jug => {
      jug.estadistica = {
          tarjetas_amarillas: 0,
          tarjeta_roja: 0,
          goles: 0,
          faltas: 0,
          disparos: 0,
          disparos_al_arco: 0
        }
    })
    
    partido.value.equipo_local = equipoLocal
    partido.value.equipo_visitante = equipoVisitante
    partido.value.id_equipo_local = idLocal.value
    partido.value.id_equipo_visitante = idVisitante.value
        
    partido.value.equipo_local.jugadores = listaEquipoLocal.value
    partido.value.equipo_visitante.jugadores = listaEquipoVisitante.value

  }
  
  

futbolStore.addPartido(partido.value)

}

watch(() => idLocal.value, (val) => {
  try {
    // console.log(val)
    const equipoLocal = futbolStore.getEquipoById(val)
    const displayNameLocal = equipoLocal.display_name
    listaEquipoLocal.value = futbolStore.cargarJugadoresEquipo(displayNameLocal)
  } catch (err) {
    console.log(err)
  }
})
watch(() => idVisitante.value, (val) => {
  try {
    const equipoVisitante = futbolStore.getEquipoById(val)
    const displayNameVisitante = equipoVisitante.display_name
    listaEquipoVisitante.value = futbolStore.cargarJugadoresEquipo(displayNameVisitante)
  } catch (err) {
    console.log(err)
  }
})

</script>