<template>
  <span v-if="jugador" >
    <v-row >
      <v-col class="tarjeta my-0 pt-1" >
        <v-card>
          <v-card-title>
            <v-row class="ml-1 pr-6">
              <v-col cols="1">
              </v-col>
              <v-col cols="3">
                <p>NOMBRE</p>
              </v-col>
              <v-col cols="2" class=text-center><p>disparos</p></v-col>
              <v-col cols="2" class=text-center><p>7m</p></v-col>
              <v-col cols="1" class=text-center><p>SUSP.</p></v-col>
              <v-col cols="3" class=text-center><p>TARJETAS</p></v-col>
            </v-row>
            <v-row>
                <v-col cols="1">
                  <h4>{{ jugador.dorsal }}</h4>
                </v-col>
                <v-col cols="3">
                  <p>{{ jugador.nombre }} {{ jugador.apellido }}<span v-if="jugador.portero">(GK)</span></p>
                </v-col>
                <v-col cols="2" class="text-center"><p>{{ jugador.estadistica.goles }} / {{ jugador.estadistica.tiros }}</p></v-col>
                <v-col cols="2" class="text-center"><p>{{ jugador.estadistica.penalti7m_anotados }} / {{ jugador.estadistica.penalti7m_efectuados }}</p></v-col>
                <v-col cols="1" class="text-center"><p>{{ jugador.estadistica.suspensiones}}</p></v-col>
                <v-col cols="1" class="contenedor_tarjeta"><div :class="jugador.estadistica.tarjeta_amarilla >= 1 ? 'amarilla' : ''"></div></v-col>
                <v-col cols="1" class="contenedor_tarjeta"><div :class="jugador.estadistica.tarjeta_amarilla == 2 ? 'amarilla' : ''"></div></v-col>
                <v-col cols="1" class="contenedor_tarjeta"><div :class="jugador.estadistica.tarjeta_roja == 1 ? 'roja' : ''"></div></v-col>
              </v-row>

          </v-card-title>
          <v-card-text>
            <v-row>
                <v-col cols="4"> <!-- DISPAROS Y GOLES -->
                  <v-row class="caja_jugador">
                    <v-col cols="12" class="text-center">
                      <h6>DISPAROS</h6>
                    </v-col>
                    <v-row class="pb-3">
                      <v-col cols="6">
                        <v-row>
                          <v-col class="text-center" cols="12">
                            <h6>Efectuados ({{ jugador.estadistica.tiros }})</h6>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col class="text-center" cols="3" offset="3">
                            <v-btn size="x-small" color="success" @click="disparo(1)">+</v-btn>
                          </v-col>
                          <v-col class="text-center" cols="3">
                            <v-btn size="x-small" color="error" @click="disparo(-1)">-</v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="6">
                        <v-row>
                          <v-col class="text-center" cols="12">
                            <h6>GOLES ({{ jugador.estadistica.goles }})</h6>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col class="text-center" cols="3">
                            <v-btn size="x-small" color="success" @click="gol(1)">+</v-btn>
                          </v-col>
                          <v-col class="text-center" cols="3">
                            <v-btn size="x-small" color="error" @click="gol(-1)">-</v-btn>
                          </v-col>
                          <v-col class="text-center" cols="3">
                            <v-btn size="x-small" :color="!liveBtn.goles ? 'success' : 'error'" @click="liveGoles('goles', jugador)">LIVE</v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-row>
                </v-col>
                <v-col cols="4"> <!-- tiros 7m -->
                  <v-row class="caja_jugador">
                  <v-col cols="12" class="text-center">
                    <h6>TIRO 7m</h6>
                  </v-col>
                  <v-row class="pb-3">
                      <v-col cols="6">
                        <v-row>
                          <v-col class="text-center" cols="12">
                            <h6>Efectuados  ({{ jugador.estadistica.penalti7m_efectuados }})</h6>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col class="text-center" cols="3" offset="2">
                            <v-btn size="x-small" color="success" @click="penalti(1)">+</v-btn>
                          </v-col>
                          <v-col class="text-center" cols="3">
                            <v-btn size="x-small" color="error" @click="penalti(-1)">-</v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="6">
                        <v-row>
                          <v-col class="text-center" cols="12">
                            <h6>GOLES ({{ jugador.estadistica.penalti7m_anotados }})</h6>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col class="text-center" cols="3">
                            <v-btn size="x-small" color="success" @click="penaltiAnotado(1)">+</v-btn>
                          </v-col>
                          <v-col class="text-center" cols="3">
                            <v-btn size="x-small" color="error" @click="penaltiAnotado(-1)">-</v-btn>
                          </v-col>
                          <v-col class="text-center" cols="3">
                            <v-btn size="x-small" :color="!liveBtn.tiro7m ? 'success' : 'error'" @click="livetiro7m('tiro7m', jugador)">LIVE</v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                </v-row>

                </v-col>
                <v-col cols="4"> <!-- SUSPENSIONES Y PARADAS -->
                  <v-row class="caja_jugador"> <!-- SUSPENSIONES -->
                    <v-col cols="12" class="text-center">
                      <h6>SUSPENSIONES 2 min  ({{ jugador.estadistica.suspensiones }})</h6>
                    </v-col>
                    <v-row class="pb-3">
                      <v-col cols="2" offset="3">
                        <v-btn size="x-small" color="success" @click="suspension(1)">+</v-btn>
                      </v-col>
                      <v-col cols="2" >
                        <v-btn size="x-small" color="error" @click="suspension(-1)">-</v-btn>
                      </v-col>
                      <v-col cols="2">
                        <v-btn size="x-small" :disabled="jugador.estadistica.suspensiones === 0" :color="!liveBtn.suspensiones ? 'success' : 'error'" @click="infoLiveSuspension('suspensiones', jugador)">LIVE</v-btn>
                      </v-col>
                    </v-row>
                  </v-row>

                </v-col>
              </v-row>
              <!-- Linea inferior -->
              <v-row>
                <v-col cols="8"> <!-- tarjetas -->
                  <v-row class="caja_jugador">
                    <v-col cols="12" class="text-center">
                      <h6>TARJETAS</h6>
                    </v-col>
                    <v-row class="pb-3">
                      <v-col cols="4">
                        <v-row>
                          <v-col class="text-center" cols="12">
                            <h6>AMARILLA ({{ jugador.estadistica.tarjetas_amarillas }})</h6>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col class="text-center" cols="3" offset="1">
                            <v-btn size="x-small" color="success" @click="tarjeta('tarjetas_amarillas', 1)">+</v-btn>
                          </v-col>
                          <v-col class="text-center" cols="3">
                            <v-btn size="x-small" color="error" @click="tarjeta('tarjetas_amarillas', -1)">-</v-btn>
                          </v-col>
                          <v-col class="text-center" cols="3">
                            <v-btn size="x-small" :color="!liveBtn.info_tarjeta_amarilla ? 'success' : 'error'" @click="infoLiveTarjeta('info_tarjeta_amarilla',jugador)">LIVE</v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="4">
                        <v-row>
                          <v-col class="text-center" cols="12">
                            <h6>ROJA ({{ jugador.estadistica.tarjetas_rojas }})</h6>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col class="text-center" cols="3" offset="1">
                            <v-btn size="x-small" color="success" @click="tarjeta('tarjetas_rojas', 1)">+</v-btn>
                          </v-col>
                          <v-col class="text-center" cols="3">
                            <v-btn size="x-small" color="error" @click="tarjeta('tarjetas_rojas', 1)">-</v-btn>
                          </v-col>
                          <v-col class="text-center" cols="3">
                            <v-btn size="x-small" :color="!liveBtn.info_tarjeta_roja ? 'success' : 'error'" @click="infoLiveTarjeta('info_tarjeta_roja',jugador)">LIVE</v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="4">
                        <v-row>
                          <v-col class="text-center" cols="12">
                            <h6>AZUL ({{ jugador.estadistica.tarjetas_azules }})</h6>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col class="text-center" cols="3">
                            <v-btn size="x-small" color="success" @click="tarjeta('tarjetas_azules', 1)">+</v-btn>
                          </v-col>
                          <v-col class="text-center" cols="3">
                            <v-btn size="x-small" color="error" @click="tarjeta('tarjetas_azules', 1)">-</v-btn>
                          </v-col>
                          <v-col class="text-center" cols="3">
                            <v-btn size="x-small" :color="!liveBtn.info_tarjeta_azul ? 'success' : 'error'" @click="infoLiveTarjeta('info_tarjeta_azul',jugador)">LIVE</v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-row>

                </v-col>
                <v-col cols="4"> <!-- PARADAS -->
                  <v-row v-if="jugador.portero"  class="caja_jugador">
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
            <v-row>
              <v-col cols="12" class="caja_jugador">
                <v-btn size="x-small" :disabled="true" :color="!liveBtn.dsk_info ? 'success' : 'error'" @click="liveDskInfo('dsk_info', jugador)">INFO_DSK</v-btn>
                <v-btn size="x-small" :color="!liveBtn.tarjeta_amarilla ? 'success' : 'error'" @click="liveTarjeta('tarjeta_amarilla', jugador, 'amarilla')">INFO_DSK_T_AM</v-btn>
                <v-btn size="x-small" :color="!liveBtn.tarjeta_roja ? 'success' : 'error'" @click="liveTarjeta('tarjeta_roja', jugador, 'roja')">INFO_DSK_T_R</v-btn>
                <v-btn size="x-small" :color="!liveBtn.tarjeta_azul ? 'success' : 'error'" @click="liveTarjeta('tarjeta_azul', jugador, 'azul')">INFO_DSK_T_AZ</v-btn>
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
  
  const { partido, marcador, suspensionesActivasLocal, suspensionesActivasVisitante, editarEstadisticas } = storeToRefs(balonmanoStore)


  // GLOBALES
  
  let cronoSuspension

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




  // FUNCIONES ESTADÍSTICA

  const disparo = val => {
    jugador.value.estadistica.tiros += val
    partido.value[equipo.value].estadistica_equipo.tiros += val
    balonmanoStore.guardarPartido()
  }
  const gol = val => {
    jugador.value.estadistica.goles += val
    partido.value[equipo.value].estadistica_equipo.goles += val
    if(!editarEstadisticas.value) marcador.value[equipo.value] += val
    if(equipo.value === 'local') {
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::GOLES_LOCALTEXT","String", marcador.value[equipo.value])
      if(val > 0 && !editarEstadisticas.value) marcador.value.tiempoUltimoGolLocal = 0
    }
    if(equipo.value === 'visitante') {
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::GOLES_VISITANTETEXT","String", marcador.value[equipo.value])
      if(val > 0 && !editarEstadisticas.value) marcador.value.tiempoUltimoGolVisitante = 0
    }
    disparo(val)
    balonmanoStore.guardarPartido()
  }
  const penalti = val => {
    jugador.value.estadistica.penalti7m_efectuados += val
    partido.value[equipo.value].estadistica_equipo.penalti7m_efectuados += val
    balonmanoStore.guardarPartido()
  }
  const penaltiAnotado = val => {
    jugador.value.estadistica.penalti7m_anotados += val
    partido.value[equipo.value].estadistica_equipo.penalti7m_anotados += val
    // Suma penalti tirado y gol automáticamente 
    penalti(val)
    gol(val)
    balonmanoStore.guardarPartido()
  }

  const suspension = val => {
    jugador.value.estadistica.suspensiones += val
    partido.value[equipo.value].estadistica_equipo.suspensiones += val
    balonmanoStore.guardarPartido()
  }
  const parada = val => {
    jugador.value.estadistica.paradas += val
    partido.value[equipo.value].estadistica_equipo.paradas += val
    balonmanoStore.guardarPartido()
  }

  const tarjeta = (tipo, val) => {
    jugador.value.estadistica[tipo] += val
    partido.value[equipo.value].estadistica_equipo[tipo] += val
    balonmanoStore.guardarPartido()
  }

  const liveBtn = ref({
    disparos_efectuados: false,
    goles: false,
    tiro7m_efectuados: false,
    tiro7m: false,
    disparos_al_arco: false,
    suspensiones: false,
    info_tarjeta_amarilla: false,
    info_tarjeta_roja: false,
    info_tarjeta_azul: false,
    tarjeta_amarilla: false,
    tarjeta_roja: false,
    tarjeta_azul: false,
    dsk_info: false,
    paradas: false,

  })
  const liveParadas = (tipo, jugador) => {
    balonmanoStore.mostrarLiveParadas(jugador, equipo.value, partido.value, liveBtn.value.paradas)
    liveBtn.value[tipo] = !liveBtn.value[tipo]
  }

  const liveGoles = (tipo, jugador) => {
    balonmanoStore.mostrarInfoGoles(jugador, equipo.value, liveBtn.value.goles)
    liveBtn.value[tipo] = !liveBtn.value[tipo]

  }

  const infoLiveTarjeta = (tipo, jugador) => {
    balonmanoStore.mostrarInfoLiveTarjeta(tipo, jugador, equipo.value, liveBtn.value[tipo])
    liveBtn.value[tipo] = !liveBtn.value[tipo]
  }

  const infoLiveSuspension = (tipo, jugador) => {
    if(jugador.estadistica.suspensiones === 0) return
    balonmanoStore.mostrarInfoLiveSuspension(jugador, equipo.value, liveBtn.value[tipo])
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

  const liveTarjeta = (tipo, jugador, color) => {
    balonmanoStore.mostratLiveTarjeta(jugador, equipo.value, color, partido.value, liveBtn.value[tipo])
    liveBtn.value[tipo] = !liveBtn.value[tipo]
  }

  const livetiro7m = (tipo, jugador) => {
    console.log(liveBtn.value[tipo])
    balonmanoStore.mostrarInfoLiveTiro7m(jugador, equipo.value, liveBtn.value[tipo])
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