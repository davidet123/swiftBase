<template>
  <v-card>
    <v-card-text>
      <h6>{{ jugador.dorsal }} - {{ jugador.nombre }} {{ jugador.apellido }}</h6>
      <v-row>
        <v-col class="text-center">
            <v-btn class="mx-1" size="x-small" :color="!liveBtn.goles ? 'success' : 'error'" @click="liveGoles('goles', jugador)"><h6>LIVE GOLES</h6></v-btn>
            <v-btn v-if="jugador.portero" class="mx-1" size="x-small" :color="!liveBtn.paradas ? 'success' : 'error'" @click="liveParadas('paradas', jugador)"><h6>LIVE PARADAS</h6></v-btn>
            <!-- <v-btn class="mx-1" size="x-small" :color="!liveBtn.suspension ? 'success' : 'error'" @click="liveSuspension()"><h6>LIVE SUSPENSION</h6></v-btn> -->
            <v-btn class="mx-1" size="x-small" :color="!liveBtn.info_tarjeta_amarilla ? 'success' : 'error'" @click="infoLiveTarjeta('info_tarjeta_amarilla',jugador)"><h6>LIVE T-A</h6></v-btn>
            <v-btn class="mx-1" size="x-small" :color="!liveBtn.info_tarjeta_roja ? 'success' : 'error'" @click="infoLiveTarjeta('info_tarjeta_roja',jugador)"><h6>LIVE T-R</h6></v-btn>
            <v-btn class="mx-1" size="x-small" :color="!liveBtn.info_tarjeta_azul ? 'success' : 'error'" @click="infoLiveTarjeta('info_tarjeta_azul',jugador)"><h6>LIVE T-AZ</h6></v-btn>
        </v-col>
      </v-row>

    </v-card-text>
  </v-card>

    
</template>

<script setup>

  import { computed, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, onUpdated, ref, toRefs, watch } from 'vue'
  import { useBalonmanoStore } from "../../store/balonmano"
  import { useSwiftConnectionStore } from "../../store/swiftConnection"
  import { storeToRefs } from 'pinia'
