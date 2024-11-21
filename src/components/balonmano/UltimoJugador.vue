<template>
  <v-card>
    <v-card-text>
      <h6>{{ jugador.dorsal }} - {{ jugador.nombre }} {{ jugador.apellido }}</h6>
      <v-row>
        <v-col class="text-center">
            <v-btn v-if="!jugador.portero" class="mx-1" size="x-small" :color="!liveBtn.goles ? 'success' : 'error'" @click="liveGoles('goles', jugador)"><h6>LIVE GOLES</h6></v-btn>
            <v-btn v-else class="mx-1" size="x-small" :color="!liveBtn.paradas ? 'success' : 'error'" @click="liveParadas('paradas', jugador)"><h6>LIVE PARADAS</h6></v-btn>
            <v-btn size="x-small" :disabled="jugador.estadistica.suspensiones === 0" :color="!liveBtn.suspensiones ? 'success' : 'error'" @click="infoLiveSuspension('suspensiones', jugador)"><h6>LIVE 2 MIN</h6></v-btn>
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

  import { computed, ref, toRefs } from 'vue'
  import { useBalonmanoStore } from "../../store/balonmano"
  import { storeToRefs } from 'pinia'
  

  const props = defineProps(["datos"])

  const { datos } = toRefs(props)

  
  const balonmanoStore = useBalonmanoStore()
  
  
  const { partido, suspensionesActivasLocal, suspensionesActivasVisitante } = storeToRefs(balonmanoStore)

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
    paradas: false

  })
  const liveParadas = (tipo, jugador) => {
    balonmanoStore.mostrarLiveParadas(jugador, equipo.value, partido.value, liveBtn.value[tipo])
    liveBtn.value[tipo] = !liveBtn.value[tipo]
  }

  const liveGoles = (tipo, jugador) => {
    console.log(tipo, jugador)
    balonmanoStore.mostrarInfoGoles(jugador, equipo.value, liveBtn.value[tipo])
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