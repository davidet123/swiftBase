<template>
  <div id="retransmision">
    <v-row id="comandos">
      <Comandos />
    </v-row>
    <v-row id="onAir">
        <OnAir v-for="(rotuloOnAir, index) in onAir" :key="index" :rotuloOnAir="rotuloOnAir" :orden="index"/>
    </v-row>
    
    <v-row id="secciones">
      <Secciones v-for="(seccion, index) in seccionesOrdenadas" :key="index" :seccion="seccion" :orden="index" :seccionActiva = "seccionActiva"/>
    </v-row>
    <v-row class="ma-0 pa-0" id="seccion-media">
      <v-col id="listado">
        <ListadoRotulos 
          @drop="onDrop($event)"
          @dragenter.prevent
          @dragover.prevent
          :seccionActiva="seccionActiva"
          :listaRotulos="listaRotulos"/>
      </v-col>
      <v-col id="controles">
        <v-row id="visor" class="ma-0 pa-0">
          <div id="interior-visor" :style="fondoVisor">

            <VisorFlex />
          </div>
        </v-row>
        <v-row id="ventanaControl" class="ma-0 pa-0">
          <v-col>
            <Control
              :rotuloActivo="rotuloActivo"
            />
  
          </v-col>
        </v-row>
      </v-col>
  
    </v-row>
    <v-row id="seccionGraficos">
      <Graficos 
        @evento="getEvento"
        class="graficoSeleccionado" v-for="(grafico, index) in listaGraficos" 
        :key="index" 
        :grafico="grafico" 
        :orden="index"
      />
  
    </v-row>
  </div>


</template>

<script setup>
  import { computed, watch } from "vue"
  import { useRetransmisionStore } from "../../store/retransmision" 
  import { useSwiftConnectionStore } from "../../store/swiftConnection"
  import { storeToRefs } from "pinia"
  
  
  import VisorFlex from '@/components/visor/VisorFlex.vue'
  import OnAir from '@/components/retransmision/OnAir.vue'
  import Secciones from '@/components/retransmision/Secciones.vue'
  import Graficos from '@/components/retransmision/Graficos.vue'
  import ListadoRotulos from '@/components/retransmision/ListadoRotulos.vue'
  import Control from '@/components/retransmision/Control.vue'
  import Comandos from '@/components/retransmision/Comandos.vue'


  const swiftConnectionStore = useSwiftConnectionStore()

  const retransmisionStore = useRetransmisionStore()
  const { onAir, secciones, listaGraficos, seccionActiva, listaRotulos, rotuloActivo, retransmisionActiva, dragGrafico } = storeToRefs(retransmisionStore)

  swiftConnectionStore.startConnection()
  retransmisionStore.cargarRetransmisiones()

  if(!retransmisionActiva.value) retransmisionActiva.value = JSON.parse(localStorage.getItem('retransmisionActiva'))
  retransmisionStore.cargarRetransmisiones()
  retransmisionStore.cargarRetransmision(retransmisionActiva.value)


  
  const seccionesOrdenadas = secciones.value.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
  
  const live = false

  const fondoVisor = computed(() => {
    if(live) {
      return {
        'background-color': '#ff0000'
      }
    } else {
      return {
        'background-color': '#303030'
      }
    }
  })
  let evento = null

  const onDrop = (event) => {
    if(!dragGrafico.value) return
    if(!seccionActiva.value ) return
    const item = event.dataTransfer.getData('item')
    let contenido = {}
    const temp = {}
    for (let i = 1; i<=evento.lineasTexto; i++) {
      // const temp = []
      temp[evento.nombreCampoSwift[i-1].nombreSwift] = null
    }
    contenido = {...temp}

    const rotulo = {
      id: `r${listaRotulos.value.length + 1}`,
      numero: parseInt(`${listaRotulos.value.length + 1}`),
      nombre: evento.nombre,
      titulo: evento.titulo,
      grafico: evento.id,
      seccion: seccionActiva.value,
      contenido,
      lineasTexto: evento.lineasTexto,
      desplegable: evento.desplegable,
      live: false,
      datosDesplegable: evento.datosDesplegable,
      tipoDesplegableElegido: evento.tipoDesplegableElegido,
      numeroDesplegable: null
      // graficoSwift: evento.graficoSwift

    }
    listaRotulos.value.push(rotulo)
    retransmisionStore.setGuardado(false)
    retransmisionStore.setDragGrafico(false)
    console.log(listaRotulos.value)
    // console.log(evento)
  }

  const getEvento = item => {
    evento = item
    console.log(evento)
  }

  watch(() => retransmisionActiva.value, val => {
    // console.log(val)
    e.preventDefault()
    e.returnValue = ''
  })

  


</script>

<style scoped>

  #retransmision {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    

  }

  #comandos {
    width: 100%;
    height: 2%;
    margin: 0;
    padding: 0;
    display: flex;
  }
  #seccion-media {
    width: 100%;
    
    max-height: 650px;
    height: 68%;
    margin: 0;
    padding: 0;
  }
  
  #onAir, #seccionGraficos {
    width: 100%;
    height: 12.5%;
    border: 1px solid white;
    margin: 0;
    padding: 0;
    position: relative;
    align-items: start;
  }
   #secciones {
    width: 100%;
    height: 5%;
    border: 1px solid white;
    margin: 0;
    padding: 0;
    position: relative;
    align-items: start;
  }

  
  #listado {
    width: 50%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: 1px solid white;
    position: relative;
    display: flex;
    flex-direction: column;   
    overflow-y: auto;
    
  }
  #controles {
    width: 50%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: 1px solid white;
    position: relative;
    display: flex;
    flex-direction: column;   
    
  }
  #visor {
    width: 100%;
    height: 50%;
    border: 1px solid white;
    margin: 0;
    padding: 0;
    position: relative;
    margin: 0 auto;
    display: flex;
  }
  #ventanaControl {
    width: 100%;
    height: 50%;
    border: 1px solid white;
    margin: 0;
    padding: 0;
    position: relative;
    margin: 0 auto;
    display: flex;
    overflow-y: auto;
  }

  #interior-visor {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: #303030; */
  }

  /* Visor {
    position: relative;
    margin: 0;
    padding: 0;
    position: relative;
    width: 100%;
    align-items: center;
    justify-content: center;
    
  } */
  

</style>