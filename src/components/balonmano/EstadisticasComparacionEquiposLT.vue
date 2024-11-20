<template>
  <v-row class="ma-0 pa-0">
    <v-col class="text-center azul">
      <v-btn class="ml-1" size="x-small" :color="!liveBtn.tiros ? 'success' : 'error'" @click="liveStats('tiros')">STATS TIROS</v-btn>
      <v-btn class="ml-1" size="x-small" :color="!liveBtn.paradas ? 'success' : 'error'" @click="liveStats('paradas')">STATS PARADAS</v-btn>
      <v-btn class="ml-1" size="x-small" :color="!liveBtn.tiro7m ? 'success' : 'error'" @click="liveStats('tiro7m')">STATS 7M</v-btn>
      <v-btn class="ml-1" size="x-small" :color="!liveBtn.statsTotalShotsLT ? 'success' : 'error'" @click="liveStats('statsTotalShotsLT')">STATS TOTAL_SHOTS</v-btn>
      <v-btn class="ml-1" size="x-small" :color="!liveBtn.statsShotsOnGoalLT ? 'success' : 'error'" @click="liveStats('statsShotsOnGoalLT')">STATS SHOTS_ON_GOAL</v-btn>
      <v-btn class="ml-1" size="x-small" :color="!liveBtn.suspensiones ? 'success' : 'error'" @click="liveStats('suspensiones')">STATS SUSPENSION_MINUTES</v-btn>

    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'
import { useBalonmanoStore } from '@/store/balonmano'
import { useSwiftConnectionStore } from '@/store/swiftConnection';
import { storeToRefs } from 'pinia';

const balonmanoStore = useBalonmanoStore()
const swiftConnectionStore = useSwiftConnectionStore()

const { partido } = storeToRefs(balonmanoStore) 





const liveBtn = ref({
  tiros: false,
  paradas: false,
  tiro7m: false,
  statsTotalShotsLT: false,
  statsShotsOnGoalLT: false,
  suspensiones: false,

})

const liveStats = tipo => {
    let textLeft, textCenterTop, textRight, textCenterBot
    console.log(liveBtn.value[tipo])

    if(tipo === "tiros") {

      textLeft = balonmanoStore.porcentaje(partido.value.local.estadistica_equipo.goles, partido.value.local.estadistica_equipo.tiros)
      textCenterTop = "EFFICIENCY"
      textCenterBot = "SCORING"
      textRight = balonmanoStore.porcentaje(partido.value.visitante.estadistica_equipo.goles, partido.value.visitante.estadistica_equipo.tiros)

    } else if(tipo === "paradas") {

      textLeft = balonmanoStore.porcentaje(partido.value.local.estadistica_equipo.paradas, partido.value.visitante.estadistica_equipo.tiros)
      textCenterTop = "EFFICIENCY"
      textCenterBot = "SAVING"
      textRight = balonmanoStore.porcentaje(partido.value.visitante.estadistica_equipo.paradas, partido.value.visitante.estadistica_equipo.tiros)

    } else if(tipo === "tiro7m") {

      textLeft = balonmanoStore.porcentaje(partido.value.local.estadistica_equipo.penalti7m_anotados, partido.value.local.estadistica_equipo.penalti7m_efectuados)
      textCenterTop = "EFFICIENCY"
      textCenterBot = "7M"
      textRight = balonmanoStore.porcentaje(partido.value.visitante.estadistica_equipo.penalti7m_anotados, partido.value.visitante.estadistica_equipo.penalti7m_efectuados)

    } else if(tipo === "statsTotalShotsLT") {

      textLeft = `${partido.value.local.estadistica_equipo.tiros}`
      textCenterTop = "SHOTS"
      textCenterBot = "TOTAL"
      textRight = `${partido.value.visitante.estadistica_equipo.tiros}`

    } else if(tipo === "statsShotsOnGoalLT") {

      textLeft = balonmanoStore.porcentaje(partido.value.local.estadistica_equipo.paradas, partido.value.visitante.estadistica_equipo.tiros)
      textCenterTop = "SHOTS"
      textCenterBot = "ON GOAL"
      textRight = balonmanoStore.porcentaje(partido.value.visitante.estadistica_equipo.paradas, partido.value.visitante.estadistica_equipo.tiros)

    } else if(tipo === "suspensiones") {

      textLeft = `${partido.value.local.estadistica_equipo.suspensiones * 2} min`
      textCenterTop = "SUSPENSION"
      textCenterBot = "MINUTES"
      textRight = `${partido.value.visitante.estadistica_equipo.suspensiones * 2} min`

    }

    const escudoLocal = partido.value.local.escudo
    const escudoVisitante = partido.value.visitante.escudo


    if(!liveBtn.value[tipo]) {

      swiftConnectionStore.playGraphic('LT_MATCH_ESTATISTICS_X_1')
      

      swiftConnectionStore.rtRemote.updateFields("LT_MATCH_ESTATISTICS_x_1::MATCH_STATISTICS_ESCUDO_HOMESHDR", "Shader", escudoLocal)
      swiftConnectionStore.rtRemote.updateFields("LT_MATCH_ESTATISTICS_x_1::MATCH_STATISTICS_ESCUDO_AWAYSHDR", "Shader", escudoVisitante)
      swiftConnectionStore.rtRemote.updateFields("LT_MATCH_ESTATISTICS_x_1::MATCH_STATISTICS_TIPO_TOPTEXT","String", textCenterTop)
      swiftConnectionStore.rtRemote.updateFields("LT_MATCH_ESTATISTICS_x_1::MATCH_STATISTICS_TIPO_BOTTEXT","String", textCenterBot)
      swiftConnectionStore.rtRemote.updateFields("LT_MATCH_ESTATISTICS_x_1::MATCH_STATISTICS_HOME_VALUETEXT","String", textLeft)
      swiftConnectionStore.rtRemote.updateFields("LT_MATCH_ESTATISTICS_x_1::MATCH_STATISTICS_AWAY_VALUETEXT","String", textRight)
      // swiftConnectionStore.customMetodo("LT_MATCH_ESTATISTICS_X_1", "bringOn")

      swiftConnectionStore.bringOn('LT_MATCH_ESTATISTICS_X_1')
      console.log("bringon")


    } else {
      // swiftConnectionStore.customMetodo("LT_MATCH_ESTATISTICS_x_1", "takeOff")
      swiftConnectionStore.takeOff('LT_MATCH_ESTATISTICS_X_1')
    }
    liveBtn.value[tipo] = !liveBtn.value[tipo]
  }





</script>

<style scoped>
.azul {
  background-color: darkslategray;
}

</style>