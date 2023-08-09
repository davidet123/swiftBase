<template>
  <!-- {{ equipo_local }} -->
  <!-- <div v-if="cargando_equipos || cargando_partidos " class="text-center" style="margin-top:200px;"> -->
  <div v-if="!partido" class="text-center" style="margin-top:200px;">
    <v-progress-circular
      indeterminate
      color="primary"
      size="50"
    ></v-progress-circular>
  </div>
  <!-- <div v-if="!cargando_equipos && !cargando_partidos"> -->
  <div v-if="partido && marcador" class="mb-4 pb-4">
    <!-- {{ partido }} -->
      <v-row>
        <v-col cols="12">
          <MarcadorFutbol :marcador = "marcador" :tiempo="partido.tiempo" @updateDB="updateDB"/>
        </v-col>
      </v-row>
       <v-row>
        <v-col cols="4" offset="1">
          <v-row>
            <v-col cols="12" class="text-center">
              <h4 >{{ partido.equipo_local.nombre_equipo}}</h4>
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
                  <JugadorFutbolInd :jugador="listadoLocal[0]" :fondo="'local'" :temporizador="marcador.temporizador" class="ml-4" @test="test"/>
                </v-col>
                <v-col v-else v-for="jugador in equipo_local.jugadores" :key="jugador.id_jugador" cols="12" class="clearMargin">
                  <JugadorFutbolInd :jugador = "jugador" :id_jugador = "jugador.id_jugador" :fondo="'local'" :temporizador="marcador.temporizador" class="ml-4"/>
                </v-col>
            </v-row>
          </v-row>
        </v-col>
        <v-col cols="4" class="px-2" offset="2">
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
            <v-col cols="6" align="center">
              <v-select label="Dorsal" :items="listadoDorsalesVisitante" v-model="dorsalVisitante" density="compact"></v-select>
            </v-col>
            <v-col cols="6">
              <v-btn color="error" size="x-small" @click="limpiarDorsal('visitante')">X</v-btn>
            </v-col>
            <v-row class="clearMargin">
                <v-col v-if="dorsalVisitante !== null" cols="12" class="mr-2">
                  <JugadorFutbolInd :jugador="listadoVisitante[0]" :fondo="'visitante'" :temporizador="marcador.temporizador"/>
                </v-col>
                <v-col v-else v-for="jugador in equipo_visitante.jugadores" :key="jugador.id_jugador" cols="12" class="clearMargin">
                  <JugadorFutbolInd  :jugador = "jugador" :id_jugador = "jugador.id_jugador" :fondo="'visitante'" :temporizador="marcador.temporizador" class="mr-2"/>
                </v-col>
            </v-row>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <v-btn color="success" @click="volver">INICI</v-btn>
          <v-btn color="success" @click="resumen">RESUM</v-btn>
        </v-col>
      </v-row>
  
  </div>
  
      
</template>


<script setup>

import { useRoute, useRouter } from 'vue-router';

import { defineAsyncComponent } from 'vue';


import Visor from '@/components/visor/Visor.vue'
// import MarcadorFutbol from '@/components/futbol/MarcadorFutbol'
// import JugadorFutbolInd from '@/components/futbol/JugadorFutbolInd'

import { usegFutbolStore } from "../../store/futbol"
import { computed, ref,  onBeforeMount, onMounted } from 'vue';
import { storeToRefs } from "pinia";
import { watch } from 'vue';

const MarcadorFutbol = defineAsyncComponent(() => import('@/components/futbol/MarcadorFutbol'))
const JugadorFutbolInd = defineAsyncComponent(() => import('@/components/futbol/JugadorFutbolInd'))

const futbolStore = usegFutbolStore()

const route = useRoute()
const router = useRouter()

const id = route.params.id

const { partidos, partido_cargado, marcadores } = storeToRefs(futbolStore)

if(!partido_cargado.value) {
  futbolStore.setPartidoEnJuego(id)
}

const partido = computed(() => {
  return partidos.value.find( el => {
    return el.id_partido == id
  })
})
const marcador = computed(() => {
  return marcadores.value.find( el => {
    return el.id_partido == id
  })
})

// BUSCAR EQUIPOS

let equipo_local = computed(() => partido.value.equipo_local)
let equipo_visitante = computed(() => partido.value.equipo_visitante)


// AÑADIR JUGADORES
/*
let jugadoresLocal = []
let jugadoresVisitante = []

 equipo_local.jugadores.forEach(jug => {
  // console.log(jug)
  let nuevoJugador = futbolStore.buscarJugador(jug)
  // console.log(nuevoJugador)
  nuevoJugador.estadistica = {
      tarjetas_amarillas: 0,
      tarjeta_roja: 0,
      goles: 0,
      faltas: 0,
      disparos: 0,
      disparos_al_arco: 0
    }
  jugadoresLocal.push(nuevoJugador)
})

equipo_visitante.jugadores.forEach(jug => {
  let nuevoJugador = futbolStore.buscarJugador(jug)
  nuevoJugador.estadistica = {
      tarjetas_amarillas: 0,
      tarjeta_roja: 0,
      goles: 0,
      faltas: 0,
      disparos: 0,
      disparos_al_arco: 0
    }
  jugadoresVisitante.push(nuevoJugador)
})

// REEMPLAZAR JUGADORES

equipo_local.jugadores = jugadoresLocal
equipo_visitante.jugadores = jugadoresVisitante

console.log(equipo_local) */




