<template>
  <div v-if="!equipo" class="text-center" style="margin-top:200px;">
    <v-progress-circular
      indeterminate
      color="primary"
      size="50"
    ></v-progress-circular>
  </div>
  <div v-if="equipo" class="mx-4 px-4">
    <v-row>
      <v-col class="text-center">
        <h1>Editar equipo</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-text-field
        label="Nombre equipo"
        v-model="nombre_equipo"
        ></v-text-field>
      </v-col>
      <v-col cols="2" offset="1">
        <v-text-field
        label="Display name"
        v-model="display_name"
        ></v-text-field>
      </v-col>
      <v-col cols="3" offset="1">
        <v-text-field
        label="Localidad"
        v-model="localidad"
        ></v-text-field>
      </v-col>
      <v-col cols="9">
        <v-file-input 
        show-size
        accept="image/*"
        v-model="imagen"
        @change="Preview_image"
        label="Escut"
        ></v-file-input>
      </v-col>
      <v-col cols="2" class="text-center">
        <v-img class="escudo" :src="image_url"></v-img>
    
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-left">
        <h3>Jugadores</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="ml-2 pa-2 text-center">
        <v-row v-for="jugador in listaJugadores" :key="jugador.id_jugador">
          <v-col cols="1" class="ma-0 pa-0">
            <v-text-field density="compact" @change="cambio(jugador.id_jugador)" v-model="jugador.numero" label="Numero"></v-text-field>
          </v-col>
          <v-col cols="3" class="ma-0 pa-0">
            <v-text-field density="compact" @change="cambio(jugador.id_jugador)" v-model="jugador.nombre_jugador" label="Nombre"></v-text-field>
          </v-col>
          <v-col cols="2" class="ma-0 pa-0">
            <v-text-field density="compact" @change="cambio(jugador.id_jugador)" v-model="jugador.apodo" label="Apodo"></v-text-field>
          </v-col>
          <v-col cols="2" class="ma-0 pa-0">
            <v-text-field density="compact" @change="cambio(jugador.id_jugador)" v-model="jugador.nacionalidad" label="Nacionalidad"></v-text-field>
          </v-col>
          <v-col cols="1" class="ma-0 pa-0">
            <v-text-field density="compact" @change="cambio(jugador.id_jugador)" v-model="jugador.fecha_nacimiento" label="Fecha nacimiento"></v-text-field>
          </v-col>
          <v-col cols="1" class="ma-0 pa-0">
            <v-text-field density="compact" @change="cambio(jugador.id_jugador)" v-model="jugador.altura" label="Altura"></v-text-field>
          </v-col>
          <v-col cols="2" class="ma-0 pa-0">  
            <v-select
              v-model="jugador.posicion"
              :items="posiciones"
              item-title="descripcion"
              item-value="descripcion"
              density="compact"
              label="Posicion"
              @update:modelValue="cambio(jugador.id_jugador)"
            ></v-select> 
  
          </v-col>
        </v-row>
        <v-col cols="12" class="text-center">
          <v-btn color="success" @click="nuevoJugador()">+</v-btn>
        </v-col>
        <v-row>
          <v-col cols="12">
            <h3>Cuerpo técnico</h3>
          </v-col>
        </v-row>
        <v-row v-for="persona in cuerpo_tecnico" :key="persona.id_cuerpo_tecnico">
            <v-col cols="12" class="text-left">
              <p>{{ persona.titulo }}</p>
            </v-col>
          <v-row class="px-4">
            <v-col cols="5" >
              <v-text-field density="compact" v-model="persona.nombre" label="Nombre"></v-text-field>
            </v-col>
            <v-col cols="2" offset="1">
              <v-text-field density="compact" v-model="persona.nacionalidad" label="Nacionalidad"></v-text-field>
            </v-col>
            <v-col cols="2"  offset="2">
              <v-text-field density="compact" v-model="persona.fecha_nacimiento" label="Fecha nacimiento"></v-text-field>
            </v-col>
          </v-row>
        </v-row>  
      </v-col>
    </v-row>
    <v-row class="mb-4">
      <v-col cols="2" offset="4" class="text-center">
        <v-btn color="success" @click="enviar()">ACEPTAR</v-btn>
      </v-col>
      <v-col cols="2" class="text-center">
        <v-btn color="success" @click="volver">TORNAR</v-btn>
      </v-col>
    </v-row>
    <!-- {{ equipo }} -->
  </div>

  
 
</template>

<script setup>
import { storeToRefs } from 'pinia'
import {  useRoute, useRouter } from 'vue-router'
import { usegFutbolStore } from "../../store/futbol"
import { ref, computed } from 'vue'
import { watch } from 'vue'

const futbolStore = usegFutbolStore()
// const { equipos } = storeToRefs(futbolStore)
const route = useRoute()
const router = useRouter()

const id = route.params.id
// const { getEquipoById } = storeToRefs(futbolStore)

const equipo = computed(() => futbolStore.buscarEquipo(id))
// console.log(equipo.value)
const jugadores = computed(() => futbolStore.getJugadores)
const posiciones = futbolStore.getPosiciones



// const equipo = computed(() => equipos.value.find(e => e.id_equipo === id))
  const nombre_equipo = ref(null)
  const localidad = ref(null)
  const display_name = ref(null)
  const cuerpo_tecnico = ref(null)
  const listaJugadores = ref([])

  let listaCambios = []


  const cargaEquipo = (equipo) => {
    nombre_equipo.value = equipo.nombre_equipo
    localidad.value = equipo.localidad
    display_name.value = equipo.display_name
    let temp_jugadores = []
    equipo.jugadores.forEach(j => {
      const jugadorIndividual = jugadores.value.find((el) => el.id_jugador === j)
      temp_jugadores.push(jugadorIndividual)
    })
    listaJugadores.value = [...temp_jugadores]
    cuerpo_tecnico.value = equipo.cuerpo_tecnico
  }
  
  
  const enviar = () => {

    // console.log(listaJugadores.value)
    const listadoJugadoresAcutlizados = listaJugadores.value.filter(el => listaCambios.includes(el.id_jugador))

    listadoJugadoresAcutlizados.forEach(jugador => futbolStore.updateJugador(jugador))
    
  }
  
  const cambio = id => {
    if(!listaCambios.includes(id)) listaCambios.push(id)
    console.log(listaCambios)
  }
  
  // Cargar los datos
  if(equipo.value) {
    cargaEquipo(equipo.value)
  }  

  // FUNCION DE PRUEBA PARA ACTUALIZAR BASE DE DATOS CON CAMBIOS
  // const actualizar = () => {
  //   console.log(listaJugadores.value)
  //   listaJugadores.value.forEach(jugador => {
  //     jugador.partidos = []
  //     futbolStore.updateJugador(jugador)
  //   })
  // }

  const volver = () => router.push('/futbol')

watch(() => equipo.value, equipo => {
  cargaEquipo(equipo)
})


</script>