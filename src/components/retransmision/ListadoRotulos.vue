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
    <div v-for="rotulo in rotulos" :key="rotulo.id">
      <RotuloIndividual :rotulo="rotulo" :rotuloLive="rotuloLive" @setLive="setLive()"/>
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

  import { computed, toRefs, ref } from 'vue'
  import RotuloIndividual from './RotuloIndividual.vue';
  import { useRetransmisionStore } from '@/store/retransmision';
  import { storeToRefs } from 'pinia';

  const retransmisionStore = useRetransmisionStore()

  const { rotuloActivo, onAir } = storeToRefs(retransmisionStore)

  

  const props = defineProps(["listaRotulos","seccionActiva", "orden"])

  const { listaRotulos, seccionActiva } = toRefs(props)

  const rotulos = computed(() => listaRotulos.value.filter(el => el.seccion === seccionActiva.value))

  // const limpiarRotuloActivo = () => retransmisionStore.setRotuloActivo(null)

  const desactivarRotuloActivo = id => {
    if (id === "fondo") retransmisionStore.setRotuloActivo(null)
  }

  const rotuloLive = ref(null)

  const setLive = payload => {
    rotuloLive.value = null
  }

  let ctrl = false

  const checkOnAir = tecla => {
    // console.log(onAir.value)
    if(onAir.value) return onAir.value.find(el => el.tecla === tecla)
    return true
  }
  
  const teclasFuncion = ["F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12"]

  document.addEventListener('keyup', e => {
    if(e.key === "Control") ctrl = false
  })

  document.onkeydown = e => {
    if(e.getModifierState("Control")) ctrl = true
    if(teclasFuncion.includes(e.key)) {
      e.preventDefault()
      console.log(checkOnAir(e.key))
      if(!checkOnAir(e.key)) {
        const temp = listaRotulos.value.find(el => el.id === rotuloActivo.value)
        const data = {
          titulo: temp.titulo,
          tecla: e.key,
          id: temp.id
        }
        retransmisionStore.addOnAir(data)
        console.log(onAir.value)

      }
    }

    if(e.key === " ") rotuloLive.value = rotuloActivo.value

    // console.log(e.getModifierState("Control"))
  }
</script>

<style scoped>
.fondoListado {
  height: 100%;
  width: 100%;
}

</style>