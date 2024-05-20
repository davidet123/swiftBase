<template>
  <v-row>
      <v-col class="text-center">
          <h3>Partida pilota</h3>
      </v-col>
  </v-row>
  <controlMarcadorPilota :marcador="marcador" :partidaA="datosPartida.partidaA"/>

</template>

<script setup>
  import { computed, watch } from "vue"
  import { usePilotaStore } from "../../store/pilota" 
  import { storeToRefs } from "pinia"
  import { useRouter } from 'vue-router'

  import controlMarcadorPilota from '@/components/pilota/controlMarcadorPilota.vue'

  const router = useRouter()

  const pilotaStore = usePilotaStore()

  const { datosPartida, tipo_partida } = storeToRefs(pilotaStore)

  const marcador = computed(() => datosPartida.value.marcador)

  const puntos = ["NET", "15", "30", "VAL", "JOC"]

</script>