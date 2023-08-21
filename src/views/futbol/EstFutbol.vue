<template>
  <!-- {{ equipo_local }} -->
  <!-- <div v-if="cargando_equipos || cargando_partidos " class="text-center" style="margin-top:200px;"> -->
  <div v-if="!partido" class="text-center" style="margin-top:200px;">
    <v-progress-circular
      indeterminate
      color="primary"
      size="50"
    ></v-progress-circular>
  </div>
  <!-- <div v-if="!cargando_equipos && !cargando_partidos"> -->
  <div v-if="partido && marcador" class="mb-4 pb-4">
    <!-- {{ partido }} -->
      <v-row>
        <v-col cols="12">
          <MarcadorFutbol :marcador = "marcador" :tiempo="partido.tiempo" @updateDB="updateDB"/>
        </v-col>
      </v-row>
       <v-row>
        <v-col cols="5" class="izquierda">
          <v-row>
            <v-col cols="12" class="text-center">
              <h4 >{{ partido.equipo_local.nombre_equipo}}</h4>
            </v-col>
            <v-col cols="3" class="text-center recuadro">
              <p>GOLES:</p>
              <p>{{ golesLocalTotales }}</p>
            </v-col>
            <v-col cols="3" class="text-center recuadro">
              <p>DISPAROS A PUERTA:</p>
              <p>{{ disparosLocalTotal }}</p>
              <BotonLive nombre="DISPAROS" @activar="activarGrafico"/>
            </v-col>
            <v-col cols="3" class="text-center recuadro">
              <p>TARJETAS AMARILLAS:</p>
              <p>{{ taLocalTotales }}</p>
              <BotonLive nombre="TAR. AMARILLAS" @activar="activarGrafico"/>
            </v-col>
            <v-col cols="3" class="text-center recuadro">
              <p>TARJETAS ROJAS:</p>
              <p>{{ trLocalTotales }}</p>
              <BotonLive nombre="TAR. ROJAS" @activar="activarGrafico"/>
            </v-col>
            <v-col cols="3" class="text-center recuadro">
              <p>FALTAS:</p>
              <p>{{ faltasLocalTotales }}</p>
              <BotonLive nombre="FALTAS" @activar="activarGrafico"/>
            </v-col>
            <v-col cols="6" class="text-center recuadro">
              <v-row>
                <v-col cols="6">
                  <p>FUERAS DE JUEGO</p>
                  <p>{{ fueraJuegoLocal}}</p>
                  <BotonLive nombre="FUERA JUEGO" @activar="activarGrafico"/>
                </v-col>
                <v-col cols="6">
                  <v-btn size="x-small" color="success" @click="fueraDeJuego('local',1)">+</v-btn>
                  <v-btn size="x-small" color="error" @click="fueraDeJuego('local',-1)">-</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6"  align="center">
              <p>Buscar dorsal</p>
              <v-select label="Dorsal" :items="listadoDorsalesLocal" v-model="dorsalLocal" density="compact"></v-select>
            </v-col>
            <v-col cols="6">
              <v-btn color="error" size="x-small" @click="limpiarDorsal('local')">X</v-btn>
            </v-col>
            <v-row>
                <v-col v-if="dorsalLocal !== null" cols="12">
                  <JugadorFutbolInd :jugador="listadoLocal[0]" :fondo="'local'" :temporizador="marcador.temporizador" class="ml-4" @test="test"/>
                </v-col>
                <v-col v-else v-for="jugador in equipo_local.jugadores" :key="jugador.id_jugador" cols="12" class="clearMargin">
                  <JugadorFutbolInd :jugador = "jugador" :id_jugador = "jugador.id_jugador" :fondo="'local'" :temporizador="marcador.temporizador" class="ml-4"/>
                </v-col>
            </v-row>
            <v-row class="pt-2">
              <v-col cols="12">
                <h4>Cos tècnic</h4>
              </v-col>
              <v-col cols="12" class="py-2" v-for="tecnico in equipo_local.cuerpo_tecnico" :id="tecnico.id_cuerpo_tecnico">
                <div v-if="tecnico.nombre">
                  <CuerpoTecnicoIndividual :titulo="tecnico.titulo" :nombre="tecnico.nombre" />
                </div>
              </v-col>
            </v-row>
          </v-row>
        </v-col>
        <v-col cols="2" class="text-center">
          <!-- <v-btn color="success" @click="estFinales">TEST</v-btn> -->
          <p>Estadístiques finals</p>
          <BotonLive nombre="EST_FINAL" @activar="estFinales"/>
        </v-col>
        <v-col cols="5" class="derecha">
          <v-row>
            <v-col cols="12" class="text-center">
              <h4 >{{ equipo_visitante.nombre_equipo }}</h4>
            </v-col>
            <v-col cols="3" class="text-center recuadro">
              <p>GOLES:</p>
              <p>{{ golesVisitanteTotales }}</p>
            </v-col>
            <v-col cols="3" class="text-center recuadro">
              <p>DISPAROS A PUERTA:</p>
              <p>{{ disparosVisitantelTotal }}</p>
              <BotonLive nombre="DISPAROS" @activar="activarGrafico"/>
            </v-col>
            <v-col cols="3" class="text-center recuadro">
              <p>TARJETAS AMARILLAS:</p>
              <p>{{ taVisitanteTotales }}</p>
              <BotonLive nombre="TAR. AMARILLAS" @activar="activarGrafico"/>
            </v-col>
            <v-col cols="3" class="text-center recuadro">
              <p>TARJETAS ROJAS:</p>
              <p>{{ trVisitanteTotales }}</p>
              <BotonLive nombre="TAR. ROJAS" @activar="activarGrafico"/>
            </v-col>
            <v-col cols="3" class="text-center recuadro">
              <p>FALTAS:</p>
              <p>{{ faltasVisitanteTotales }}</p>
              <BotonLive nombre="FALTAS" @activar="activarGrafico"/>
            </v-col>
            <v-col cols="6" class="text-center recuadro">
              <v-row>
                <v-col cols="6">
                  <p>FUERAS DE JUEGO</p>
                  <p>{{ fueraJuegoVisitante}}</p>
                  <BotonLive nombre="FUERA JUEGO" @activar="activarGrafico"/>
                </v-col>
                <v-col cols="6">
                  <v-btn size="x-small" color="success" @click="fueraDeJuego('visitante',1)">+</v-btn>
                  <v-btn size="x-small" color="error" @click="fueraDeJuego('visitante',-1)">-</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6"  align="center">
              <p>Buscar dorsal</p>
              <v-select label="Dorsal" :items="listadoDorsalesVisitante" v-model="dorsalVisitante" density="compact"></v-select>
            </v-col>
            <v-col cols="6">
              <v-btn color="error" size="x-small" @click="limpiarDorsal('visitante')">X</v-btn>
            </v-col>
            <v-row class="clearMargin">
                <v-col v-if="dorsalVisitante !== null" cols="12" class="mr-2">
                  <JugadorFutbolInd :jugador="listadoVisitante[0]" :fondo="'visitante'" :temporizador="marcador.temporizador"/>
                </v-col>
                <v-col v-else v-for="jugador in equipo_visitante.jugadores" :key="jugador.id_jugador" cols="12" class="clearMargin">
                  <JugadorFutbolInd  :jugador = "jugador" :id_jugador = "jugador.id_jugador" :fondo="'visitante'" :temporizador="marcador.temporizador" class="mr-2"/>
                </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <h4>Cos tècnic</h4>
              </v-col>
              <v-col cols="12" v-for="tecnico in equipo_visitante.cuerpo_tecnico" :id="tecnico.id_cuerpo_tecnico">
                <div v-if="tecnico.nombre">
                  <CuerpoTecnicoIndividual :titulo="tecnico.titulo" :nombre="tecnico.nombre"/>
                </div>
              </v-col>
            </v-row>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center">
          <h3>Àrbitres</h3>
          <BotonLive nombre="DSK_ARBITROS" @activar="dskArbitros"/>
        </v-col>
        <v-col cols="3">
          <CuerpoTecnicoIndividual :nombre="partido.equipo_arbitral.primer_arbitro" :titulo="'Primer àrbitre'" />
        </v-col>
        <v-col cols="3">
          <CuerpoTecnicoIndividual :nombre="partido.equipo_arbitral.segundo_arbitro" :titulo="'Segon àrbitre'"/>
        </v-col>
        <v-col cols="3">
          <CuerpoTecnicoIndividual :nombre="partido.equipo_arbitral.tercer_arbitro" :titulo="'Tercer àrbitre'"/>
        </v-col>
        <v-col cols="3">
          <CuerpoTecnicoIndividual :nombre="partido.equipo_arbitral.cuarto_arbitro" :titulo="'Quart àrbitre'"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <v-btn color="success" @click="volver">INICI</v-btn>
          <v-btn color="success" @click="resumen">RESUM</v-btn>          
        </v-col>
      </v-row>
  
  </div>
  
      
