<template>
  <v-row v-if="competiciones">
    <v-col cols="12" class="text-center">
      <h4>Afegir competició</h4>
    </v-col>
    <v-col class="mx-4">
      <v-text-field
        v-model="nuevaCompeticion"
        label="Competició"
      ></v-text-field>
    </v-col>
    <v-col cols="12" class="text-center">
      <v-btn color="success" @click="addCompeticion">ACCEPTAR</v-btn>

    </v-col>

  </v-row>
  <v-row>
    <v-col cols="12" class="text-center">
      <h4>Llistat competicions</h4>
    </v-col>
  </v-row>
  <v-row v-for="comp in competiciones" :id="comp.id_competicion">
    <CompeticionIndividual :competicion="comp" />
    <!-- <v-col cols="12" class="text-left"><h5>{{ comp.nombre }}</h5></v-col> -->
  </v-row>
  <v-row class="mt-6">
      <v-col class="text-center">
        <v-btn size="small" color="success" @click="volver">INICI</v-btn>
      </v-col>
    </v-row>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usegFutbolStore } from "../../store/futbol"
import { useRouter } from 'vue-router'
import CompeticionIndividual from "../../components/futbol/CompeticionIndividual.vue"

const router = useRouter()

const futbolStore = usegFutbolStore()

const competiciones = computed(() => futbolStore.getCompeticiones)
const nuevaCompeticion = ref("")

const addCompeticion = () => {
  futbolStore.addCompeticion({nombre: nuevaCompeticion.value})
}
const volver = () => router.push('/futbol')




</script>