let dorsalLocal = ref(null)
let dorsalVisitante = ref(null)

const listadoDorsalesLocal = computed(() => {
  let temp = []
  equipo_local.value.jugadores.forEach(jugador => {
    temp.push(jugador.numero)
  })
  return temp
})
const listadoLocal = computed(() => {
  if(dorsalLocal.value !== null) {
    return equipo_local.value.jugadores.filter(jugador => {
      return jugador.numero == dorsalLocal.value
    })
  } else {
    return equipo_local.value
  }
})
const listadoDorsalesVisitante = computed(() => {
  let temp = []
  equipo_visitante.value.jugadores.forEach(jugador => {
    temp.push(jugador.numero)
  })
  return temp
})
const listadoVisitante = computed(() => {
  if(dorsalVisitante.value !== null) {
    return equipo_visitante.value.jugadores.filter(jugador => {
      return jugador.numero == dorsalVisitante.value
    })
  } else {
    return equipo_visitante.value
  }
})

const limpiarDorsal = (equipo) => {
  if (equipo == 'local') {
    dorsalLocal.value = null
  } else if (equipo == 'visitante') {
    dorsalVisitante.value = null
  }
}

const estadisticasTotales = (jugadores, estadistica) => {
  return jugadores.reduce((total, jugador) => total + jugador.estadistica[estadistica], 0);
};
const golesTotales = jugadores => {
  return  jugadores.reduce((total, jugador) => total += jugador.estadistica.goles.length, 0)
}

const golesLocalTotales = computed(() => golesTotales(equipo_local.value.jugadores))
const taLocalTotales = computed(() => estadisticasTotales(equipo_local.value.jugadores, 'tarjetas_amarillas'))
const trLocalTotales = computed(() => estadisticasTotales(equipo_local.value.jugadores, 'tarjeta_roja'))
const faltasLocalTotales = computed(() => estadisticasTotales(equipo_local.value.jugadores, 'faltas'))

const golesVisitanteTotales = computed(() => golesTotales(equipo_visitante.value.jugadores))
const taVisitanteTotales = computed(() => estadisticasTotales(equipo_visitante.value.jugadores, 'tarjetas_amarillas'));
const trVisitanteTotales = computed(() => estadisticasTotales(equipo_visitante.value.jugadores, 'tarjeta_roja'));
const faltasVisitanteTotales = computed(() => estadisticasTotales(equipo_visitante.value.jugadores, 'faltas'));

const disparosTotales = (jugadores, estadistica1, estadistica2) => {
  const total = estadisticasTotales(jugadores, estadistica1);
  const totalAPuerta = estadisticasTotales(jugadores, estadistica2);
  return `${totalAPuerta} / ${total}`;
};

const disparosLocalTotal = computed(() => disparosTotales(equipo_local.value.jugadores, 'disparos', 'disparos_al_arco'));
const disparosVisitantelTotal = computed(() => disparosTotales(equipo_visitante.value.jugadores, 'disparos', 'disparos_al_arco'));


const dispLocalTotal = computed (() =>estadisticasTotales(equipo_local.value.jugadores, 'disparos'))
const dispAlArcoLocalTotal = computed (() =>estadisticasTotales(equipo_local.value.jugadores, 'disparos_al_arco'))

const dispVisitanteTotal = computed (() =>estadisticasTotales(equipo_visitante.value.jugadores, 'disparos'))
const dispVisitanteAlArcoTotal = computed (() =>estadisticasTotales(equipo_visitante.value.jugadores, 'disparos_al_arco'))


const updateDB = (est) => {
  console.log(est)
  const estadistica_local = {
    corners: 0,
    disparos: dispLocalTotal.value,
    disparos_al_arco: dispLocalTotal.dispAlArcoLocalTotal,
    fueras_de_juego: 0,
    posesión: est.posesion_local,
    saques_de_esquina: 0,
  }
  console.log(estadistica_local)
}


/* const golesLocalTotales = computed(() => {
  let goles = 0
  equipo_local.jugadores.forEach(jug => {
    goles += jug.estadistica.goles
  })
  return goles
}) */

/* const taLocalTotales = computed(() => {
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
})*/

/* const disparosLocalTotal = computed(() => {
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
}) */


/* watch(() => partido, val => {
  console.log(val.value)
},{
  deep: true
}) */

const mostrarEstadistica = (estadistica)=> {
  console.log(estadistica)
}

const volver = () => router.push('/futbol')

const resumen = () => router.push('/futbol/resumenfutbol/'+id)

</script> 
<style scoped>
.clearMargin {
  padding: 0 12px !important;
  border: 0 1px ;
  border-color: white;
}
p {
  font-size: 11px;
}

  
</style>
