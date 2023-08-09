<template>
  <v-btn 
  variant="flat" 
  :color="!live ? 'success' : 'error'"
   @click="insertarGrafico(nombre)" 
   size="small">
    <h6>{{ nombre }} | LIVE</h6>
    </v-btn>  
</template>

<script setup>

import { ref, computed } from 'vue'

const props = defineProps(["nombre"])
const emit = defineEmits(["activar"])

const live = ref(false)



const insertarGrafico = val => {
  const payload = {
    live: live.value,
    nombre: val
    }
  live.value = !live.value  
  emit("activar", payload)
}
</script>

<style>

</style>