<template>
  <v-main v-if="jugador" class="my-1">
    <v-row >
      <v-col class="tarjeta">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-title class="nombre_jugador">
              <v-row>
                <v-col cols="1">
                  <h4>{{ jugador.numero }}</h4>
                </v-col>
                <v-col cols="7">
                  <p>&nbsp&nbsp|&nbsp&nbsp {{ jugador.apodo }}</p>
                </v-col>
                <v-col cols="1" class="contenedor_tarjeta"><div :class="jugador.estadistica.tarjetas_amarillas >= 1 ? 'amarilla' : ''"></div></v-col>
                <v-col cols="1" class="contenedor_tarjeta"><div :class="jugador.estadistica.tarjetas_amarillas == 2 ? 'amarilla' : ''"></div></v-col>
                <v-col cols="1" class="contenedor_tarjeta"><div :class="jugador.estadistica.tarjeta_roja == 1 ? 'roja' : ''"></div></v-col>
              </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="mt-3">
              <v-row>
                <v-col cols="6">
                  <v-row class="caja_jugador">
                    <v-col cols="12" class="text-center">
                      <p>GOLES ({{ jugador.estadistica.goles }})</p>
                    </v-col>
                    <v-row class="pb-3">
                      <v-col cols="2" offset="2">
                        <v-btn size="x-small" color="success" @click="gol(1)">+</v-btn>
                      </v-col>
                      <v-col cols="2" offset="1">
                        <v-btn size="x-small" color="error" @click="gol(-1)">-</v-btn>
                      </v-col>
                      <v-col cols="2" offset="1">
                        <v-btn size="x-small" color="success">LIVE</v-btn>
                      </v-col>
                    </v-row>
                  </v-row>
                  <v-row class="caja_jugador">
                    <v-col cols="12" class="text-center">
                      <p>FALTAS ({{ jugador.estadistica.faltas }})</p>
                    </v-col>
                    <v-row class="pb-3">
                      <v-col cols="2" offset="2">
                        <v-btn size="x-small" color="success" @click="falta(1)">+</v-btn>
                      </v-col>
                      <v-col cols="2" offset="1">
                        <v-btn size="x-small" color="error" @click="falta(-1)">-</v-btn>
                      </v-col>
                      <v-col cols="2" offset="1">
                        <v-btn size="x-small" color="success">LIVE</v-btn>
                      </v-col>
                    </v-row>
                  </v-row>
                </v-col>
                <v-col cols="6">
                <v-row class="caja_jugador pb-2">
                  <v-col cols="12" class="text-center">
                    <p>TARJETAS</p>
                    <v-divider color="black my-1"></v-divider>
                  </v-col>
                  <v-row class="mb-1">
                    <v-col cols="12" class="ma-0 pa-0 text-center">
                      <p>AMARILLAS ({{ jugador.estadistica.tarjetas_amarillas }})</p>
                    </v-col>
                    <v-row>
                      <v-col cols="2" offset="2">
                        <v-btn size="x-small" color="success" @click="tarjetaAmarilla(1)">+</v-btn>
                      </v-col>
                      <v-col cols="2" offset="1">
                        <v-btn size="x-small" color="error" @click="tarjetaAmarilla(-1)">-</v-btn>
                      </v-col>
                      <v-col cols="2" offset="1">
                        <v-btn size="x-small" color="success">LIVE</v-btn>
                      </v-col>
                    </v-row>
                  </v-row>
                  <v-row>
                    <v-col cols="12" class="ma-0 pa-0 text-center">
                      <p>ROJAS ({{ jugador.estadistica.tarjeta_roja }})</p>
                    </v-col>
                    <v-row class="mb-2">
                      <v-col cols="2" offset="2">
                        <v-btn size="x-small" color="success"  @click="tarjetaRoja(1)">+</v-btn>
                      </v-col>
                      <v-col cols="2" offset="1">
                        <v-btn size="x-small" color="error"  @click="tarjetaRoja(-1)">-</v-btn>
                      </v-col>
                      <v-col cols="2" offset="1">
                        <v-btn size="x-small" color="success">LIVE</v-btn>
                      </v-col>
                    </v-row>
                  </v-row>
                </v-row>
              </v-col>
              <v-row class="ma-1 pa-2 caja_jugador">
                <v-col cols="12" class="text-center pa-0">
                  <p>DISPAROS A PUERTA ({{ jugador.estadistica.disparos_al_arco }} /{{ jugador.estadistica.disparos }})</p>
                  <v-btn size="x-small" color="success">LIVE</v-btn>
                </v-col>
                <v-row>

                  <v-col cols="6" class="text-center">
                    <p>DISPARO</p>
                    <v-row>
                      <v-col cols="2" offset="2">
                        <v-btn size="x-small" color="success" @click="disparo(1)">+</v-btn>
                      </v-col>
                      <v-col cols="2" offset="2">
                        <v-btn size="x-small" color="error" @click="disparo(-1)">-</v-btn>
                      </v-col>
                    </v-row>
                    
                  </v-col>
                  <v-col cols="6" class="text-center">
                    <p>A PUERTA</p>
                    <v-row>
                      <v-col cols="2" offset="2">
                        <v-btn size="x-small" color="success" @click="disparoAPuerta(1)">+</v-btn>
                      </v-col>
                      <v-col cols="2" offset="2">
                        <v-btn size="x-small" color="error" @click="disparoAPuerta(-1)">-</v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-row>
            </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-main>
</template>

<script setup>

import { useRoute } from 'vue-router';

import { usegFutbolStore } from "../../store/futbol"
import { toRef, toRefs } from 'vue';
import { watch } from 'vue';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';


const route = useRoute()

const id_partido = route.params.id

const futbolStore = usegFutbolStore()


const props = defineProps(["jugador", "id_jugador", "fondo"])

const {jugador} = toRefs(props)


const emit = defineEmits(["borrarJugador", "test"])


const gol = val => {
  jugador.value.estadistica.goles += val
  updateDB(jugador.value)
}

const tarjetaAmarilla = val => {
  jugador.value.estadistica.tarjetas_amarillas += val
  updateDB(jugador.value)
}
const tarjetaRoja = val => {
  jugador.value.estadistica.tarjeta_roja += val
  updateDB(jugador.value)
}

const falta = val => {
  jugador.value.estadistica.faltas += val
  updateDB(jugador.value)
}

const disparo = val => {
  jugador.value.estadistica.disparos += val
  updateDB(jugador.value)
}
const disparoAPuerta = val => {
  disparo(val)
  jugador.value.estadistica.disparos_al_arco += val
  updateDB(jugador.value)
}

const updateDB = (jugador) => {
  futbolStore.updateEstPartido(id_partido, jugador)
}

// watch(() => partidos, val => {
//   console.log("Jugador individual")
//   console.log(val)
//   jugador = ref(buscarJugador())
// },
// {deep: true})


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