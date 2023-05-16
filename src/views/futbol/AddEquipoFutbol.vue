<template>

  <v-row>
    <v-col class="text-center">
      <h1>Añadir nuevo equipo</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="3">
      <v-text-field
      label="Nombre equipo"
      v-model="nombre_equipo"
      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-text-field
      label="Display name"
      v-model="display_name"
      ></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field
      label="Localidad"
      v-model="localidad"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" class="text-center">
      <h3>Jugadores</h3>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" class="ml-2 pa-2 text-center">
      <v-row v-for="jugador in jugadores" :key="jugador.id_jugador">
        <v-col cols="1" class="ma-0 pa-0">
          <v-text-field density="compact" v-model="jugador.numero" label="Numero"></v-text-field>
        </v-col>
        <v-col cols="3" class="ma-0 pa-0">
          <v-text-field density="compact" v-model="jugador.nombre_jugador" label="Nombre"></v-text-field>
        </v-col>
        <v-col cols="2" class="ma-0 pa-0">
          <v-text-field density="compact" v-model="jugador.apodo" label="Apodo"></v-text-field>
        </v-col>
        <v-col cols="2" class="ma-0 pa-0">
          <v-text-field density="compact" v-model="jugador.nacionalidad" label="Nacionalidad"></v-text-field>
        </v-col>
        <v-col cols="1" class="ma-0 pa-0">
          <v-text-field density="compact" v-model="jugador.fecha_nacimiento" label="Fecha nacimiento"></v-text-field>
        </v-col>
        <v-col cols="1" class="ma-0 pa-0">
          <v-text-field density="compact" v-model="jugador.altura" label="Altura"></v-text-field>
        </v-col>
        <v-col cols="2" class="ma-0 pa-0">  
          <v-select
            v-model="jugador.posicion"
            :items="posiciones"
            item-title="descripcion"
            item-value="descripcion"
            density="compact"
            label="Posicion"
          ></v-select> 

        </v-col>
      </v-row>
      <v-col cols="12" class="text-center">
        <v-btn color="success" @click="nuevoJugador()">+</v-btn>
      </v-col>
      <v-col cols="12">
        <h3>Cuerpo técnico</h3>
      </v-col>
      <v-row v-for="persona in cuerpo_tecnico" :key="persona.id_cuerpo_tecnico">
        <v-col cols="12">
          <p>{{ persona.titulo }}</p>
        </v-col>
        <v-col cols="6" class="ma-0 pa-0">
          <v-text-field density="compact" v-model="persona.nombre" label="Nombre"></v-text-field>
        </v-col>
        <v-col cols="3" class="ma-0 pa-0">
          <v-text-field density="compact" v-model="persona.nacionalidad" label="Nacionalidad"></v-text-field>
        </v-col>
        <v-col cols="3" class="ma-0 pa-0">
          <v-text-field density="compact" v-model="persona.fecha_nacimiento" label="Fecha nacimiento"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="success" @click="enviar()">ACEPTAR</v-btn>
        </v-col>
      </v-row>

    </v-col>
  </v-row>
  
 
</template>

<script setup>
import { ref } from 'vue';
import { usegFutbolStore } from "../../store/futbol"
import { computed } from 'vue';
  
const futbolStore = usegFutbolStore()


const nombre_equipo = ref(null)
const display_name = ref(null)
const localidad = ref(null)
const posiciones = futbolStore.getPosiciones

const jugadores = ref([])
const cuerpo_tecnico = ref([
  {
    id_cuerpo_tecnico: 'ent_' + Date.now(),
    titulo: "Entrenador",
    nombre: null,
    fecha_nacimiento: null,
    nacionalidad: null
  },
  {
    id_cuerpo_tecnico: 'seg_ent_' + Date.now(),
    titulo: "Segundo entrenador",
    nombre: null,
    fecha_nacimiento: null,
    nacionalidad: null
  },
  {
    id_cuerpo_tecnico: 'del_' + Date.now(),
    titulo: "Delegado",
    nombre: null,
    fecha_nacimiento: null,
    nacionalidad: null
  }
])
const id_jugador = computed(() => {
  return jugadores.value.length + 1
})

const nuevo_jugador = {
  id_jugador: Date.now(),
  nombre_jugador: null,
  apodo: null,
  numero: null,
  posicion: null,
  nacionalidad: null,
  fecha_nacimiento: null,
  altura:null,
  estadistica: {
    tarjetas_amarillas: 0,
    tarjeta_roja: 0,
    goles: 0,
    faltas: 0
  }
}
const nuevoJugador = () => {
  jugadores.value.push({...nuevo_jugador,})
}

const enviar = () => {
  const nuevo_equipo = {
        id_equipo: Date.now(),
        nombre_equipo: nombre_equipo.value,
        display_name: display_name.value,
        localidad: localidad.value,
        estadistica_equipo: {
          fueras_de_juego: 0,
          corners: 0,
          tiros_a_puerta: 0,
          posesión: "0%"
        }, 
        jugadores: jugadores.value,
        cuerpo_tecnico: cuerpo_tecnico.value
      }
  // console.log(nuevo_equipo)
  futbolStore.addEquipo(nuevo_equipo)
}

</script>

<style scoped>


</style>