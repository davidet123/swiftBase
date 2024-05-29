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
  import { ref, toRefs, watch } from "vue"
  import { useRetransmisionStore } from '@/store/retransmision'


  
  
  import { storeToRefs } from 'pinia';
  
  const retransmisionStore = useRetransmisionStore()  
  const props = defineProps(["rotulo"])

  const { rotulo } = toRefs(props)

  
  
  const { listaGSheet } = storeToRefs(retransmisionStore)
  const hoja = rotulo.value.datosGSheet.hoja
  const rango = rotulo.value.datosGSheet.rango
  // console.log(hoja, rango)
  retransmisionStore.getData(hoja, rango)

  // if(!listaGSheet.value) retransmisionStore.getData()
  
  const numGraficoSeleccionado = ref(null)
  // console.log(rotulo.value)


  watch(() => numGraficoSeleccionado.value, val => {
    const datos = listaGSheet.value.find(el => el.numero == val)
    retransmisionStore.setDesplagableElegido(datos, rotulo.value.id)
    console.log(rotulo.value)
  })
</script>

<style scoped>

</style>