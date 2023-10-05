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
              <p class="text-h2">{{ marcadorLocal }} | {{ marcadorVisitante }}</p>
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
  import { computed } from "vue";
  import { usegBasketStore } from "../../store/basket"
  import { storeToRefs } from 'pinia'
  import { useRouter } from "vue-router"


  const router = useRouter()

  const basketStore = usegBasketStore()

  const { partidoBasket, marcadorBasket } = storeToRefs(basketStore)

  const partido = computed(() => partidoBasket.value) 
  const marcador = computed(() => marcadorBasket.value) 

  const marcadorLocal = Object.values(marcador.value.tanteoLocal).reduce((a, b) => a + b, 0)
  const marcadorVisitante = Object.values(marcador.value.tanteoVisitante).reduce((a, b) => a + b, 0)

  const irPartido = id => {
    
    router.push(`/basket/estbasket/${id}`)
  }

  const editarPartido = id => {
    router.push(`/basket/editarpartidobasket/${id}`)
  }

  const resumenFutbol = id => {
    router.push(`/futbol/resumenbasket/${id}`)
  }


</script>