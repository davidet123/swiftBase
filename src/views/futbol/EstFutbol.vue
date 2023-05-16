<template>
  <v-row>
    <v-col cols="7">
      <MarcadorFutbol :marcador = "partido.marcador" :tiempo="partido.tiempo"/>
    </v-col>

    <v-col cols="5" class="pt-4">
      <Visor />
    </v-col>

  </v-row>
  <v-row>
    <v-col cols="6">
      <v-row>
        <v-col cols="12" class="text-center">
          <h4 >{{ equipo_local.nombre_equipo}}</h4>
        </v-col>
        <v-col cols="2" class="text-center">
          <p>GOLES: {{ golesLocalTotales }}</p>
        </v-col>
        <v-col cols="2" class="text-center">
          <p>DISPAROS A PUERTA: {{ disparosLocalTotal }}</p>
        </v-col>
        <v-col cols="2" class="text-center">
          <p>TARJETAS AMARILLAS: {{ taLocalTotales }}</p>
        </v-col>
        <v-col cols="2" class="text-center">
          <p>TARJETAS ROJAS: {{ trLocalTotales }}</p>
        </v-col>
        <v-col cols="2" class="text-center">
          <p>FALTAS: {{ faltasLocalTotales }}</p>
        </v-col>
        <v-col cols="2" class="text-center">
          <p>FUERAS DE JUEGO: 0</p>
        </v-col>
      </v-row>
      <v-row>
          
        <v-col cols="6"  align="center">
          <v-select label="Dorsal" :items="listadoDorsalesLocal" v-model="dorsalLocal" density="compact"></v-select>
        </v-col>
        <v-col cols="6">
          <v-btn color="error" size="x-small" @click="limpiarDorsal('local')">X</v-btn>
        </v-col>
        <v-row>
            <v-col v-if="dorsalLocal !== null" cols="12">
              <JugadorFutbolInd :jugador="listadoLocal[0]" :fondo="'local'"/>
            </v-col>
            <v-col v-else v-for="jugador in equipo_local.jugadores" :key="jugador.id_jugador" cols="12" class="clearMargin">
              <JugadorFutbolInd  :jugador="jugador" :fondo="'local'"/>
            </v-col>
        </v-row>
      </v-row>
    </v-col>
    <v-col cols="6" class="px-2">
      <v-row>
        <v-col cols="12" class="text-center">
          <h4>{{ equipo_visitante.nombre_equipo}}</h4>          
        </v-col>
        <v-col cols="2" class="text-center">
          <p>GOLES: {{ golesVisitanteTotales }}</p>
        </v-col>
        <v-col cols="2" class="text-center">
          <p>TARJETAS AMARILLAS: {{ taVisitanteTotales }}</p>
        </v-col>
        <v-col cols="2" class="text-center">
          <p>TARJETAS ROJAS: {{ trVisitanteTotales }}</p>
        </v-col>
        <v-col cols="2" class="text-center">
          <p>DISPAROS A PUERTA: {{ disparosVisitantelTotal }}</p>
        </v-col>
        <v-col cols="2" class="text-center">
          <p>FALTAS: {{ faltasVisitanteTotales }}</p>
        </v-col>
        <v-col cols="2" class="text-center">
          <p>FUERAS DE JUEGO: 0</p>
        </v-col>
        <v-col cols="6"  align="center">
          <v-select label="Dorsal" :items="listadoDorsalesVisitante" v-model="dorsalVisitante" density="compact"></v-select>
        </v-col>
        <v-col cols="6">
          <v-btn color="error" size="x-small" @click="limpiarDorsal('visitante')">X</v-btn>
        </v-col>
        <v-row class="clearMargin">
            <v-col v-if="dorsalVisitante !== null" cols="12">
              <JugadorFutbolInd :jugador="listadoVisitante[0]" :fondo="'visitante'"/>
            </v-col>
            <v-col v-else v-for="jugador in equipo_visitante.jugadores" :key="jugador.id_jugador" cols="12" class="clearMargin">
              <JugadorFutbolInd  :jugador="jugador" :fondo="'visitante'"/>
            </v-col>
        </v-row>
      </v-row>
    </v-col>
   <!--  <v-col cols="6">
      <v-row>
        <v-col cols="12" class="text-center">
          <p class="text-center" width="100%">{{ equipo_visitante.nombre_equipo}}</p>
        </v-col>
        <v-col cols="6" v-for="jugador in equipo_visitante.jugadores" :key="jugador.id_jugador">
          <JugadorFutbolInd  :jugador="jugador" :fondo="'visitante'"/>
        </v-col>
      </v-row>
    </v-col> -->
  </v-row>

  
