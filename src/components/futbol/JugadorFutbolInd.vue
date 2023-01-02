<template>
  <v-main>
    <v-row>
      <v-col>
        <v-card
         width="800"
         color="#385F73"
         theme="dark"
         class="mx-auto">
          <v-card-title>{{ jugador.numero }} - {{ jugador.apodo }}</v-card-title>
          <v-card-subtitle>{{ jugador.nombre_jugador }}</v-card-subtitle>
          <v-card-text>
            <div>Posición: {{ jugador.posicion }} | Nacionalidad: {{ jugador.nacionalidad }} | Fecha nacimiento: {{ jugador.fecha_nacimiento }} | Altura: {{ jugador.altura }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="borrarJugador(jugador.id_jugador)">BORRAR</v-btn>

          </v-card-actions>
        </v-card>




      </v-col>
    </v-row>
  </v-main>
</template>

<script setup>
/* const props = defineProps({
   id_jugador: Number,
    nombre_jugador: String,
    apodo: String,
    numero: Number,
    posicion: String,
    nacionalidad: String,
    fecha_nacimiento: String,
    altura: String
}) */
const props = defineProps(["jugador"])

const emit = defineEmits(["borrarJugador"])

/* const borrarJugador = (id) => {
  console.log(id)
  emit('borrarJugador', id)
} */



</script>

<style>

</style>