<template>
  <div id="listaDesplegable" v-if="listaGSheet">
    <!-- CUADRO DE TEXTO PARA BUSCAR ROTULO AQUI!! -->
    <v-select
      label="Grafico"
      :items="listaGSheet"
      v-model="numGraficoSeleccionado"
      item-title="label"
      item-value="numero"
      :active="desplegableActivo"
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

  
  
  const { listaGSheet, desplegableElegido } = storeToRefs(retransmisionStore)
  const hoja = rotulo.value.datosDesplegable.hoja
  const rango = rotulo.value.datosDesplegable.rango

  const desplegableActivo = ref(false)
  if(rotulo.value.datosDesplegable.tipo === 'gSheet') {

    retransmisionStore.getDataGS(hoja, rango)
  } else if (rotulo.value.datosDesplegable.tipo === 'EXCEL'){
    retransmisionStore.getDataExcel(hoja)
  }
  

  // if(!listaGSheet.value) retransmisionStore.getData()
  
  const numGraficoSeleccionado = ref(desplegableElegido.value)


  watch(() => numGraficoSeleccionado.value, val => {
    const datos = listaGSheet.value.find(el => el.numero == val)
    retransmisionStore.setDesplagableElegido(datos, rotulo.value.id, val)
    desplegableActivo.value = false
  })
</script>

<style scoped>

</style>