</template>


<script setup>

import { useRoute, useRouter } from 'vue-router';

import { defineAsyncComponent } from 'vue';


import Visor from '@/components/visor/Visor.vue'
// import MarcadorFutbol from '@/components/futbol/MarcadorFutbol'
// import JugadorFutbolInd from '@/components/futbol/JugadorFutbolInd'

import { useSwiftConnectionStore } from "../../store/swiftConnection"

import { usegFutbolStore } from "../../store/futbol"
import { computed, ref,  onBeforeMount, onMounted } from 'vue';
import { storeToRefs } from "pinia";
import { watch } from 'vue';

import BotonLive from '@/components/simple/botonLive.vue' 

const MarcadorFutbol = defineAsyncComponent(() => import('@/components/futbol/MarcadorFutbol'))
const JugadorFutbolInd = defineAsyncComponent(() => import('@/components/futbol/JugadorFutbolInd'))
const CuerpoTecnicoIndividual = defineAsyncComponent(() => import('@/components/futbol/CuerpoTecnicoIndividual'))
const ArbitroIndividual = defineAsyncComponent(() => import('@/components/futbol/ArbitroIndividual'))

const swiftConnectionStore = useSwiftConnectionStore()
const futbolStore = usegFutbolStore()

const route = useRoute()
const router = useRouter()

