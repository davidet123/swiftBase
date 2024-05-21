<template>
  <div id="retransmision">
    <v-row id="onair">
        <OnAir />
        {{ onair }}
    </v-row>
    
    <v-row id="secciones">
      <v-col><h4>SECCIONES</h4></v-col>
    </v-row>
    <v-row class="ma-0 pa-0" id="seccion-media">
      <v-col id="listado">
        <h4>Listado</h4>
      </v-col>
      <v-col id="controles">
        <v-row id="visor" class="ma-0 pa-0">
          <div id="interior-visor" :style="fondoVisor">

            <VisorFlex />
          </div>
        </v-row>
        <v-row id="control" class="ma-0 pa-0">
          <v-col>
            <h4>Control</h4>
  
          </v-col>
        </v-row>
      </v-col>
  
    </v-row>
    <v-row id="graficos">
  
    </v-row>
  </div>


</template>

<script setup>
  import { computed, watch } from "vue"
  import { useRetransmisionStore } from "../../store/retransmision" 
  import { storeToRefs } from "pinia"
  import { useRouter } from 'vue-router'

  import VisorFlex from '@/components/visor/VisorFlex.vue'
  import OnAir from '@/components/retransmision/OnAir.vue'

  const router = useRouter()

  const retransmisionStore = useRetransmisionStore()
  const { onair } = storeToRefs(retransmisionStore)

  // const fondoVisor = () => {
  //   return 'background-color: #ff0000'
  // }

  const fondoVisor = computed(() => {
    return {
      'background-color': '#ff0000'
    }
  })

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
  
  #onair, #secciones, #graficos {
    width: 100%;
    height: 10%;
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

  #visor, #control {
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