<template>
  <div class="rotulo" @click="seleccionarRotulo($event.target.className)" :style="rotuloActivado">
    <div class="textoRotulo">
      <div id="titulo">{{ rotulo.titulo}}</div>
      <div id="contenido">
        <span class="textoIndividual" v-for="texto in rotulo.contenido" :key="texto.nombre">
          {{ texto.valor }}
        </span>
      </div>
    </div>
    <div id="actions">
      <div id="editar">
        <v-icon
          icon="mdi-application-edit-outline"
          @click="editarRotulo()"
        ></v-icon>
      </div>
      <div id="duplicar">
        <v-icon
          icon="mdi-content-duplicate"
          @click="duplicarRotulo()"
        ></v-icon>
      </div>
      <div id="eliminar">
        <v-icon
          icon="mdi-trash-can-outline"
          @click="eliminarRotulo()"
        ></v-icon>
      </div>
      <!-- <v-btn id="botonLive" :color="!rotulo.live ? 'success' : 'error'" size="x-small"  @click="activarRotulo()">LIVE</v-btn> -->
    </div>

  </div>

</template>

<script setup>

  import { ref, computed, toRefs, watch } from 'vue'

  import { useRetransmisionStore } from '@/store/retransmision'
  import { useSwiftConnectionStore } from "../../store/swiftConnection"
  import { storeToRefs } from 'pinia'

  const emit = defineEmits(["setLive"])

  const retransmisionStore = useRetransmisionStore()
  const swiftConnectionStore = useSwiftConnectionStore()

  const { rotuloActivo, desplegableElegido, onAir } = storeToRefs(retransmisionStore)

  const props = defineProps(["rotulo", "rotuloLive"])

  const { rotulo, rotuloLive } = toRefs(props)

  const seleccionarRotulo = target => {
    console.log(rotulo.value.id)
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

  const editarRotulo = () => console.log("editarRotulo")
  const duplicarRotulo = () => retransmisionStore.duplicarRotulo(rotulo.value)
  const eliminarRotulo = () => {
    retransmisionStore.eliminarRotulo(rotulo.value.id)

  }

  
  
  
  watch(() => desplegableElegido.value, val => {
    console.log(val)
  })
  watch(() => rotuloLive.value, val => {
    if(val === rotulo.value.id) activarRotulo()
    emit("setLive", null)
  })

  watch(() => onAir.value, val => {
    const checkLive = val.find(el => el.id === rotulo.value.id)
    if(checkLive) activarRotulo()

  },{deep: true})

  

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
  .textoRotulo {
    display: flex;
    flex-direction: column;
  }

  #contenido {
    font-size: 12px;
    display: flex;
    padding-left: 1.5em;
  }
  .textoIndividual {
    margin-right: 5px;
  }

  #actions {
    display: flex;

  }

  #actions div {
    margin: 0 2px;
  }

</style>