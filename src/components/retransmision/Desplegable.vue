<template>
  <div id="listaDesplegable" v-if="listaGSheet">
    <v-select
      label="Grafico"
      :items="listaGSheet"
      v-model="numGraficoSeleccionado"
      item-title="label"
      item-value="numero"
    >
    </v-select>
  </div>
  <!-- {{ listaGSheet }} -->
</template>

<script setup>
  import { ref, watch } from "vue"
  import { useRetransmisionStore } from '@/store/retransmision'


  
  
  import { storeToRefs } from 'pinia';
  
  const retransmisionStore = useRetransmisionStore()  

  
  
  const { listaGSheet } = storeToRefs(retransmisionStore)
  retransmisionStore.getData()

  // if(!listaGSheet.value) retransmisionStore.getData()
  
  const numGraficoSeleccionado = ref(null)


  watch(() => numGraficoSeleccionado.value, val => {
    console.log(listaGSheet.value)
    const datos = listaGSheet.value.find(el => el.numero == val)
    retransmisionStore.setDesplagableElegido(datos)
  })
</script>

<style scoped>

</style>