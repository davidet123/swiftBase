<template>
  <v-row>
      <v-col class="text-center">
          <h3>Pilota Valenciana</h3>
      </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" class="text-center">
      <v-card
        width="80%"
        style="margin: 0 auto"
      >
        <v-card-title class="text-center">
          <h4>{{ datosPartida.equip_roig.nom_equip }} vs {{ datosPartida.equip_blau.nom_equip }}</h4>
        </v-card-title>
        <v-card-text class="mb-2">
          <v-row>
            <v-col cols="12">
              <h4>Partida de {{ datosPartida.tipo_partida }} a {{ datosPartida.partidaA }}</h4>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3" offset="3">
              <h4>{{ datosPartida.fecha }}</h4>
            </v-col>
            <v-col cols="3">
              <h4>{{ datosPartida.hora }}</h4>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="1" offset="4" style="border:1px solid black; font-weight: bold">{{ puntos[marcador.equip_roig.puntos] }}</v-col>
            <v-col cols="1" style="border:1px solid black; background-color: red; color: white; font-weight: bold">{{ marcador.equip_roig.jocs }}</v-col>
            <v-col cols="1" style="border:1px solid black; background-color: blue; color: white; font-weight: bold">{{ marcador.equip_blau.jocs }}</v-col>
            <v-col cols="1" style="border:1px solid black; font-weight: bold">{{ puntos[marcador.equip_blau.puntos] }}</v-col>
          </v-row>
        </v-card-text>
      </v-card>

    </v-col>
  </v-row>
  <v-row>
      <v-col cols=12 class="text-center">
          <v-btn color="error" size="x-small" @click="router.push('/menupilota')">Editar</v-btn>
      </v-col>
      <v-col cols=12 class="text-center">
          <v-btn color="success" size="x-small" @click="router.push('/partidapilota')">Començar partida</v-btn>
      </v-col>
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

  const marcador = computed(() => datosPartida.value.marcador)

  const puntos = ["NET", "15", "30", "VAL", "JOC"]

</script>