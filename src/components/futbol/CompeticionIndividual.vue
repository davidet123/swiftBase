<template>
  <v-row class="mx-4">
    <v-col cols="6">
      <p v-if="!editing">{{ competicion.nombre }}</p>      
      <v-text-field
        v-if="editing"
        v-model="competicion.nombre"
        label="Competició"
      ></v-text-field>
      
    </v-col>
    <v-col cols="6">
      <v-btn v-if="!editing" color="success" size="x-small" @click="editar">EDITAR</v-btn>
      <v-btn v-if="editing" color="success" size="x-small" @click="actualizar">ACEPTAR</v-btn>
      <v-btn v-if="!editing" class="mx-2" color="error" size="x-small" @click="eliminar">X</v-btn>


    </v-col>
  </v-row>

</template>

<script setup>


import { ref, toRefs } from 'vue'

import { usegFutbolStore } from "../../store/futbol"

const futbolStore = usegFutbolStore()

const props = defineProps(["competicion"])

const { competicion } = toRefs(props)

const editing = ref(false)

const editar = () => {
  editing.value = !editing.value
}

const actualizar = () => {
  futbolStore.updateCompeticionDB(competicion.value)
  editing.value = !editing.value
}

const eliminar = () => {
  console.log(competicion.value)
  futbolStore.eliminarCompeticion(competicion.value)
}

</script>