<template>
  <v-row>
    <v-col cols="12" class="text-center mt-2">
      <h4>Crear jugador</h4>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="3">
      <v-text-field
        label="Nom"
        v-model="jugador.nombre"
        density="compact"
      ></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field
        label="Cognoms"
        v-model="jugador.apellidos"
        density="compact"
      ></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field
        label="Data Naixement"
        v-model="jugador.fecha_nacimiento"
        density="compact"
      ></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field
        label="Edad"
        v-model="jugador.edad"
        density="compact"
      ></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field
        label="Residencia"
        v-model="jugador.residencia"
        density="compact"
      ></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field
        label="Anys professional"
        v-model="jugador.años_profesional"
        density="compact"
      ></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field
        label="Nacionalidad"
        v-model="jugador.nacionalidad"
        density="compact"
      ></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field
        label="Mano"
        v-model="jugador.mano"
        density="compact"
      ></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field
        label="Altura"
        v-model="jugador.altura"
        density="compact"
      ></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field
        label="Peso"
        v-model="jugador.peso"
        density="compact"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="text-center">
      <v-btn color="success" @click="aceptar()">AFEGIR JUGADOR</v-btn>
    </v-col>
  </v-row>
  <v-row v-for="jug in jugadores" :key="jug.id_jugador">
    <v-card width="80%" style="margin: 5px auto;">
      <v-card-title>
        <p>{{ jug.nombre }} {{ jug.apellidos }}</p>
      </v-card-title>
      <v-card-text>
        {{ jug }}
      </v-card-text>
    </v-card>

  </v-row>
  <!-- <v-row v-for="jug in jugadores" :key="comp.id_jugador">
    <v-col cols="4" offset="2">
      <p>{{ jug.nombre_competicion }}</p>
    </v-col>
    <v-col cols="4">
      <p>{{ jug.pista_juego }}</p>
    </v-col>

  </v-row> -->

  {{ jugadores }}
</template>

<script setup>
  import { storeToRefs } from "pinia";
  import { useTenisStore } from "@/store/tenis"

  const tenisStore = useTenisStore()

  const { jugador, jugadores } = storeToRefs(tenisStore)

  tenisStore.cargarDatos()
  
  const aceptar = () => {
    jugador.value.id_jugador = `jug${Date.now()}`
    tenisStore.addJugadorTenis(jugador.value)
  }

</script>

<style scoped>

</style>