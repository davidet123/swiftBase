<template>
    <!-- <v-row class="d-flex align-center justify-space-between mt-4">
      <v-col cols="12">
        <v-row>
          <v-col cols="2"><h4>{{ nombre }}</h4></v-col>
          <v-col cols="94"><v-btn :color="!live ? 'success' : 'error'" @click="insertarGrafico(nombre)" >LIVE</v-btn></v-col>
        </v-row>
      </v-col>
    </v-row> -->

    <v-card
      class="mx-auto"
      max-width="344"
      color="#385F73"
      theme="dark"
      > 
      <v-card-text class="text-center">
        <p>{{ tiempo }}</p>
        <h4>{{ nombre }} <span :class="cuenta <= 3 ?'red--text' : 'white--text'">{{ tiempo != 0 && cuenta != 0 ? cuenta : "" }}</span> {{ tiempo != 0 && cuenta != 0 ? " segs" : "" }}</h4>
      </v-card-text>
      <v-card-actions >
        <v-btn variant="flat" :color="!live ? 'success' : 'error'" @click="insertarGrafico(nombre)" :disabled="desactivar" >LIVE</v-btn>
        <v-btn @click="reveal = true">SETTINGS</v-btn>
      </v-card-actions>
      <v-expand-transition>
        <v-card 
          v-if="reveal"
          class="v-card--reveal"
          style = "height: 100%">
          <v-card-text>

            <p>TEST</p>
          </v-card-text>
          <v-card-actions>
            <v-select
            label="Tiempo"
            :items="[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]"
            variant="underlined"
            v-model="tiempo"
          ></v-select>
            <v-btn @click="reveal = false">X</v-btn>
          </v-card-actions>
        </v-card>
      </v-expand-transition>
    </v-card>
    
</template>

<script setup>

import { ref, computed } from 'vue'

const props = defineProps(["nombre"])
const emit = defineEmits(["activar"])

const live = ref(false)
const reveal = ref(false)
const tiempo = ref(0)
const cuenta = ref(tiempo.value)

const desactivar = computed (() => {
  // return cuenta.value == 0 ? false : true
  return false
})


const insertarGrafico = val => {
  let timer = null
  const payload = {
    live: live.value,
    nombre: val
  }

  const stopCuenta = () => {
      clearTimeout(timer)
      emit("activar", {
        live: true,
        nombre: props.nombre
      })
      live.value = false
    }
  
  live.value = !live.value
  if (live.value == true) {
    cuenta.value = tiempo.value
    live.value = true
    
    emit("activar", payload)
    
    // Si hay tiempo poner en marcha el temporizador
    if(tiempo.value !== 0) {
      timer = setTimeout(function cuentaAtras() {
          console.log(cuenta.value)
          if(cuenta.value <= 0) {
            stopCuenta()
          } else {
            cuenta.value -= 1
            setTimeout(cuentaAtras, 1000)
          }
        }, 1000)

    } 

  } else {
    cuenta.value = 0
    stopCuenta()
  }

  
  
  
}


</script>

<style>
  .v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
  }
</style>