const id = route.params.id

const { partidos, partido_cargado, marcadores } = storeToRefs(futbolStore)

if(!partido_cargado.value) {
  futbolStore.setPartidoEnJuego(id)
}

const partido = computed(() => {
  return partidos.value.find( el => {
    return el.id_partido == id
  })
})
const marcador = computed(() => {
  return marcadores.value.find( el => {
    return el.id_partido == id
  })
})

// BUSCAR EQUIPOS

let equipo_local = computed(() => partido.value.equipo_local)
let equipo_visitante = computed(() => partido.value.equipo_visitante)


// AÑADIR JUGADORES
/*
let jugadoresLocal = []
let jugadoresVisitante = []

 equipo_local.jugadores.forEach(jug => {
  // console.log(jug)
  let nuevoJugador = futbolStore.buscarJugador(jug)
  // console.log(nuevoJugador)
  nuevoJugador.estadistica = {
      tarjetas_amarillas: 0,
      tarjeta_roja: 0,
      goles: 0,
      faltas: 0,
      disparos: 0,
      disparos_al_arco: 0
    }
  jugadoresLocal.push(nuevoJugador)
})

equipo_visitante.jugadores.forEach(jug => {
  let nuevoJugador = futbolStore.buscarJugador(jug)
  nuevoJugador.estadistica = {
      tarjetas_amarillas: 0,
      tarjeta_roja: 0,
      goles: 0,
      faltas: 0,
      disparos: 0,
      disparos_al_arco: 0
    }
  jugadoresVisitante.push(nuevoJugador)
})

// REEMPLAZAR JUGADORES

equipo_local.jugadores = jugadoresLocal
equipo_visitante.jugadores = jugadoresVisitante

console.log(equipo_local) */




let dorsalLocal = ref(null)
let dorsalVisitante = ref(null)

