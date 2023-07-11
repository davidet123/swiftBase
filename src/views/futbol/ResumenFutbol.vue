<template>
  {{ cargando_partidos }}
  <div v-if="cargando_partidos" class="text-center" style="margin-top:200px;">
    <v-progress-circular
      indeterminate
      color="primary"
      size="50"
    ></v-progress-circular>
  </div>
  <div v-if="!cargando_partidos" class="mb-4 pb-4">
    <v-row>
      <v-col cols="12" class="text-center">
        <h2>RESUMEN PARTIT</h2>
      </v-col>
      <v-col cols="12" class="text-center">
        <h3>{{ partido.equipo_local.nombre_equipo }} vs {{ partido.equipo_visitante.nombre_equipo }}</h3>  
      </v-col>
    </v-row>

    <v-row>
      <v-col class="contenedor_tabla">
        <v-table
        density="compact"
        class="tabla">
          <thead>
            <tr>
              <th class="primera"></th>
              <th>
                <p>{{ partido.equipo_local.nombre_equipo }}</p>
              </th>
              <th>
                <p>{{ partido.equipo_visitante.nombre_equipo }}</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GOLS</td>
              <td class="text-center"><h3>{{ golesLocalTotales }}</h3></td>
              <td class="text-center"><h3>{{ golesVisitanteTotales }}</h3></td>
            </tr>
            <tr>
              <td>GOLEJADORS</td>
              <td class="text-center celda">
                <div v-for="jugador in maxGoleadorLocal" :key="jugador.id_jugador">
                  <v-row>
                    <v-col  cols="9" class="text-left">
                      <p>{{ jugador.numero }} -  {{ jugador.apodo }} ({{ jugador.estadistica.goles }})</p>
                    </v-col>
                  </v-row>
                </div>
              </td>
              <td class="text-center celda">
                <div v-for="jugador in maxGoleadorVisitante" :key="jugador.id_jugador">
                  <v-row>
                    <v-col  cols="9" class="text-left">
                      <p>{{ jugador.numero }} -  {{ jugador.apodo }} ({{ jugador.estadistica.goles }})</p>
                    </v-col>
                  </v-row>
                </div>
              </td>
            </tr>
            <tr>
              <td>POSESSIÓ</td>
              <td>{{ equipo_local.estadistica_equipo.posesión }}</td>
              <td>{{ equipo_visitante.estadistica_equipo.posesión }}</td>
            </tr>
            <tr>
              <td>DISPAROS</td>
              <td>{{ disparosLocalTotal }}</td>
              <td>{{ disparosVisitanteTotal }}</td>
            </tr>
            <tr>
              <td>TARGETES GROGUES</td>
              <td>{{ taLocalTotales }}</td>
              <td>{{ taVisitanteTotales }}</td>
            </tr>
            <tr>
              <td></td>
              <td>
                <div v-for="jugador in tarAmarillaLocal" :key="jugador.id_jugador">
                  <v-row>
                    <v-col  cols="9" class="text-left">
                      <p>{{ jugador.numero }} -  {{ jugador.apodo }} ({{ jugador.estadistica.tarjetas_amarillas }})</p>
                    </v-col>
                  </v-row>
                </div>
              </td>
              <td>
                <div v-for="jugador in tarAmarillaVisitante" :key="jugador.id_jugador">
                  <v-row>
                    <v-col  cols="9" class="text-left">
                      <p>{{ jugador.numero }} -  {{ jugador.apodo }} ({{ jugador.estadistica.tarjetas_amarillas }})</p>
                    </v-col>
                  </v-row>
                </div>
              </td>
            </tr>
            <tr>
              <td>TARGETES ROJES</td>
              <td>{{ trLocalTotales }}</td>
              <td>{{ trVisitanteTotales }}</td>
            </tr>
            <tr>
              <td>FALTES</td>
              <td>{{ faltasLocalTotales }}</td>
              <td>{{ disparosVisitanteTotal }}</td>
            </tr>
            <tr>
              <td>FORES DE JOC</td>
              <td>--</td>
              <td>--</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>

  import { useRoute } from 'vue-router'
  import { usegFutbolStore } from "../../store/futbol"
  import { computed } from 'vue'
  import { storeToRefs } from 'pinia'

  const route = useRoute()
  const id = route.params.id

  const futbolStore = usegFutbolStore()
  const { partidos, cargando_partidos } = storeToRefs(futbolStore)
  


  const partido = computed(() => {
    if(!partidos.value) return false
    return partidos.value.find( el => {
      return el.id_partido == id
    })
  })

  const equipo_local = computed(() => {
    if(!partido) return false
    return partido.value.equipo_local})
  const equipo_visitante = computed(() => partido.value.equipo_visitante)

  const estadisticasTotales = (jugadores, estadistica) => {
    return jugadores.reduce((total, jugador) => total + jugador.estadistica[estadistica], 0);
  };

  const golesLocalTotales = computed(() => estadisticasTotales(equipo_local.value.jugadores, 'goles'))
  const taLocalTotales = computed(() => estadisticasTotales(equipo_local.value.jugadores, 'tarjetas_amarillas'))
  const trLocalTotales = computed(() => estadisticasTotales(equipo_local.value.jugadores, 'tarjeta_roja'))
  const faltasLocalTotales = computed(() => estadisticasTotales(equipo_local.value.jugadores, 'faltas'))

  const golesVisitanteTotales = computed(() => estadisticasTotales(equipo_visitante.value.jugadores, 'goles'));
  const taVisitanteTotales = computed(() => estadisticasTotales(equipo_visitante.value.jugadores, 'tarjetas_amarillas'));
  const trVisitanteTotales = computed(() => estadisticasTotales(equipo_visitante.value.jugadores, 'tarjeta_roja'));
  const faltasVisitanteTotales = computed(() => estadisticasTotales(equipo_visitante.value.jugadores, 'faltas'));

  const disparosTotales = (jugadores, estadistica1, estadistica2) => {
    const total = estadisticasTotales(jugadores, estadistica1);
    const totalAPuerta = estadisticasTotales(jugadores, estadistica2);
    return `${totalAPuerta} / ${total}`;
  };

  const disparosLocalTotal = computed(() => disparosTotales(equipo_local.value.jugadores, 'disparos', 'disparos_al_arco'));
  const disparosVisitanteTotal = computed(() => disparosTotales(equipo_visitante.value.jugadores, 'disparos', 'disparos_al_arco'));

  
  const jugadoresLocal = [...equipo_local.value.jugadores]
  const jugadoresVisitante = [...equipo_visitante.value.jugadores]

  const maxGoleadorLocal = computed(() => {
    return consulta(jugadoresLocal, "goles")
  })
  const maxGoleadorVisitante = computed(() => {
    return consulta(jugadoresVisitante, "goles")
  })

  const tarAmarillaLocal = computed(() => {
    return consulta(jugadoresLocal, "tarjetas_amarillas")
  })
  const tarAmarillaVisitante = computed(() => {
    return consulta(jugadoresVisitante, "tarjetas_amarillas")
  })
  const tarRojaLocal = computed(() => {
    return consulta(jugadoresLocal, "tarjetas_amarillas")
  })


  const consulta = (equipo, est) => {
    const filtrado = equipo.filter(jug => {
      return jug.estadistica[est] > 0
    })
    filtrado.sort((a,b) => b.estadistica.goles - a.estadistica.goles); // b - a for reverse sort
    return filtrado
  }




</script>

<style scoped>

  .contenedor_tabla {
    display: flex;
    justify-content: center;
  }
  .tabla {
    width: 80%;
    margin: 0, auto !important;
  }


  .primera {
    width: 30%;
  }
</style>