<template>
  <v-row>
    <v-col cols="4" offset="2" class="text-center">
      <p>Nom</p>
    </v-col>
    <v-col cols="4" class="text-center">
      <p>Funcio</p>
    </v-col>
  </v-row>
  <v-row class="fila mb-5">
    <v-col cols="12" v-for="rotulo in rotulosMostrados" :key="rotulo.id_rotulo">
      <RotuloSimple :rotulo="rotulo"/>
    </v-col>
  </v-row>
  <v-row class="fila">
    
    <v-col cols="12" v-for="rotulo in rotulosSinMostrar" :key="rotulo.id_rotulo">
      <RotuloSimple :rotulo="rotulo"/>
    </v-col>
  </v-row>

</template>

<script setup>

import { computed } from "vue";
import { useRotulosStore } from "../../store/rotulos" 

import { useRoute } from "vue-router";

import RotuloSimple from "./RotuloSimple"

const route = useRoute()
const id = route.params.id 
const rotulosStore = useRotulosStore()

const rotulos = computed(() => rotulosStore.getRotulosById(id))

const rotulosMostrados = computed(() => rotulos.value.filter(r => r.mostrado === true))
const rotulosSinMostrar = computed(() => rotulos.value.filter(r => r.mostrado === false))


</script>


<style scoped>
  .fila{
    background-color: #303030;
    border-radius: 5px;
    border: 1px solid white;
    width: 80%;
    margin: 0 auto;
  }
</style>