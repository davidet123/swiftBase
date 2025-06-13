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
              @activarCuentaAtras="activarCuentaAtras"
            />
  
          </v-col>
        </v-row>
      </v-col>
  
    </v-row>
    <v-row id="seccionGraficos" class="relative">
      <v-btn 
        icon
        size="x-small"
        class="nav-arrow left-arrow"
        @click="scrollGraficos('left')"
        :disabled="!canScrollLeft"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      
      <div id="graficos-container" ref="graficosContainer">
        <Graficos 
          @evento="getEvento"
          v-for="(grafico, index) in listaGraficos" 
          :key="index" 
          :grafico="grafico" 
          :orden="index"
        />
      </div>
      
      <v-btn 
        icon
        size="x-small"
        class="nav-arrow right-arrow"
        @click="scrollGraficos('right')"
        :disabled="!canScrollRight"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-row>
    <!-- <v-row id="seccionGraficos">
      <Graficos 
        @evento="getEvento"
        class="graficoSeleccionado" v-for="(grafico, index) in listaGraficos" 
        :key="index" 
        :grafico="grafico" 
        :orden="index"
      />
      
  
    </v-row> -->
  </div>


</template>

<script setup>
  import { computed, onBeforeUnmount, onMounted, watch, ref, nextTick } from "vue"
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
  import { generarId } from "@/composables/idGenerator"


  const swiftConnectionStore = useSwiftConnectionStore()

  const retransmisionStore = useRetransmisionStore()
  const { onAir, secciones, listaGraficos, seccionActiva, listaRotulos, rotuloActivo, retransmisionActiva, dragGrafico, guardado } = storeToRefs(retransmisionStore)

  swiftConnectionStore.startConnection()
  retransmisionStore.cargarRetransmisiones()

  if(!retransmisionActiva.value) retransmisionActiva.value = JSON.parse(localStorage.getItem('retransmisionActiva'))
  retransmisionStore.cargarRetransmisiones()
  retransmisionStore.cargarRetransmision(retransmisionActiva.value)

  const graficosContainer = ref(null);
  const canScrollLeft = ref(false);
  const canScrollRight = ref(false);

  const checkScroll = () => {
    if (graficosContainer.value) {
      const { scrollLeft, scrollWidth, clientWidth } = graficosContainer.value;
      canScrollLeft.value = scrollLeft > 0;
      canScrollRight.value = scrollLeft < scrollWidth - clientWidth;
    }
  };

  const scrollGraficos = (direction) => {
    if (!graficosContainer.value) return;
    
    const container = graficosContainer.value;
    const scrollAmount = 200; // Ajusta este valor según necesites
    
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
    
    // Usamos timeout para esperar a que termine la animación
    setTimeout(checkScroll, 300);
  };



  
  const seccionesOrdenadas = computed(() => secciones.value.sort((a,b) => (a.orden > b.orden) ? 1 : ((b.orden > a.orden) ? -1 : 0)))
  
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

    const nuevaId = generarId()

    console.log(evento)

    const rotulo = {
      id: `r${nuevaId}`,
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
      numeroDesplegable: null,
      crawl: evento.crawl,
      vumetro: evento.vumetro
      // graficoSwift: evento.graficoSwift

    }
    listaRotulos.value.push(rotulo)
    retransmisionStore.setGuardado(false)
    retransmisionStore.setDragGrafico(false)
    // console.log(listaRotulos.value)
    // console.log(evento)
  }

  const getNuevaId = () => {
    const temp = `r${listaRotulos.value.length + 1}`
    const rotuloValido = listaRotulos.value.find(el => el.id === temp)
    console.log(rotuloValido)
  }

  const getEvento = item => {
    evento = item
    // console.log(evento)
  }

  const activarCuentaAtras = nombreGrafico => {
    swiftConnectionStore.customMetodo(nombreGrafico, 'iniciarCuentaAtras')
  }

  watch(() => retransmisionActiva.value, val => {
    // console.log(val)
    e.preventDefault()
    e.returnValue = ''
  })

  const handleBeforeUnload = (event) => {
    if (!guardado.value) {
      event.preventDefault()
      event.returnValue = '' // Necesario para activar la advertencia
    }
  }

  // Registrar el evento al montar el componente
  onMounted(() => {
    checkScroll();
   window.addEventListener('resize', checkScroll);
    window.addEventListener('beforeunload', handleBeforeUnload)
  })

  // Limpiar el evento al desmontar el componente
  onBeforeUnmount(() => {
    window.removeEventListener('resize', checkScroll);
    window.removeEventListener('beforeunload', handleBeforeUnload)
  })

  watch(() => listaGraficos.value, () => {
    nextTick(() => {
      checkScroll();
    });
  }, { deep: true });

  


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
  
  #onAir {
    width: 100%;
    height: 12.5%;
    border: 1px solid white;
    margin: 0;
    padding: 0;
    position: relative;
    align-items: start;
  }
  #seccionGraficos {
    margin: 0;
    width: 100%;
    height: 12.5%;
    display: flex;
    align-items: center;
    position: relative;
    padding: 0 40px; /* Espacio para las flechas */
  }

  #graficos-container {
    display: flex;
    overflow: hidden;
    width: 100%;
    gap: 8px;
    scroll-behavior: smooth;
  }
  .nav-arrow {
    position: absolute;
    z-index: 2;
    background: rgba(255, 255, 255, 0.5);
  }
  .left-arrow {
    left: 0;
  }

  .right-arrow {
    right: 0;
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