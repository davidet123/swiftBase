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

  import { computed, ref, toRefs } from 'vue'
  import { useBalonmanoStore } from "../../store/balonmano"
  import { useSwiftConnectionStore } from "../../store/swiftConnection"
  import { storeToRefs } from 'pinia'

  

  const props = defineProps(["jugador", "equipo"])

  const { jugador, equipo } = toRefs(props)

  
  const balonmanoStore = useBalonmanoStore()
  const swiftConnectionStore = useSwiftConnectionStore()
  
  const { partido, marcador, suspensionesActivasLocal, suspensionesActivasVisitante } = storeToRefs(balonmanoStore)


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
      const acierto = parseInt((jugador.estadistica.paradas / tirosContrario)*100)
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

  // const infoLiveTarjeta = (tipo, jugador) => {
  //   let equipoAMostrar
  //   let metodoInfoPlayer
  //   let tarjetaAmarilla  = "false"
  //   let tarjetaRoja  = "false"
  //   let tarjetaAzul  = "false"

  //   if(equipo.value === "local") {
  //     equipoAMostrar = "HOME"
  //     metodoInfoPlayer = "infoPlayerHome"
  //   }
  //   if(equipo.value === "visitante") {
  //     equipoAMostrar = "AWAY"
  //     metodoInfoPlayer = "infoPlayerAway"
  //   }
  //   if(liveBtn.value[tipo] == false) {
  //     const textoTop = `${jugador.dorsal} ${jugador.nombre}`
  //     let textoBot

  //     if(tipo === "info_tarjeta_amarilla") {
  //       textoBot = "YELLOW CARD"
  //       tarjetaAmarilla = "true"
  //     }
  //     if(tipo === "info_tarjeta_roja") {
  //       textoBot = "RED CARD"
  //       tarjetaRoja = "true"
  //     }
  //     if(tipo === "info_tarjeta_azul") {
  //       textoBot = "BLUE CARD"
  //       tarjetaAzul = "true"
  //     }
      

  //     swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GRUPO_GOL`, "Display", "false")
  //     swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GRUPO_TARJETA`, "Display", "true")
  //     swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_TARJETA_TOPTEXT`, "String", textoTop)
  //     swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_TARJETA_BOTTEXT`, "String", textoBot)
  //     swiftConnectionStore.rtRemote.updateFields("MARCADOR::PLAYER_INFO_HOME_TARJETA_AMARILLA_GRUPO", "Display", tarjetaAmarilla)
  //     swiftConnectionStore.rtRemote.updateFields("MARCADOR::PLAYER_INFO_HOME_TARJETA_ROJA_GRUPO", "Display", tarjetaRoja)
  //     swiftConnectionStore.rtRemote.updateFields("MARCADOR::PLAYER_INFO_HOME_TARJETA_AZUL_GRUPO","Display", tarjetaAzul)

  //     swiftConnectionStore.customMetodo("MARCADOR", `${metodoInfoPlayer}In`)


  //     // partido.value[equipo.value].suspensiones_activas += 1
  //     // swiftConnectionStore.customMetodo(swiftConnectionStore.customMetodo("MARCADOR", `${posicionCronoSuspension.value}In`))
  //     // bringOn()
  //   } else if(liveBtn.value[tipo] == true) {

  //     swiftConnectionStore.customMetodo("MARCADOR", `${metodoInfoPlayer}Out`)
  //     // partido.value[equipo.value].suspensiones_activas -= 1
  //     // swiftConnectionStore.customMetodo(swiftConnectionStore.customMetodo("MARCADOR", `${posicionCronoSuspension.value}Out`))
  //     // takeOff()
  //   }
  //   liveBtn.value[tipo] = !liveBtn.value[tipo]


    
  // }

  // const liveSuspension = () => {
  //   if(liveBtn.value.suspension == false) {
  //     // partido.value[equipo.value].suspensiones_activas += 1
  //     swiftConnectionStore.customMetodo(swiftConnectionStore.customMetodo("MARCADOR", `${posicionCronoSuspension.value}In`))
  //     // bringOn()
  //   } else if(liveBtn.value.suspension == true) {
  //     // partido.value[equipo.value].suspensiones_activas -= 1
  //     swiftConnectionStore.customMetodo(swiftConnectionStore.customMetodo("MARCADOR", `${posicionCronoSuspension.value}Out`))
  //     // takeOff()
  //   }
  //   liveBtn.value.suspension = !liveBtn.value.suspension
    

  // }

  // const liveTarjeta = (tipo, dorsal, nombre, color) => {
  //   if(!liveBtn.value[tipo]) {
      
  //     let tarjetaAmarilla  = "false"
  //     let tarjetaRoja  = "false"
  //     let tarjetaAzul  = "false"
      
  //     if(color === "amarilla") tarjetaAmarilla = "true"
  //     if(color === "roja") tarjetaRoja = "true"
  //     if(color === "azul") tarjetaAzul = "true"


  //     swiftConnectionStore.playGraphic('DSK_INFO_TARJETA')
  //     swiftConnectionStore.cueGraphic('DSK_INFO_TARJETA')
  
  //     swiftConnectionStore.rtRemote.updateFields("DSK_INFO_TARJETA::SUPERIORTEXT","String", nombre)
  //     swiftConnectionStore.rtRemote.updateFields("DSK_INFO_TARJETA::ESCUDOSHDR", "Shader", partido.value[equipo.value].escudo)
  //     swiftConnectionStore.rtRemote.updateFields("DSK_INFO_TARJETA::TARJETA_AMARILLA_GRUPO", "Display", tarjetaAmarilla)
  //     swiftConnectionStore.rtRemote.updateFields("DSK_INFO_TARJETA::TARJETA_ROJA_GRUPO", "Display", tarjetaRoja)
  //     swiftConnectionStore.rtRemote.updateFields("DSK_INFO_TARJETA::TARJETA_AZUL_GRUPO","Display", tarjetaAzul)

  //     swiftConnectionStore.bringOn('DSK_INFO_TARJETA')
  //   } else {
  //     swiftConnectionStore.takeOff('DSK_INFO_TARJETA')

  //   }
  //   liveBtn.value[tipo] = !liveBtn.value[tipo]
  // }

  // const capitalize = text => {
  //   return text.charAt(0).toUpperCase()
  //       + text.slice(1).toLowerCase()
  // } 

  // const liveDskInfo = (tipo, jugador) => {
  //   if(!liveBtn.value[tipo]) {
  //     swiftConnectionStore.playGraphic('DSK_INFO')
  //     swiftConnectionStore.cueGraphic('DSK_INFO')
  
  //     swiftConnectionStore.rtRemote.updateFields("DSK_INFO::SUPERIOR_NOMBRETEXT","String", capitalize(jugador.nombre))
  //     swiftConnectionStore.rtRemote.updateFields("DSK_INFO::SUPERIOR_APELLIDOTEXT","String", jugador.apellido.toUpperCase())
  //     swiftConnectionStore.rtRemote.updateFields("DSK_INFO::INFERIORTEXT","String", jugador.id)
  //     swiftConnectionStore.rtRemote.updateFields("DSK_INFO::ESCUDOSHDR", "Shader", partido.value[equipo.value].escudo)

  //     swiftConnectionStore.bringOn('DSK_INFO')

  //   } else {
  //     swiftConnectionStore.takeOff('DSK_INFO')
  //   }
  //   liveBtn.value[tipo] = !liveBtn.value[tipo]

  // }

  // const live = (tipo, nombre, dorsal, tipoStr, valor) => {
  //   if(liveBtn.value[tipo] == false) {
  //     swiftConnectionStore.playGraphic("EST_INDIVIDUAL")
      
  //     swiftConnectionStore.bringOn("EST_INDIVIDUAL")
  //     // bringOn()
  //   } else if(liveBtn.value[tipo] == true) {
  //     swiftConnectionStore.takeOff("EST_INDIVIDUAL")
  //     // takeOff()
  //   }
  //   liveBtn.value[tipo] = !liveBtn.value[tipo]
  // }

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