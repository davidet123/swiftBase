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
    rotuloLive.value = payload
  }

  let ctrl = false

  const checkTeclaFuncion = tecla => {
    if(onAir.value.length >= 1) return onAir.value.find(el => el.tecla === tecla)
    return false
  }

  const checkOnAir = () => {
    return onAir.value.map(el => el.id).includes(rotuloActivo.value)


  }
  
  const teclasFuncion = ["F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12"]

  document.addEventListener('keyup', e => {
    if(e.key === "Control") ctrl = false
  })

  document.onkeydown = e => {
    if(e.getModifierState("Control")) ctrl = true
    if(teclasFuncion.includes(e.key)) {
      console.log(checkTeclaFuncion(e.key) && ctrl)
      if(!rotuloActivo.value) return
      e.preventDefault()

      const temp = listaRotulos.value.find(el => el.id === rotuloActivo.value)
      const data = {
        titulo: temp.titulo,
        tecla: e.key,
        id: temp.id
      }
      if(!checkTeclaFuncion(e.key) && !ctrl) {
        retransmisionStore.addOnAir(data)
        rotuloLive.value = rotuloActivo.value
      } else if(checkTeclaFuncion(e.key) && ctrl) {
        console.log("Eliminar onair")
        rotuloLive.value = rotuloActivo.value
        retransmisionStore.removeOnAir(data)
      }
      
      
      
      
      
      
    }
    
    if(e.key === " ") {
      // console.log(onAir.value)
      // console.log(checkOnAir(rotuloActivo.value) )
      if(!checkOnAir()) rotuloLive.value = rotuloActivo.value
    }
    // rotuloLive.value = null
  }
</script>

<style scoped>
.fondoListado {
  height: 100%;
  width: 100%;
}

</style>