<template>
  <div v-if="!marcador" class="text-center" style="margin-top:200px;">
    <v-progress-circular
      indeterminate
      color="primary"
      size="50"
    ></v-progress-circular>
  </div>
  <div v-if="marcador">

    <v-row>
      <v-col cols="7">
        <v-row class="px-2">
          <v-row class="text-center pa-0 mb-3" justify="center" align="center">
            <v-col cols="3" offset="0" class="contenedor-video ma-0">
              <BotonLive nombre="MARCADOR" @activar="activarGrafico"/>
            </v-col>
            <v-col cols="9" class=" mt-5 pt-5 recuadro_gris mb-1">
              <v-row justify="center" align="center">
                <v-col cols="2">
                  <v-row>
                    <v-col cols="12">
                      <h4>GOL LOCAL</h4>
                    </v-col>
                    <v-col cols="6">
                      <v-btn color="success" size="x-small" @click="gol('local', 1)">+</v-btn>
                    </v-col>
                    <v-col cols="6">
                      <v-btn color="error" size="x-small" @click="gol('local', -1)">-</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="6">
                  <v-row>
                    <v-col cols="2" class="text-center">
                      <p>{{ posesion_local }}</p>
                    </v-col>
                    <v-col cols="8">
                      <p class="text-h2"><span :class="equipo_en_posesion == 'local' ? 'underline' : ''">{{ marcador.goles.local }}</span> | <span :class="equipo_en_posesion == 'visitante' ? 'underline' : ''">{{ marcador.goles.visitante }}</span></p>                
                    </v-col>
                    <v-col cols="2">
                      <p>{{ posesion_visitante }}</p>
                    </v-col>
                  </v-row>
                  <!-- <h1>{{ marcador.local }} | {{ marcador.visitante }}</h1> -->
                </v-col>
                <v-col cols="2">
                  <v-row>
                    <v-col cols="12">
                      <h4>GOL VISITANTE</h4>
                    </v-col>
                    <v-col cols="6">
                      <v-btn color="success" size="x-small" @click="gol('visitante', 1)">+</v-btn>
                    </v-col>
                    <v-col cols="6">
                      <v-btn color="error" size="x-small" @click="gol('visitante', -1)">-</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-row>
        <v-row class="mx-2">
          <v-col cols="4" class="recuadro_gris">
            <v-row class="py-2">
              <v-col cols="12" class="text-center ma-0 pa-0">
                <h3>Tiempo de juego</h3>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="text-center">
                <p class="text-h2">{{ tiempoMarcador }}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="text-center">
                <v-btn size="x-small" color="success" @click="iniciarTiempo()" :disabled="inicio_tiempo">START</v-btn>
                <v-btn size="x-small" color="success" :disabled="!inicio_tiempo" @click="pararTiempo()">STOP</v-btn>
                <v-btn size="x-small" color="success" :disabled="inicio_tiempo" @click="resetTiempo()">RESET</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class=text-center>
                <v-btn size="x-small" color="success" :disabled="!inicio_tiempo" @click="addTiempo(1)">+</v-btn>
                <v-btn size="x-small" color="success" :disabled="!inicio_tiempo" @click="addTiempo(-1)">-</v-btn>

              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4" class="recuadro_gris">
            <v-row class="py-2">
              <v-col cols="12" class="text-center ma-0 pa-0">
                <h3>Tiempo añadido</h3>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="text-center">
                <p class="text-h2">{{ añadidoMarcador }}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" offset="3" class="text-center mx-auto ma-0 pa-0">
                <v-text-field @focus="setFocus(true)" @blur="setFocus(false)" class="text-center" v-model="añadido" label="tiempo añadido"></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <v-row class="recuadro_gris mb-1">
              <v-col cols="12" class="text-center">
                <h3>Parte en juego</h3>
              </v-col>
              <v-col cols="6" class="mx-auto">
                <v-text-field @focus="setFocus(true)" @blur="setFocus(false)" class="centered-input" v-model="parte_en_juego" label="parte"  :disabled="inicio_tiempo"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="text-center recuadro">
                <v-btn color="success" @click="cambioDePosesion()">CAMBIO POSESION</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
  
      </v-col>
      <v-col cols="5" class="recuadro_gris">
        <v-row>
          <v-col class="text-center">
            <!-- <video id="myVideoId" width="620" height="349" autoplay muted playsinline/> -->
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
    </v-row>
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  import { ref, computed } from "vue"

  import { usegFutbolStore } from "../../store/futbol"
  import { useSwiftConnectionStore } from "../../store/swiftConnection"

  import BotonLive from '@/components/simple/botonLive.vue' 
  import { toRefs } from "vue"
  import { storeToRefs } from 'pinia';
  import { watch } from 'vue';

  

  const futbolStore = usegFutbolStore()
  const swiftConnectionStore = useSwiftConnectionStore()
  
  const props = defineProps(["marcador", "tiempo"])
  
  const { marcador, tiempo } = toRefs( props )

  const route = useRoute()

  const id = route.params.id



  // const marcador = computed(() => marcadores.value.find(marcador => {
  //   return marcador.id_partido === id
  // }))

  const emit = defineEmits(["updateDB"])

  const edit = ref(false)

  const setFocus = val => {
    edit.value = val
  }

  let live = ref(false)

  const tiempoTotal = tiempo.value

  let temporizador
  let tiempoInicio
  let temporizadorAñadido
  let tiempoAñadido
  let tiempoIniciado = ref(false)
  let añadidoIniciado = false
  let parteEnJuego = ref(1)

  let posesionLocalTotal = ref(null)
  let posesionVisitanteTotal = ref(null)

  let porcentajeLocal = ref('0%')
  let porcentajeVisitante = ref('0%')

  let equipoEnPosesion = ref("local")

  let inicioPosesion = null


  const añadido = ref(2) // tiempo en minutos
  const tiempoJuego = ref(1) // tiempo en minutos

  // DESDE OBJETO MARCADOR

  let inicio_tiempo = ref(marcador.value.temporizador.inicio_tiempo)
  let inicio_posesion = null
  const equipo_en_posesion = ref(marcador.value.temporizador.posesion.equipo_en_posesion)
  const posesion_local = ref(marcador.value.temporizador.posesion.local)
  const posesion_visitante = ref(marcador.value.temporizador.posesion.visitante)

  const tiempo_primera = ref(marcador.value.temporizador.tiempo.primera)
  const tiempo_segunda = ref(marcador.value.temporizador.tiempo.segunda)

  const tiempo_de_inicio = ref(marcador.value.temporizador.tiempo)

  const parte_en_juego = ref(marcador.value.temporizador.parte_en_juego)
  const parte = (val) => {
    const strings = ['primera', 'segunda', 'primera_prorroga', 'segunda_prorroga']
    return strings[val-1]
  }
  const duracion_partes = [90, 90, 15, 15]
  const duracion = computed(() => (duracion_partes[parte_en_juego.value - 1]) * 1000 * 60)
  // const duracion = computed(() => (duracion_partes[parte_en_juego.value - 1]))

  // const tiempodeinicio = computed(() => marcador.value.temporizador[parte(parte_en_juego.value)])
  


  

  const tiempoMarcador = ref('00:00')
  const añadidoMarcador = ref('00:00')

  const gol = (equipo, valor) => {
    marcador.value.goles[equipo] += valor
    // swiftConnectionStore.rtRemote.updateFields("MARCADOR::" + equipo.toUpperCase() + "TEXT","String", marcador.value[equipo])
    actualizarMarcador()
  }

  const addTiempo = val => {
    tiempo_de_inicio.value[parte(parte_en_juego.value)] -= (val*1000)
  }

  const iniciarTiempo = () => {
    if(!tiempo_de_inicio.value[parte(parte_en_juego.value)]) {
      tiempo_de_inicio.value[parte(parte_en_juego.value)] = Date.now()
    }
    
    inicio_posesion = tiempo_de_inicio.value[parte(parte_en_juego.value)]
    // console.log(marcador.value.temporizador.inicio_tiempo)
    // marcador.value.temporizador.inicio_tiempo = true
    inicio_tiempo.value = true
    // console.log(marcador.value.temporizador.inicio_tiempo)

    // let inicio = tiempo_de_inicio.value[parte(parte_en_juego.value)]
    
    temporizador = setInterval(() => {
      const ahora = Date.now()
      let dif = ahora - tiempo_de_inicio.value[parte(parte_en_juego.value)]
      console.log(dif, duracion.value)
      if(dif > duracion.value  && !añadidoIniciado) {
        tiempo_de_inicio.value[parte(parte_en_juego.value)] = Date.now()
        props.tiempo.añadidoPrimera = tiempo_de_inicio.value[parte(parte_en_juego.value)]
        añadidoIniciado = true
        dif = 2000
        // swiftConnectionStore.rtRemote.playMethod("MARCADOR::suplOn")
      }
      if(!añadidoIniciado) {
        tiempoMarcador.value = (millisToMinutesAndSeconds(dif))
        // swiftConnectionStore.rtRemote.updateFields("MARCADOR::TIEMPOTEXT","String", tiempoMarcador.value)
      } else {
        añadidoMarcador.value = (millisToMinutesAndSeconds(dif))
        // swiftConnectionStore.rtRemote.updateFields("MARCADOR::SUPLTEXT","String", añadido.value)
        
      }
      // emit("updateDB", estTotales.value)
      // calcularPosesion(dif)
      

    }, 1000)
    marcador.value.temporizador.inicio_tiempo = inicio_tiempo.value
    // console.log(marcador.value)
    actualizarMarcador()
  }
  /* const iniciarTiempo = () => {
    console.log(tiempo_de_inicio.value)
    console.log(tiempo_de_inicio.value[parte(parte_en_juego.value)])
    inicio_tiempo.value = true
    if(!tiempoInicio) {
      tiempoInicio = Date.now()
    }
    props.tiempo.primeraParte = tiempoInicio
    inicioPosesion = tiempoInicio

    tiempoIniciado.value = true
    let inicio = tiempoTotal.primeraParte
    
    temporizador = setInterval(() => {
      const ahora = Date.now()
      let dif = ahora - inicio
      if(dif > parseInt(tiempoJuego.value) * 1000 * 60 + 5  && !añadidoIniciado) {
        inicio = Date.now()
        props.tiempo.añadidoPrimera = inicio
        añadidoIniciado = true
        dif = 2000
        // swiftConnectionStore.rtRemote.playMethod("MARCADOR::suplOn")
      }
      if(!añadidoIniciado) {
        tiempoMarcador.value = (millisToMinutesAndSeconds(dif))
        // swiftConnectionStore.rtRemote.updateFields("MARCADOR::TIEMPOTEXT","String", tiempoMarcador.value)
      } else {
        añadidoMarcador.value = (millisToMinutesAndSeconds(dif))
        // swiftConnectionStore.rtRemote.updateFields("MARCADOR::SUPLTEXT","String", añadido.value)
        
      }
      // emit("updateDB", estTotales.value)
      // calcularPosesion(dif)

    }, 1000)
  } */

  const pararTiempo = () => {
    clearInterval(temporizador)
    inicio_tiempo.value = false
    tiempoIniciado.value = false
  }

  const resetTiempo = () => {
    clearInterval(temporizador)
    // inicio_tiempo.value = false
    marcador.value.temporizador.inicio_tiempo = false
    
    for (let i = 1; i <=4 ; i ++) {
      console.log(parte(i))
      tiempo_de_inicio.value[parte(i)] = null

    }
    marcador.value.temporizador.posesion.equipo_en_posesion = 'local'
    marcador.value.temporizador.posesion.local = '0%'
    marcador.value.temporizador.posesion.visitante = '0%'
    // props.tiempo.primeraParte = null
    // props.tiempo.añadidoPrimera = null
    tiempoInicio = null
    tiempoIniciado.value = false
    añadidoIniciado = false
    inicioPosesion = null
    tiempoMarcador.value = (millisToMinutesAndSeconds(0))
    añadidoMarcador.value = (millisToMinutesAndSeconds(0))
    // swiftConnectionStore.rtRemote.updateFields("MARCADOR::TIEMPOTEXT","String", tiempoMarcador.value)
    // swiftConnectionStore.rtRemote.updateFields("MARCADOR::SUPLTEXT","String", añadidoMarcador.value)
    console.log(marcador.value)
    actualizarMarcador()

  }

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    });
    var seconds = ((millis % 60000) / 1000).toFixed(0).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    });
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
  const activarGrafico = payload => {
    if (!live.value) {
      bringOn(payload.nombre)
    } else {
      takeOff(payload.nombre)
    }
  }
  const bringOn = (metodo) => {
    swiftConnectionStore.rtRemote.playGraphic(metodo)
    swiftConnectionStore.rtRemote.playMethod(metodo + "::bringOn")
  }
    const takeOff = (metodo) => {
      swiftConnectionStore.rtRemote.playGraphic(metodo)
      swiftConnectionStore.rtRemote.playMethod(metodo + "::takeOff")
    }



  const cambioDePosesion = () => {
    if(inicio_tiempo.value) {
        const finPosesion = Date.now()
        
        const duracionPosesion = finPosesion - inicio_posesion
        inicio_posesion = finPosesion
        if(equipo_en_posesion.value == 'local') {
          posesionLocalTotal.value += duracionPosesion
          equipo_en_posesion.value = 'visitante'
        } else if (equipo_en_posesion.value == 'visitante') {
          posesionVisitanteTotal.value += duracionPosesion
          equipo_en_posesion.value = 'local'
        }
        // console.log(millisToMinutesAndSeconds(posesionLocalTotal.value), millisToMinutesAndSeconds(posesionVisitanteTotal.value))
        posesion_local.value = Math.round(posesionLocalTotal.value / (finPosesion - tiempo_de_inicio.value[parte(parte_en_juego.value)]) * 100) + "%"
        posesion_visitante.value = Math.round(posesionVisitanteTotal.value / (finPosesion - tiempo_de_inicio.value[parte(parte_en_juego.value)]) * 100) + "%"
  
        // emit("updateDB", estTotales.value)
        marcador.value.temporizador.posesion.equipo_en_posesion = equipo_en_posesion.value
        marcador.value.temporizador.posesion.local = posesion_local.value
        marcador.value.temporizador.posesion.visitante = posesion_visitante.value
        // console.log(marcador.value)
        actualizarMarcador()

     

    }


  }
  document.addEventListener('keyup', e => {
    shortcut(e.key.toUpperCase())
    // console.log(e.key.toUpperCase())
  })

  const estTotales = computed(() => {
    return {
      posesion_local: porcentajeLocal.value,
      posesion_visitante: porcentajeVisitante.value
    }
  })


  let marcadorIn = false

  const shortcut = key => {
    if(!edit.value) {
      switch(key) {
        case "A":
          if(!marcadorIn) {
            console.log(key)
            bringOn("MARCADOR")
            marcadorIn = !marcadorIn
            console.log(marcadorIn)
          } else if (marcadorIn) {
            takeOff("MARCADOR")
            marcadorIn = !marcadorIn
          }
          break
        case "S": 
          iniciarTiempo()
          break;
        case "D": 
          pararTiempo()
          break;
        case "Q": 
          resetTiempo()
          break;
        case " ":
          cambioDePosesion()
          break
          
        default:
          break
      }

    }
  }
  const actualizarMarcador = () => {
    futbolStore.updateMarcadorDB(marcador.value.id_marcador, marcador.value)
  }
  
  watch(() => parte_en_juego.value, val => {
    tiempoMarcador.value = "00:00"
  })

</script>


<style scoped>
  .centered-input input {
      text-align: center
    }

  .underline {
    border-bottom: 2px solid white;
  }
  .recuadro_gris {
    background-color: #303030;
    border-radius: 5px;
    border: 1px solid white;
  }
  .contenedor-video {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* border: 2px solid white; */
    background-color: #303030;
    border-radius: 5px;
  }

  .recuadro {
    margin: 0 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* border: 2px solid white; */
    background-color: #d4d4d4;
    border-radius: 5px;
  }
  video {
    margin: 0;
    padding: 0;
  }
  #myVideoId {
    border: 1px solid white;
  }
</style>