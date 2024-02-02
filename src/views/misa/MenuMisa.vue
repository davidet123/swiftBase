<template>
  <v-row>
    <v-col class="text-center mt-4">
      <h2>Missa app</h2>
      <p>Panel d'access a l'app de missa</p>
    </v-col>
  </v-row>
  <v-divider class="my-4"></v-divider>
  <v-row>
    <v-col cols="4">
      <v-row>
        <v-col cols="12" class="text-center" v-if="nombreMisaLocalstorage">
            <h4>Ultima missa carregada </h4>
            <br>
            <p>{{ nombreMisaLocalstorage }}</p>
        </v-col>
        <v-col cols="12" class="text-center" v-if="fechaMisaLocalstorage">
            <h4>Data ultima missa carregada </h4>
            <br>
            <p>{{ fechaMisaLocalstorage }}</p>
        </v-col>
        <v-col cols="12" class="text-center" v-if="!nombreMisaLocalstorage || !fechaMisaLocalstorage">
          <p>No hay datos en localstorage</p>

        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <v-btn :disabled="!nombreMisaLocalstorage" color="success" to="/misa">CONTINUAR MISSA</v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="4" class="text-center">
      <v-btn :color="misaStore.gSheetMisaCargada ? 'error' : 'success'" :disabled="gSheetMisaLoading" @click="cargarMisa">CARREGAR MISSA</v-btn>
      <!-- <p>Id missa: <span v-if="misa">{{ idMisa }}</span><span v-else>---</span></p> -->
      <!-- <p v-if="!misa">Missa carregada:</p>
      <br> -->
      <p><span v-if="misa">{{ misa.nombreMisa }}</span><span v-else>---</span></p>
      <v-btn color="success" :disabled="!misaStore.gSheetMisaCargada" to="/misa" class="mt-4">INICIAR MISSA</v-btn>
      <p>Començar nova missa</p>
    </v-col>
    <v-col cols="4" class="text-center">
      <v-row>
        <v-col class="text-center">
          <v-btn color="white" to="/controlmisa" target="_blank">CONTROL MISSA</v-btn>

        </v-col>

      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
          v-model="urlWS"
          label="URL WEBSOCKET">
          </v-text-field>
          <p>{{ URLWebsocket }}</p>
        </v-col>
        <v-col>
          <v-btn size="x-small" color="success" @click="setUrlWS">ACEPTAR</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-divider class="my-4"></v-divider>
  <v-row>
    <v-col class="text-center">      
      <p v-if="cargandoMisa"><v-icon size="large" color="red" icon="mdi-circle-medium"></v-icon>Carregant base de dades</p>
      <p v-if="!cargandoMisa"><v-icon size="large" color="green" icon="mdi-circle-medium"></v-icon>Base de dades carregades</p>
      <p v-if="gSheetMisaLoading"><v-icon size="large" color="red" icon="mdi-circle-medium"></v-icon>Carregant dades gSheet</p>
      <p v-if="!gSheetMisaLoading"><v-icon size="large" color="green" icon="mdi-circle-medium"></v-icon>Dades gSheet carregades</p>
      <p v-if="misaStore.control"><v-icon size="large" color="green" icon="mdi-circle-medium"></v-icon>Pàgina control</p>
      <p v-if="!misaStore.control"><v-icon size="large" color="red" icon="mdi-circle-medium"></v-icon>Pàgina control</p>
      <br>
      <p v-if="cargandoMisa || gSheetMisaLoading"><v-icon size="large" color="red" icon="mdi-circle-medium"></v-icon>Carregant dades missa...</p>
      <p v-else><v-icon size="large" color="green" icon="mdi-circle-medium"></v-icon>Dades carregades</p>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="text-center">
      <v-btn color="success" to="/">INICI</v-btn>
    </v-col>
  </v-row>



</template>

<script setup>

import { useMisaStore } from "../../store/misa" 
import { usegSheetStore } from "../../store/gSheet"
import { storeToRefs } from "pinia"
import { computed, ref } from "vue"
import { watch } from "vue";

const misaStore = useMisaStore()
const gSheetStore = usegSheetStore()

const { cargandoMisa, URLWebsocket } = storeToRefs(misaStore)
const { gSheetMisaLoading } = storeToRefs(gSheetStore)


// CARGANDO DATOS

misaStore.cargartextoMisa()
gSheetStore.getListaMisa()

// Leer localstorage

const datosMisa = {
        nombre: null,
        fecha: null,
        now: 0,
        next: 1
      }

const misaData = computed(() => JSON.parse(localStorage.getItem('misaData')) || datosMisa)
// console.log(misaData)

const nombreMisaLocalstorage = ref(misaData.value.nombre)
const fechaMisaLocalstorage = ref(misaData.value.fecha)


// poner control en falso

misaStore.setControl(false)

const control = computed(() => misaStore.control)



const urlWS = ref(misaData.value.urlWS)

const valoresMisa = computed(() => gSheetStore.getValoresMisaGSheet)
// misaStore.crearMisaGsheet(gSheetStore.getValoresMisaGSheet)

const idMisa = computed(() => misaStore.misaCargada)

const misa = ref(null)

const cargarMisa = () => {
  misaStore.crearMisaGsheet(valoresMisa.value)
  misa.value = misaStore.getMisas.find(el => el.id == idMisa.value)
  const data = JSON.parse(localStorage.getItem('misaData'))
  nombreMisaLocalstorage.value = data.nombre
  fechaMisaLocalstorage.value = data.fecha
  urlWS.value = data.url
}

const setUrlWS = () => {
  misaStore.setUrlWS(urlWS.value)
}

// watch(() => datosMisaLS.value, val => {
//   console.log(val)
// },
// {
//   deep: true
// })


// watch(() => valoresMisa, val =>  {
//   misaStore.crearMisaGsheet(valoresMisa.value)
//   console.log(misaStore.getMisas)
//   // misaStore.setMisaCargada(valoresMisa.value.id)
//   // misaStore.setTextoLive(0)
//   // misaStore.setMisaCargada(val.value)
//   // // const misa = misaStore.getMisas[misaStore.getMisas.length -1]
//   console.log(idMisa.value)
//   // misa.value = misaStore.getMisas[misaStore.getMisas.length -1]
//   misa.value = misaStore.getMisas.find(el => el.id == idMisa.value)
// },{
//   deep: true
// })

</script>