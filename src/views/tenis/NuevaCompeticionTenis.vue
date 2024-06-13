<template>
  <v-row>
    <v-col cols="12" class="text-center mt-2">
      <h4>Nueva competicion</h4>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="4" offset="4">
      <v-text-field
        label="Nom Competició"
        v-model="competicion.nombre_competicion"
        density="compact"
      ></v-text-field>
    </v-col>
    <!-- <v-col cols="4">
      <v-text-field
        label="Pista de joc"
        v-model="competicion.pista_juego"
        density="compact"
      ></v-text-field>
    </v-col> -->
  </v-row>
  <v-row>
    <v-col class="text-center">
      <v-btn color="success" @click="aceptar()">CREAR COMPETICIÓ</v-btn>
    </v-col>
  </v-row>
  <v-row v-for="comp in competiciones" :key="comp.id_competicion">
    <v-col cols="4" offset="4">
      <p>{{ comp.nombre_competicion }}</p>
    </v-col>
    <!-- <v-col cols="4">
      <p>{{ comp.pista_juego }}</p>
    </v-col> -->

  </v-row>
  

</template>

<script setup>
  import { storeToRefs } from "pinia";
  import { useTenisStore } from "@/store/tenis"

  const tenisStore = useTenisStore()

  const { competicion, competiciones } = storeToRefs(tenisStore)

  tenisStore.cargarDatos()
  
  const aceptar = () => {
    competicion.value.id_competicion = `comp${Date.now()}`
    tenisStore.addCompeticionTenis(competicion.value)
  }

</script>

<style scoped>

</style>