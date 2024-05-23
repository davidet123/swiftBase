<template>
  <div id="retransmision">
    <v-row id="onair">
        <OnAir v-for="( titulo, index) in onair" :key="index" :titulo="titulo" :orden="index"/>
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
  import { useRouter } from 'vue-router'
  
  import VisorFlex from '@/components/visor/VisorFlex.vue'
  import OnAir from '@/components/retransmision/OnAir.vue'
  import Secciones from '@/components/retransmision/Secciones.vue'
  import Graficos from '@/components/retransmision/Graficos.vue'
  import ListadoRotulos from '@/components/retransmision/ListadoRotulos.vue'
  import Control from '@/components/retransmision/Control.vue'

  const router = useRouter()

  const swiftConnectionStore = useSwiftConnectionStore()

  const retransmisionStore = useRetransmisionStore()
  const { onair, secciones, listaGraficos, seccionActiva, listaRotulos, rotuloActivo } = storeToRefs(retransmisionStore)

  swiftConnectionStore.startConnection()
  
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
    const item = event.dataTransfer.getData('item')
    console.log(evento)

    const contenido = []

    for (let i = 1; i<=evento.lineasTexto; i++) {
      const temp = {}
      temp.nombre = `Linea${i}`
      temp.valor = null
      console.log(temp)
      contenido.push(temp)
      // contenido[`texto${i}`] = null
    }
    const rotulo = {
      id: `r${listaRotulos.value.length + 1}`,
      numero: `${listaRotulos.value.length + 1}`,
      titulo: evento.titulo,
      grafico: evento.id,
      seccion: seccionActiva.value,
      contenido,
      lineasTexto: evento.lineasTexto,
      desplegable: evento.desplegable,
      live: false
    }
    listaRotulos.value.push(rotulo)
  }

  const getEvento = item => {
    // console.log(item)
    evento = item
  }

  


</script>

<style scoped>

  #retransmision {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    

  }
  #seccion-media {
    width: 100%;
    height: 70%;
    margin: 0;
    padding: 0;
  }
  
  #onair, #seccionGraficos {
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

  #listado, #controles {
    width: 50%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: 1px solid white;
    position: relative;
    display: flex;
    flex-direction: column;
    
  }

  #visor, #ventanaControl {
    width: 100%;
    height: 50%;
    border: 1px solid white;
    margin: 0;
    padding: 0;
    position: relative;
    margin: 0 auto;
    display: flex;
  }

  #interior-visor {
    width: 100%;
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