const listadoDorsalesLocal = computed(() => {
  let temp = []
  equipo_local.value.jugadores.forEach(jugador => {
    temp.push(jugador.numero)
  })
  return temp
})
const listadoLocal = computed(() => {
  if(dorsalLocal.value !== null) {
    return equipo_local.value.jugadores.filter(jugador => {
      return jugador.numero == dorsalLocal.value
    })
  } else {
    return equipo_local.value
  }
})
const listadoDorsalesVisitante = computed(() => {
  let temp = []
  equipo_visitante.value.jugadores.forEach(jugador => {
    temp.push(jugador.numero)
  })
  return temp
})
const listadoVisitante = computed(() => {
  if(dorsalVisitante.value !== null) {
    return equipo_visitante.value.jugadores.filter(jugador => {
      return jugador.numero == dorsalVisitante.value
    })
  } else {
    return equipo_visitante.value
  }
})

const limpiarDorsal = (equipo) => {
  if (equipo == 'local') {
    dorsalLocal.value = null
  } else if (equipo == 'visitante') {
    dorsalVisitante.value = null
  }
}

const estadisticasTotales = (jugadores, estadistica) => {
  return jugadores.reduce((total, jugador) => total + jugador.estadistica[estadistica], 0);
};
const golesTotales = jugadores => {
  return  jugadores.reduce((total, jugador) => total += jugador.estadistica.goles.length, 0)
}

const fueraDeJuego = (equipo, val) => {
  // console.log(equipo_local.value)
  if (equipo === 'local') equipo_local.value.estadistica_equipo.fueras_de_juego += val
  if (equipo === 'visitante') equipo_visitante.value.estadistica_equipo.fueras_de_juego += val
  updateDB()
}

const fueraJuegoLocal = computed(() => equipo_local.value.estadistica_equipo.fueras_de_juego)
const fueraJuegoVisitante = computed(() => equipo_visitante.value.estadistica_equipo.fueras_de_juego)

const golesLocalTotales = computed(() => golesTotales(equipo_local.value.jugadores))
const taLocalTotales = computed(() => estadisticasTotales(equipo_local.value.jugadores, 'tarjetas_amarillas'))
const trLocalTotales = computed(() => estadisticasTotales(equipo_local.value.jugadores, 'tarjeta_roja'))
const faltasLocalTotales = computed(() => estadisticasTotales(equipo_local.value.jugadores, 'faltas'))

const golesVisitanteTotales = computed(() => golesTotales(equipo_visitante.value.jugadores))
const taVisitanteTotales = computed(() => estadisticasTotales(equipo_visitante.value.jugadores, 'tarjetas_amarillas'));
const trVisitanteTotales = computed(() => estadisticasTotales(equipo_visitante.value.jugadores, 'tarjeta_roja'));
const faltasVisitanteTotales = computed(() => estadisticasTotales(equipo_visitante.value.jugadores, 'faltas'));

const disparosTotales = (jugadores, estadistica1, estadistica2) => {
  const total = estadisticasTotales(jugadores, estadistica1);
  const totalAPuerta = estadisticasTotales(jugadores, estadistica2);
  return `${totalAPuerta} / ${total}`;
};

const disparosLocalTotal = computed(() => disparosTotales(equipo_local.value.jugadores, 'disparos', 'disparos_al_arco'));
const disparosVisitantelTotal = computed(() => disparosTotales(equipo_visitante.value.jugadores, 'disparos', 'disparos_al_arco'));


const dispLocalTotal = computed (() =>estadisticasTotales(equipo_local.value.jugadores, 'disparos'))
const dispAlArcoLocalTotal = computed (() =>estadisticasTotales(equipo_local.value.jugadores, 'disparos_al_arco'))

const dispVisitanteTotal = computed (() =>estadisticasTotales(equipo_visitante.value.jugadores, 'disparos'))
const dispVisitanteAlArcoTotal = computed (() =>estadisticasTotales(equipo_visitante.value.jugadores, 'disparos_al_arco'))


const updateDB = () => {
  console.log(partido.value)
  partido.value.id_partido = id
  futbolStore.editarPartido(partido.value)
}

