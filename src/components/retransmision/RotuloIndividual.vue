<template>
  <div class="rotulo" :style="rotuloActivado">
    <div class="activo" :style="rotuloDirecto"></div>
    <div class="contenido" @click="seleccionarRotulo($event)">
    <!-- <div class="contenido" @click="seleccionarRotulo($event.target.className)"> -->

      <div class="textoRotulo" @click="seleccionarRotulo($event)">
        <!-- {{ rotuloDesplegable }} -->
        <div id="titulo">{{ rotulo.nombre}}</div>
        <div id="contenido">
          <span v-if="rotulo.desplegable"> {{ numRotuloDesplegable }}</span>
          <span class="textoIndividual" v-for="(value, key) in rotulo.contenido" :key="key">
             {{ value }}
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

  const { rotuloActivo, desplegableElegido, rotuloDesplegable, seccionActiva, listaGraficos, rotuloLive } = storeToRefs(retransmisionStore)

  const props = defineProps(["rotulo"])

  const { rotulo } = toRefs(props)

  const seleccionarRotulo = (e) => {
    if(e.target.nodeName !== 'I') retransmisionStore.setRotuloActivo(rotulo.value.id)

  }

  const numRotuloDesplegable = computed(() => rotulo.value.numeroDesplegable ? rotulo.value.numeroDesplegable + " - " : "")

  const rotuloActivado = computed(() => rotulo.value.id === rotuloActivo.value ? {'background-color': '#024f64'} : {'background-color': '#686867'})

 
  const  rotuloDirecto = computed(() => rotulo.value.live ? {'background-color': '#ff0000'} : {'background-color': rotuloActivado.value['background-color']})
  // const live = ref(false)

  const activarRotulo = () => {
    let grafico = null
    grafico = parseInt(rotulo.value.lineasTexto) === 0 ? rotulo.value.nombre : rotulo.value.titulo
    swiftConnectionStore.rtRemote.playGraphic(grafico)
    if(!rotulo.value.live) {

      for(let campo in rotulo.value.contenido) {
        swiftConnectionStore.rtRemote.updateFields(grafico + "::" + campo + "TEXT", "String", rotulo.value.contenido[campo])
      }
      swiftConnectionStore.rtRemote.playMethod(grafico + "::bringOn")
      retransmisionStore.addLiveToSeccion(seccionActiva.value, 1)
    } else {
      swiftConnectionStore.rtRemote.playMethod(grafico + "::takeOff")
      retransmisionStore.addLiveToSeccion(seccionActiva.value, -1)
    }  
    retransmisionStore.editListaRotulosLive(rotulo.value.id, rotulo.value.live)
    rotulo.value.live = !rotulo.value.live
  }

  const editarRotulo = () => console.log("editarRotulo")
  const duplicarRotulo = () => retransmisionStore.duplicarRotulo(rotulo.value)
  const eliminarRotulo = () => {
    retransmisionStore.eliminarRotulo(rotulo.value.id)

  }


  const id = computed(() => rotulo.value.id)


  
  
  
  // watch(() => desplegableElegido.value, val => {
  // })


  watch(() => rotuloLive.value, val => {
    if(val === id.value) {
      activarRotulo()
      retransmisionStore.setRotuloLive(null)
    }
    // emit("setLive", null)
  },{deep:true})
  

</script>

<style scoped>
  .rotulo {
    width: 100%;
    height: 50px;
    background-color: rgb(55, 55, 55);
    border: 1px solid white;
    margin: 5px 0;
    /* padding: 0 10px; */
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    
    
  }
  .contenido {
    display: flex;
    width: 100%;
    padding-left: 10px;
    justify-content: space-between;
  }

  .activo {
    height: 100%;
    width: 30px;
    /* background-color: red; */
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