<template>
  <v-row class="pa-4">
    <v-col cols="12">
      <MarcadorBasket />
    </v-col>
  </v-row>
  <v-row class="mx-6">
    <v-col cols="12" class="text-center">
      <v-text-field
        label="Campo estadística"
        v-model="estadisticaStr"
        @keydown.enter.prevent="ejecutarEstadistica"
      ></v-text-field>

    </v-col>
  </v-row>
  <v-row>
    <v-col cols="6" v-for="equipo in equipos" :key="equipo.id_equipo">
      <v-row v-for="jugador in equipo.jugadores ">
        <JugadorBasketInd :jugador = "jugador" :nombre_equipo="equipo.nombre_equipo"/>
      </v-row>

    </v-col>
  </v-row>
  <!-- <v-row>
    <v-col cols="12" v-for="(est, index) in arrayEstadisticas" :key="index">
      {{ est }}
    </v-col>
  </v-row> -->

</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

import MarcadorBasket from '@/components/basket/MarcadorBasket'
import JugadorBasketInd from '@/components/basket/JugadorBasketInd'

import { useBasketFeed } from '@/composables/useBasketFeed'

import { useBasketStore } from "../../store/basket"
import { storeToRefs } from 'pinia'

import { useDatosBaloncestoStore } from '@/store/datosBaloncesto'

const datosBaloncestoStore = useDatosBaloncestoStore()


const { connect, disconnect, enableVisibilityPause } = useBasketFeed()

let removeVis = null
onMounted(() => {
  connect()
  removeVis = enableVisibilityPause()
})
onUnmounted(() => {
  if (removeVis) removeVis()
  disconnect()
})




const basketStore = useBasketStore()
const { partidoBasket, marcadorBasket } = storeToRefs(basketStore)
const { roster, players } = storeToRefs(datosBaloncestoStore)

console.log(players.value)
const jugadoresLocal = computed(() => players.value.filter(jug => jug.team === 'home'))
const jugadoresVisitante = computed(() => players.value.filter(jug => jug.team === 'away'))
// console.log(players.value)

const equipos = computed(() => [partidoBasket.value.equipo_local, partidoBasket.value.equipo_visitante])


const estadisticaStr = ref(null)

const arrayEstadisticas = ref([])

const validarStr = str => {
  const letrasNoPermitidas = ['b', 'd', 'e', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 'u', 'w', 'x', 'y', 'z']
  str = str.toLowerCase()
  
  for (var i = 0; i < letrasNoPermitidas.length; i++) {
    if (str.includes(letrasNoPermitidas[i])) {
      
      return true// La cadena contiene al menos una letra no permitida
    }
  }
  return false

}

function separarCadena(cadena) {
  const regex = /([A-Za-z]+)([+\-]?)(\d+)/g;
  const grupos = [];

  let match;
  while ((match = regex.exec(cadena)) !== null) {
    const letra = match[1];
    const signo = match[2] || ''; // Si no se encuentra un signo, se establece como cadena vacía
    const numeros = match[3];
    console.log(match)
    grupos.push({ letra, signo, numeros });
  }

  return grupos;
}

// Ejemplo de uso
const cadena = "A12+B34-C56";
const grupos = separarCadena(cadena);

console.log(grupos);


const separarEstadistica = (str) => {
  str = str.toLowerCase()
  console.log(str)
  
  var regex = /([a-z]+)([+-]?\d+)/ig
  var resultado = [];
  var match;

  while ((match = regex.exec(str)) !== null) {
    var letra = match[1];
    var numeros = match[2];
    console.log(match)
    resultado.push([letra, numeros]);
  }
  console.log(resultado)
  

  return resultado;

  // return estadisticaStr.value.split(/([a-zA-Z]+)/).filter(Boolean)
}

const ejecutarEstadistica = () => {
  if(validarStr(estadisticaStr.value)) {
    console.log("Error en los datos")
    return
  }
  let equipoEst = null
  let estadistica = null

  if (estadisticaStr.value.toLowerCase().includes("l")) {
    equipoEst = equipos.value[0].jugadores
    // console.log(equipoEst)
    estadistica = estadisticaStr.value.replace("l", "")
    // console.log(estadistica)
  } else if(estadisticaStr.value.toLowerCase().includes("v")) {
    equipoEst = equipos.value[1].jugadores
    estadistica = estadisticaStr.value.replace("v", "")

  }
  const est = separarEstadistica(estadistica)
  est.forEach(el => {
    // console.log(el)
    actualizarEstadisticaJugador(equipoEst, evaluarEstadistica(el))
  })
  arrayEstadisticas.value.push(estadisticaStr.value)
  estadisticaStr.value = ""
}

// let equipo = ""
// let txt = ""

const evaluarEstadistica = (est) => {
  switch (est[0].toLowerCase()) {
    case "c":
      return ({tipo: 'canasta', valor: 2, dorsal: est[1]})
      break
    case "t":
      console.log("Triple jugador numero " + est[1])
      break
    case "f":
      txt = "Tiro libre jugador numero " + est[1]
      break
    case "l":
      equipo = "Local"
      break
    case "v":
      equipo = "Visitante"
      break
    case "a":
      return ({tipo: 'asistencia', valor: 1, dorsal: est[1]})
      // txt = "Asistencia del jugador numero " + est[1]
      break
    default:
      console.log("Error en switch")
  }
  // console.log(`${txt} del equipo ${equipo}`)
}
const actualizarEstadisticaJugador = (equipo, est) => {
  console.log(equipo)
  const jugador = equipo.find(jug => jug.numero == est.dorsal )
  console.log(jugador)
  

  }

</script>