</template>


<script setup>

import { useRoute } from 'vue-router';


import Visor from '@/components/visor/Visor.vue'
import MarcadorFutbol from '@/components/futbol/MarcadorFutbol'
import JugadorFutbolInd from '@/components/futbol/JugadorFutbolInd'

import { usegFutbolStore } from "../../store/futbol"
import { computed, ref } from 'vue';

const futbolStore = usegFutbolStore()
const route = useRoute()

const id = route.params.id

const partido = futbolStore.buscarPartido(id)

const equipo_local = futbolStore.buscarEquipo(partido.id_equipo_local)
const equipo_visitante = futbolStore.buscarEquipo(partido.id_equipo_visitante)

let dorsalLocal = ref(null)
let dorsalVisitante = ref(null)

const listadoDorsalesLocal = computed(() => {
  let temp = []
  equipo_local.jugadores.forEach(jugador => {
    temp.push(jugador.numero)
  })
  return temp
})
const listadoLocal = computed(() => {
  if(dorsalLocal.value !== null) {
    return equipo_local.jugadores.filter(jugador => {
      return jugador.numero == dorsalLocal.value
    })
    // console.log(jug)
    // return jug
  } else {
    return equipo_local
  }
})
const listadoDorsalesVisitante = computed(() => {
  let temp = []
  equipo_visitante.jugadores.forEach(jugador => {
    temp.push(jugador.numero)
  })
  return temp
})
const listadoVisitante = computed(() => {
  if(dorsalVisitante.value !== null) {
    return equipo_visitante.jugadores.filter(jugador => {
      return jugador.numero == dorsalVisitante.value
    })
    // console.log(jug)
    // return jug
  } else {
    return equipo_visitante
  }
})

const limpiarDorsal = (equipo) => {
  if (equipo == 'local') {
    dorsalLocal.value = null
  } else if (equipo == 'visitante') {
    dorsalVisitante.value = null
  }
}


const golesLocalTotales = computed(() => {
  let goles = 0
  equipo_local.jugadores.forEach(jug => {
    goles += jug.estadistica.goles
  })
  return goles
})

const taLocalTotales = computed(() => {
  let ta = 0
  equipo_local.jugadores.forEach(jug => {
    ta += jug.estadistica.tarjetas_amarillas
  })
  return ta
})
const trLocalTotales = computed(() => {
  let tr = 0
  equipo_local.jugadores.forEach(jug => {
    tr += jug.estadistica.tarjeta_roja
  })
  return tr
})
const faltasLocalTotales = computed(() => {
  let faltas = 0
  equipo_local.jugadores.forEach(jug => {
    faltas += jug.estadistica.faltas
  })
  return faltas
})
const golesVisitanteTotales = computed(() => {
  let goles = 0
  equipo_visitante.jugadores.forEach(jug => {
    goles += jug.estadistica.goles
  })
  return goles
})

const taVisitanteTotales = computed(() => {
  let ta = 0
  equipo_visitante.jugadores.forEach(jug => {
    ta += jug.estadistica.tarjetas_amarillas
  })
  return ta
})
const trVisitanteTotales = computed(() => {
  let tr = 0
  equipo_visitante.jugadores.forEach(jug => {
    tr += jug.estadistica.tarjeta_roja
  })
  return tr
})
const faltasVisitanteTotales = computed(() => {
  let faltas = 0
  equipo_visitante.jugadores.forEach(jug => {
    faltas += jug.estadistica.faltas
  })
  return faltas
})

const disparosLocalTotal = computed(() => {
  let disparos = 0
  equipo_local.jugadores.forEach(jug => {
    disparos += jug.estadistica.disparos
  })
  let disparosAPuerta = 0
  equipo_local.jugadores.forEach(jug => {
    disparosAPuerta += jug.estadistica.disparos_al_arco
  })
  return disparosAPuerta + " / " +  disparos
})
const disparosVisitantelTotal = computed(() => {
  let disparos = 0
  equipo_visitante.jugadores.forEach(jug => {
    disparos += jug.estadistica.disparos
  })
  let disparosAPuerta = 0
  equipo_visitante.jugadores.forEach(jug => {
    disparosAPuerta += jug.estadistica.disparos_al_arco
  })
  return disparosAPuerta + " / " +  disparos
})



</script>

<style scoped>
.clearMargin {
  padding: 0 12px !important;
  border: 0 1px ;
  border-color: white;
}
p {
    font-size: 11px
  }

</style>