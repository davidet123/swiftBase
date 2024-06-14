<template>
  <div id="contenedorTenis">
    <div id="nombre">{{ jugador.nombre }} {{ jugador.apellidos }}</div>
    <div id="estadistica">
      <div class="cuadroEstadistica" v-for="categoria in camposEstadistica" :key="categoria">
        <div class="titulo"><p>{{ categoria }}</p></div>
        <div class="botones">
          <v-btn size="20px" color="success" @click="cambiaEstadistica(categoria, 1)"><p>+</p></v-btn>
          <v-btn size="20px" color="error" @click="cambiaEstadistica(categoria, -1)"><p>-</p></v-btn>
        </div>
      </div>
      <!-- <div class="cuadroEstadistica">
        <div class="titulo">ACES</div>
        <div class="botones">
          <v-btn size="x-small" color="success">+</v-btn>
          <v-btn size="x-small" color="error">-</v-btn>
        </div>
      </div>
      <div class="cuadroEstadistica">
        <div class="titulo">ACES</div>
        <div class="botones">
          <v-btn size="x-small" color="success">+</v-btn>
          <v-btn size="x-small" color="error">-</v-btn>
        </div>
      </div>
      <div class="cuadroEstadistica">
        <div class="titulo">ACES</div>
        <div class="botones">
          <v-btn size="x-small" color="success">+</v-btn>
          <v-btn size="x-small" color="error">-</v-btn>
        </div>
      </div>
      <div class="cuadroEstadistica">
        <div class="titulo">ACES</div>
        <div class="botones">
          <v-btn size="x-small" color="success">+</v-btn>
          <v-btn size="x-small" color="error">-</v-btn>
        </div>
      </div>
      <div class="cuadroEstadistica">
        <div class="titulo">ACES</div>
        <div class="botones">
          <v-btn size="x-small" color="success">+</v-btn>
          <v-btn size="x-small" color="error">-</v-btn>
        </div>
      </div> -->

      </div>
      
      
      </div>
    {{ jugador.estadistica }}
    {{ indice }}


</template>

<script setup>
  import { toRefs } from 'vue'

  const props = defineProps(["jugador", "indice"])

  const { jugador, indice } = toRefs(props)

  const camposEstadistica = ["ACE", "DOBLE FALTA", "GANADORES", "ERRORES", "BREAKS", "PUNTOS"]

  const cambiaEstadistica = (est, val) => {
    switch(est) {
      case "ACE":
        jugador.value.estadistica.ace += val
        break
      case "DOBLE FALTA":
        jugador.value.estadistica.doble_falta += val
        break
      case "GANADORES":
        jugador.value.estadistica.ganadores += val
        break
      case "ERRORES":
        jugador.value.estadistica.errores += val
        break
      case "BREAKS":
        jugador.value.estadistica.breaks += val
        break
      case "PUNTOS":
        jugador.value.estadistica.puntos += val
        break
      default: 
        break
    }

  }


</script>

<style scoped>
  #contenedorTenis {
    margin: 0 auto;
    width: 100%;
    max-width: 600px;
    display: flex;
    padding: 10px;
    flex-direction: column;
    border: 1px solid white;
    border-radius: 10px;
    background-color: #767575;
  }

  #nombre {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
  }

  #estadistica {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: rgb(30, 30, 30);
  }

  .cuadroEstadistica {
    width: 33.3%;
    padding: 5px 0;
    /* height: 50px; */
    /* background-color: red; */
    border: 1px, solid white;
    display: flex;
    flex-direction: column;
  }
  .cuadroEstadistica .titulo {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cuadroEstadistica .botones {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
    gap: 10px;
  }

  .cuadroEstadistica .titulo p {
    font-size: 12px;
    font-weight: bold;
    margin: 5px 0;
  }
  .botones p {
    font-size: 10px;
  }




</style>