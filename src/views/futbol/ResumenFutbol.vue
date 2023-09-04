<template>
  <div v-if="!partido && !marcador" class="text-center" style="margin-top:200px;">
    <v-progress-circular
      indeterminate
      color="primary"
      size="50"
    ></v-progress-circular>
  </div>
  <div v-if="partido && marcador" class="mb-4 pb-4">
     <v-row>
      <v-col cols="12" class="text-center my-4">
        <h2>RESUMEN PARTIT</h2>
      </v-col>
      <!-- <v-col cols="12" class="text-center">
        <h3>{{ partido.equipo_local.nombre_equipo }} vs {{ partido.equipo_visitante.nombre_equipo }}</h3>  
      </v-col> -->
    </v-row>

    <v-row>
      <v-col class="contenedor_tabla">
        <v-table
        class="tabla">
          <thead>
            <tr>
              <th class="primera"></th>
              <th class="text-center text-h5 py-4">
                <p class="text-uppercase font-weight-black">{{ partido.equipo_local.nombre_equipo }}</p>
              </th>
              <th class="text-center text-h5">
                <p class="text-uppercase font-weight-black">{{ partido.equipo_visitante.nombre_equipo }}</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p class="font-weight-black">GOLS</p>
              </td>
              <td class="text-center text-h5">{{ golesLocalTotales }}</td>
              <td class="text-center text-h5">{{ golesVisitanteTotales }}</td>
            </tr>
            <tr v-if="golesLocalTotales > 0 || golesVisitanteTotales > 0">
              <td>
                <p class="font-weight-black">GOLEJADORS</p>
              </td>
              <td class="text-center celda">
                <div v-for="jugador in maxGoleadorLocal" :key="jugador.id_jugador">
                  <v-row>
                    <v-col cols="12" class="text-center">
                      <span v-for="gol in jugador.estadistica.goles">
                        <p class="text-h6">{{ jugador.numero }} -  {{ jugador.apodo }} ({{ millisToMinutes(gol) }})</p>
                      </span>
                    </v-col>
                  </v-row>
                </div>
              </td>
              <td class="text-center celda">
                <div v-for="jugador in maxGoleadorVisitante" :key="jugador.id_jugador">
                  <v-row>
                    <v-col cols="12" class="text-center">
                      <span v-for="gol in jugador.estadistica.goles">
                        <p class="text-h6">{{ jugador.numero }} -  {{ jugador.apodo }} ({{ millisToMinutes(gol) }})</p>
                      </span>
                    </v-col>
                  </v-row>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <p class="font-weight-black">POSESSIÓ</p>
              </td>
              <td class="text-center text-h5">{{ posesion_local }}</td>
              <td class="text-center text-h5">{{ posesion_visitante }}</td>
            </tr>
            <tr>
              <td>
                <p class="font-weight-black">DISPAROS</p>
              </td>
              <td class="text-center text-h5">{{ disparosLocalTotal }}</td>
              <td class="text-center text-h5">{{ disparosVisitanteTotal }}</td>
            </tr>
            <tr>
              <td>
                <p class="font-weight-black">TARGETES GROGUES</p>
              </td>
              <td class="text-center text-h5">{{ taLocalTotales }}</td>
              <td class="text-center text-h5">{{ taVisitanteTotales }}</td>
            </tr>
            <tr v-if="taVisitanteTotales > 0 || taLocalTotales > 0">
              <td></td>
              <td>
                <div v-for="jugador in tarAmarillaLocal" :key="jugador.id_jugador">
                  <v-row>
                    <v-col  cols="12" class="text-center">
                      <p class="text-h6">{{ jugador.numero }} -  {{ jugador.apodo }} ({{ jugador.estadistica.tarjetas_amarillas }})</p>
                    </v-col>
                  </v-row>
                </div>
              </td>
              <td>
                <div v-for="jugador in tarAmarillaVisitante" :key="jugador.id_jugador">
                  <v-row>
                    <v-col  cols="12" class="text-center">
                      <p class="text-h6">{{ jugador.numero }} -  {{ jugador.apodo }} ({{ jugador.estadistica.tarjetas_amarillas }})</p>
                    </v-col>
                  </v-row>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <p class="font-weight-black">TARGETES ROJES</p>
              </td>
              <td class="text-center text-h5">{{ trLocalTotales }}</td>
              <td class="text-center text-h5">{{ trVisitanteTotales }}</td>
            </tr>
            <tr v-if="trVisitanteTotales > 0 || trLocalTotales > 0">
              <td></td>
              <td>
                <div v-for="jugador in tarRojaLocal" :key="jugador.id_jugador">
                  <v-row>
                    <v-col  cols="12" class="text-center">
                      <p class="text-h6">{{ jugador.numero }} -  {{ jugador.apodo }} ({{ jugador.estadistica.tarjeta_roja }})</p>
                    </v-col>
                  </v-row>
                </div>
              </td>
              <td>
                <div v-for="jugador in tarRojaVisitante" :key="jugador.id_jugador">
                  <v-row>
                    <v-col  cols="12" class="text-center">
                      <p class="text-h6">{{ jugador.numero }} -  {{ jugador.apodo }} ({{ jugador.estadistica.tarjeta_roja }})</p>
                    </v-col>
                  </v-row>
                </div>
              </td>
              
            </tr>
            <tr>
              <td>
                <p class="font-weight-black">FALTES</p>
              </td>
              <td class="text-center text-h5">{{ faltasLocalTotales }}</td>
              <td class="text-center text-h5">{{ faltasVisitanteTotales }}</td>
            </tr>
            <tr>
              <td>
                <p class="font-weight-black">FORES DE JOC</p>
              </td>
              <td class="text-center text-h5">{{ fueraJuegoLocal }}</td>
              <td class="text-center text-h5">{{ fueraJuegoVisitante }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ListaRotulos />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-btn color="success" @click="volver">INICI</v-btn>
        <v-btn color="success" @click="irEstadistica">ESTADISTICA</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>

  import { useRoute, useRouter } from 'vue-router'
  import { usegFutbolStore } from "../../store/futbol"
  import { computed, ref, watch } from 'vue'
  import { storeToRefs } from 'pinia'

  import { defineAsyncComponent } from 'vue';

  const ListaRotulos = defineAsyncComponent(() => import('@/components/rotulos/ListaRotulos'))


  const route = useRoute()
  const router = useRouter()
  const id = route.params.id

  const futbolStore = usegFutbolStore()
  const { partidos, cargando_partidos } = storeToRefs(futbolStore)
  


  // const partido = computed(() => {
  //   return partidos.value.find( el => {
  //     return el.id_partido == id
  //   })
  // })

  const partido = computed(() => futbolStore.buscarPartido(id))
  const marcador = computed(() => futbolStore.buscarMarcador(id))
  // const inicio = () => {
  //   console.log(m.temporizador.tiempo.primera)
  //   return m.temporizador.tiempo.primera
  // }

  // const inicio = marcador.temporizador.tiempo.primera

  

  const equipo_local = ref(null)
  const equipo_visitante = ref(null)
  const jugadoresLocal = ref(null)
  const jugadoresVisitante = ref(null)
  const posesion = ref(null)

  const posesion_local = computed(() => {
    const posesionTotal = marcador.value.temporizador.posesion.local + marcador.value.temporizador.posesion.visitante
    return Math.round(marcador.value.temporizador.posesion.local / posesionTotal * 100) + " %"
  })
  const posesion_visitante = computed(() => {
    const posesionTotal = marcador.value.temporizador.posesion.local + marcador.value.temporizador.posesion.visitante
    return Math.round(marcador.value.temporizador.posesion.visitante / posesionTotal * 100) + " %"
  })
  // const inicio = ref(null)
  // const equipo_local = computed(() => {
  //   if(!partido) return false
  //   return partido.value.equipo_local})
  // const equipo_visitante = computed(() => partido.value.equipo_visitante)

  const estadisticasTotales = (jugadores, estadistica) => {
    return jugadores.reduce((total, jugador) => total + jugador.estadistica[estadistica], 0);
  };

  const golesTotales = jugadores => {
  return  jugadores.reduce((total, jugador) => total += jugador.estadistica.goles.length, 0)
  } 

  

  const golesLocalTotales = computed(() => golesTotales(partido.value.equipo_local.jugadores))
  const taLocalTotales = computed(() => estadisticasTotales(partido.value.equipo_local.jugadores, 'tarjetas_amarillas'))
  const trLocalTotales = computed(() => estadisticasTotales(partido.value.equipo_local.jugadores, 'tarjeta_roja'))
  const faltasLocalTotales = computed(() => estadisticasTotales(partido.value.equipo_local.jugadores, 'faltas'))

  const golesVisitanteTotales = computed(() => golesTotales(partido.value.equipo_visitante.jugadores))
  const taVisitanteTotales = computed(() => estadisticasTotales(partido.value.equipo_visitante.jugadores, 'tarjetas_amarillas'));
  const trVisitanteTotales = computed(() => estadisticasTotales(partido.value.equipo_visitante.jugadores, 'tarjeta_roja'));
  const faltasVisitanteTotales = computed(() => estadisticasTotales(partido.value.equipo_visitante.jugadores, 'faltas'));

  const disparosTotales = (jugadores, estadistica1, estadistica2) => {
    const total = estadisticasTotales(jugadores, estadistica1);
    const totalAPuerta = estadisticasTotales(jugadores, estadistica2);
    return `${totalAPuerta} / ${total}`;
  };

  const disparosLocalTotal = computed(() => disparosTotales(partido.value.equipo_local.jugadores, 'disparos', 'disparos_al_arco'));
  const disparosVisitanteTotal = computed(() => disparosTotales(partido.value.equipo_visitante.jugadores, 'disparos', 'disparos_al_arco'));

  
  // const jugadoresLocal = [...equipo_local.value.jugadores]
  // const jugadoresVisitante = [...equipo_visitante.value.jugadores]

  const maxGoleadorLocal = computed(() => {
    return consultaGoles(partido.value.equipo_local.jugadores)
  })
  const maxGoleadorVisitante = computed(() => {
    return consultaGoles(partido.value.equipo_visitante.jugadores, "goles")
  })

  const tarAmarillaLocal = computed(() => {
    return consulta(partido.value.equipo_local.jugadores, "tarjetas_amarillas")
  })
  const tarAmarillaVisitante = computed(() => {
    return consulta(partido.value.equipo_visitante.jugadores, "tarjetas_amarillas")
  })
  const tarRojaLocal = computed(() => {
    return consulta(partido.value.equipo_local.jugadores, "tarjeta_roja")
  })
  const tarRojaVisitante = computed(() => {
    return consulta(partido.value.equipo_visitante.jugadores, "tarjeta_roja")
  })

  const fueraJuegoLocal = computed(() => partido.value.equipo_local.estadistica_equipo.fueras_de_juego)
  const fueraJuegoVisitante = computed(() => partido.value.equipo_visitante.estadistica_equipo.fueras_de_juego)


  const consulta = (equipo, est) => {
    const filtrado = equipo.filter(jug => {
      return jug.estadistica[est] > 0
    })
    filtrado.sort((a,b) => b.estadistica.goles - a.estadistica.goles); // b - a for reverse sort
    return filtrado
  }

  const consultaGoles = equipo => {
    const filtrado = equipo.filter(jug => {
      return jug.estadistica.goles.length > 0
    })
    filtrado.sort((a,b) => b.estadistica.goles - a.estadistica.goles); // b - a for reverse sort
    return filtrado

  }
  

  const cargaPartido = (partido) => {
    equipo_local.value = partido.equipo_local
    equipo_visitante.value = partido.equipo_visitante
    jugadoresLocal.value = [...partido.equipo_local.jugadores]
    jugadoresVisitante.value = [...partido.equipo_visitante.jugadores]
    // inicio = marcador.temporizador.tiempo.primera
  }

  const cargaMarcador = marcador => {
    posesion.value = {
      local: marcador.temporizador.posesion.local,
      visitante: marcador.temporizador.posesion.visitante,
    }
  }




  // calcular tiempo de los goles
  const millisToMinutes = (millis) => {
    // const inicio = futbolStore.buscarMarcador(id).temporizador.tiempo.primera
    
    var minutes = Math.floor(millis / 60000).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    });
    
    return minutes + "'"
  }

  const volver = () => router.push('/futbol')

  const irEstadistica = () => router.push('/futbol/estfutbol/' + id)

  if(partido.value) {
    cargaPartido(partido.value)
  }

  watch(() => partido.value, partido => {
    cargaPartido(partido)
  })

  watch(() => marcador.value, marcador => {
    cargaMarcador(marcador)
    // console.log(marcador)
  })
  



</script>

<style scoped>

  .contenedor_tabla {
    display: flex;
    justify-content: center;
  }
  .fila {
    padding: 10px, 0 !important;
  }
  .tabla {
    width: 80%;
    margin: 0, auto !important;
  }
  .celda {
    margin: 10px 0;
  }

  .primera {
    width: 30%;
  }
</style>