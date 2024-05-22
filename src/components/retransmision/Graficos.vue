<template>
  <div id="contenedorGraficos" draggable="true" @dragstart="startDrag($event, grafico)">
    <div id="numero">{{ orden + 1 }}</div>
    <div id="texto"><p>{{ grafico.titulo}}</p></div>
    <div id="tipo"><p>{{ grafico.clase}}</p></div>

  </div>
  
</template>

<script setup>

  import { toRefs } from 'vue';

  const props = defineProps(["grafico", "orden"])

  const emit = defineEmits(["evento"])

  const { grafico, orden } = toRefs(props)

  const startDrag = (event, item) => {
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.eventAllowed = 'copy'
    event.dataTransfer.setData = ('item', item)
    console.log(item)
    emit("evento", item)
  }

</script>

<style scoped>

  #contenedorGraficos {
    height: 100%;
    width: 150px;
    background-color: rgb(55, 55, 55);
    border: 1px solid white;
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
    align-items: center;
    padding: 5px
  }

  #numero {
    color: red;
    font-weight: bold;
    font-size: 2em;
  }

</style>