const estFinales = (metodo) => {
  // console.log(metodo)
  const valoresLocal = `0%~${dispLocalTotal.value}~${dispAlArcoLocalTotal.value}~${faltasLocalTotales.value}~${taLocalTotales.value}~${trLocalTotales.value}~0`
  const valoresVisitante = `0%~${dispVisitanteTotal.value}~${dispVisitanteAlArcoTotal.value}~${faltasVisitanteTotales.value}~${taVisitanteTotales.value}~${trVisitanteTotales.value}~0`
  // console.log(valoresVisitante)
  if(metodo.live) {
    // swiftConnectionStore.rtRemote.startTransaction ()
    swiftConnectionStore.cueGraphic(metodo.nombre)
    // swiftConnectionStore.rtRemote.playMethod("EST_FINAL::cueGraphic")
    swiftConnectionStore.rtRemote.updateFields("NOMBRE_LOCAL::NOMBRE_LOCALTEXT", "String", equipo_local.value.nombre_equipo)
    swiftConnectionStore.rtRemote.updateFields("NOMBRE_VISITANTE::NOMBRE_VISITANTETEXT", "String", equipo_visitante.value.nombre_equipo)
    swiftConnectionStore.rtRemote.updateFields("GOLES_LOCAL::GOLES_LOCALTEXT", "String", golesLocalTotales.value)
    swiftConnectionStore.rtRemote.updateFields("GOLES_VISITANTE::GOLES_VISITANTETEXT", "String", golesVisitanteTotales.value)
    swiftConnectionStore.rtRemote.updateFields("EST_LOCAL::EST_LOCALTEXT", "String", valoresLocal)
    swiftConnectionStore.rtRemote.updateFields("EST_VISITANTE::EST_VISITANTETEXT", "String", valoresVisitante)
    // swiftConnectionStore.rtRemote.playMethod("EST_FINAL::bringOn")
    // swiftConnectionStore.rtRemote.endTransaction ()
    
    swiftConnectionStore.bringOn(metodo.nombre)

  } else {
    swiftConnectionStore.takeOff(metodo.nombre)
  }


}

const dskArbitros = (metodo) => {
  console.log(metodo)
  const arbitros = partido.value.equipo_arbitral

  if(metodo.live) {
    
    swiftConnectionStore.cueGraphic(metodo.nombre)
    
    swiftConnectionStore.rtRemote.updateFields("DSK_ARBITROS::PRIMER_ARBITROTEXT", "String", arbitros.primer_arbitro)
    swiftConnectionStore.rtRemote.updateFields("DSK_ARBITROS::SEGUNDO_ARBITROTEXT", "String", arbitros.segundo_arbitro)
    swiftConnectionStore.rtRemote.updateFields("DSK_ARBITROS::TERCER_ARBITROTEXT", "String", arbitros.tercer_arbitro)
    swiftConnectionStore.rtRemote.updateFields("DSK_ARBITROS::CUARTO_ARBITROTEXT", "String", arbitros.cuarto_arbitro)
    swiftConnectionStore.rtRemote.updateFields("DSK_ARBITROS::COMPETICIONTEXT", "String", partido.value.competicion)
    
    swiftConnectionStore.bringOn(metodo.nombre)

  } else {
    swiftConnectionStore.takeOff(metodo.nombre)
  }

}

const activarGrafico = payload => {
    console.log(payload)
    let tipo
    const local = equipo_local.value.estadistica_equipo
    let valor_local
    const visitante = equipo_visitante.value.estadistica_equipo
    let valor_visitante

    switch (payload.nombre) {
      case "DISPAROS": 
        tipo = "Disparos"
        valor_local = `${local.disparos} / ${local.disparos_al_arco}`
        valor_visitante = `${visitante.disparos} / ${visitante.disparos_al_arco}`
        break

        case "TAR. AMARILLAS":
          tipo = "Targetes grogues"
          valor_local = taLocalTotales.value
          valor_visitante = taVisitanteTotales.value
          break
        
        case "TAR. ROJAS":
          tipo = "Targetes rojes"
          valor_local = trLocalTotales.value
          valor_visitante = trVisitanteTotales.value
          break

        case "FALTAS":
          tipo = "Faltes"
          valor_local = faltasLocalTotales.value
          valor_visitante = faltasVisitanteTotales.value
          break

        case "FUERA JUEGO":
          tipo = "Disparos"
          valor_local = local.fueras_de_juego
          valor_visitante = visitante.fueras_de_juego
          break

        default:
          tipo = "-"
          valor_local = "-"
          valor_visitante = "-"
          break







    }
    if (payload.live) {
      swiftConnectionStore.cueGraphic('EST_EQUIPOS')
      swiftConnectionStore.rtRemote.updateFields("EST_EQUIPOS::EQUIPO_LOCALTEXT", "String", equipo_local.value.nombre_equipo)
      swiftConnectionStore.rtRemote.updateFields("EST_EQUIPOS::EQUIPO_VISITANTETEXT", "String", equipo_visitante.value.nombre_equipo)
      swiftConnectionStore.rtRemote.updateFields("EST_EQUIPOS::TIPO_ESTTEXT", "String", tipo)
      swiftConnectionStore.rtRemote.updateFields("EST_EQUIPOS::VALOR_LOCALTEXT", "String", valor_local)
      swiftConnectionStore.rtRemote.updateFields("EST_EQUIPOS::VALOR_VISITANTETEXT", "String", valor_visitante)

      swiftConnectionStore.bringOn('EST_EQUIPOS')
    } else {
      swiftConnectionStore.takeOff('EST_EQUIPOS')
    }
  }

