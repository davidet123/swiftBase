<template>
  <div class="cajaOnAir">
    <div class="tecla"><p>{{ rotuloOnAir.tecla }}</p></div>
    <div class="titulo"><h4>{{ rotuloOnAir.titulo }}</h4></div>
    <div class="orden"><p>{{ orden + 1 }}</p></div>
  </div>
</template>

<script setup>

import { toRefs } from 'vue';

const props = defineProps(["rotuloOnAir", "orden"])

const { rotuloOnAir, orden } = toRefs(props)

</script>

<style scoped>
  p {
    font-size: 0.8vw;
    font-weight: bold;
  }
  .cajaOnAir {
    height: 100%;
    width: 150px;
    padding: 5px;
    background-color: red;
    border: 2px solid rgb(255, 196, 196);
    display: flex;
    flex-direction: column;
    justify-content: space-between;    
    color: #000;
  }

  .orden {
    padding: 2px;
    display: flex;
    border: 1px solid black;
    justify-content: center;
  }



</style>