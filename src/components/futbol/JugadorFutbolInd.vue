<template>
  <span v-if="jugador" >
    <v-row >
      <v-col class="tarjeta my-0 pt-1" >
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
                      <p>GOLES ({{ totalGoles }})</p>
                    </v-col>
                    <v-row class="pb-3">
                      <v-col cols="2" offset="2">
                        <v-btn size="x-small" color="success" @click="gol(1)">+</v-btn>
                      </v-col>
                      <v-col cols="2" offset="1">
                        <v-btn size="x-small" color="error" @click="gol(-1)">-</v-btn>
                      </v-col>
                      <v-col cols="2" offset="1">
                        <v-btn size="x-small" :color="!liveBtn.goles ? 'success' : 'error'" @click="live('goles', jugador.apodo, jugador.numero, 'Goles', totalGoles)">LIVE</v-btn>
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
                        <v-btn size="x-small" :color="!liveBtn.faltas ? 'success' : 'error'" @click="live('faltas', jugador.apodo, jugador.numero, 'Faltes', jugador.estadistica.faltas)">LIVE</v-btn>
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
                        <v-btn size="x-small" :color="!liveBtn.tarjetas_amarillas ? 'success' : 'error'" @click="live('tarjetas_amarillas', jugador.apodo, jugador.numero, 'Targetes grogues', jugador.estadistica.tarjetas_amarillas)">LIVE</v-btn>
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
                        <v-btn size="x-small" :color="!liveBtn.tarjeta_roja ? 'success' : 'error'" @click="live('tarjeta_roja', jugador.apodo, jugador.numero, 'Targetes rojes', jugador.estadistica.tarjeta_roja)">LIVE</v-btn>
                      </v-col>
                    </v-row>
                  </v-row>
                </v-row>
              </v-col>
              <v-row class="ma-1 pa-2 caja_jugador">
                <v-col cols="12" class="text-center pa-0">
                  <p>DISPAROS A PUERTA ({{ jugador.estadistica.disparos_al_arco }} /{{ jugador.estadistica.disparos }})</p>
                  <v-btn size="x-small" :color="!liveBtn.disparos_al_arco ? 'success' : 'error'" @click="live('disparos_al_arco', jugador.apodo, jugador.numero, 'Disparos', jugador.estadistica.disparos)">LIVE</v-btn>
                </v-col>
                <v-row>

                  <v-col cols="6" class="text-center">
                    <p>DISPARO ({{ jugador.estadistica.disparos }})</p>
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
                    <p>A PUERTA ({{ jugador.estadistica.disparos_al_arco }})</p>
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
  </span>
</template>

<script setup>

import { useRoute } from 'vue-router';

import { usegFutbolStore } from "../../store/futbol"
import { useSwiftConnectionStore } from "../../store/swiftConnection"

import { toRefs, ref } from 'vue';
import { computed } from 'vue';

const swiftConnectionStore = useSwiftConnectionStore()


const route = useRoute()

const id_partido = route.params.id

const futbolStore = usegFutbolStore()

const liveBtn = ref({
  goles: false,
  faltas: false,
  tarjetas_amarillas: false,
  tarjeta_roja: false,
  disparos_al_arco: false

})


const props = defineProps(["jugador", "id_jugador", "fondo", "temporizador"])

const { jugador, temporizador } = toRefs(props)


const emit = defineEmits(["borrarJugador"])


const gol = val => {
  console.log(temporizador.value)
  if(val >= 0) {    
    jugador.value.estadistica.goles.push(Date.now() - temporizador.value.tiempo.primera) 
  } else {
    jugador.value.estadistica.goles.pop()
  }
  updateDB(jugador.value)
}

const totalGoles = computed(() => jugador.value.estadistica.goles.length)

const tarjetaAmarilla = val => {
  jugador.value.estadistica.tarjetas_amarillas += val
  // mostrarEstadistica(jugador.value.estadistica)
  updateDB(jugador.value)
}
const tarjetaRoja = val => {
  jugador.value.estadistica.tarjeta_roja += val
  updateDB(jugador.value)
}

const falta = val => {
  jugador.value.estadistica.faltas += val
  const tipo = "Faltes"
  console.log(jugador.value)
  mostrarEstadistica(jugador.value.apodo, jugador.value.numero, tipo, jugador.value.estadistica.faltas)
  updateDB(jugador.value)
}

const disparo = val => {
  jugador.value.estadistica.disparos += val
  const tipo = "Disparos"
  mostrarEstadistica(jugador.value.apodo, jugador.value.numero, tipo, jugador.value.estadistica.disparos)
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


// 'disparos_al_arco', jugador.apodo, jugador,numero, 'Disparos', jugador.estadistica.disparos

const live = (tipo, nombre, dorsal, tipoStr, valor) => {
  if(liveBtn.value[tipo] == false) {
    swiftConnectionStore.cueGraphic("EST_INDIVIDUAL")
    mostrarEstadistica(nombre, dorsal, tipoStr, valor)
    swiftConnectionStore.bringOn("EST_INDIVIDUAL")
    // bringOn()
  } else if(liveBtn.value[tipo] == true) {
    swiftConnectionStore.takeOff("EST_INDIVIDUAL")
    // takeOff()
  }
  liveBtn.value[tipo] = !liveBtn.value[tipo]
}

const bringOn = () => {
    swiftConnectionStore.rtRemote.playGraphic("EST_INDIVIDUAL")
    swiftConnectionStore.rtRemote.playMethod("EST_INDIVIDUAL::bringOn")
  }
const takeOff = () => {
  swiftConnectionStore.rtRemote.playGraphic("EST_INDIVIDUAL")
  swiftConnectionStore.rtRemote.playMethod("EST_INDIVIDUAL::takeOff")
}

const mostrarEstadistica = (nombre, dorsal, tipo, valor)=> {
  swiftConnectionStore.rtRemote.updateFields("EST_INDIVIDUAL::NOMBRE_JUGADORTEXT","String", nombre)
  swiftConnectionStore.rtRemote.updateFields("EST_INDIVIDUAL::NUMEROTEXT","String", dorsal)
  swiftConnectionStore.rtRemote.updateFields("EST_INDIVIDUAL::TIPO_ESTADISTICATEXT","String", tipo)
  swiftConnectionStore.rtRemote.updateFields("EST_INDIVIDUAL::VALOR_ESTADISTICATEXT","String", valor)
  // if(swiftConnectionStore.rtRemote) {
  
  //   console.log(nombre, dorsal, tipo, valor)

  // }
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