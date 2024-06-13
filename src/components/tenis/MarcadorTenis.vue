<template>
  <div id="marcador">
    <div id="superior">
      <div class="titulos">
        <div class="competicion borde"><p>{{ competicion}}</p></div>
        <div class="jugador borde">Jugador1</div>
        <div class="jugador borde">jugador2</div>
  
      </div>
      <div class="resultados">
        <div class="tiempos">
          <div class="juego borde" :style="anchoJuego" v-for="set in marcador" key="num_set">{{ tiempoEnMinutos(set.tiempo_set) }}</div>
          <!-- <div class="juego borde" :style="anchoJuego">18'</div>
          <div class="juego borde" :style="anchoJuego">10'</div> -->
        </div>
        <div class="juegos">
          <div class="juego borde" :style="anchoJuego" v-for="set in marcador" key="num_set">{{ set.juegos_local}}</div>
          <!-- <div class="juego borde" :style="anchoJuego">6</div>
          <div class="juego borde" :style="anchoJuego">6</div> -->
        </div>
        <div class="juegos">
          <div class="juego borde" :style="anchoJuego" v-for="set in marcador" key="num_set">{{ set.juegos_visitante}}</div>
          <!-- <div class="juego borde" :style="anchoJuego">2</div>
          <div class="juego borde" :style="anchoJuego">1</div> -->
        </div>
        
  
      </div>

    </div>
    <div id="inferior">
      <div class="tiempo">
        <p>{{ tiempoTotal }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>

  import { computed, toRefs } from 'vue'


  const props = defineProps(["marcador", "competicion"])

  const { marcador } = toRefs(props)


  const anchoJuego = computed(() => {
    const ancho = 100 / parseInt(marcador.value.length)
    return {'width' : `${ancho}%`}
  })

  const tiempoTotal = computed(() => "Tiempo partido: 120'")

  const tiempoEnMinutos = t => `${Math.floor(t / 60)}'`

</script>

<style scoped>

  #marcador {
    width: 600px;
    height: 120px;
    display: flex;
    flex-direction: column;
    background-color: red;
    margin: 0 auto;
    margin-top: 10px;
  }

  #superior {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 80%;
    background-color: green;
  }
  #inferior {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 20%;
    background-color: blue;
  }
  .titulos {
    width: 35%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: palegoldenrod;
  }
  .resultados {
    width: 65%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: rgb(124, 114, 5);

  }

  
  .competicion, .tiempos {
    display: flex;
    width: 100%;
    height: 30%;
    align-items: center;
    color: black;
  }
  .competicion, .tiempo, .jugador {
    padding-left: 5px;
  }

  .jugador, .juegos {
    display: flex;
    width: 100%;
    height: 35%;
    align-items: center;
    color: black;
    }

  .juego {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tiempo {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
  }
  .tiempo p {
    font-size: 12px;
  }
  
  .borde {
    border: 1px solid black;
  }

</style>