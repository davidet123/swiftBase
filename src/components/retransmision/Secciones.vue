<template>
  <div  
    v-if="seccion.titulo !== 'AÑADIR'" 
    class="cajaSeccion" 
    :style="colorSeccion"
    @click="activarSeccion(seccion.id)"
  >
    <div class="orden" :style="seccion.elementoLive ? 'background-color: #ff0000' : 'background-color: #686867'">{{ orden +1 }}</div>
    <div class="contenido" >
      {{ seccion.titulo }}
    </div>
    <div>
      <v-icon
        icon="mdi-menu"
        @click="editarSeccion(seccion.titulo)"
      ></v-icon>
    </div>

  </div>
  <div v-else class="mas" @click="añadirSeccion()">
    <h1>+</h1>
  </div>

  <div>
    <v-dialog
      v-model="dialog"
      width="auto"
    > 
    <v-card
      max-width="500px"
    >
      <v-card-title>
        <h4>Añadir seccion</h4>
      </v-card-title>
      <v-card-text>
        {{ nombreSeccion }}
        <v-text-field
          v-model="nombreSeccion"
        ></v-text-field>
        <v-btn @click="aceptar()" color="error">ACEPTAR</v-btn>
        <v-btn @click="dialog=false" color="primary">CANCELAR</v-btn>
      </v-card-text>
    </v-card>

    </v-dialog>
  </div>

</template>

<script setup>

import { computed, ref, toRefs } from 'vue';

import { useRetransmisionStore } from '@/store/retransmision';

const retransmisionStore = useRetransmisionStore()

const props = defineProps(["seccion", "orden", "seccionActiva"])

const { seccion, orden, seccionActiva } = toRefs(props)

const colorSeccion = computed(() => seccion.value.id === seccionActiva.value ? {'background-color': '#024f64'} : {'background-color': '#686867'} )

const activarSeccion = id => retransmisionStore.setSeccionActiva(id)
// const añadirSeccion = () => retransmisionStore.addSeccion()
const añadirSeccion = () => dialog.value = true


const dialog = ref(false)
const nombreSeccion = ref(null)
let editar = false

const editarSeccion = (titulo) => {
  dialog.value = true
  editar = true
  nombreSeccion.value = titulo
  console.log(seccion.value)
  
  seccion.value.titulo = nombreSeccion.value
  console.log(seccion.value)

  
}
const aceptar = () => { 
  if(!editar) retransmisionStore.addSeccion(nombreSeccion.value)
  // seccion.value.titulo = nombreSeccion.value
  dialog.value = false
  editar = false

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

  /* .menu {
    
  }

  .menu span {
    width: 35px;
    height: 5px;
    background-color: white;
    margin: 6px 0;

  } */
</style>