<template>
  <v-card
  color="#385F73"
  theme="dark"
  >
    <v-card-title>
      <v-row>
        <v-col cols="6">
          <h4>{{ equipo.nombre_equipo }}</h4>
        </v-col>
        <v-col cols="2">
          <v-btn color="success" @click="editarPartido(equipo.id_equipo)">EDITAR</v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn color="error">ELIMINAR</v-btn>
        </v-col>
      </v-row>

    </v-card-title>
  </v-card>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps(["equipo"])

const router = useRouter()

const equipo = props.equipo

const editarPartido = id => {
  router.push(`/futbol/editarequipofutbol/${id}`)
}


</script>