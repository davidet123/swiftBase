<template>
  <v-card class="mt-2 mx-4">
    <v-card-title>
      <v-row>
        <v-col class="text-center">MARCADOR</v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row>
        <!-- GOLES -->
        <v-col cols="3" class="text-center celdaMarcador">
          <v-row>
            <v-col>
              <h4>GOLES</h4>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="text-center">
              <div><h4>{{ partido.local.nombre }}</h4></div>
              <div class="mb-2"><h2>{{ marcador.local }}</h2></div>
              <v-row>
                <v-col class="text-center">
                  <v-btn color="blue" size="x-small" @click="gol('local', 1)">+</v-btn>
                  <v-btn color="blue" size="x-small" @click="gol('local', -1)">-</v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" class="text-center">
              <div><h4>{{ partido.visitante.nombre }}</h4></div>
              <div class="mb-2"><h2>{{ marcador.visitante }}</h2></div>
              <v-row>
                <v-col class="text-center">
                  <v-btn color="blue" size="x-small" @click="gol('visitante', 1)">+</v-btn>
                  <v-btn color="blue" size="x-small" @click="gol('visitante', -1)">-</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <!-- EMPTY GOAL -->
          <v-row>
            <v-col cols="6">
              <v-btn class="mr-1" size="x-small" :color="!liveBtn.emptyGoalHome ? 'success' : 'error'" @click="liveEmptyGoal('HOME')">EMPTY GOAL HOME</v-btn>
              <!-- <BotonLive nombre="EMPTY GOAL HOME" @activar="activarEmptyGoal" /> -->
            </v-col>
            <v-col cols="6">
              <v-btn class="mr-1" size="x-small" :color="!liveBtn.emptyGoalHAway ? 'success' : 'error'" @click="liveEmptyGoal('AWAY')">EMPTY GOAL AWAY</v-btn>
              <!-- <BotonLive nombre="EMPTY GOAL AWAY" @activar="activarEmptyGoal" /> -->
            </v-col>
          </v-row>
          <!-- TIMEOUT -->
          <v-row>
            <v-col cols="6">
              <BotonLive nombre="TIMEOUT HOME" @activar="activarTimeOut" />
            </v-col>
            <v-col cols="6">
              <BotonLive nombre="TIMEOUT AWAY" @activar="activarTimeOut" />
            </v-col>
          </v-row>

          <!-- EDITAR ESTADISTICAS -->
          <v-row class="mt" style="border-top: 1px solid black;">
            <v-col class="text-center">
              <h4 class="mb-2">Editar Estadisticas</h4>
              <v-btn size = "x-small" @click="toggleEditarEstadisticas" :color="!editarEstadisticas ? 'success' : 'error'">EDITAR ESTADISTICAS</v-btn>
            </v-col>
          </v-row>
          <v-row class="ma-0 pa-0"> <!-- ESTADISTICAS MARCADOR -->
            <v-col class="text-center mt-1 pa-0" cols="12">
              <h5>ESTADISTICAS</h5>

            </v-col>
            <v-col class="text-center">
              <v-btn class="ml-1" size="x-small" :color="!liveBtn.statsTiros ? 'success' : 'error'" @click="liveStats('statsTiros')">TIROS</v-btn>
              <v-btn class="ml-1" size="x-small" :color="!liveBtn.statsParadas ? 'success' : 'error'" @click="liveStats('statsParadas')">PARADAS</v-btn>
              <v-btn class="ml-1" size="x-small" :color="!liveBtn.stats7m ? 'success' : 'error'" @click="liveStats('stats7m')">7M</v-btn>
              <v-btn class="ml-1" size="x-small" :color="!liveBtn.statsTotalShots ? 'success' : 'error'" @click="liveStats('statsTotalShots')">TOTAL_SHOTS</v-btn>
              <v-btn class="ml-1" size="x-small" :color="!liveBtn.statsShotsOnGoal ? 'success' : 'error'" @click="liveStats('statsShotsOnGoal')">SHOTS_ON_GOAL</v-btn>
              <v-btn class="ml-1" size="x-small" :color="!liveBtn.statsSuspensionMinutes ? 'success' : 'error'" @click="liveStats('statsSuspensionMinutes')">SUSPENSION_MINUTES</v-btn>
            </v-col>
          </v-row>
        </v-col>
        

        <!-- CRONO -->
        <v-col class="text-center celdaMarcador" cols="4">
          <v-row class="mb-2">
            <v-col class="text-center" cols="12">
              <h4>CRONO {{ parte === 1 ? 'PRIMERA' : 'SEGUNDA' }} PARTE</h4>
              <!-- <BotonLive nombre="MARCADOR" @activar="activarMarcador" /> -->
              <v-btn class="mr-1" size="x-small" :color="!liveBtn.marcador ? 'success' : 'error'" @click="liveMarcador">MARCADOR</v-btn>
            </v-col>
            <v-row>
              <v-col cols="5">
                <v-row>
                  <v-col cols="12">
                    <h3>{{ tiempoStr (tiempoPartido) }}</h3>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="text-center">
                    <v-btn color="green" size="x-small" @click="temporizador('start')" :disabled="cronoIniciado">START</v-btn>
                    <v-btn color="blue" size="x-small" @click="temporizador('stop')" :disabled="!cronoIniciado">STOP</v-btn>
                    <v-btn color="error" size="x-small" @click="temporizador('reset')" :disabled="cronoIniciado">RESET</v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="py-0 mb-1" cols="9">
                    <v-text-field
                      density="compact"
                      label="Ajustar tiempo"
                      v-model="nuevoTiempo"
                       @update:focused="foco($event)"
                    >                    
                    </v-text-field>
                  </v-col>
                  <v-col cols="3">

                    <v-btn :disabled="cronoIniciado" size="x-small" @click="enviarNuevoTiempo" color="error"><h6>ENVIAR</h6></v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="4">
                <v-row>
                  <v-col class="text-center">
                    <h4>Ajuste temporizador</h4>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="text-center">
                    <v-btn color="teal" size="x-small" @click="ajustarTiempo(1)">+1</v-btn>
                    <v-btn color="teal" size="x-small" @click="ajustarTiempo(-1)">-1</v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="3">
                <v-row>
                  <v-col class="mb-2">
                    <h4>Parte</h4>
                  </v-col>
                </v-row>
                <v-row class="ma-0 pa-0">
                  <v-col class="text-center ma-0 px-0 py-1"><v-btn color="teal" size="x-small" @click="elegirParte(1)" :disabled="(parte == 1)">1</v-btn></v-col>
                  <v-col class="text-center ma-0 px-0 py-1"><v-btn color="teal" size="x-small" @click="elegirParte(2)" :disabled="(parte == 2)">2</v-btn></v-col>
                  <v-col class="text-center ma-0 px-0 py-1"><v-btn color="teal" size="x-small" @click="elegirParte(3)" :disabled="(parte == 3)">OT1</v-btn></v-col>
                  <v-col class="text-center ma-0 px-0 py-1"><v-btn color="teal" size="x-small" @click="elegirParte(4)" :disabled="(parte == 4)">OT2</v-btn></v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-row>

          <!-- BOTONES SUSPENSION -->
          <v-row>
            <v-col cols="12" class="text-center">
              <v-row>
                <v-col cols="6" class="text-center celdaMarcador">
                  <v-row>
                    <v-col class="text-center ma-0 pa-0">
                      <v-btn class="mr-1" size="x-small" :color="!liveBtn.penaltiHomeTop ? 'success' : 'error'" @click="liveSuspension('Home', 'Top')">LIVE HOME TOP</v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="text-center">
                      <v-btn color="green" size="x-small" @click="cronoSuspension('Home', 'Top', 'Start')" :disabled="cronoBtn.penaltiHomeTop">START</v-btn>
                      <v-btn color="blue" size="x-small" @click="cronoSuspension('Home', 'Top', 'Stop')" :disabled="!cronoBtn.penaltiHomeTop">STOP</v-btn>
                      <v-btn color="error" size="x-small" @click="cronoSuspension('Home', 'Top', 'Reset')" :disabled="cronoBtn.penaltiHomeTop">RESET</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="6" class="text-center celdaMarcador">
                  <v-row>
                    <v-col class="text-center ma-0 pa-0" >
                      <v-btn class="mr-1" size="x-small" :color="!liveBtn.penaltiAwayTop ? 'success' : 'error'" @click="liveSuspension('Away', 'Top')">LIVE AWAY TOP</v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="text-center">
                      <v-btn color="green" size="x-small" @click="cronoSuspension('Away', 'Top', 'Start')" :disabled="cronoBtn.penaltiAwayTop">START</v-btn>
                      <v-btn color="blue" size="x-small" @click="cronoSuspension('Away', 'Top', 'Stop')" :disabled="!cronoBtn.penaltiAwayTop">STOP</v-btn>
                      <v-btn color="error" size="x-small" @click="cronoSuspension('Away', 'Top', 'Reset')" :disabled="cronoBtn.penaltiAwayTop">RESET</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" class="text-center celdaMarcador">
                  <v-row>
                    <v-col class="text-center ma-0 pa-0">
                      <v-btn class="mr-1" size="x-small" :color="!liveBtn.penaltiHomeBot ? 'success' : 'error'" @click="liveSuspension('Home', 'Bot')">LIVE HOME BOT</v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="text-center">
                      <v-btn color="green" size="x-small" @click="cronoSuspension('Home', 'Bot', 'Start')" :disabled="cronoBtn.penaltiHomeBot">START</v-btn>
                      <v-btn color="blue" size="x-small" @click="cronoSuspension('Home', 'Bot', 'Stop')" :disabled="!cronoBtn.penaltiHomeBot">STOP</v-btn>
                      <v-btn color="error" size="x-small" @click="cronoSuspension('Home', 'Bot', 'Reset')" :disabled="cronoBtn.penaltiHomeBot">RESET</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="6" class="text-center celdaMarcador">
                  <v-row>
                    <v-col class="text-center ma-0 pa-0">
                      <v-btn class="mr-1" size="x-small" :color="!liveBtn.penaltiAwayBot ? 'success' : 'error'" @click="liveSuspension('Away', 'Bot')">LIVE AWAY BOT</v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="text-center">
                      <v-btn color="green" size="x-small" @click="cronoSuspension('Away', 'Bot', 'Start')" :disabled="cronoBtn.penaltiAwayBot">START</v-btn>
                      <v-btn color="blue" size="x-small" @click="cronoSuspension('Away', 'Bot', 'Stop')" :disabled="!cronoBtn.penaltiAwayBot">STOP</v-btn>
                      <v-btn color="error" size="x-small" @click="cronoSuspension('Away', 'Bot', 'Reset')" :disabled="cronoBtn.penaltiAwayBot">RESET</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-text-field
                density="compact"
                label="Ajuste suspensiones"
                v-model="tiempoAjusteSuspensiones"
                 @update:focused="foco($event)"
              >
              </v-text-field>
            </v-col>
            <v-col cols="9">
              <v-row >
                <v-col cols="5" class="ma-1 pa-1 text-center">
                  <v-btn :disabled="cronoIniciado" size="x-small" @click="ajustarSuspension('HOME', 'TOP')" color="teal"><h6>ENVIAR HOME TOP</h6></v-btn>
                </v-col>
                <v-col cols="5" class="ma-1 pa-1 text-center">
                  <v-btn :disabled="cronoIniciado" size="x-small" @click="ajustarSuspension('AWAY', 'TOP')" color="teal"><h6>ENVIAR AWAY TOP</h6></v-btn>
                </v-col>
                <v-col cols="5" class="ma-1 pa-1 text-center">
                  <v-btn :disabled="cronoIniciado" size="x-small" @click="ajustarSuspension('HOME', 'BOT')" color="teal"><h6>ENVIAR HOME BOT</h6></v-btn>
                </v-col>
                <v-col cols="5" class="ma-1 pa-1 text-center">
                  <v-btn :disabled="cronoIniciado" size="x-small" @click="ajustarSuspension('AWAY', 'BOT')" color="teal"><h6>ENVIAR AWAY BOT</h6></v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="text-center" cols="4">
          <v-row>
            <v-col class="text-center">
              <video id="myVideoId" width="620" height="349" autoplay muted playsinline/>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>

  import { storeToRefs } from "pinia"
  import { useBalonmanoStore } from "../../store/balonmano"
  import { useSwiftConnectionStore } from "../../store/swiftConnection"
  import { computed, onBeforeMount, ref, watch } from "vue"
  import BotonLive from "../simple/botonLive.vue"



  const balonmanoStore = useBalonmanoStore()
  const swiftConnectionStore = useSwiftConnectionStore()

  const { marcador, partido, marcadorManual, editarEstadisticas } = storeToRefs(balonmanoStore)

  // Iniciar visor Swift
  // swiftConnectionStore.startConnection()
  swiftConnectionStore.startVideo()

  const foco = e => balonmanoStore.setEditando(e)


  // VARIABLES GLOBALES

  const partesSTR = ["1st", "2nd", "OT1", "OT2"]

  const  liveBtn = ref({
    penaltiHomeTop: false,
    penaltiHomeBot: false,
    penaltiAwayTop: false,
    penaltiAwayBot: false,
    marcador: false,
    emptyGoalHome: false,
    emptyGoalAway: false,
    statsTiros: false,
    statsParadas: false,
    stats7m: false,
    statsTotalShots: false,
    statsShotsOnGoal: false,
    statsSuspensionMinutes: false,
  })
  const  cronoBtn = ref({
    penaltiHomeTop: false,
    penaltiHomeBot: false,
    penaltiAwayTop: false,
    penaltiAwayBot: false,
  })
  // Editar estadisticas

  const toggleEditarEstadisticas = () => {
    balonmanoStore.toggleEditarEstadisticas()
  }

  //Marcador
  const gol = (equipo, val) => {
    if(equipo === "local") {
      marcador.value.local += val
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::GOLES_LOCALTEXT","String", marcador.value.local)
    }
    if(equipo === "visitante") {

      marcador.value.visitante += val
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::GOLES_VISITANTETEXT","String", marcador.value.visitante)
    }

    if(marcador.value[equipo] < 0) marcador.value[equipo] = 0
    balonmanoStore.guardarPartido()
  }
  
  const liveMarcador = () => {
    if(!liveBtn.value.marcador) {
      // swiftConnectionStore.cueGraphic('MARCADOR')
      swiftConnectionStore.playGraphic('MARCADOR')
      swiftConnectionStore.cueGraphic('MARCADOR')
      // swiftConnectionStore.customMetodo('MARCADOR', "cueGraphic")
      // swiftConnectionStore.startTransaction()

      // ======================ENVIOS SWIFT =============================
      // ENVIO NOMBRES
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::ABREV_LOCALTEXT","String", partido.value.local.abreviatura)
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::ABREV_VISITANTETEXT","String", partido.value.visitante.abreviatura)
      
      
      // ENVIO MARCADOR
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::GOLES_LOCALTEXT","String", marcador.value.local)
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::GOLES_VISITANTETEXT","String", marcador.value.visitante)

      // // ENVIO TIEMPO
      // if(!cronoIniciado.value) {

        const tiempo = convertirSegundos(marcador.value.tiempo)
        
      if (cronoIniciado.value) {
        
        swiftConnectionStore.stopClock("MARCADOR")
        // swiftConnectionStore.resetClock("MARCADOR")
        swiftConnectionStore.rtRemote.updateFields("MARCADOR::TEMPORIZADORTEXT","String", tiempoStr(marcador.value.tiempo)) 
        swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Minute", tiempo.minutos)     
        swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Second", tiempo.segundos)
        swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Milisec", 0)
        swiftConnectionStore.startClock("MARCADOR")
      }
      if (!cronoIniciado.value) {
        
        swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Minute", tiempo.minutos)     
        swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Second", tiempo.segundos)
        swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Milisec", 0)
        swiftConnectionStore.rtRemote.updateFields("MARCADOR::TEMPORIZADORTEXT","String", tiempoStr(marcador.value.tiempo)) 
      }
      
      // }

      // const tiempo = convertirSegundos(marcador.value.tiempo)
      
      
      // swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Minute", tiempo.minutos)     
      // swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Second", tiempo.segundos)
      
      
      
      // ENVIO PARTE
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::PARTE_MARCADORTEXT","String", partesSTR[marcador.value.parte-1])
      
      // ENVIO COLORES
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::COLOR_HOME_TOPSHDR","MaterialDiffuse", hex_to_swift(partido.value.local.colorTop))
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::COLOR_HOME_BOTSHDR","MaterialDiffuse", hex_to_swift(partido.value.local.colorBottom))
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::COLOR_AWAY_TOPSHDR","MaterialDiffuse", hex_to_swift(partido.value.visitante.colorTop))
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::COLOR_AWAY_BOTSHDR","MaterialDiffuse", hex_to_swift(partido.value.visitante.colorBottom))

      // swiftConnectionStore.endTransaction()
      
      swiftConnectionStore.bringOn('MARCADOR')
      
    } else if (liveBtn.value.marcador) {
      swiftConnectionStore.takeOff('MARCADOR')
    }
    liveBtn.value.marcador = !liveBtn.value.marcador
  }


  // Empty goal

  const liveEmptyGoal = equipo => {
    const grafico = "MARCADOR"
    if(equipo === "HOME") {
      if(!liveBtn.value.emptyGoalHome) swiftConnectionStore.customMetodo(grafico, "emptyGoalInHome")
      if(liveBtn.value.emptyGoalHome) swiftConnectionStore.customMetodo(grafico, "emptyGoalOutHome")
      liveBtn.value.emptyGoalHome = !liveBtn.value.emptyGoalHome
    } else if (equipo === "AWAY") {
      if(!liveBtn.value.emptyGoalAway) swiftConnectionStore.customMetodo(grafico, "emptyGoalInAway")
      if(liveBtn.value.emptyGoalAway) swiftConnectionStore.customMetodo(grafico, "emptyGoalOutAway")
      liveBtn.value.emptyGoalAway = !liveBtn.value.emptyGoalAway
    }
  
    // swiftConnectionStore.customMetodo()
  }

  // ESTADISTICAS EN MARCADOR
  const liveStats = tipo => {
    let textLeft, textCenter, textRight

    if(tipo === "statsTiros") {

      textLeft = balonmanoStore.porcentaje(partido.value.local.estadistica_equipo.goles, partido.value.local.estadistica_equipo.tiros)
      textCenter = "SCORING EFFICIENCY"
      textRight = balonmanoStore.porcentaje(partido.value.visitante.estadistica_equipo.goles, partido.value.visitante.estadistica_equipo.tiros)

    } else if(tipo === "statsParadas") {

      textLeft = balonmanoStore.porcentaje(partido.value.local.estadistica_equipo.paradas, partido.value.visitante.estadistica_equipo.tiros)
      textCenter = "SAVING EFFICIENCY"
      textRight = balonmanoStore.porcentaje(partido.value.visitante.estadistica_equipo.paradas, partido.value.visitante.estadistica_equipo.tiros)

    } else if(tipo === "stats7m") {

      textLeft = balonmanoStore.porcentaje(partido.value.local.estadistica_equipo.penalti7m_anotados, partido.value.local.estadistica_equipo.penalti7m_efectuados)
      textCenter = "7M PENALTIES"
      textRight = balonmanoStore.porcentaje(partido.value.visitante.estadistica_equipo.penalti7m_anotados, partido.value.visitante.estadistica_equipo.penalti7m_efectuados)

    } else if(tipo === "statsTotalShots") {

      textLeft = `${partido.value.local.estadistica_equipo.tiros}`
      textCenter = "TOTAL SHOTS"
      textRight = `${partido.value.visitante.estadistica_equipo.tiros}`

    } else if(tipo === "statsShotsOnGoal") {

      textLeft = balonmanoStore.porcentaje(partido.value.local.estadistica_equipo.paradas, partido.value.visitante.estadistica_equipo.tiros)
      textCenter = "SAVING EFFICIENCY"
      textRight = balonmanoStore.porcentaje(partido.value.visitante.estadistica_equipo.paradas, partido.value.visitante.estadistica_equipo.tiros)

    } else if(tipo === "statsSuspensionMinutes") {

      textLeft = `${partido.value.local.estadistica_equipo.suspensiones * 2} min`
      textCenter = "SUSPENSION MINUTES"
      textRight = `${partido.value.visitante.estadistica_equipo.suspensiones * 2} min`

    }


    if(!liveBtn.value[tipo]) {
      
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::STATISTICS_TEXT_LEFTTEXT","String", textLeft)
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::STATISTICS_CENTERTEXT","String", textCenter)
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::STATISTICS_RIGHTTEXT","String", textRight)

      swiftConnectionStore.customMetodo("MARCADOR", "statisticsIn")


    } else {
      swiftConnectionStore.customMetodo("MARCADOR", "statisticsOut")
    }
    liveBtn.value[tipo] = !liveBtn.value[tipo]
  }
  

  // TIMEOUT ================================================

  const activarTimeOut = data => {
    if(data.live) swiftConnectionStore.customMetodo("MARCADOR", "timeoutIn")
    if(!data.live) swiftConnectionStore.customMetodo("MARCADOR", "timeoutOut")
  }
  
  // Parte
  const parte = computed(() => marcador.value.parte)
  const elegirParte = parte => {
    marcador.value.parte = parte
    swiftConnectionStore.rtRemote.updateFields("MARCADOR::PARTE_MARCADORTEXT","String", partesSTR[parte-1])
    balonmanoStore.guardarPartido()
  }
  
  // Temporizador

  const nuevoTiempo = ref(null)
  
  let crono 
  let cronoIniciado = ref(false)

  const convertirSegundos = tiempo => {
    const minutos = Math.floor(tiempo / 60)
    const segundos = tiempo - (minutos * 60)
    return {minutos, segundos}
  }

  const tiempoASegundos = tiempo => {
    const minutos = parseInt(tiempo.split(":")[0])
    const segundos = parseInt(tiempo.split(":")[1])
    return (minutos*60) + segundos
  }
  const enviarNuevoTiempo = () => {
    marcador.value.tiempo = tiempoASegundos(nuevoTiempo.value)
    const tiempo = convertirSegundos(marcador.value.tiempo)
    
    swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Minute", tiempo.minutos)     
    swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Second", tiempo.segundos)
    swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Milisec", 0)
    swiftConnectionStore.rtRemote.updateFields("MARCADOR::TEMPORIZADORTEXT","String", tiempoStr(marcador.value.tiempo))
    
  }
  
  let tiempoPartido = computed(() => marcador.value.tiempo)

  const tiempoAjusteSuspensiones = ref(null)


  const temporizador = estado => {
    // swiftConnectionStore.playGraphic("MARCADOR")
    // swiftConnectionStore.cueGraphic("MARCADOR")
    // swiftConnectionStore.playGraphic("MARCADOR_INICIO_PARTE")
    // swiftConnectionStore.cueGraphic("MARCADOR_INICIO_PARTE")
    if(estado === "start") {
      const tiempo = convertirSegundos(marcador.value.tiempo)
      
      // ====== > Enviar inicio a swift aqui =======


      swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Minute", tiempo.minutos)     
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Second", tiempo.segundos)
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::clock","Milisec", 0)
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::TEMPORIZADORTEXT","String", tiempoStr(marcador.value.tiempo))
        

      swiftConnectionStore.startClock("MARCADOR")
      
      
      // INICIAR CRONO PARTE
      
      // swiftConnectionStore.rtRemote.updateFields("MARCADOR_INICIO_PARTE::INICIO_PARTE_CLOCK","Minute", tiempo.minutos)     
      // swiftConnectionStore.rtRemote.updateFields("MARCADOR_INICIO_PARTE::INICIO_PARTE_CLOCK","Second", tiempo.segundos)
      // swiftConnectionStore.rtRemote.updateFields("MARCADOR_INICIO_PARTE::INICIO_PARTE_CLOCK","Milisec", 0)
      // swiftConnectionStore.customMetodo(swiftConnectionStore.customMetodo("MARCADOR_INICIO_PARTE", `startClockInicioParte`))



      // INICIAR CRONOS SUSPENSION

      if(liveBtn.value.penaltiHomeTop === true) cronoSuspension('Home', 'Top', 'Start')
      if(liveBtn.value.penaltiHomeBot === true) cronoSuspension('Home', 'Bot', 'Start')
      if(liveBtn.value.penaltiAwayTop === true) cronoSuspension('Away', 'Top', 'Start')
      if(liveBtn.value.penaltiAwayBot === true) cronoSuspension('Away', 'Bot', 'Start')


      cronoIniciado.value = true
      crono = setInterval(() => {
        if (marcador.value.tiempo < 1800) marcador.value.tiempo ++  
        
      }, 1000)
    } else if (estado === "stop") {

      // PARAR CRONOS SUSPENSION

      if(liveBtn.value.penaltiHomeTop === true) cronoSuspension('Home', 'Top', 'Stop')
      if(liveBtn.value.penaltiHomeBot === true) cronoSuspension('Home', 'Bot', 'Stop')
      if(liveBtn.value.penaltiAwayTop === true) cronoSuspension('Away', 'Top', 'Stop')
      if(liveBtn.value.penaltiAwayBot === true) cronoSuspension('Away', 'Bot', 'Stop')

      swiftConnectionStore.stopClock("MARCADOR")
      // swiftConnectionStore.customMetodo(swiftConnectionStore.customMetodo("MARCADOR_INICIO_PARTE", `stopClockInicioParte`))
      cronoIniciado.value = false
      clearInterval(crono)
      balonmanoStore.guardarPartido()
    } else if(estado === "reset") {
      swiftConnectionStore.resetClock("MARCADOR")
      // swiftConnectionStore.customMetodo(swiftConnectionStore.customMetodo("MARCADOR_INICIO_PARTE", `resetClockInicioParte`))
      cronoIniciado.value = false
      marcador.value.tiempo = 0
      balonmanoStore.guardarPartido()
    }
  }
  
  const ajustarTiempo = val => {
    marcador.value.tiempo += val
  }

  // CRONOS SUSPENSIONES

  const liveSuspension = (equipo, posicion) => {
    const metodo = `penalti${equipo}${posicion}`
    if(liveBtn.value[metodo] == false) {
      swiftConnectionStore.customMetodo(swiftConnectionStore.customMetodo("MARCADOR", `${metodo}In`))
      // bringOn()
    } else if(liveBtn.value[metodo] == true) {
      swiftConnectionStore.customMetodo(swiftConnectionStore.customMetodo("MARCADOR", `${metodo}Out`))
      // takeOff()
    }
    liveBtn.value[metodo] = !liveBtn.value[metodo]
    

  }

  const ajustarSuspension = (equipo, posicion) => {
    if(!tiempoAjusteSuspensiones.value) return
    const nodo =  `PENALTI_${equipo}_${posicion}_CLOCK`
    const minutos = parseInt(tiempoAjusteSuspensiones.value.split(":")[0])
    const segundos = parseInt(tiempoAjusteSuspensiones.value.split(":")[1])
    
    swiftConnectionStore.rtRemote.updateFields(`MARCADOR::${nodo}`,"Minute", minutos)     
    swiftConnectionStore.rtRemote.updateFields(`MARCADOR::${nodo}`,"Second", segundos)
    swiftConnectionStore.rtRemote.updateFields(`MARCADOR::${nodo}`,"Milisec", 0)
    swiftConnectionStore.rtRemote.updateFields(`MARCADOR::${nodo}_TEXTTEXT`,"String", tiempoAjusteSuspensiones.value)
    
  }

  const cronoSuspension = (equipo, posicion, funcion) => {
    const metodo = `penalti${equipo}${posicion}`
    
    swiftConnectionStore.customMetodo(swiftConnectionStore.customMetodo("MARCADOR", `${metodo}${funcion}`))
    if(funcion !== "Reset") cronoBtn.value[metodo] = !cronoBtn.value[metodo]
  }
  
  // HELPERS=======================================================


  const tiempoStr = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  
  
  const hex_to_swift = hex => {
    
    hex = hex.slice(1)
    
    // Dividir el color en componentes RGB y Alfa (si existe)
    const r = parseInt(hex.substring(0, 2), 16) / 255
    const g = parseInt(hex.substring(2, 4), 16) / 255
    const b = parseInt(hex.substring(4, 6), 16) / 255
    const a = hex.length === 8 ? parseInt(hex.substring(6, 8), 16) / 255 : 1.0
    
    return `${parseFloat(r.toFixed(6))},${parseFloat(g.toFixed(6))},${parseFloat(b.toFixed(6))},${parseFloat(a.toFixed(6))}`
    
  }

  
  onBeforeMount(() => {
    balonmanoStore.cargarDatosLS()
  })

  watch(() => marcadorManual.value, val => {
    switch (val.tipo) {
      case "MARCADOR":
        liveMarcador()
        break;
      case "CLOCK PAUSE":
        cronoIniciado.value ? temporizador('stop') : temporizador('start')
        
        // if(!cronoIniciado.value) {
        //   temporizador('start')
        // }else if(cronoIniciado.value) temporizador('stop')
        break;
      case "CLOCK START":
        temporizador('start')
        break;
      case "CLOCK STOP":
        temporizador('stop')
        break;
      case "CLOCK RESET":
        temporizador('reset')
        break;
      case "EMPTY GOAL HOME":
        liveEmptyGoal('HOME')
        break;
      case "EMPTY GOAL AWAY":
      liveEmptyGoal('AWAY')
        break;
    }

  }, {deep: true})
  // watch(() => marcador.value, val => {
  //   console.log(val)
  //   swiftConnectionStore.rtRemote.updateFields("MARCADOR::GOLES_LOCALTEXT","String", val.local)
  //   swiftConnectionStore.rtRemote.updateFields("MARCADOR::GOLES_LOCALTEXT","String", val.visitante)
  
  // },
  // {
  //   deep: true
  // })


</script>

<style scoped>

  .celdaMarcador {
    border: 1px solid black;
  }

</style>