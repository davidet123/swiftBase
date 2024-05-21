<template>
  <div  
    v-if="seccion.titulo !== 'AÑADIR'" 
    class="cajaSeccion" 
    :style="seccion.activo ? 'background-color: #024f64' : 'background-color: #686867'"
    @click="activarSeccion(seccion.id)"
  >
    <div class="orden" :style="seccion.elementoLive ? 'background-color: #ff0000' : 'background-color: #686867'">{{ orden +1 }}</div>
    <div class="contenido" >
      {{ seccion.titulo }}
    </div>

  </div>
  <div v-else class="mas" @click="añadirSeccion()">
    <h1>+</h1>
  </div>

</template>

<script setup>

import { toRefs } from 'vue';

const props = defineProps(["seccion", "orden"])

const { seccion, orden } = toRefs(props)


const activarSeccion = id => console.log(seccion.value)

const añadirSeccion = () => {
  console.log(seccion.value)
}

</script>

<style scoped>
  .cajaSeccion {
    height: 80%;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: start;
    background-color: #676768;
    margin: 3px;
    border: 1px solid white;
    cursor: pointer;

  }

  .orden {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .contenido {
    margin-left: 10px;
    width: 80%;
  }

  .mas {
    height: 80%;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #676768;
    margin: 3px;
    border: 1px solid white;
    cursor: pointer;
  }
</style>