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
    <div v-for="(rotulo, index) in listaRotulos" :key="rotulo.id">
      <span v-show="rotulo.seccion === seccionActiva">
        <RotuloIndividual 
        :rotulo="rotulo" @setLive="setLive()"
        draggable="true"
        @dragstart="dragStart(index)"
        @dragover.prevent
        @drop="drop(index)"/>
      </span>
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

  const { rotuloActivo, onAir, edit, dragRotulo } = storeToRefs(retransmisionStore)

  

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
    console.log(onAir.value)

    return onAir.value.map(el => el.id).includes(rotuloActivo.value)


  }

  let dragItem = null


  const dragStart = index => {

    retransmisionStore.setDragRotulo(true)
    dragItem = index
  }
  const drop = index => {
    if(!dragRotulo.value) return
    
    const lista = listaRotulos.value
    const item = lista[dragItem]
    lista.splice(dragItem, 1)
    lista.splice(index, 0, item)
    retransmisionStore.setDragRotulo(false)
  }
  
  const teclasFuncion = ["F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12"]

  document.addEventListener('keyup', e => {
    if(e.key === "Control") ctrl = false
  })

  document.onkeydown = e => {
    
    if(edit.value) return
    if(e.getModifierState("Control")) ctrl = true
    if(teclasFuncion.includes(e.key)) {
      e.preventDefault()
      if(!checkTeclaFuncion(e.key) && !ctrl) {
        if(!rotuloActivo.value) return
        
        const temp = listaRotulos.value.find(el => el.id === rotuloActivo.value)
        const data = {
          titulo: temp.nombre,
          tecla: e.key,
          id: temp.id
        }
        retransmisionStore.addOnAir(data)
        retransmisionStore.setRotuloLive(rotuloActivo.value)
      } else if(checkTeclaFuncion(e.key) && ctrl) {
        const desactivar = onAir.value.find(el => el.tecla === e.key)
        const data = {
          titulo: desactivar.titulo,
          tecla: e.key,
          id: desactivar.id
        }
        retransmisionStore.setRotuloLive(desactivar.id)

        retransmisionStore.removeOnAir(desactivar)
      } 
    }
    
    if(e.key === "s" && ctrl) {
      e.preventDefault()
      retransmisionStore.guardarRetransmision()
    }  
    if(e.key === " ") {
      console.log(checkOnAir())
      if(!checkOnAir()) {
        retransmisionStore.setRotuloLive(rotuloActivo.value)
      }
      console.log(onAir.value)
    }
    // rotuloLive.value = null
  }

  console.log(listaRotulos.value)
</script>

<style scoped>
.fondoListado {
  height: 100%;
  width: 100%;
}

</style>