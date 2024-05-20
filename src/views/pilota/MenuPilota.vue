<template>
    <v-row>
        <v-col class="text-center">
            <h3>Menu pilota</h3>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="3">
            <v-text-field
              density="compact"
              label="Fecha"
              v-model="datosPartida.fecha"
            >                
            </v-text-field>
        </v-col>
        <v-col cols="3" >
            <v-text-field
            density="compact"
              label="Hora"
              v-model="datosPartida.hora"
            >                
            </v-text-field>
        </v-col>
        <v-col cols="3" >
            <v-select
            label="Tipo partida"
            :items="tipo_partida"
            density="compact"
            v-model="datosPartida.tipo_partida"
            >
            </v-select>
        </v-col>
        <v-col cols="3" >
            <v-text-field
            density="compact"
              label="Partida a"
              v-model="datosPartida.partidaA"
            >                
            </v-text-field>
        </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" v-for="(equipo, index) in equipos" :key="index">
        <v-row>
          <v-col cols="12" class="text-center"><h4>{{ colorEquipo[index] }}</h4></v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Nom equip"
              v-model="equipo.nom_equip"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-row class="ml-1">
              <v-col cols="7">
                <h4>Nom jugador</h4>
              </v-col>
              <v-col cols="3">
                <h4>Apodo</h4>
              </v-col>
              <v-col cols="2">
                <h4>Tecla</h4>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" v-for="jugador in equipo.jugadores" :key="jugador.id_jugador">
            <v-row class="ml-1 pa-0">
              <v-col cols="7" class="ma-0 py-0">
                <v-text-field
                  v-model="jugador.nombre"
                  density="compact"
                >                
                </v-text-field>
              </v-col>
              <v-col cols="3" class="ma-0 py-0">
                <v-text-field
                  v-model="jugador.apodo"
                  density="compact"
                >                
                </v-text-field>
              </v-col>
              <v-col cols="2" class="ma-0 py-0">
                <v-text-field
                  v-model="jugador.tecla"
                  density="compact"
                >                
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center">
            <v-btn color="error" @click="addJugador(colorEquipo[index])">Afegir Jugador</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">
        <v-btn color="success" @click="crearPartida()">ACEPTAR</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col >{{ datosPartida }}</v-col>
    </v-row>


</template>

<script setup>

import { computed, watch } from "vue"
import { usePilotaStore } from "../../store/pilota" 
import { storeToRefs } from "pinia"
import { useRouter } from 'vue-router'

const router = useRouter()

const pilotaStore = usePilotaStore()

const { datosPartida, tipo_partida } = storeToRefs(pilotaStore)

const colorEquipo = ["Equip roig", "Equip blau"]

const equipos = computed(() => {
  return [datosPartida.value.equip_roig, datosPartida.value.equip_blau]
})

const jugadoresRoig = computed(() => datosPartida.value.equip_roig)
const jugadoresBlau = computed(() => datosPartida.value.equip_blau)

const addJugador = (equipo) => {
  console.log(equipo)
  if(equipo === "Equip roig") {
    jugadoresRoig.value.jugadores.push(
      {
        id_jugador: `roig${jugadoresRoig.value.length + 1}`,
        nombre: null,
        apodo: null,
        tecla: null
      }
    )
  } else if (equipo === "Equip blau") {
    jugadoresBlau.value.jugadores.push(
      {
        id_jugador: `blau${jugadoresBlau.value.length + 1}`,
        nombre: null,
        apodo: null,
        tecla: null
      }
    )

  }
}

const crearPartida  = () => {
  pilotaStore.crearPartida(datosPartida.value)
  router.push('/pilota')
}

watch(() => datosPartida.value.tipo_partida, (val) => {
  console.log(val)
  let marcador = datosPartida.value.marcador
  if(datosPartida.value.tipo_partida === "Raspall") {
    marcador.equip_roig.jocs = 0
    marcador.equip_blau.jocs = 0
    marcador.equip_roig.marcadorInicial = 0
    marcador.equip_blau.marcadorInicial = 0
    datosPartida.value.partidaA = 0
  } else if (datosPartida.value.tipo_partida === "Escala i corda") {
    marcador.equip_roig.jocs = 15
    marcador.equip_blau.jocs = 15
    marcador.equip_roig.marcadorInicial = 15
    marcador.equip_blau.marcadorInicial = 15
    datosPartida.value.partidaA = 60
  }
})

</script>