<template>
  <span>
    <v-row >
      <v-col class="tarjeta my-0 pt-1" >
        <v-card>
          <v-card-title class="ma-0 pa-0">
            <v-row class="ml-1 pr-6">
              <v-col cols="3">
                <h6>{{ jugador.dorsal }} - {{ jugador.nombre }} {{ jugador.apellido }} (GK)</h6>
              </v-col>
              
            </v-row>
          </v-card-title>
          <v-card-text class="ma-0">
              <v-row>
                <v-col cols="12">
                <v-row>
                  <v-col cols="12" class="text-center">
                    <h6>PARADAS ({{ jugador.estadistica.paradas }})</h6>
                  </v-col>
                  <v-row class="pb-3">
                    <v-col cols="2" offset="3">
                      <v-btn size="x-small" color="success" @click="parada(1)">+</v-btn>
                    </v-col>
                    <v-col cols="2" >
                      <v-btn size="x-small" color="error" @click="parada(-1)">-</v-btn>
                    </v-col>
                    <v-col cols="2">
                      <v-btn size="x-small" :color="!liveBtn.paradas ? 'success' : 'error'" @click="liveParadas('paradas', jugador)">LIVE</v-btn>
                    </v-col>
                  </v-row>
                </v-row>
              </v-col>
              </v-row>
        
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </span>
</template>

<script setup>

  import { ref, toRefs } from 'vue'
  import { useBalonmanoStore } from "../../store/balonmano"
  import { storeToRefs } from 'pinia'

  

  const props = defineProps(["jugador", "equipo"])

  const { jugador, equipo } = toRefs(props)

  
  const balonmanoStore = useBalonmanoStore()
  
  
  const { partido } = storeToRefs(balonmanoStore)


  const parada = val => {
    jugador.value.estadistica.paradas += val
    partido.value[equipo.value].estadistica_equipo.paradas += val
    balonmanoStore.guardarPartido()
  }

  // }

  const liveBtn = ref({
    paradas: false

  })

  const liveParadas = (tipo, jugador) => {
    balonmanoStore.mostrarLiveParadas(jugador, equipo.value, partido.value, liveBtn.value[tipo])
    liveBtn.value[tipo] = !liveBtn.value[tipo]
  }


</script>

<style scoped>
  .borde_blanco {
    border: 1px solid white
  }
  p {
    font-size: 11px
  }

  .panel {
    height:30px ;
  }

  .nombre_jugador {
    color: white;
    background-color: #303030;
  }

  .caja_jugador {
    /* margin: 10px; */
    border: 1px solid black;
  }
  .contenedor_tarjeta {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .amarilla {
    width: 50%;
    height: 70%;
    background-color: yellow;
  }
  .roja {
    width: 50%;
    height: 70%;
    background-color: red;
  }
  


</style>