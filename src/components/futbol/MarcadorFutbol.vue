<template>
  <v-row>
    <v-col cols="7">
      <v-row>
        <v-row class="text-center">
          <v-col cols="2" offset="0">
            <BotonSimple nombre="MARCADOR" @activar="activarGrafico"/>
          </v-col>
          <v-col cols="10" class=" mt-5 pt-5">
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
              <v-col cols="4">
                <v-row>
                  <v-col cols="1">
                    <p>{{ porcentajeLocal }}</p>
                  </v-col>
                  <v-col cols="8">
                    <p class="text-h2"><span :class="equipoEnPosesion == 'local' ? 'underline' : ''">{{ marcador.local }}</span> | <span :class="equipoEnPosesion == 'visitante' ? 'underline' : ''">{{ marcador.visitante }}</span></p>                
                  </v-col>
                  <v-col cols="1">
                    <p>{{ porcentajeVisitante }}</p>
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
      <v-row>
        <v-col cols="4">
          <v-row>
            <v-col cols="12" class="text-center">
              <p class="text-h1">{{ tiempoMarcador }}</p>
            </v-col>
            <v-col cols="12" class="text-center"><v-btn size="x-small" color="success" @click="iniciarTiempo()" :disabled="tiempoIniciado">START</v-btn>
            <v-btn size="x-small" color="success" :disabled="!tiempoIniciado" @click="pararTiempo()">STOP</v-btn>
            <v-btn size="x-small" color="success" :disabled="tiempoIniciado" @click="resetTiempo()">RESET</v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4">
          <v-row>
            <v-col cols="12" class="text-center">
              <h3>Tiempo añadido</h3>
            </v-col>
            <v-col cols="6" class="text-center mx-auto">
              <v-text-field class="text-center" v-model="añadido" label="tiempo añadido"></v-text-field>
            </v-col>
            <v-col cols="6" class="text-center">
              <p class="text-h2">{{ añadidoMarcador }}</p>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4">
          <v-row>
            <v-col cols="12" class="text-center">
              <h3>Parte en juego</h3>
            </v-col>
            <v-col cols="6" class="mx-auto">
              <v-text-field class="centered-input" v-model="parteEnJuego" label="parte"></v-text-field>
            </v-col>
          </v-row>
          <v-btn color="success" @click="cambioDePosesion()">CAMBIO POSESION</v-btn>
        </v-col>
      </v-row>

    </v-col>
    <v-col cols="5" class="contenedor-video">
      <v-row>
        <v-col class="text-center">
          <video id="myVideoId" width="620" height="349" autoplay muted playsinline/>
        </v-col>
      </v-row>
    </v-col>

  </v-row>
</template>

<script setup>
  import { ref, computed } from "vue"

  import { usegFutbolStore } from "../../store/futbol"
  import { useSwiftConnectionStore } from "../../store/swiftConnection"

  import BotonSimple from '@/components/simple/botonSimple.vue' 

  

  const futbolStore = usegFutbolStore()
  const swiftConnectionStore = useSwiftConnectionStore()
  swiftConnectionStore.startConnection()
  // console.log(swiftConnectionStore)
  // const { marcador } = storeToRefs(futbolStore)

  // const marcador = futbolStore.marcador
  const props = defineProps(["marcador", "tiempo"])
  // const tiempoTotal = futbolStore.tiempo
  const tiempoTotal = props.tiempo

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
  const tiempoJuego = ref(5) // tiempo en minutos

  const tiempoMarcador = ref('00:00')
  const añadidoMarcador = ref('00:00')

  const gol = (equipo, valor) => {
    props.marcador[equipo] += valor
    swiftConnectionStore.rtRemote.updateFields("MARCADOR::" + equipo.toUpperCase() + "TEXT","String", props.marcador[equipo])
  }

  const iniciarTiempo = () => {

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
      if(dif > parseInt(tiempoJuego.value) * 1000 + 5  && !añadidoIniciado) {
        inicio = Date.now()
        props.tiempo.añadidoPrimera = inicio
        añadidoIniciado = true
        dif = 2000
        swiftConnectionStore.rtRemote.playMethod("MARCADOR::suplOn")
      }
      if(!añadidoIniciado) {
        tiempoMarcador.value = (millisToMinutesAndSeconds(dif))
        swiftConnectionStore.rtRemote.updateFields("MARCADOR::TIEMPOTEXT","String", tiempoMarcador.value)
      } else {
        añadidoMarcador.value = (millisToMinutesAndSeconds(dif))
        swiftConnectionStore.rtRemote.updateFields("MARCADOR::SUPLTEXT","String", añadido.value)
        
      }
      // calcularPosesion(dif)

    }, 1000)
  }

  const pararTiempo = () => {
    clearInterval(temporizador)
    tiempoIniciado.value = false
  }

  const resetTiempo = () => {
    clearInterval(temporizador)
    props.tiempo.primeraParte = null
    props.tiempo.añadidoPrimera = null
    tiempoInicio = null
    tiempoIniciado.value = false
    añadidoIniciado = false
    inicioPosesion = null
    tiempoMarcador.value = (millisToMinutesAndSeconds(0))
    añadidoMarcador.value = (millisToMinutesAndSeconds(0))
    swiftConnectionStore.rtRemote.updateFields("MARCADOR::TIEMPOTEXT","String", tiempoMarcador.value)
    swiftConnectionStore.rtRemote.updateFields("MARCADOR::SUPLTEXT","String", añadidoMarcador.value)

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
    if (!payload.live) {
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
    if(inicioPosesion) {

      const finPosesion = Date.now()
      const duracionPosesion = finPosesion - inicioPosesion
      inicioPosesion = finPosesion
      if(equipoEnPosesion.value == 'local') {
        posesionLocalTotal.value += duracionPosesion
        equipoEnPosesion.value = 'visitante'
      } else if (equipoEnPosesion.value == 'visitante') {
        posesionVisitanteTotal.value += duracionPosesion
        equipoEnPosesion.value = 'local'
      }
      // console.log(millisToMinutesAndSeconds(posesionLocalTotal.value), millisToMinutesAndSeconds(posesionVisitanteTotal.value))
      porcentajeLocal.value = Math.round(posesionLocalTotal.value / (finPosesion - tiempoInicio) * 100) 
      porcentajeVisitante.value = Math.round(posesionVisitanteTotal.value / (finPosesion - tiempoInicio) * 100)
  
      // console.log(porcentajeLocal.toFixed(2), porcentajeVisitante.toFixed(2))

    }


  }
  document.addEventListener('keyup', e => {
    shortcut(e.key.toUpperCase())
    console.log(e.key.toUpperCase())
  })


  let marcadorIn = false

  const shortcut = key => {
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

</script>


<style scoped>
  .centered-input input {
      text-align: center
    }

  .underline {
    border-bottom: 2px solid white;
  }
  .contenedor-video {
    display: flex;
    align-items: center;
    justify-content: center;
    /* border: 2px solid white; */
    background-color: #303030;
  }
  video {
    margin: 0;
    padding: 0;
  }
  #myVideoId {
    border: 1px solid white;
  }
</style>