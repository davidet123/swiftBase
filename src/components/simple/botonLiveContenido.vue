<template>
  <v-btn 
  :disabled="dskActivo && !live"
  variant="flat" 
  :color="!live ? 'success' : 'error'"
   @click="insertarGrafico(nombre)" 
   size="x-small">
    <h6>{{ nombre }} | LIVE {{ dskActivo }}</h6>
    </v-btn>  
    <!-- <p>{{ rotulo_cargado }}</p> -->
</template>

<script setup>

import { ref, toRefs, watch } from 'vue'

const props = defineProps(["nombre", "contenido", "dskActivo"])
const emit = defineEmits(["activar"])

const { nombre, contenido, dskActivo } = toRefs(props)

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
    nombre: val,
    contenido: contenido.value
    }
    emit("activar", payload)
}


</script>

<style>

</style>