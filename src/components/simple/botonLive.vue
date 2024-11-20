<template>
  <v-btn 
  variant="flat" 
  :color="!live ? 'success' : 'error'"
   @click="insertarGrafico(nombre)" 
   size="x-small">
    <h6>{{ nombre }} | LIVE</h6>
    </v-btn>  
    <!-- <p>{{ rotulo_cargado }}</p> -->
</template>

<script setup>

import { ref, toRefs, watch } from 'vue'

const props = defineProps(["nombre", "rotulo_cargado"])
const emit = defineEmits(["activar"])

const { nombre, rotulo_cargado } = toRefs(props)

const live = ref(false)

// if(rotulo_cargado.value) {
//   live.value = rotulo_cargado.value.live
//   // console.log(rotulo_cargado.value)
// }

// console.log(rotulo_cargado



const insertarGrafico = val => {
  live.value = !live.value  
  const payload = {
    live: live.value,
    nombre: val
    }
    emit("activar", payload)
}


watch(() => rotulo_cargado.value, val => {
  // console.log(val.value)
},{
  deep: true
})
</script>

<style>

</style>