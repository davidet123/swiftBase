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
        <v-col cols="2" offset="4" class="text-center">
          <v-btn color="success" @click="enviar()">ACEPTAR</v-btn>
        </v-col>
        <v-col cols="2" class="text-center">
          <v-btn color="success" @click="volver">TORNAR</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  
 
</template>

<script setup>
import { ref } from 'vue';
import { usegFutbolStore } from "../../store/futbol"
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
  
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


const nuevo_jugador = {
  id_jugador: null,
  nombre_jugador: null,
  apodo: null,
  numero: null,
  posicion: null,
  nacionalidad: null,
  fecha_nacimiento: null,
  altura:null,
  equipo: null,
  partidos: []
 /*  estadistica: {
    tarjetas_amarillas: 0,
    tarjeta_roja: 0,
    goles: 0,
    faltas: 0,
    disparos: 0,
    disparos_al_arco: 0
  } */
}
const nuevoJugador = () => {
  let nuevo = {...nuevo_jugador,}
  nuevo.id_jugador = display_name.value + jugadores.value.length
  nuevo.equipo = display_name.value
  jugadores.value.push(nuevo)
}

const enviar = () => {
  
  const listadoJugadores = []
  jugadores.value.forEach(jug => {
    listadoJugadores.push(jug.id_jugador)
  })
  const nuevo_equipo = {
        // id_equipo: Date.now(),
        nombre_equipo: nombre_equipo.value,
        display_name: display_name.value,
        localidad: localidad.value,
        estadistica_equipo: {
          fueras_de_juego: 0,
          corners: 0,
          tiros_a_puerta: 0,
          posesión: "0%",
          disparos: 0,
          disparos_al_arco: 0,
          saques_de_esquina: 0
        }, 
        jugadores: listadoJugadores,
        cuerpo_tecnico: cuerpo_tecnico.value
      }
  console.log(nuevo_equipo)


    /* 
      - Añadir jugadores a la base de datos
      - Recuperar id del jugador
      - Crear array con las nuevas id 

    */


  futbolStore.addJugadores(jugadores.value)
  futbolStore.addEquipo(nuevo_equipo)
  volver()
}
const volver = () => router.push('/futbol')

</script>

<style scoped>


</style>