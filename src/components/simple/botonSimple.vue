<template>
    <!-- <v-row class="d-flex align-center justify-space-between mt-4">
      <v-col cols="12">
        <v-row>
          <v-col cols="2"><h4>{{ nombre }}</h4></v-col>
          <v-col cols="94"><v-btn :color="!live ? 'success' : 'error'" @click="insertarGrafico(nombre)" >LIVE</v-btn></v-col>
        </v-row>
      </v-col>
    </v-row> -->
    <div>
      <v-card
        class="mx-auto"
        :color="colorSeleccion"
        theme="dark"
        :height="reveal !== true ? '70px' : '300px'"
        > 
      <!-- <v-card
        class="mx-auto"
        color="#385F73"
        theme="dark"
        >  -->
        <v-card-text class="ml-2">
          <v-row>
            <v-col cols="1">
              <h3>{{ nuevoNumero }}</h3>
            </v-col>
            <v-col cols="1">
              <v-btn size="x-small" variant="flat" :color="!live ? 'success' : 'error'" @click="insertarGrafico(nuevoNombre)" :disabled="desactivar" >LIVE</v-btn>
            </v-col>
            <v-col cols="6" @click="seleccionar(id, nombre)">
              <p v-if="tiempo !== 0">{{ tiempo }}</p>
              <h4>{{ nuevoNombre }} <span :class="cuenta <= 3 ?'red--text' : 'white--text'">{{ tiempo != 0 && cuenta != 0 ? cuenta : "" }}</span> {{ tiempo != 0 && cuenta != 0 ? " segs" : "" }}</h4>
            </v-col>
            <v-col cols="1" offset=1>
              <v-btn size="x-small" color="error" @click="emit('eliminar', id)">X</v-btn>
            </v-col>
            <v-col cols="1">
              <v-btn size="x-small" @click="abrirSettings" color="blue">SETTINGS</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-expand-transition>
          <v-card 
            v-if="reveal"
            class="v-card--reveal"
            style = "height: 100%">
            <v-card-text>
              <v-row>
                <v-col cols="1">
                  <v-text-field
                  v-model="nuevoNumero"
                  label="Numero"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                  v-model="nuevoNombre"
                  label="Nombre"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-switch
                  v-model="live"
                  label="Live"
                  color="error"
                  inset
                  ></v-switch>

                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col cols="4">
                  <v-select
                  label="Tiempo"
                  :items="[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]"
                  variant="underlined"
                  v-model="tiempo"
                ></v-select>

                </v-col>
                <v-col cols=1>
                  <v-btn @click="abrirSettings">X</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-expand-transition>
      </v-card>
      
    </div>

</template>

<script setup>

import { toRefs } from 'vue'
import { watch } from 'vue'
import { ref, computed } from 'vue'

import { useSimpleStore } from "../../store/simple"
const simpleStore = useSimpleStore()

const props = defineProps(["nombre", "numero", "id", "colorSeleccion", "idSeleccion", "activarManual"])

const { nombre, numero, id, colorSeleccion, idSeleccion, activarManual } = toRefs(props)
const emit = defineEmits(["activar", "eliminar", "seleccionar"])

const seleccionado = ref(false)

// console.log(id.value)

const live = ref(false)
const reveal = ref(false)
const tiempo = ref(0)
const cuenta = ref(tiempo.value)

const nuevoNumero = ref(numero.value)
const nuevoNombre = ref(nombre.value)

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
          // console.log(cuenta.value)
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

const abrirSettings = () => {
  if(!reveal.value) {
    reveal.value = true
    
  } else {
    reveal.value = false
    // console.log(id.value, nuevoNombre.value, nuevoNumero.value)
    simpleStore.updateSimpleElement(id.value, nuevoNombre.value, nuevoNumero.value)
  }

}

const seleccionar = id => {
  const data = {id, nombre:nuevoNombre.value}
  emit('seleccionar', data)
}

watch(() => activarManual.value, val => {
  console.log(val, id .value)
  if(val === id.value) {
    insertarGrafico(nuevoNombre.value)
  }
})


</script>

<style>
  .v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
  }
</style>