<template>
  <v-row style="border-bottom: 1px solid white;">
    <v-col cols="6" style="border-right: 1px solid white;">
      <p>{{ rotulo.nombre }}</p>
    </v-col>
    <v-col cols="6">
      <p>{{ rotulo.funcion }}</p>
    </v-col>
  </v-row>
</template>

<script setup>
import { toRefs } from 'vue';


const props = defineProps(["rotulo"])
const { rotulo } = toRefs(props)

</script>

<style scoped>
</style>