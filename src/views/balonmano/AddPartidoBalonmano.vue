<template>
  <v-row>
    <v-col class="text-center">
      <h3>Crear partido balonmano</h3>
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
    <v-col cols="6" v-for="equipo in tipoEquipo" :key="equipo">
      <v-row class="mx-2">
        <v-col class="text-center ma-0 pa-0" cols="12">
          <h3>Equipo {{ equipo }}</h3>

        </v-col>
        <v-col class="text-center">
          <v-text-field
            label="Equipo local"
            v-model="partido[equipo].nombre"
            density="compact"
          ></v-text-field>
        </v-col>
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
              <v-col cols="6">
                <v-text-field
                  label="Nombre"
                  v-model="jugador.nombre"
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
          </span>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <v-btn color="error" @click="añadirJugador(equipo)">AÑADIR JUGADOR</v-btn>
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
const { partido } = storeToRefs(balonmanoStore)


// Constantes
const totalJugadores = ref(18)
const tipoEquipo = ref(["local", "visitante"])

// Datos partido


const añadirJugador = equipo => {
  const jugador = {
    dorsal: null,
    nombre: null,
    altura: null,
    nacionalidad: null,
  }
  if(partido.value[equipo].jugadores.length >= 18) return
  partido.value[equipo].jugadores.push(jugador)
  
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