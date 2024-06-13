<template>
  <v-row>
    <v-col cols="12" class="text-center mt-2">
      <h4>Menú tenis</h4>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="text-center mt-2">
      <v-btn color="success" size="x-small" to="/nuevopartidotenis">CREAR PARTIDO</v-btn>
      <v-btn color="success" size="x-small" to="/esttenis">CONTINUAR PARTIDO</v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="text-center mt-2">
      <v-btn color="success" size="x-small" to="/nuevojugadortenis">NUEVO JUGADOR</v-btn>
      <v-btn color="success" size="x-small" to="/nuevacompeticiontenis">NUEVA COMPETICION</v-btn>
    </v-col>
  </v-row>
  <v-divider class="my-4"></v-divider>
  <v-row>
    <v-col class="text-center">
      <p>Partido en juego</p>
      <PartidoMenuTenis :partido = "partidoEnJuego"/>
      <!-- {{ partidoEnJuego }} -->
    </v-col>
  </v-row>
  <v-divider class="my-4"></v-divider>
  <v-row>
    <v-col class="text-center">
      <p>Listado partidos anteriores</p>
      <v-row v-for="partido in partidosAnteriores" :key="partido.id_partido_tenis">
        <v-col>
          <PartidoMenuTenis :partido = "partido"/>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  

</template>

<script setup>
  import { storeToRefs } from "pinia";
  import { useTenisStore } from "@/store/tenis"
  import { computed, ref, watch } from "vue";

  import PartidoMenuTenis from "@/components/tenis/PartidoMenuTenis.vue"

  const tenisStore = useTenisStore()

  const { partidos, partido_en_juego } = storeToRefs(tenisStore)

  tenisStore.cargarDatos()

  const partidoEnJuego = computed(() => partidos.value.find(el => el.id_partido_tenis === partido_en_juego.value))

  const partidosAnteriores = computed(() => partidos.value.filter(el => el.id_partido_tenis !== partido_en_juego.value))

</script>

<style scoped>

</style>