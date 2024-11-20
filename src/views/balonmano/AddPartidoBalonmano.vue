<template>
  <v-row>
    <v-col class="text-center">
      <h3>Crear partido balonmano</h3>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="text-center">
      <h4>Datos del partido</h4>
    </v-col>
  </v-row>
  <v-row class="mx-2">
    <v-col cols="3">
      <v-text-field
        label="Fecha"
        density="compact"
        v-model="partido.fecha"
      >
      </v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field
        label="Hora"
        density="compact"
        v-model="partido.hora"
      >
      </v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field
      label="Lugar"
      density="compact"
      v-model="partido.lugar"
      >
    </v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field
        label="Competición"
        density="compact"
        v-model="partido.competicion"
      >
      </v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">

      <v-row>
        <v-col class="text-center" cols="12">
          <h4>Equipo arbitral</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" offset="2">
          <v-text-field
            label="Nombre Arbitro 1"
            v-model="partido.equipo_arbitral.arbitro1.nombre"
            density="compact"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            label="Apellido arbitro 1"
            v-model="partido.equipo_arbitral.arbitro1.apellido"
            density="compact"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            label="Pais arbitro 1"
            v-model="partido.equipo_arbitral.arbitro1.pais"
            density="compact"
          ></v-text-field>
        </v-col>
  
      </v-row>
      <v-row>
        <v-col cols="3" offset="2">
          <v-text-field
            label="Nombre Arbitro 2"
            v-model="partido.equipo_arbitral.arbitro2.nombre"
            density="compact"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            label="Apellido arbitro 2"
            v-model="partido.equipo_arbitral.arbitro2.apellido"
            density="compact"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            label="Pais arbitro 2"
            v-model="partido.equipo_arbitral.arbitro2.pais"
            density="compact"
          ></v-text-field>
        </v-col>
  
      </v-row>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="text-center">
      <h4>Alineaciones</h4>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="6" v-for="equipo in tipoEquipo" :key="equipo">
      <v-row class="mx-2">
        <v-col class="text-center ma-0 pa-0" cols="12">
          <h4>Equipo {{ equipo }}</h4>
        </v-col>
        <v-col class="text-center" cols="4">
          <v-text-field
            label="Nombre"
            v-model="partido[equipo].nombre"
            density="compact"
          ></v-text-field>
        </v-col>
        <v-col class="text-center" cols="2">
          <v-text-field
            label="Abreviatura"
            v-model="partido[equipo].abreviatura"
            density="compact"
          ></v-text-field>
        </v-col>
        <v-col class="text-center" cols="2">
          <v-text-field
            label="Pais"
            v-model="partido[equipo].pais"
            density="compact"
          ></v-text-field>
        </v-col>
        <v-col class="text-center" cols="4">
          <v-text-field
            label="Escudo"
            v-model="partido[equipo].escudo"
            density="compact"
          ></v-text-field>
        </v-col>
        <v-row class="mb-2">
          <v-col cols="6" class="text-center">
            <h5>Color top {{ equipo }}</h5>
            <v-color-picker
              v-model="partido[equipo].colorTop"
              hide-inputs
              hide-canvas
            ></v-color-picker>
          </v-col>
          <v-col cols="6" class="text-center">
            <h5>Color bottom {{ equipo }}</h5>
            <v-color-picker
              v-model="partido[equipo].colorBottom"
              hide-inputs
              hide-canvas
            ></v-color-picker>

          </v-col>
        </v-row>
      </v-row>
      <v-row class="mx-2 my-0 pa-0">
        <v-col class="ma-0 pa-0 text-center" cols="12">
          <h5>Jugadores</h5>
        </v-col>
          <span v-for="(jugador, index) in partido[equipo].jugadores" class="jugador" :key="index">
            <v-row>
              <v-col cols="2">
                <v-text-field
                  label="num"
                  v-model="jugador.dorsal"
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  label="Nombre"
                  v-model="jugador.nombre"
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  label="APellido"
                  v-model="jugador.apellido"
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  label="Nac."
                  v-model="jugador.nacionalidad"
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  label="Altura"
                  v-model="jugador.altura"
                  density="compact"
                ></v-text-field>
              </v-col>
              
            </v-row>
            <v-row class="ma-0 pa-0">
              <v-col cols="6">
                <v-checkbox
                  label="Capitan"
                  v-model="jugador.capitan"
                ></v-checkbox>
              </v-col>
              <v-col cols="6">
                <v-checkbox
                  label="Portero"
                  v-model="jugador.portero"
                ></v-checkbox>
              </v-col>

            </v-row>
          </span>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <v-btn color="error" @click="añadirJugador(equipo)" size="x-small">AÑADIR JUGADOR</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <h4>Cuerpo técnico</h4>
        </v-col>
      </v-row>
      <span v-for="(tecnico, index) in partido[equipo].cuerpo_tecnico" class="jugador" :key="index">
      <v-row>
          <v-col cols="4">
            <v-text-field
              density="compact"
              v-model="tecnico.nombre"
              label="Nombre"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              density="compact"
              v-model="tecnico.apellido"
              label="Nombre"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              density="compact"
              v-model="tecnico.nacionalidad"
              label="Nacionalidad"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              density="compact"
              v-model="tecnico.rol"
              label="Rol"
            ></v-text-field>
          </v-col>
        </v-row>
      </span>
      <v-row>
        <v-col class="text-center">
          <v-btn color="error" size="x-small" @click="añadirTecnico(equipo)">AÑADIR TÉCNICO</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="text-center">
      <v-btn color="success" size="x-small" @click="aceptar">ACEPTAR</v-btn>
    </v-col>
  </v-row>

</template>

<script setup>
import { ref } from 'vue'
import { useBalonmanoStore } from "../../store/balonmano"
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'



const router = useRouter()

const balonmanoStore = useBalonmanoStore()
const { partido, tipoEquipo } = storeToRefs(balonmanoStore)

balonmanoStore.cargarDatosLS()


// Constantes
const totalJugadores = ref(18)
// const tipoEquipo = ref(["local", "visitante"])

// Datos partido

// partido.value.equipo_arbitral = {
//   arbitro1: {},
//   arbitro2: {}
// }
// partido.value.local.estadistica_equipo.perdidas = 0
// partido.value.visitante.estadistica_equipo.perdidas = 0


const añadirJugador = equipo => {
  const jugador = {
    id: Date.now(),
    dorsal: null,
    nombre: null,
    altura: null,
    nacionalidad: null,
    portero: false,
    capitan: false,
    estadistica: {
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
  }
  if(partido.value[equipo].jugadores.length >= totalJugadores.value) return
  partido.value[equipo].jugadores.push(jugador)
  
}

const añadirTecnico = equipo => {
  const tecnico = {
    nombre: null,
    apellido: null,
    nacionalidad: null,
    rol: null
  }
  partido.value[equipo].cuerpo_tecnico.push(tecnico)
}

const aceptar = () => {
  balonmanoStore.guardarPartido()
  router.push("/menubalonmano")
}


</script>

<style scoped>

.jugador{
  width: 100%;
}

</style>