<template>
  <v-card class="mx-4" v-if="marcador">
    <v-card-item>
      <v-card-title>
       {{ partido.equipo_local.nombre_equipo }} vs {{ partido.equipo_visitante.nombre_equipo }}
      </v-card-title>
      <v-card-subtitle>
        {{ partido.fecha }} | {{ partido.hora }} | {{ partido.lugar }}
        
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <v-row align="center" justify="center">
        <v-col cols="6" v-if="marcador" class="text-center">
          <v-row align="center" justify="center">
            <v-col cols="8">
              <p class="text-h2">{{ marcador.goles.local }} | {{ marcador.goles.visitante }}</p>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="2" offset="2">
          <v-row class="my-0 py-0">
            <v-col cols="12" align="center" justify="center" class="my-1 py-0">
              <v-btn size="x-small" color="success" @click="irPartido(partido.id_partido)">ESTADISTICA</v-btn>
            </v-col>
          </v-row>
          <v-row class="my-0 py-0">
            <v-col cols="12" align="center" justify="center" class="my-1 py-0">
              <v-btn size="x-small" color="success" @click="editarPartido(partido.id_partido)">editar</v-btn>
            </v-col>

          </v-row>
          <v-row class="my-0 py-0">
            <v-col cols="12" align="center" justify="center" class="my-1 py-0">
              <v-btn size="x-small" color="success" @click="resumenFutbol(partido.id_partido)">RESUMEN</v-btn>
            </v-col>

          </v-row>

        </v-col>
        
      </v-row>
    </v-card-text>

  </v-card>

</template>


<script setup>

import { useRouter, useRoute } from 'vue-router';
import { usegFutbolStore } from "../../store/futbol"
import { computed } from 'vue';
import { watch } from 'vue';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { toRefs } from 'vue';


const futbolStore = usegFutbolStore()
const {  marcadores } = storeToRefs(futbolStore)

const router = useRouter()
const route = useRoute()

const id = route.params.id

const props = defineProps(["partido"])
const { partido } = toRefs(props)

// const marcadores = futbolStore.marcadores
const marcador = computed(() => {
  return marcadores.value.find( el => {
    console.log(el.id_partido)
    return el.id_partido == partido.value.id_partido
  })
})






const irPartido = id => {
  futbolStore.setPartidoEnJuego(id)
  router.push(`/futbol/estfutbol/${id}`)
}

const editarPartido = id => {
  router.push(`/futbol/editarpartidofutbol/${id}`)
}

const resumenFutbol = id => {
  router.push(`/futbol/resumenfutbol/${id}`)
}

// console.log(props.partido)
/* empezarTiempo()

watch(() => empezado.value, val => {
  if (val) {
    empezarTiempo(true)
  } else if (!val) {
    empezarTiempo(false)
  }
})
 */
</script>