import { useEventListener } from '@/composables/event';

  

  const props = defineProps(["datos"])

  const { datos } = toRefs(props)

  
  const balonmanoStore = useBalonmanoStore()
  const swiftConnectionStore = useSwiftConnectionStore()
  
  const { partido, suspensionesActivasLocal, suspensionesActivasVisitante, marcador, ultimoJugador, estadisticaManual } = storeToRefs(balonmanoStore)

  const jugador = computed(() => datos.value.jugador)
  const equipo = computed(() => datos.value.equipo)

  const posicionCronoSuspension = computed(() => {
    if(equipo.value === "local") {
      if(suspensionesActivasLocal.value === 1) return "penaltiHomeTop"
      if(suspensionesActivasLocal.value === 2) return "penaltiHomeBot"
    }
    if(equipo.value === "visitante") {
      if(suspensionesActivasVisitante.value === 1) return "penaltiAwayTop"
      if(suspensionesActivasVisitante.value === 2) return "penaltiAwayBot"
    }
  })
  

  


  // GLOBALES
  
 


  // // FUNCIONES ESTADÍSTICA

  // const disparo = val => {
  //   jugador.value.estadistica.tiros += val
  //   partido.value[equipo.value].estadistica_equipo.tiros += val
  //   balonmanoStore.guardarPartido()
  // }
  // const gol = val => {
  //   jugador.value.estadistica.goles += val
  //   partido.value[equipo.value].estadistica_equipo.goles += val
  //   marcador.value[equipo.value] += val
  //   if(equipo.value === 'local') swiftConnectionStore.rtRemote.updateFields("MARCADOR::GOLES_LOCALTEXT","String", marcador.value[equipo.value])
  //   if(equipo.value === 'visitante') swiftConnectionStore.rtRemote.updateFields("MARCADOR::GOLES_VISITANTETEXT","String", marcador.value[equipo.value])
  //   disparo(val)
  //   balonmanoStore.guardarPartido()
  // }
  // const penalti = val => {
  //   jugador.value.estadistica.penalti7m_efectuados += val
  //   partido.value[equipo.value].estadistica_equipo.penalti7m_efectuados += val
  //   balonmanoStore.guardarPartido()
  // }
  // const penaltiAnotado = val => {
  //   jugador.value.estadistica.penalti7m_anotados += val
  //   partido.value[equipo.value].estadistica_equipo.penalti7m_anotados += val
  //   // Suma penalti tirado y gol automáticamente 
  //   penalti(val)
  //   gol(val)
  //   balonmanoStore.guardarPartido()
  // }

  // const suspension = val => {
  //   jugador.value.estadistica.suspensiones += val
  //   partido.value[equipo.value].estadistica_equipo.suspensiones += val
  //   balonmanoStore.guardarPartido()
  // }
  // const parada = val => {
  //   jugador.value.estadistica.paradas += val
  //   partido.value[equipo.value].estadistica_equipo.paradas += val
  //   balonmanoStore.guardarPartido()
  // }

  // const tarjeta = (tipo, val) => {
  //   jugador.value.estadistica[tipo] += val
  //   partido.value[equipo.value].estadistica_equipo[tipo] += val
  //   balonmanoStore.guardarPartido()
  // }

  // const iniciarSuspension = () => {
  //   // partido.value[equipo.value].suspensiones_activas += 1
  //   swiftConnectionStore.customMetodo("MARCADOR", `${posicionCronoSuspension.value}Start`)
  //   balonmanoStore.guardarPartido()
  // }

  // const pararSuspension = () => {
  //   swiftConnectionStore.customMetodo("MARCADOR", `${posicionCronoSuspension.value}Stop`)
  //   balonmanoStore.guardarPartido()
  // }

  // const resetSuspension = () => {
  //   swiftConnectionStore.customMetodo("MARCADOR", `${posicionCronoSuspension.value}Reset`)
  //   partido.value[equipo.value].suspensiones_activas -= 1
  //   balonmanoStore.guardarPartido()
  // }

  const liveBtn = ref({
    disparos_efectuados: false,
    goles: false,
    tiro7m_efectuados: false,
    tiro7m: false,
    disparos_al_arco: false,
    suspension: false,
    info_tarjeta_amarilla: false,
    info_tarjeta_roja: false,
    info_tarjeta_azul: false,
    tarjeta_amarilla: false,
    tarjeta_roja: false,
    tarjeta_azul: false,
    dsk_info: false,
    paradas: false

  })
  const liveParadas = (tipo, jugador) => {
    let equipoAMostrar
    let metodoInfoPlayer
    let tirosContrario
    
    if(equipo.value === "local") {
      equipoAMostrar = "HOME"
      metodoInfoPlayer = "infoPlayerHome"
      tirosContrario = partido.value["visitante"].estadistica_equipo.tiros
    }
    if(equipo.value === "visitante") {
      equipoAMostrar = "AWAY"
      metodoInfoPlayer = "infoPlayerAway"
      tirosContrario = partido.value["local"].estadistica_equipo.tiros
    }
    if(liveBtn.value.paradas == false) {
      const acierto = parseInt((jugador.estadistica.paradas / tirosContrario)*100) || "0"
      const textoTop = `${jugador.dorsal} ${jugador.nombre} ${jugador.apellido.toUpperCase()}`
      const textoBot = `${jugador.estadistica.paradas} SAVES, pct ${acierto}% `
      swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GRUPO_GOL`, "Display", "true")
      swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GRUPO_TARJETA`, "Display", "false")
      swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GOL_TOPTEXT`, "String", textoTop)
      swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GOL_BOTTEXT`, "String", textoBot)
      swiftConnectionStore.customMetodo("MARCADOR", `${metodoInfoPlayer}In`)
    } else if(liveBtn.value.paradas == true) {
      swiftConnectionStore.customMetodo("MARCADOR", `${metodoInfoPlayer}Out`)

    }
    liveBtn.value.paradas = !liveBtn.value.paradas

  }

  const liveGoles = (tipo, jugador) => {
    let equipoAMostrar
    let metodoInfoPlayer
    
    if(equipo.value === "local") {
      equipoAMostrar = "HOME"
      metodoInfoPlayer = "infoPlayerHome"
    }
    if(equipo.value === "visitante") {
      equipoAMostrar = "AWAY"
      metodoInfoPlayer = "infoPlayerAway"
    }
    if(liveBtn.value.goles == false) {
      const acierto = parseInt((jugador.estadistica.goles / jugador.estadistica.tiros)*100) || "0"
      const textoTop = `${jugador.dorsal} ${jugador.nombre} ${jugador.apellido.toUpperCase()}`
      const textoBot = `${jugador.estadistica.goles} GOALS, ${jugador.estadistica.tiros} ATTEMPTS, pct ${acierto}%`
      swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GRUPO_GOL`, "Display", "true")
      swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GRUPO_TARJETA`, "Display", "false")
      swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GOL_TOPTEXT`, "String", textoTop)
      swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GOL_BOTTEXT`, "String", textoBot)
      swiftConnectionStore.customMetodo("MARCADOR", `${metodoInfoPlayer}In`)
    } else if(liveBtn.value.goles == true) {
      swiftConnectionStore.customMetodo("MARCADOR", `${metodoInfoPlayer}Out`)

    }
    liveBtn.value.goles = !liveBtn.value.goles

  }

  const infoLiveTarjeta = (tipo, jugador) => {
    let equipoAMostrar
    let metodoInfoPlayer
    let tarjetaAmarilla  = "false"
    let tarjetaRoja  = "false"
    let tarjetaAzul  = "false"

    if(equipo.value === "local") {
      equipoAMostrar = "HOME"
      metodoInfoPlayer = "infoPlayerHome"
    }
    if(equipo.value === "visitante") {
      equipoAMostrar = "AWAY"
      metodoInfoPlayer = "infoPlayerAway"
    }
    if(liveBtn.value[tipo] == false) {
      const textoTop = `${jugador.dorsal} ${jugador.nombre} ${jugador.apellido.toUpperCase()}`
      let textoBot

      if(tipo === "info_tarjeta_amarilla") {
        textoBot = "YELLOW CARD"
        tarjetaAmarilla = "true"
      }
      if(tipo === "info_tarjeta_roja") {
        textoBot = "RED CARD"
        tarjetaRoja = "true"
      }
      if(tipo === "info_tarjeta_azul") {
        textoBot = "BLUE CARD"
        tarjetaAzul = "true"
      }
      

      swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GRUPO_GOL`, "Display", "false")
      swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GRUPO_TARJETA`, "Display", "true")
      swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_TARJETA_TOPTEXT`, "String", textoTop)
      swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_TARJETA_BOTTEXT`, "String", textoBot)
      swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_TARJETA_AMARILLA_GRUPO`, "Display", tarjetaAmarilla)
      swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_TARJETA_ROJA_GRUPO`, "Display", tarjetaRoja)
      swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_TARJETA_AZUL_GRUPO`,"Display", tarjetaAzul)
      
      swiftConnectionStore.customMetodo("MARCADOR", `${metodoInfoPlayer}In`)


      // partido.value[equipo.value].suspensiones_activas += 1
      // swiftConnectionStore.customMetodo(swiftConnectionStore.customMetodo("MARCADOR", `${posicionCronoSuspension.value}In`))
      // bringOn()
    } else if(liveBtn.value[tipo] == true) {

      swiftConnectionStore.customMetodo("MARCADOR", `${metodoInfoPlayer}Out`)
      // partido.value[equipo.value].suspensiones_activas -= 1
      // swiftConnectionStore.customMetodo(swiftConnectionStore.customMetodo("MARCADOR", `${posicionCronoSuspension.value}Out`))
      // takeOff()
    }
    liveBtn.value[tipo] = !liveBtn.value[tipo]


    
  }

  const liveSuspension = () => {
    if(liveBtn.value.suspension == false) {
      // partido.value[equipo.value].suspensiones_activas += 1
      swiftConnectionStore.customMetodo(swiftConnectionStore.customMetodo("MARCADOR", `${posicionCronoSuspension.value}In`))
      // bringOn()
    } else if(liveBtn.value.suspension == true) {
      // partido.value[equipo.value].suspensiones_activas -= 1
      swiftConnectionStore.customMetodo(swiftConnectionStore.customMetodo("MARCADOR", `${posicionCronoSuspension.value}Out`))
      // takeOff()
    }
    liveBtn.value.suspension = !liveBtn.value.suspension
    

  }

  const liveTarjeta = (tipo, dorsal, nombre, color) => {
    if(!liveBtn.value[tipo]) {
      
      let tarjetaAmarilla  = "false"
      let tarjetaRoja  = "false"
      let tarjetaAzul  = "false"
      
      if(color === "amarilla") tarjetaAmarilla = "true"
      if(color === "roja") tarjetaRoja = "true"
      if(color === "azul") tarjetaAzul = "true"


      swiftConnectionStore.playGraphic('DSK_INFO_TARJETA')
      swiftConnectionStore.cueGraphic('DSK_INFO_TARJETA')
  
      swiftConnectionStore.rtRemote.updateFields("DSK_INFO_TARJETA::SUPERIORTEXT","String", nombre)
      swiftConnectionStore.rtRemote.updateFields("DSK_INFO_TARJETA::ESCUDOSHDR", "Shader", partido.value[equipo.value].escudo)
      swiftConnectionStore.rtRemote.updateFields("DSK_INFO_TARJETA::TARJETA_AMARILLA_GRUPO", "Display", tarjetaAmarilla)
      swiftConnectionStore.rtRemote.updateFields("DSK_INFO_TARJETA::TARJETA_ROJA_GRUPO", "Display", tarjetaRoja)
      swiftConnectionStore.rtRemote.updateFields("DSK_INFO_TARJETA::TARJETA_AZUL_GRUPO","Display", tarjetaAzul)

      swiftConnectionStore.bringOn('DSK_INFO_TARJETA')
    } else {
      swiftConnectionStore.takeOff('DSK_INFO_TARJETA')

    }
    liveBtn.value[tipo] = !liveBtn.value[tipo]
  }

  const capitalize = text => {
    return text.charAt(0).toUpperCase()
        + text.slice(1).toLowerCase()
  } 

  const liveDskInfo = (tipo, jugador) => {
    if(!liveBtn.value[tipo]) {
      swiftConnectionStore.playGraphic('DSK_INFO')
      swiftConnectionStore.cueGraphic('DSK_INFO')
  
      swiftConnectionStore.rtRemote.updateFields("DSK_INFO::SUPERIOR_NOMBRETEXT","String", capitalize(jugador.nombre))
      swiftConnectionStore.rtRemote.updateFields("DSK_INFO::SUPERIOR_APELLIDOTEXT","String", jugador.apellido.toUpperCase())
      swiftConnectionStore.rtRemote.updateFields("DSK_INFO::INFERIORTEXT","String", jugador.id)
      swiftConnectionStore.rtRemote.updateFields("DSK_INFO::ESCUDOSHDR", "Shader", partido.value[equipo.value].escudo)

      swiftConnectionStore.bringOn('DSK_INFO')

    } else {
      swiftConnectionStore.takeOff('DSK_INFO')
    }
    liveBtn.value[tipo] = !liveBtn.value[tipo]

  }

  const live = (tipo, nombre, dorsal, tipoStr, valor) => {
    if(liveBtn.value[tipo] == false) {
      swiftConnectionStore.playGraphic("EST_INDIVIDUAL")
      
      swiftConnectionStore.bringOn("EST_INDIVIDUAL")
      // bringOn()
    } else if(liveBtn.value[tipo] == true) {
      swiftConnectionStore.takeOff("EST_INDIVIDUAL")
      // takeOff()
    }
    liveBtn.value[tipo] = !liveBtn.value[tipo]
  }




  // watch(() => liveBtn.value, val =>  {
  //   console.log(val)

  // }, {deep: true})

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