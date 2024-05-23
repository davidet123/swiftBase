<template>
  <!-- <div 
    class="fondoListado"
    @drop="onDrop($event)"
    @dragenter.prevent
    @dragover.prevent
    > -->
  <div 
    class="fondoListado"
    id="fondo"
    @click="desactivarRotuloActivo($event.target.id)"
    >
    <div v-for="rotulo in rotulos" :keyu="rotulo.id">
      <RotuloIndividual :rotulo="rotulo"/>
    </div>
    <!-- <div>

      <h4>Lista rotulos</h4>
      {{ listaRotulos }}
      {{ seccionActiva }}
      {{ rotulos }}
    </div> -->
  </div>

</template>

<script setup>

  import { computed, toRefs } from 'vue'
  import RotuloIndividual from './RotuloIndividual.vue';
  import { useRetransmisionStore } from '@/store/retransmision';

  const retransmisionStore = useRetransmisionStore()

  

  const props = defineProps(["listaRotulos","seccionActiva", "orden"])

  const { listaRotulos, seccionActiva } = toRefs(props)

  const rotulos = computed(() => listaRotulos.value.filter(el => el.seccion === seccionActiva.value))

  // const limpiarRotuloActivo = () => retransmisionStore.setRotuloActivo(null)

  const desactivarRotuloActivo = id => {
    if (id === "fondo") retransmisionStore.setRotuloActivo(null)
  }


  const onAir = (tecla) => {
    switch(tecla) {
      case "1": 
        console.log('Tecla 11')
        break

      default:
        console.log(tecla)
        break;
    }
  }

  document.addEventListener('keyup', e => {
    onAir(e.key.toUpperCase())
    // console.log(e.key.toUpperCase())
  })
</script>

<style scoped>
.fondoListado {
  height: 100%;
  width: 100%;
}

</style>