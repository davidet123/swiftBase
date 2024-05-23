<template>
  <div class="rotulo" @click="seleccionarRotulo($event.target.className)" :style="rotuloActivado">
    <div class="textoRotulo">
      {{ rotulo.titulo}}

    </div>
    <div id="actions">
      <v-btn id="botonLive" :color="!rotulo.live ? 'success' : 'error'" size="x-small"  @click="activarRotulo()">LIVE</v-btn>
    </div>

  </div>

</template>

<script setup>

  import { ref, computed, toRefs, watch } from 'vue'

  import { useRetransmisionStore } from '@/store/retransmision'
  import { useSwiftConnectionStore } from "../../store/swiftConnection"
  import { storeToRefs } from 'pinia'

  const retransmisionStore = useRetransmisionStore()
  const swiftConnectionStore = useSwiftConnectionStore()

  const { rotuloActivo, desplegableElegido } = storeToRefs(retransmisionStore)

  const props = defineProps(["rotulo"])

  const { rotulo } = toRefs(props)

  console.log(rotulo.value)

  const seleccionarRotulo = target => {
    if(target === "rotulo") retransmisionStore.setRotuloActivo(rotulo.value.id)
  }

  const rotuloActivado = computed(() => rotulo.value.id === rotuloActivo.value ? {'background-color': '#024f64'} : {'background-color': '#686867'})

  // const live = ref(false)

  const activarRotulo = () => {
    swiftConnectionStore.rtRemote.playGraphic(rotulo.value.titulo)
    if(!rotulo.value.live) {
      swiftConnectionStore.rtRemote.playMethod(rotulo.value.titulo + "::bringOn")
    } else {
      swiftConnectionStore.rtRemote.playMethod(rotulo.value.titulo + "::takeOff")
    }
    rotulo.value.live = !rotulo.value.live
  }
  
  
  watch(() => desplegableElegido.value, val => {
    console.log(val)
  })

  

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
    justify-content: space-between;
    
    
  }

</style>