<template>
  <v-row>
    <v-col>
      <PrePartidoBalonmano />
      
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <MarcadorBalonmano />

    </v-col>
  </v-row>
  <div>
    <EstadisticasComparacionEquiposLT />

  </div>
  <v-row class="ma-0">
    <v-col class="text-center">
      <UltimoJugador :datos="ultimoJugador" v-if="ultimoJugador"/>
    </v-col>
  </v-row>
  <v-row class="ma-0">
    <v-col cols="6"v-for="equipo in tipoEquipo" :key="equipo">
      <v-row>
        <v-col class="text-center">
          <BotonLive :nombre="`T-O ${equipo.toUpperCase()}`"  @activar="activarTiempoMuertoLT" />
         
        </v-col>
      </v-row>
      <v-row class="mx-2">
        <v-col v-for="jugador in porteros(equipo)" :key="jugador.dorsal" class="text-center" :cols="porteros(equipo) / 12">
           <PorteroBalonmano :jugador="jugador" :equipo="equipo"/>
        </v-col>
      </v-row>
      <v-row class="ma-0 pa-0">
        <v-col cols="11">
          <v-text-field v-model="dorsalBuscado[equipo]" @update:focused="foco($event)"></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn color="error" size="x-small" @click="limpiar(equipo)">x</v-btn>
        </v-col>
      </v-row>
      
      <v-row class="pa-0 ma-0" v-if="dorsalBuscado[equipo]">
        <v-col cols="12">
          <JugadorBalonmanoSolo :jugador="jugadorBuscado(equipo)" :equipo="equipo"/>
        </v-col>
      </v-row>
      <v-row class="ml-1 pr-6">
        <v-col cols="1">
          <h4>NUM</h4>
        </v-col>
        <v-col cols="3">
          <p>NOMBRE</p>
        </v-col>
        <v-col cols="2" class=text-center><p>disparos</p></v-col>
        <v-col cols="2" class=text-center><p>7m</p></v-col>
        <v-col cols="1" class=text-center><p>SUSP.</p></v-col>
        <v-col cols="3" class=text-center><p>TARJETAS</p></v-col>
      </v-row>
      <v-row class="pa-0 ma-0" v-for="(jugador, index) in partido[equipo].jugadores":key="jugador.id" v-if="!dorsalBuscado[equipo]">
        <v-col cols="12">
          <JugadorBalonmano :jugador="jugador" :equipo="equipo"/>
        </v-col>
      </v-row>
      <v-row v-for="(tecnico, index) in partido[equipo].cuerpo_tecnico" :key="index">
        <v-col cols="12">

          <TecnicoBalonmano :tecnico="tecnico" :escudo="partido[equipo].escudo"/>
        </v-col>
      </v-row>
      
    </v-col>
  </v-row>
  <v-row v-if="addEstadisticaManual">
    <IntroducirEstadisticaManual :tipo="tipoEstadisticaManual" :partido="partido" @aceptar="cerrarEstadisticaManual" @cerrar="cerrarDialog"/>
  </v-row>
  
</template>

