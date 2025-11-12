<template>
  <v-row>
    <v-col cols="7">
      <v-row>
        <v-col cols="12" class="recuadro_gris">
          <v-row>
            <v-col cols="4" class="text-center"><p class="text-h2">{{ puntosLocal }}</p></v-col>
            <v-col cols="4" class="text-center"><p class="text-h4">{{ cuartoEnJuego }}</p></v-col>
            <v-col cols="4" class="text-center"><p class="text-h2">{{ puntosVisitante }}</p></v-col>
          </v-row>
          <v-row>
            <v-col cols="4" class="text-center"><h5>LOCAL</h5></v-col>
            <v-col cols="4" class="text-center"><h6>Periodo</h6></v-col>
            <v-col cols="4" class="text-center"><h5>VISITANT</h5></v-col>
          </v-row>
          <v-row>
            <v-col cols="4" class="text-center">
              <v-row>
                <v-col cols="12">
                  <p class="text-h4">4</p>
                </v-col>
                <v-col cols="12">
                  <h5>FALTES</h5>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="4" class="text-center">              
              <v-row >
                <v-col cols="3" v-for="index in 4" :key="index" class="my-0 py-0">
                  {{ marcador.tanteoLocal[cuarto[index -1]] }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3" v-for="index in 4" :key="index" class="my-0 py-0">
                  {{ marcador.tanteoVisitante[cuarto[index -1]] }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="text-center"><h6>Parcials</h6></v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-row>
                    <v-col cols="12">
                      <p class="text-h5">{{ formatGameClock(marcadorBasket.temporizador.gameClock) }}</p>
                      <!-- <p class="text-h5">{{ marcadorBasket.temporizador.gameClock }}</p> -->
                    </v-col>
                    <v-col cols="12">
                      <!-- <p class="text-h5">{{ marcadorBasket.temporizador.possessionClock }}</p> -->
                      <p class="text-h5">{{ formatPossessionClock(marcadorBasket.temporizador.possessionClock) }}</p>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="4"><v-btn size="small" color="success">START</v-btn></v-col>
                    <v-col cols="4"><v-btn size="small" color="error">STOP</v-btn></v-col>
                    <v-col cols="4"><v-btn size="small" color="success">RESET</v-btn></v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="4" class="text-center">
              <v-row>
                <v-col cols="12">
                  <p class="text-h4">7</p>
                </v-col>
                <v-col cols="12">
                  <h5>FALTES</h5>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      
      <div class="recuadro_gris">

        <v-row class="mt-4">
          <v-col cols="4" class="text-center">
            <v-row>
              <v-col cols=12>
                <v-btn size="x-small" color="orange" @click="canasta('tanteoLocal', 1)">+1</v-btn>
                <v-btn size="x-small" color="orange" @click="canasta('tanteoLocal', 2)">+2</v-btn>
                <v-btn size="x-small" color="orange" @click="canasta('tanteoLocal', 3)">+3</v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn size="x-small" color="error" @click="canasta('tanteoLocal', -1)">-1</v-btn>
                <v-btn size="x-small" color="error" @click="canasta('tanteoLocal', -2)">-2</v-btn>
                <v-btn size="x-small" color="error" @click="canasta('tanteoLocal', -3)">-3</v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4" class="text-center">
            <v-row>
              
              <v-col cols="12" class="ma-0 pa-0"><v-btn size="x-small" color="error" @click="resetMarcador()">RESET MARCADOR</v-btn></v-col>
            </v-row>
            
          </v-col>
          <v-col cols="4" class="text-center">
            <v-row>
              <v-col cols="12">
                <v-btn size="x-small" color="blue" @click="canasta('tanteoVisitante', 1)">+1</v-btn>
                <v-btn size="x-small" color="blue" @click="canasta('tanteoVisitante', 2)">+2</v-btn>
                <v-btn size="x-small" color="blue" @click="canasta('tanteoVisitante', 3)">+3</v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn size="x-small" color="error" @click="canasta('tanteoVisitante', -1)">-1</v-btn>
                <v-btn size="x-small" color="error" @click="canasta('tanteoVisitante', -2)">-2</v-btn>
                <v-btn size="x-small" color="error" @click="canasta('tanteoVisitante', -3)">-3</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="mb-4">
          <v-col cols="12" class="text-center mt-2 mb-0 pa-0">
            <p>Periodo</p>
          </v-col>
          <v-col cols="12" class="text-center ma-0 pa-0">
            <v-btn size="x-small" color="blue" @click="cambioPeriodo(1)" :disabled="cuartoEnJuego == 1">1</v-btn>
            <v-btn size="x-small" color="blue" @click="cambioPeriodo(2)" :disabled="cuartoEnJuego == 2">2</v-btn>
            <v-btn size="x-small" color="blue" @click="cambioPeriodo(3)" :disabled="cuartoEnJuego == 3">3</v-btn>
            <v-btn size="x-small" color="blue" @click="cambioPeriodo(4)" :disabled="cuartoEnJuego == 4">4</v-btn>

          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-row>

</template>

<script setup>

  import { useRoute, useRouter } from 'vue-router'
  import { useBasketStore } from "../../store/basket"
  import { storeToRefs } from 'pinia'
  import { computed, ref } from 'vue'

  const basketStore = useBasketStore()

  const { marcadorBasket } = storeToRefs(basketStore)

  
  const route = useRoute()
  const router = useRouter()
  
  const id = route.params.id
  
  // console.log(marcadorBasket.value)
  
  const marcador = computed(() => marcadorBasket.value)
  const cuartoEnJuego = computed(() => marcador.value.periodo)

  const cuarto  = ["primerCuarto", "segundoCuarto", "tercerCuarto", "cuartoCuarto"]

  const puntosLocal = computed(() => Object.values(marcador.value.tanteoLocal).reduce((a, b) => a + b, 0))
  const puntosVisitante = computed(() => Object.values(marcador.value.tanteoVisitante).reduce((a, b) => a + b, 0))

    

  const canasta = (equipo, val) => {
    // console.log(marcador.value[equipo][cuarto[cuartoEnJuego.value-1]])
    marcador.value[equipo][cuarto[cuartoEnJuego.value-1]] += val

    updateMarcador()
  }

  const cambioPeriodo = periodo => {
    marcador.value.periodo = periodo
    updateMarcador()
  }

  const resetMarcador = ()  => {
    const equipos = ["tanteoLocal", "tanteoVisitante"]

    equipos.forEach(equipo =>  {
      for (let i = 0; i <= 3; i++) {
        marcador.value[equipo][cuarto[i]] = 0
      }
    })
    marcador.value.periodo = 1
    updateMarcador()
  }

  const updateMarcador = () => {
  basketStore.updateMarcadorBasket(marcador.value)
  } 

  const formatGameClock = (gameClock) => {
    if (typeof gameClock !== 'string') return ''
    const m = gameClock.match(/^(\d{2}):(\d{2})\.(\d{2})$/)
    if (!m) return gameClock

    const mm = parseInt(m[1], 10)
    const ss = parseInt(m[2], 10)
    const dc = parseInt(m[3], 10)

    const totalSec = mm * 60 + ss + dc / 100

    if (totalSec >= 60) {
      // Mostrar minutos y segundos
      return `${m[1]}:${m[2]}`;
    }

    // Mostrar segundos con 1 decimal
    return `${ss}.${Math.ceil(dc / 10)}`
  }

  const formatPossessionClock = (possessionClock) => {
    if (typeof possessionClock !== 'string') return ''
    const m = possessionClock.match(/^(\d{2})\.(\d)$/)
    if (!m) return possessionClock

    const s = parseInt(m[1], 10)
    const d = parseInt(m[2], 10)
    const val = s + d / 10

    // < 5 s → 1 decimal
    if (val < 5) return `${s}.${d}`

    // ≥ 5 s → entero con CEIL para no “caer” antes de tiempo
    const shown = Math.ceil(val)
    return String(shown)
  }

</script>

<style scoped>
  .recuadro_gris {
      background-color: #303030;
      border-radius: 5px;
      border: 1px solid white;
    }

</style>