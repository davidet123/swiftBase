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
              <BotonLive nombre="MARCADOR" @activar="activarGrafico" :rotulo_cargado="rotulo_cargado_individual"/>
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
              <v-col cols="6" offset="3" class="text-center mx-auto ma-0 pa-0">
                <v-text-field @focus="setFocus(true)" @blur="setFocus(false)" class="text-center" v-model="añadido" label="tiempo añadido"></v-text-field>
              </v-col>
            </v-row>
            <v-row class="ma-0 pa-0">
              <v-col cols="12" class="text-center ma-0 pa-0">
                <h3>Parte en juego</h3>
              </v-col>
              <v-col cols="6" class="mx-auto">
                <v-text-field @focus="setFocus(true)" @blur="setFocus(false)" class="centered-input" v-model="parte_en_juego" label="parte"  :disabled="inicio_tiempo"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="text-center">
                <BotonLive nombre="AÑADIDO" @activar="activarAñadido" /> 
              </v-col>
            </v-row>
            
          </v-col>
          <v-col cols="4">
            <v-row class="recuadro">
              <v-col cols="12" class="text-center">
                <v-btn color="success" @click="cambioDePosesion()">CAMBIO POSESION</v-btn>
              </v-col>
              <v-col cols="12" class="text-center">
                <v-btn color="success" @click="resetPosesion()">RESET POSESION</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
  
      </v-col>
      <v-col cols="5" class="recuadro_gris" v-if="swiftConnectionStore.videoStream">
        <v-row>
          <v-col class="text-center">
            <video id="myVideoId" width="620" height="349" autoplay muted playsinline/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- <v-row>
      {{ wsMarcador }}
    </v-row> -->
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  import { ref, computed } from "vue"

  import { usegFutbolStore } from "../../store/futbol"
  import { useSwiftConnectionStore } from "../../store/swiftConnection"
  import { useFutbolWebsocketStore } from "../../store/futbolWebsocket"

  import BotonLive from '@/components/simple/botonLive.vue' 
  import { toRefs } from "vue"
  import { storeToRefs } from 'pinia';
  import { watch } from 'vue';

  import { useRotulosStore } from "../../store/rotulos" 
  

  const futbolStore = usegFutbolStore()
  const futbolWebsocket = useFutbolWebsocketStore()
  const swiftConnectionStore = useSwiftConnectionStore()
  const rotulosStore = useRotulosStore()
  
  const props = defineProps(["marcador", "tiempo", "equipos"])
  
  const { marcador, tiempo, equipos } = toRefs( props )

  const { rotulo_cargado } = storeToRefs(rotulosStore)
  const { minutosPartido } = storeToRefs(futbolStore)
  const { wsMarcador } = storeToRefs(futbolWebsocket)
  
  const rotulo_cargado_individual = computed(() => rotulo_cargado.value.find(rotulo => rotulo.tipo === "MARCADOR"))
  // console.log(rotulo_cargado_individual.value)

  const route = useRoute()

  const id = route.params.id
  
  swiftConnectionStore.startConnection()
  swiftConnectionStore.startVideo()

  const emit = defineEmits(["updateDB"])

  const edit = ref(false)

  const setFocus = val => {
    edit.value = val
  }

  let live = ref(false)

  // const tiempoPartido = swiftConnectionStore.getTiempoPartido
  // console.log(tiempoPartido)

  const tiempoTotal = tiempo.value

  let temporizador
  // let tiempoInicio
  // let temporizadorAñadido
  // let tiempoAñadido
  let tiempoIniciado = ref(false)
  let añadidoIniciado = false
  // let parteEnJuego = ref(1)

  // let posesionLocalTotal = ref(null)
  // let posesionVisitanteTotal = ref(null)

  let porcentajeLocal = ref('0%')
  let porcentajeVisitante = ref('0%')

  // let equipoEnPosesion = ref("local")

  // let inicioPosesion = null

  let tiempoEnviado = false // Para enviar el tiempo al empezar el crono


  const añadido = ref(2) // tiempo en minutos
  // const tiempoJuego = ref(1) // tiempo en minutos

  // DESDE OBJETO MARCADOR

  let inicio_tiempo = ref(marcador.value.temporizador.inicio_tiempo)
  let inicio_posesion = null
  const equipo_en_posesion = ref(marcador.value.temporizador.posesion.equipo_en_posesion)
  // const posesion_local = ref(marcador.value.temporizador.posesion.local)
  // const posesion_visitante = ref(marcador.value.temporizador.posesion.visitante)

  const posesion_local = computed(() => {
    const posesionTotal = marcador.value.temporizador.posesion.local + marcador.value.temporizador.posesion.visitante
    if (posesionTotal == 0) return "0%"
    return Math.round(marcador.value.temporizador.posesion.local / posesionTotal * 100) + " %"
  })
  const posesion_visitante = computed(() => {
    const posesionTotal = marcador.value.temporizador.posesion.local + marcador.value.temporizador.posesion.visitante
    if (posesionTotal == 0) return "0%"
    return Math.round(marcador.value.temporizador.posesion.visitante / posesionTotal * 100) + " %"
  })

  const tiempo_primera = ref(marcador.value.temporizador.tiempo.primera)
  const tiempo_segunda = ref(marcador.value.temporizador.tiempo.segunda)

  const tiempo_de_inicio = ref(marcador.value.temporizador.tiempo)

  const parte_en_juego = ref(marcador.value.temporizador.parte_en_juego)
  const parte = (val) => {
    const strings = ['primera', 'segunda', 'primera_prorroga', 'segunda_prorroga']
    return strings[val-1]
  }
  const duracion_partes = [45, 45, 15, 15]
  const duracion = computed(() => (duracion_partes[parte_en_juego.value - 1]) * 1000 * 60)
  // const duracion = computed(() => (duracion_partes[parte_en_juego.value - 1]))

  // const tiempodeinicio = computed(() => marcador.value.temporizador[parte(parte_en_juego.value)])
  

  let tiempoActual = ref(null)
  const tiempoMarcador = computed(() => {
    if(!tiempoActual.value) {
      tiempoActual.value = marcador.value.temporizador.tiempo[parte(parte_en_juego.value)]
    }
    const minutos = Math.floor(tiempoActual.value / 60).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
    const segundos = (tiempoActual.value - minutos * 60).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
    return `${minutos}:${segundos}`
  })

  const añadidoMarcador = ref('00:00')

 

  const gol = (equipo, valor) => {
    marcador.value.goles[equipo] += valor
    swiftConnectionStore.rtRemote.updateFields("MARCADOR::" + equipo.toUpperCase() + "TEXT","String", marcador.value.goles[equipo])
    actualizarMarcador()
  }

  const addTiempo = val => {
    tiempoActual.value += val
    swiftConnectionStore.stopClock('MARCADOR')
    swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Hour", 0)     
    swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Minute", tiempoMarcador.value.split(":")[0])     
    swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Second", tiempoMarcador.value.split(":")[1]) 
    swiftConnectionStore.startClock('MARCADOR')
  }

  const tiempoIniciadoFlag = computed(() => marcador.value.temporizador.inicio_tiempo)
  console.log(tiempoIniciadoFlag.value)

  

  const iniciarTiempo = () => {
    console.log(tiempoActual.value)
    
    
    tiempoIniciado.value = true
    
    inicio_posesion = tiempo_de_inicio.value[parte(parte_en_juego.value)]
    inicio_tiempo.value = true
    if(!tiempoActual.value) {
      tiempoActual.value = tiempo_de_inicio.value[parte(parte_en_juego.value)]
    } else {
      
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Hour", 0)     
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Minute", tiempoMarcador.value.split(":")[0])     
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Second", tiempoMarcador.value.split(":")[1]) 
    }
    swiftConnectionStore.startClock('MARCADOR')
    
    
    temporizador = setInterval(() => {
      tiempoActual.value += 1
      marcador.value.temporizador.posesion[equipo_en_posesion.value] += 1
      if(id == "localStorage") {
        console.log('minutos partido ls')
      } else {

        futbolStore.setMinutosPartido(`${tiempoMarcador.value.split(":")[0]}'`)
      }
    }, 1000)
    marcador.value.temporizador.inicio_tiempo = inicio_tiempo.value
    actualizarMarcador()
  }
  
  

  const pararTiempo = () => {
    clearInterval(temporizador)
    inicio_tiempo.value = false
    marcador.value.temporizador.tiempo[parte(parte_en_juego.value)] = tiempoActual.value
    // console.log(marcador.value.temporizador.tiempo)
    
    marcador.value.temporizador.inicio_tiempo = false
    tiempoIniciado.value = false

    swiftConnectionStore.stopClock('MARCADOR')
    tiempoEnviado = false
    actualizarMarcador()
  }

  const resetTiempo = () => {
    clearInterval(temporizador)
    marcador.value.temporizador.inicio_tiempo = false
    tiempoActual.value = null
    // marcador.value.temporizador.tiempo[parte(parte_en_juego.value)] = tiempoMarcador.value

    
    switch (parseInt(parte_en_juego.value)) {
      case 1:
       marcador.value.temporizador.tiempo[parte(parte_en_juego.value)] = 0
        break
      case 2:
       marcador.value.temporizador.tiempo[parte(parte_en_juego.value)] = 2700
        break
      case 3:
       marcador.value.temporizador.tiempo[parte(parte_en_juego.value)] = 5400
        break
      case 4:
       marcador.value.temporizador.tiempo[parte(parte_en_juego.value)] = 6300
        break
      default:
       marcador.value.temporizador.tiempo[parte(parte_en_juego.value)] = 0
        break
    }
    marcador.value.temporizador.posesion.equipo_en_posesion = 'local'
    tiempoIniciado.value = false
    añadidoIniciado = false
    if(swiftConnectionStore.rtRemote) {
      // if(marcador.value.temporizador.parte_en_juego == 1) { 
      //   swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Hour", 0)     
      //   swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Minute", 0)     
      //   swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Second", 0) 
      //   console.log("00")    
      //   tiempoMarcador.value = '00:00'
      // } else if(marcador.value.temporizador.parte_en_juego == 2) {
      //   swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Hour", 0)  
      //   swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Minute", 45)     
      //   swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Second", 0) 
      //   console.log("45")    
      //   tiempoMarcador.value = '45:00'
      // } else if(marcador.value.temporizador.parte_en_juego == 3) {
      //   swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Hour", 0)  
      //   swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Minute", 90)     
      //   swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Second", 0) 
      //   console.log("90")    
      //   tiempoMarcador.value = '90:00'
      // } else if(marcador.value.temporizador.parte_en_juego == 4) {
      //   swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Hour", 0)  
      //   swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Minute", 105)     
      //   swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Second", 0) 
      //   console.log("105")    
      //   tiempoMarcador.value = '105:00'
      // }
      setTiempoMarcador()

      // const minutos = tiempoMarcador.value.split(":")[0]
      // console.log(parseInt(minutos))
      // swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Minute", parseInt(minutos))
    }
    futbolStore.setMinutosPartido(null)
    swiftConnectionStore.resetClock('MARCADOR')
    tiempoEnviado = false
    actualizarMarcador()

  }

  const setTiempoMarcador = () => {
    if(marcador.value.temporizador.parte_en_juego == 1) { 
        swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Hour", 0)     
        swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Minute", 0)     
        swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Second", 0) 
        // console.log("00")    
        // tiempoMarcador.value = '00:00'
      } else if(marcador.value.temporizador.parte_en_juego == 2) {
        swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Hour", 0)  
        swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Minute", 45)     
        swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Second", 0) 
        // console.log("45")    
        // tiempoMarcador.value = '45:00'
      } else if(marcador.value.temporizador.parte_en_juego == 3) {
        swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Hour", 0)  
        swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Minute", 90)     
        swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Second", 0) 
        // console.log("90")    
        // tiempoMarcador.value = '90:00'
      } else if(marcador.value.temporizador.parte_en_juego == 4) {
        swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Hour", 0)  
        swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Minute", 105)     
        swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Second", 0) 
        // console.log("105")    
        // tiempoMarcador.value = '105:00'
      }
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

    if (payload.live) {
      // swiftConnectionStore.cueGraphic('MARCADOR')

      // SI EL TIEMPO NO ESTÁ INICIADO
      if(!tiempoIniciado.value) {
        setTiempoMarcador()
        swiftConnectionStore.resetClock('MARCADOR')
      }
      // console.log(equipos.value)
      
      swiftConnectionStore.rtRemote.updateFields(`MARCADOR::EQUIPO_LOCALTEXT`, "String", equipos.value.local)
      swiftConnectionStore.rtRemote.updateFields(`MARCADOR::EQUIPO_VISITANTETEXT`, "String", equipos.value.visitante)
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::LOCALTEXT","String", marcador.value.goles.local)
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::VISITANTETEXT","String", marcador.value.goles.visitante)
        
        
        swiftConnectionStore.bringOn('MARCADOR')
      } else {
        swiftConnectionStore.takeOff('MARCADOR')


      }
      const rotulo_cargado = {tipo: payload.nombre, contenido: null, live: payload.live}
      rotulosStore.actualizarRotuloCargadoDB(rotulo_cargado)


  }
   
  const activarAñadido = payload => {
    if(payload.live) {
      swiftConnectionStore.añadidoOn(añadido.value)

    } else {
      swiftConnectionStore.añadidoOff()
    }
  }


  const cambioDePosesion = () => {

    if(equipo_en_posesion.value == 'local') {
      
      equipo_en_posesion.value = 'visitante'
    } else if (equipo_en_posesion.value == 'visitante') {
      
      equipo_en_posesion.value = 'local'
    }

    marcador.value.temporizador.posesion.equipo_en_posesion = equipo_en_posesion.value
    // marcador.value.temporizador.posesion.local = posesion_local.value
    // marcador.value.temporizador.posesion.visitante = posesion_visitante.value



    actualizarMarcador()



    // if(inicio_tiempo.value) {
    //     const finPosesion = Date.now()
        
    //     const duracionPosesion = finPosesion - inicio_posesion
    //     inicio_posesion = finPosesion
    //     if(equipo_en_posesion.value == 'local') {
    //       posesionLocalTotal.value += duracionPosesion
    //       equipo_en_posesion.value = 'visitante'
    //     } else if (equipo_en_posesion.value == 'visitante') {
    //       posesionVisitanteTotal.value += duracionPosesion
    //       equipo_en_posesion.value = 'local'
    //     }
    //     // console.log(millisToMinutesAndSeconds(posesionLocalTotal.value), millisToMinutesAndSeconds(posesionVisitanteTotal.value))
    //     posesion_local.value = Math.round(posesionLocalTotal.value / (finPosesion - tiempo_de_inicio.value[parte(parte_en_juego.value)]) * 100) + "%"
    //     posesion_visitante.value = Math.round(posesionVisitanteTotal.value / (finPosesion - tiempo_de_inicio.value[parte(parte_en_juego.value)]) * 100) + "%"
  
    //     // emit("updateDB", estTotales.value)
    //     marcador.value.temporizador.posesion.equipo_en_posesion = equipo_en_posesion.value
    //     marcador.value.temporizador.posesion.local = posesion_local.value
    //     marcador.value.temporizador.posesion.visitante = posesion_visitante.value
    //     // console.log(marcador.value)
    //     actualizarMarcador()

     

    // }


  }

  const resetPosesion = () => {
    marcador.value.temporizador.posesion.local = 0
    marcador.value.temporizador.posesion.visitante = 0
    actualizarMarcador()

  }


  // document.addEventListener('keyup', e => {
  //   shortcut(e.key.toUpperCase())
  //   // console.log(e.key.toUpperCase())
  // })

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
            // console.log(key)
            bringOn("MARCADOR")
            marcadorIn = !marcadorIn
            // console.log(marcadorIn)
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
    // localStorage.setItem('marcador', JSON.stringify(marcador.value))
    // futbolWebsocket.enviarWS({marcador: marcador.value})
    futbolStore.updateMarcadorDB(marcador.value.id_marcador, marcador.value)
  }

  // if (marcador.value.temporizador.inicio_tiempo) iniciarTiempo()

  // if(tiempoIniciadoFlag.value) {
  //   // console.log()
  //   tiempoActual.value = marcador.value.temporizador.tiempo[parte(parte_en_juego.value)]
  //   iniciarTiempo()
  //   console.log("Tiempo iniciado")
  // } else {
  //   console.log("Tiempo no iniciado")
  // }
  
  watch(() => parte_en_juego.value, val => {

    // console.log(val)
    // tiempo_de_inicio.value[parte(parte_en_juego.value)]
    let tiempo = 0
    switch (parseInt(val)) {
      case 1:
        tiempoActual.value = 0
        break
      case 2:
        tiempoActual.value = 2700
        break
      case 3:
        tiempoActual.value = 5400
        break
      case 4:
        tiempoActual.value = 6300
        break
      default:
        tiempoActual.value = 0
        break
    }

    console.log(tiempoActual.value)



    // if(parseInt(val) == 1) {
    //   if(tiempo_de_inicio.value[parte(1)]) {
    //     tiempo = Date.now() - tiempo_de_inicio.value[parte(1)]
    //   } else {
    //     tiempo = 0
    //   }
    //   // swiftConnectionStore.rtRemote.updateFields("MARCADOR::ClockTextTEXT","String", "00:00")
    //   // tiempoMarcador.value = "00:00"
    // } else if (parseInt(val) == 2) {
    //   if(tiempo_de_inicio.value[parte(2)]) {
    //     tiempo = Date.now() - tiempo_de_inicio.value[parte(2)] + 45 * 60 * 1000
    //   } else {
    //     tiempo = 45 * 60 * 1000
    //   }
    //   // swiftConnectionStore.rtRemote.updateFields("MARCADOR::ClockTextTEXT","String", "45:00")
    // } else if (parseInt(val) == 3) {
    //   if(tiempo_de_inicio.value[parte(3)]) {
    //     tiempo = Date.now() - tiempo_de_inicio.value[parte(3)] + 90 * 60 * 1000
    //   } else {
    //     tiempo = 90 * 60 * 1000
    //   }
    //   // swiftConnectionStore.rtRemote.updateFields("MARCADOR::ClockTextTEXT","String", "90:00")
    // } else if (parseInt(val) == 4) {
    //   if(tiempo_de_inicio.value[parte(4)]) {
    //     tiempo = Date.now() - tiempo_de_inicio.value[parte(4)] + 105 * 60 * 1000
    //   } else {
    //     tiempo = 105 * 60 * 1000
    //   }
    //   // swiftConnectionStore.rtRemote.updateFields("MARCADOR::ClockTextTEXT","String", "105:00")
    // }

    // tiempoMarcador.value = (millisToMinutesAndSeconds(tiempo))
    marcador.value.temporizador.parte_en_juego = parseInt(val)
    // console.log(marcador.value)
    // const minutos = tiempoMarcador.value.split(":")[0]
    // console.log(parseInt(minutos))
    // swiftConnectionStore.rtRemote.updateFields("MARCADOR::ClockTextTEXT","String", tiempoMarcador.value)
    // swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Minute", parseInt(minutos))
    // swiftConnectionStore.rtRemote.updateFields("MARCADOR::setHMS","String", "00:35:00:00.000")
    actualizarMarcador()
  })

  watch(() => posesion_local.value, val => {
    actualizarMarcador()
  })
  watch(() => posesion_visitante.value, val => {
    actualizarMarcador()
  })
  

  watch(() => marcador.value.temporizador.inicio_tiempo, val => {
    if(inicio_tiempo.value) {
    }
    // console.log(val)
  },
  {
    deep: true
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