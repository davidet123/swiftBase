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
    <v-col cols="12" v-for="(est, index) in arrayEstadisticas" :key="index">
      {{ est }}
    </v-col>
  </v-row>

</template>

<script setup>

import MarcadorBasket from '@/components/basket/MarcadorBasket'
import { ref } from 'vue'


const estadisticaStr = ref(null)

const arrayEstadisticas = ref([])

const validarStr = str => {
  const letrasNoPermitidas = ['b', 'd', 'e', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 'u', 'w', 'x', 'y', 'z']
  estadisticaStr.value = estadisticaStr.value.toLowerCase()
  
  for (var i = 0; i < letrasNoPermitidas.length; i++) {
    if (estadisticaStr.value.includes(letrasNoPermitidas[i])) {
      
      return true// La cadena contiene al menos una letra no permitida
    }
  }
  return false

}

const separarEstadistica = () => {
  
  var regex = /([a-zA-Z]+)(\d*)/g;
  var resultado = [];
  var match;

  while ((match = regex.exec(estadisticaStr.value)) !== null) {
    var letra = match[1];
    var numeros = match[2];
    resultado.push([letra, numeros]);
  }

  return resultado;

  // return estadisticaStr.value.split(/([a-zA-Z]+)/).filter(Boolean)
}

const ejecutarEstadistica = () => {
  if(validarStr(estadisticaStr.value)) {
    console.log("Error en los datos")
    return
  }
  const est = separarEstadistica()
  est.forEach(el => {
    console.log(el)
    evaluarEstadistica(el)
  })
  arrayEstadisticas.value.push(estadisticaStr.value)
  estadisticaStr.value = ""
}

const evaluarEstadistica = (est) => {

  let txt = ""
  let equipo = ""

  switch (est[0].toLowerCase()) {
    case "c":
      txt = "Canasta jugador numero " + est[1]
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
      txt = "Asistencia del jugador numero " + est[1]
      break
    default:
      console.log("Error en switch")
  }

  console.log(`${txt} del equipo ${equipo}`)

}

</script>