/* const golesLocalTotales = computed(() => {
  let goles = 0
  equipo_local.jugadores.forEach(jug => {
    goles += jug.estadistica.goles
  })
  return goles
}) */

/* const taLocalTotales = computed(() => {
  let ta = 0
  equipo_local.jugadores.forEach(jug => {
    ta += jug.estadistica.tarjetas_amarillas
  })
  return ta
})
const trLocalTotales = computed(() => {
  let tr = 0
  equipo_local.jugadores.forEach(jug => {
    tr += jug.estadistica.tarjeta_roja
  })
  return tr
})
const faltasLocalTotales = computed(() => {
  let faltas = 0
  equipo_local.jugadores.forEach(jug => {
    faltas += jug.estadistica.faltas
  })
  return faltas
}) 
const golesVisitanteTotales = computed(() => {
  let goles = 0
  equipo_visitante.jugadores.forEach(jug => {
    goles += jug.estadistica.goles
  })
  return goles
})

const taVisitanteTotales = computed(() => {
  let ta = 0
  equipo_visitante.jugadores.forEach(jug => {
    ta += jug.estadistica.tarjetas_amarillas
  })
  return ta
})
const trVisitanteTotales = computed(() => {
  let tr = 0
  equipo_visitante.jugadores.forEach(jug => {
    tr += jug.estadistica.tarjeta_roja
  })
  return tr
})
const faltasVisitanteTotales = computed(() => {
  let faltas = 0
  equipo_visitante.jugadores.forEach(jug => {
    faltas += jug.estadistica.faltas
  })
  return faltas
})*/

/* const disparosLocalTotal = computed(() => {
  let disparos = 0
  equipo_local.jugadores.forEach(jug => {
    disparos += jug.estadistica.disparos
  })
  let disparosAPuerta = 0
  equipo_local.jugadores.forEach(jug => {
    disparosAPuerta += jug.estadistica.disparos_al_arco
  })
  return disparosAPuerta + " / " +  disparos
})
const disparosVisitantelTotal = computed(() => {
  let disparos = 0
  equipo_visitante.jugadores.forEach(jug => {
    disparos += jug.estadistica.disparos
  })
  let disparosAPuerta = 0
  equipo_visitante.jugadores.forEach(jug => {
    disparosAPuerta += jug.estadistica.disparos_al_arco
  })
  return disparosAPuerta + " / " +  disparos
}) */


/* watch(() => partido, val => {
  console.log(val.value)
},{
  deep: true
}) */

const mostrarEstadistica = (estadistica)=> {
  console.log(estadistica)
}

const volver = () => router.push('/futbol')

const resumen = () => router.push('/futbol/resumenfutbol/'+id)

</script> 
<style scoped>
.clearMargin {
  padding: 0 12px !important;
  border: 0 1px ;
  border-color: white;
}
p {
  font-size: 11px;
}

.izquierda {
  padding-left: 80px;
}
.derecha {
  padding-right: 80px;
}
.recuadro {
  border: 1px solid white;
}

  
</style>
