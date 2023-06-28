<template>
  <v-main v-if="jugador" class="my-1">
    <v-row>
      <v-col class="tarjeta">
        <v-card
          max-width="1200px"
         :color="fondo == 'local' ? '#385F73' : '#37571a'"
         theme="dark"
         class="mx-auto pa-1">
         <v-card-subtitle>
          <v-row class="tarjeta">
            <v-col cols="2">
              {{ jugador.numero }} - {{ jugador.apodo }}
            </v-col>
            <v-col cols="10">
              <v-row>
                
                <v-col cols="3">
                  <v-row>
                    <v-col cols="4">
                      <p>GOL ({{ jugador.estadistica.goles }})</p>
                    </v-col>
                    <v-col cols="2">
                      <v-btn size="x-small" color="success" @click="gol(1)">+</v-btn>
                    </v-col>
                    <v-col cols="2">
                      <v-btn size="x-small" color="error" @click="gol(-1)">-</v-btn>
                    </v-col>
                    <v-col cols="2">
                      <v-btn size="x-small" color="success">LIVE</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="6">
                  <v-row>
                    <v-col cols="1">
                      <p>TA ({{ jugador.estadistica.tarjetas_amarillas }})</p>
                    </v-col>
                    <v-col cols="1">
                      <v-btn size="x-small" color="success" @click="tarjetaAmarilla(1)">+</v-btn>
                    </v-col>
                    <v-col cols="1">
                      <v-btn size="x-small" color="error" @click="tarjetaAmarilla(-1)">-</v-btn>
                    </v-col>
                    <v-col cols="2">
                      <v-btn size="x-small" color="success">LIVE</v-btn>
                    </v-col>
                    <v-col cols="1">
                      <p>TR ({{ jugador.estadistica.tarjeta_roja }})</p>
                    </v-col>
                    <v-col cols="1">
                      <v-btn size="x-small" color="success"  @click="tarjetaRoja(1)">+</v-btn>
                    </v-col>
                    <v-col cols="1">
                      <v-btn size="x-small" color="error"  @click="tarjetaRoja(-1)">-</v-btn>
                    </v-col>
                    <v-col cols="2">
                      <v-btn size="x-small" color="success">LIVE</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="3">
                  <v-row>
                    <v-col cols="3">
                      <p>FALTA ({{ jugador.estadistica.faltas }})</p>
                    </v-col>
                    <v-col cols="2">
                      <v-btn size="x-small" color="success" @click="falta(1)">+</v-btn>
                    </v-col>
                    <v-col cols="2">
                      <v-btn size="x-small" color="error" @click="falta(-1)">-</v-btn>
                    </v-col>
                    <v-col cols="2">
                      <v-btn size="x-small" color="success">LIVE</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="4">
                  <v-row>
                    <v-col cols="12" class="text-center pa-0">
                      <p>DISPAROS A PUERTA ({{ jugador.estadistica.disparos_al_arco }} /{{ jugador.estadistica.disparos }})</p>
                      <v-btn size="x-small" color="success">LIVE</v-btn>
                    </v-col>
                    <v-col cols="6" class="text-center">
                      <p>DISPARO</p>
                      <v-btn size="x-small" color="success" @click="disparo(1)">+</v-btn>
                      <v-btn size="x-small" color="error" @click="disparo(-1)">-</v-btn>
                    </v-col>
                    <v-col cols="6" class="text-center">
                      <p>A PUERTA</p>
                      <v-btn size="x-small" color="success" @click="disparoAPuerta(1)">+</v-btn>
                      <v-btn size="x-small" color="error" @click="disparoAPuerta(-1)">-</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
         </v-card-subtitle>
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
const props = defineProps(["jugador", "fondo"])
const jug = props.jugador
// console.log(props.jugador)

const emit = defineEmits(["borrarJugador"])

/* const borrarJugador = (id) => {
  console.log(id)
  emit('borrarJugador', id)
} */


const gol = val => {
  jug.estadistica.goles += val
}

const tarjetaAmarilla = val => {
  jug.estadistica.tarjetas_amarillas += val
}
const tarjetaRoja = val => {
  jug.estadistica.tarjeta_roja += val
}

const falta = val => {
  jug.estadistica.faltas += val
}

const disparo = val => {
  jug.estadistica.disparos += val
}
const disparoAPuerta = val => {
  disparo(val)
  jug.estadistica.disparos_al_arco += val
}



</script>

<style scoped>
  .borde_blanco {
    border: 1px solid white
  }
  p {
    font-size: 11px
  }
  


</style>