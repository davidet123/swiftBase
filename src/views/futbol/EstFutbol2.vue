<template>
  <div v-if="cargando_equipos || cargando_partidos " class="text-center" style="margin-top:200px;">
    <v-progress-circular
    indeterminate
    color="primary"
    size="50"
    ></v-progress-circular>
  </div>
  <div v-else>
    TEST
    <!-- {{ partido }} -->
    {{ equipo_local }}
  </div>
  
      
</template>


<script setup>

import { useRoute } from 'vue-router';


import Visor from '@/components/visor/Visor.vue'
import MarcadorFutbol from '@/components/futbol/MarcadorFutbol'
import JugadorFutbolInd from '@/components/futbol/JugadorFutbolInd'

import { usegFutbolStore } from "../../store/futbol"
import { computed, ref,  onBeforeMount, onMounted } from 'vue';
import { storeToRefs } from "pinia";
import { watch } from 'vue';

const futbolStore = usegFutbolStore()
const route = useRoute()

const id = route.params.id

const { cargando_equipos, cargando_partidos, partidos } = storeToRefs(futbolStore)

// let partido = null

/* onMounted( async () => {
  const partido = await futbolStore.buscarPartido(id)
  console.log(partido)
}) */

const partido = computed(() => {
  // return("PARTIDO")
  console.log(partidos.value)
  // return partidos.value
  return partidos.value.find(part => {
    return part.id_partido = id

  })
})



let equipo_local = computed(() => partido.value.equipo_local)
let equipo_visitante = computed(() => partido.value.equipo_visitante)

/* 
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
    }
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

const golesLocalTotales = computed(() => estadisticasTotales(equipo_local.value.jugadores, 'goles'))
const taLocalTotales = computed(() => estadisticasTotales(equipo_local.value.jugadores, 'tarjetas_amarillas'))
const trLocalTotales = computed(() => estadisticasTotales(equipo_local.value.jugadores, 'tarjeta_roja'))
const faltasLocalTotales = computed(() => estadisticasTotales(equipo_local.value.jugadores, 'faltas'))

const golesVisitanteTotales = computed(() => estadisticasTotales(equipo_visitante.value.jugadores, 'goles'));
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

 */
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


/* watch(() => cargando_equipos.value, val => {
  console.log(val)

  if (val == false) {
    partido = futbolStore.buscarPartido(id)
    console.log(partidos.value)
  }
}) */
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
