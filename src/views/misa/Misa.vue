<template>
  <v-row>
    <v-col class="text-center">
      <h3>Rotulació missa</h3>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="4" class="text-center">
      <v-btn class="boton" color="white">Carregar missa</v-btn>
    </v-col>
    <v-col cols="4" class="text-center">
      <v-btn class="boton" color="white" to="/addtextomisa">Afegir textos missa</v-btn>
    </v-col>
  </v-row>
  <v-row>
    <!-- SIGUIENTE -->
    <v-col cols="5" class="text-center">
      <h4>Següent rotul</h4>
      <div class="FHDWrapper">
        <v-col >
          <div class="FHD text-center" style="white-space: pre;" :style="estiloTextoNext">
            <p v-if="next !== null">{{ textoNext }}</p>
          </div>
        </v-col>
      </div>
    </v-col>
    <v-col cols="2" class="text-center">
      <v-btn color="error">-></v-btn>

    </v-col>
    <!-- LIVE -->
    <v-col cols="5" class="text-center">
      <h4>Rotul en directe</h4>
      <div class="FHDWrapper">
        <v-col >
          <div class="FHD text-center" style="white-space: pre;" :style="estiloTextoNow">
            <p v-if="now !== null">{{ textoNow }}</p>
          </div>
        </v-col>
      </div>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <div v-for="item in textosMisa" :key="item.id">
        <textoMisaIndividualVue :item="item"/>
      </div>
    </v-col>
  </v-row>


</template>

<script setup>
import { useMisaStore } from "../../store/misa" 

import textoMisaIndividualVue from "@/components/misa/textoMisaIndividual.vue";
import { computed, ref } from "vue";


const misaStore = useMisaStore()

const idMisa = ref(0)
const textosMisa = misaStore.getMisaById(idMisa.value)
console.log(textosMisa)

const now = ref(null)
const next = ref(1)
const textoNow = computed(() => textosMisa[now.value].texto.replace(/&#10;/g, "\n"))
const textoNext = computed(() => textosMisa[next.value].texto.replace(/&#10;/g, "\n"))

const estiloTextoNow = computed (() => {
  if(now.value !== null) {
    return {
      fontSize: textosMisa[now.value].tamaño + "px",
      color: textosMisa[now.value].color
    }
  }
})
const estiloTextoNext = computed (() => {
  console.log(textosMisa)
  if(next.value !== null) {
    return {
      fontSize: textosMisa[next.value].tamaño + "px",
      color: textosMisa[next.value].color
    }
  }
})

</script>

<style >
.FHDWrapper {
    width: 80%;
    /* height: 337px; */
    margin: 0 auto;
    position: relative;
    background-color: black;
    border: 2px solid white;
  }
  .FHD {
    position:relative;
    width: 100%;
    padding-bottom: 56.25%;
    color: white;
    /* background: gold; */
  }

  .FHD p {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }


</style>