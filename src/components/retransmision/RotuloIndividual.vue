<template>
  <div class="rotulo" :style="rotuloActivado">
    <div class="activo" :style="rotuloDirecto"></div>
    <div class="contenido" @click="seleccionarRotulo($event)">
    <!-- <div class="contenido" @click="seleccionarRotulo($event.target.className)"> -->

      <div class="textoRotulo">
        <!-- {{ rotuloDesplegable }} -->
        <div id="titulo">{{ rotulo.nombre}}</div>
        <div id="contenido">
          <span v-if="rotulo.desplegable" class="numeroRotulo"> {{ numRotuloDesplegable }}</span>
          <span class="textoIndividual">
            <div  v-for="(value, key) in rotulo.contenido" :key="key" class="contenidoRotulos">
              <p>{{ value }}</p><p> - </p>

            </div>
             
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

  const { rotuloActivo, rotuloParaTakeOff, desplegableElegido, rotuloDesplegable, seccionActiva, listaGraficos, rotuloLive, error } = storeToRefs(retransmisionStore)

  const props = defineProps(["rotulo"])

  const { rotulo } = toRefs(props)

  const seleccionarRotulo = (e) => {
    if(e.target.nodeName === 'I') return
    retransmisionStore.setRotuloActivo(rotulo.value.id)
    const tipoDesplegable = rotulo.value.datosDesplegable.tipo
    // console.log(tipoDesplegable)
    if(tipoDesplegable === "EXCEL") {
      const hoja = rotulo.value.datosDesplegable.hoja
      const rango = rotulo.value.datosDesplegable.rango
      retransmisionStore.getDataExcel(hoja, rango)
    }
    // const rotulo = retransmisionStore.buscarRotulo

  }

  const numRotuloDesplegable = computed(() => rotulo.value.numeroDesplegable ? rotulo.value.numeroDesplegable + " - " : "")

  const colorRotulo = () => {
    return !rotulo.value.desplegable ? {'background-color': '#686867'} : {'background-color': '#414f3d'}
  }

  const rotuloActivado = computed(() => rotulo.value.id === rotuloActivo.value ? {'background-color': '#024f64'} : colorRotulo())

 
  const  rotuloDirecto = computed(() => rotulo.value.live ? {'background-color': '#ff0000'} : {'background-color': rotuloActivado.value['background-color']})
  // const live = ref(false)

  
  
  const activarRotulo = () => {
    // if(rotulo.value.desplegable && rotulo.value.titulo !== rotuloParaTakeOff.value) return
    let grafico = null
    grafico = parseInt(rotulo.value.lineasTexto) === 0 ? rotulo.value.nombre : rotulo.value.titulo
    swiftConnectionStore.rtRemote.playGraphic(grafico)
    if(!rotulo.value.live) {
      // console.log(rotulo.value)

      if (rotulo.value.titulo === "VUMETRO") {
        swiftConnectionStore.cueGraphic(grafico)
        swiftConnectionStore.rtRemote.updateFields('VUMETRO::VALOR_VUMETROTEXT','String',"0")
        swiftConnectionStore.rtRemote.updateFields("CLIP_VUMETRO","Translate","231, 560")
        swiftConnectionStore.rtRemote.updateFields("CLIP_VUMETRO_PEAKING_MAX","Translate","231, 560")
      }
      if (rotulo.value.lineasTexto === 0) {
        swiftConnectionStore.cueGraphic(grafico)
      }

      
      for(let campo in rotulo.value.contenido) {
        // console.log(rotulo.value.contenido[campo])
        if(rotulo.value.contenido[campo] === null) error.value = "FALTA RELLENAR CAMPO"
        if(rotulo.value.contenido[campo] === null) return
        // error.value = null
      
        if(rotulo.value.titulo === "CRAWL") {
        // if(rotulo.value.crawl || rotulo.value.titulo === "CRAWL") {
          console.log(grafico + "::" + campo + "TCKR", "Contents",  rotulo.value.contenido[campo], ' ')
          swiftConnectionStore.playGraphic(grafico)
          swiftConnectionStore.cueGraphic(grafico)
          swiftConnectionStore.rtRemote.updateFields(grafico + "::TITULARTCKR", "Contents",  rotulo.value.contenido['TITULAR'])
          // swiftConnectionStore.rtRemote.updateFields(grafico + "::" + campo + "TCKR", "Contents",  titular.replace(/\r\n|\n\r|\n|\r/g, ' '))
          // swiftConnectionStore.rtRemote.updateFields(grafico + "::" + campo + "TEXT", "String", rotulo.value.contenido[campo])
        }  else {
          swiftConnectionStore.rtRemote.updateFields(grafico + "::" + campo + "TEXT", "String", rotulo.value.contenido[campo])

        }
      
      }

      if(!rotulo.value.desplegable) {
        swiftConnectionStore.rtRemote.playMethod(grafico + "::bringOn")
        retransmisionStore.addLiveToSeccion(seccionActiva.value, 1)
        retransmisionStore.editListaRotulosLive(rotulo.value.id, rotulo.value.live)
        rotulo.value.live = !rotulo.value.live

      } else {
        if(!rotuloParaTakeOff.value || rotulo.value.titulo === rotuloParaTakeOff.value ) {
          swiftConnectionStore.rtRemote.playMethod(grafico + "::bringOn")
          retransmisionStore.addLiveToSeccion(seccionActiva.value, 1)
          rotuloParaTakeOff.value = rotulo.value.titulo
          retransmisionStore.editListaRotulosLive(rotulo.value.id, rotulo.value.live)
          rotulo.value.live = !rotulo.value.live
        }

      }
    } else {
      // console.log(rotulo.value)
      if(!rotulo.value.desplegable) {
        swiftConnectionStore.rtRemote.playMethod(grafico + "::takeOff")
        retransmisionStore.addLiveToSeccion(seccionActiva.value, -1)
        retransmisionStore.editListaRotulosLive(rotulo.value.id, rotulo.value.live)
        rotulo.value.live = !rotulo.value.live

      } else {
        if(rotulo.value.titulo === rotuloParaTakeOff.value) {
          swiftConnectionStore.rtRemote.playMethod(grafico + "::takeOff")
          retransmisionStore.addLiveToSeccion(seccionActiva.value, -1)
          rotuloParaTakeOff.value = null
          retransmisionStore.editListaRotulosLive(rotulo.value.id, rotulo.value.live)
          rotulo.value.live = !rotulo.value.live
        }
      }
    }  
    // retransmisionStore.editListaRotulosLive(rotulo.value.id, rotulo.value.live)
    // rotulo.value.live = !rotulo.value.live
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
      // const seccion = retransmisionStore.buscarSeccion(val)
      // if(seccion !== seccionActiva.value) return
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

  #contenido {
    display: grid;
    grid-template-columns: auto 1fr; /* Columna fija para número, flexible para texto */
    align-items: center;
    gap: 8px; /* Espacio entre columnas */
}

.numeroRotulo {
  font-size: 14px;
    white-space: nowrap;
    padding-right: 8px;
}

.textoIndividual {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    gap: 10px;
}
  .textoRotulo {
    display: flex;
    flex-direction: column;
    flex-grow: 1; /* Ocupa todo el espacio disponible */
    min-width: 0; /* Permite que el texto se trunque correctamente */
  }

  .contenidoRotulos {
    display: flex;
    justify-content: space-between;
  }

  
  /* .contenido {
    display: flex;
    width: 100%;
    padding-left: 10px;
    justify-content: space-between;
  } */
   .contenido {
    display: flex;
    width: 100%;
    padding-left: 10px;
    justify-content: space-between;
    overflow: hidden; /* Evita que el contenido interno desborde */
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
    flex-shrink: 0; /* Evita que se encoja (mantiene su tamaño) */
  }

  #actions div {
    margin: 0 2px;
  }

</style>