<script setup>
  import MarcadorBalonmano from '@/components/balonmano/MarcadorBalonmano.vue'
  import JugadorBalonmano from '@/components/balonmano/JugadorBalonmano.vue'
  import JugadorBalonmanoSolo from '@/components/balonmano/JugadorBalonmanoSolo.vue'
  import PrePartidoBalonmano from '@/components/balonmano/PrePartidoBalonmano.vue'
  import PorteroBalonmano from '@/components/balonmano/PorteroBalonmano.vue'
  import IntroducirEstadisticaManual from '@/components/balonmano/IntroducirEstadisticaManual.vue'
  import UltimoJugador from '@/components/balonmano/UltimoJugador.vue'
  import EstadisticasComparacionEquiposLT from '@/components/balonmano/EstadisticasComparacionEquiposLT.vue'

  import { storeToRefs } from "pinia"
  import { useBalonmanoStore } from "../../store/balonmano"
  import { useSwiftConnectionStore } from "../../store/swiftConnection"
  import { computed, onBeforeMount, onBeforeUnmount, onMounted, ref, watch } from "vue"
  import TecnicoBalonmano from '@/components/balonmano/TecnicoBalonmano.vue'
  import BotonLive from "@/components/simple/botonLive.vue"
  import { useEventListener } from '@/composables/event'


  const balonmanoStore = useBalonmanoStore()
  const swiftConnectionStore = useSwiftConnectionStore()

  const { marcador, partido, tipoEquipo, ultimoJugador, tipo, editando } = storeToRefs(balonmanoStore)
  const { rtRemote } = storeToRefs(swiftConnectionStore)


  if(!rtRemote.value) swiftConnectionStore.startConnection()



  // const foco = e => editando = e
  const foco = e => balonmanoStore.setEditando(e)
  // let editando = false

  const addEstadisticaManual = ref(false)
  const tipoEstadisticaManual = ref(null)

  const cerrarEstadisticaManual = val => {
    balonmanoStore.setEstadisticaManual(val)
    balonmanoStore.setUltimoJugador(val)
    // addEstadisticaManual.value = false
  }

  const cerrarDialog = () => {
    
    dialog.value = false
    numJugador.value = null
    numEquipo.value = null
    numEstadistica.value = 1
    addEstadisticaManual.value = false
  }
  
  const limpiar = equipo => {
    dorsalBuscado.value[equipo] = null
  }

  const filtroJugadorLocal = dorsal => {
    return partido.value.local.jugadores.find(el => el.dorsal === dorsal)
  }


  const activarTiempoMuertoLT = data => {
    const equipo = data.nombre.toLowerCase().split(" ")[1]
    
    if(data.live) {
      swiftConnectionStore.playGraphic('TIEMPO_MUERTO_LT')
      swiftConnectionStore.cueGraphic('TIEMPO_MUERTO_LT')
      swiftConnectionStore.rtRemote.updateFields("TIEMPO_MUERTO_LT::ESCUDOSHDR", "Shader", partido.value[equipo].escudo)
      swiftConnectionStore.rtRemote.updateFields("TIEMPO_MUERTO_LT::LINEA_BOTTEXT","String", partido.value[equipo].nombre.toUpperCase())

      swiftConnectionStore.bringOn('TIEMPO_MUERTO_LT')
    } else {
      swiftConnectionStore.takeOff('TIEMPO_MUERTO_LT')
    }
  }

  const resetEstadisticasEquipo = () => {
    partido.value.local.estadistica_equipo = {
      goles: 0,
      tiros: 0,
      paradas: 0,
      penalti7m_efectuados: 0,
      penalti7m_anotados: 0,
      suspensiones: 0,
      tarjetas_amarillas: 0,
      tarjetas_rojas: 0,
      tarjetas_azules: 0
    }
    partido.value.visitante.estadistica_equipo = {
      goles: 0,
      tiros: 0,
      paradas: 0,
      penalti7m_efectuados: 0,
      penalti7m_anotados: 0,
      suspensiones: 0,
      tarjetas_amarillas: 0,
      tarjetas_rojas: 0,
      tarjetas_azules: 0
    }
    balonmanoStore.guardarPartido()

  }

  // resetEstadisticasEquipo()
  

  
  
  const dorsalBuscado = ref({
      local: null,
      visitante: null
    })

  const jugadorBuscado = equipo => partido.value[equipo].jugadores.find(jug => jug.dorsal == parseInt(dorsalBuscado.value[equipo]))
  const porteros = equipo => partido.value[equipo].jugadores.filter(jug => jug.portero)



  const dialog = ref(false)
  const numJugador = ref(null)
  const numEquipo = ref(null)

  const numEstadistica = ref(1)

  const jugadorManual = ref(null)
  let equipoManual = null


  // const liveBtn = ref({
  //   statsTiros: false,
  //   statsParadas: false,
  //   stats7m: false,
  //   statsTotalShots: false,
  //   statsShotsOnGoal: false,
  //   statsSuspensionMinutes: false,
  // })
  const porcentaje = (a,b) => {
    if(b === 0) return "0%"
    const valor = Math.round(a/b*100)
    return `${valor}%`
  }


  const keydownHandler = e => {
      
      if(editando.value) return
      const tecla = e.key.toUpperCase()
      
      switch (tecla) {
        case "G":
          addEstadisticaManual.value = true
          tipoEstadisticaManual.value = "goles"
          dialog.value = true
          dorsalBuscado.value.local = null
          dorsalBuscado.value.visitante = null
          break;
        case "P":
          addEstadisticaManual.value = true
          tipoEstadisticaManual.value = "parada"
          dialog.value = true
          dorsalBuscado.value.local = null
          dorsalBuscado.value.visitante = null
          break;
        case "T":
          addEstadisticaManual.value = true
          tipoEstadisticaManual.value = "tiro"
          dialog.value = true
          dorsalBuscado.value.local = null
          dorsalBuscado.value.visitante = null
          break;
        case "H":
          addEstadisticaManual.value = true
          tipoEstadisticaManual.value = "7metros"
          dialog.value = true
          dorsalBuscado.value.local = null
          dorsalBuscado.value.visitante = null
          break;
        case "Y":
          addEstadisticaManual.value = true
          tipoEstadisticaManual.value = "tiro7metros"
          dialog.value = true
          dorsalBuscado.value.local = null
          dorsalBuscado.value.visitante = null
          break;
        case "E":
          addEstadisticaManual.value = true
          tipoEstadisticaManual.value = "suspensiones"
          dialog.value = true
          dorsalBuscado.value.local = null
          dorsalBuscado.value.visitante = null
          break;
        case "A":
          balonmanoStore.setMarcadorManual({tipo: "MARCADOR"})
          break;
        case "S":
          balonmanoStore.setMarcadorManual({tipo: "CLOCK PAUSE"})
          break;
        // case "D":
        //   balonmanoStore.setMarcadorManual({tipo: "CLOCK STOP"})
        //   break;
        case "D":
          balonmanoStore.setMarcadorManual({tipo: "CLOCK RESET"})
          break;
        case "Q":
          balonmanoStore.setMarcadorManual({tipo: "EMPTY GOAL HOME"})
          break;
        case "W":
          balonmanoStore.setMarcadorManual({tipo: "EMPTY GOAL AWAY"})
          break;
        case " ":
          e.preventDefault()
          break;
        default:
          console.log("Ninguna acción asignada a la tecla " + tecla)
      }
    }

  useEventListener(document, 'keydown', e => keydownHandler(e))

</script>