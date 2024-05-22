<template>
  <div class="rotulo" @click="seleccionarRotulo()" :style="rotuloActivado">
    <div class="textoRotulo">
      {{ rotulo.titulo}}

    </div>

  </div>

</template>

<script setup>

  import { computed, toRefs } from 'vue'

  import { useRetransmisionStore } from '@/store/retransmision';
  import { storeToRefs } from 'pinia';

  const retransmisionStore = useRetransmisionStore()

  const { rotuloActivo } = storeToRefs(retransmisionStore)

  const props = defineProps(["rotulo"])

  const { rotulo } = toRefs(props)

  const seleccionarRotulo = () => retransmisionStore.setRotuloActivo(rotulo.value.id)

  const rotuloActivado = computed(() => rotulo.value.id === rotuloActivo.value ? {'background-color': '#024f64'} : {'background-color': '#686867'})


</script>

<style scoped>
  .rotulo {
    width: 100%;
    height: 50px;
    background-color: rgb(55, 55, 55);
    border: 1px solid white;
    margin: 5px 0;
    padding: 0 10px;
    display: flex;
    align-items: center;
    
  }

</style>