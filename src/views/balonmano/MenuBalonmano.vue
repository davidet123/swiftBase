<template>
  <v-row>
      <v-col class="text-center pa-3">
        <h3>BALONMANO</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2" offset="4" class="text-center"><v-btn  color="success" size="x-small" to="/addpartidobalonmano">NUEVO PARTIDO</v-btn></v-col>
      <v-col cols="2" class="text-center"><v-btn  color="error" size="x-small" @click="reset">RESET</v-btn></v-col>
    </v-row>
    <div v-if="partidoCreado">
      <v-card class="ma-5">
        <v-card-title class="mb-3">
          <v-row>
            <v-col class="text-center" cols="12">
              <h3>Partido creado</h3>
              <v-divider thickness="3" color="black"></v-divider>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col v-for="(value, key) in partido" :key="key" :cols="anchoColumna(key)" class="text-center">
              <span v-if="key === 'local' || key === 'visitante'">
                <div><h4>EQUIPO {{ key.toUpperCase() }}</h4></div>
                <div><h5>{{ value.nombre.toUpperCase() }}</h5></div>
              </span>
              <span v-else>
                <div><h4>{{ key.toUpperCase() }}</h4></div>
                <div v-if="key=='equipo_arbitral'">
                  <h5>{{ value.arbitro1 }}</h5>            
                  <h5>{{ value.arbitro2 }}</h5>
                </div>             
                <div v-else><h5>{{ value }}</h5></div>             
              </span>
            </v-col>
          </v-row>
          <v-divider thickness="3" color="black" class="mt-2"></v-divider>
        </v-card-text>
        <v-card-actions>
          <v-row>
            <v-col class="text-center">
              <v-btn color="error" to="/estbalonmano">IR PARTIDO</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>

    </div>


</template>

<script setup>
import { storeToRefs } from "pinia"
import { useBalonmanoStore } from "../../store/balonmano"
import { onBeforeMount } from "vue"

onBeforeMount(() => {
  balonmanoStore.cargarDatosLS()
})


const balonmanoStore = useBalonmanoStore()
const { partido, partidoCreado } = storeToRefs(balonmanoStore)

const reset = () => balonmanoStore.resetBalonmanoLS()

const anchoColumna = key => {
  if(key === "local" || key === "visitante") return 6
  if(key === "equipo_arbitral") return 12
  return 3
}

</script>