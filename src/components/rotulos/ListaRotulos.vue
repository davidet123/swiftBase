<template>
  <v-row class="fila mb-5">
    <v-col cols="12" class="text-center">
      <p>Rotuls equip</p>
    </v-col>
    <v-col cols="12" v-for="rotulo in rotulosEquipo" :key="rotulo.id_rotulo">
      <RotuloSimple :rotulo="rotulo" @mostrar="mostrar" @editar="editarRotulo" @eliminar="eliminarRotulo" />
    </v-col>
  </v-row>
  <v-row class="fila mb-5">
    <v-col cols="12" class="text-center">
      <p>Rotuls sense mostrar</p>
    </v-col>
    
    <v-col cols="4" v-for="rotulo in rotulosSinMostrar" :key="rotulo.id_rotulo">
      <RotuloSimple :rotulo="rotulo" @mostrar="mostrar" @editar="editarRotulo" @eliminar="eliminarRotulo" />
    </v-col>
  </v-row>
  <v-row class="fila mb-5">
    <v-col cols="12" class="text-center">
      <p>Rotuls mostrats</p>
    </v-col>
    <v-col cols="4" v-for="rotulo in rotulosMostrados" :key="rotulo.id_rotulo">
      <RotuloSimple :rotulo="rotulo" @mostrar="mostrar" @editar="editarRotulo" @eliminar="eliminarRotulo" />
    </v-col>
  </v-row>
  <v-row class="fila">
    <v-col cols="12">
      <v-card>
        <v-card-title>
          Afegir nou rotul
        </v-card-title>
        <v-card-subtitle>
          <div class="input_titulo">
            <v-row>
              <v-col cols="4">
                <v-text-field
                v-model="titulo"
                label="Titol"
                ></v-text-field>
  
              </v-col>
              <v-col cols="5">
                <v-text-field
                v-model="subtitulo"
                label="Subtitol"
                ></v-text-field>
  
              </v-col>
              <v-col cols="3">
                <v-checkbox
                  label="Membre del equip"
                  v-model="periodista"
                ></v-checkbox>
  
              </v-col>
            </v-row>
          </div>
        </v-card-subtitle>
        <v-card-actions>
          <v-btn class="boton_afegir" color="success" @click="afegirRotul()">AFEGIR</v-btn>
        </v-card-actions>
      </v-card>

    </v-col>
  </v-row>

</template>

<script setup>

import { computed } from "vue";
import { useRotulosStore } from "../../store/rotulos" 

import { useRoute } from "vue-router";

import RotuloSimple from "./RotuloSimple"
import { ref } from "vue";

import { useSwiftConnectionStore } from "../../store/swiftConnection"

const swiftConnectionStore = useSwiftConnectionStore()

const route = useRoute()
const id = route.params.id 
const rotulosStore = useRotulosStore()

const rotulos = computed(() => rotulosStore.getRotulosById(id))
const rotulosEquipo = computed(() => rotulos.value.filter(r => r.periodista === true))

const rotulosMostrados = computed(() => rotulos.value.filter(r => r.periodista === false).filter(r => r.mostrado === true))
const rotulosSinMostrar = computed(() => rotulos.value.filter(r => r.periodista === false).filter(r => r.mostrado === false))


const titulo = ref(null)
const subtitulo = ref(null)
const periodista = ref(false)

const afegirRotul = () => {
  console.log(titulo.value)
  console.log(subtitulo.value)
  const payload = {
    titulo: titulo.value,
    subtitulo: subtitulo.value,
    id_partido: id,
    mostrado: false,
    periodista:  periodista.value

  }
  rotulosStore.addRotuloToDb(payload)
  titulo.value = ""
  subtitulo.value = ""
  periodista.value = false
}

const mostrar = payload => {
  if(payload.live) {
    swiftConnectionStore.cueGraphic("DSK_INDIVIDUAL")
    swiftConnectionStore.rtRemote.updateFields("DSK_INDIVIDUAL::SUPERIORTEXT","String", payload.contenido.titulo)
    swiftConnectionStore.rtRemote.updateFields("DSK_INDIVIDUAL::INFERIORTEXT","String", payload.contenido.subtitulo)
    swiftConnectionStore.bringOn("DSK_INDIVIDUAL")
    payload.rotulo.mostrado = true
  } else {
    swiftConnectionStore.takeOff("DSK_INDIVIDUAL")
  }

  rotulosStore.actualizarRotulosDB(payload.rotulo)

  // console.log(payload)
}

const editarRotulo = payload => {
  rotulosStore.actualizarRotulosDB(payload)
}
const eliminarRotulo = payload => {
  rotulosStore.eliminarRotuloDB(payload)
}


</script>


<style scoped>
  .fila{
    background-color: #303030;
    border-radius: 5px;
    border: 1px solid white;
    width: 80%;
    margin: 0 auto;
  }
  .input_titulo {
    width: 90%;
    margin: 0 auto;
  }

  .boton_afegir {
    margin: 0 auto;
  }
</style>