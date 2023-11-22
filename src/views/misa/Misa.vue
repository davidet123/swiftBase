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
    <v-col cols="4" class="text-center">
      <v-btn class="boton" color="white" @click="fullScreen">Full screen</v-btn>
    </v-col>
  </v-row>
  <v-row>
    <!-- SIGUIENTE -->
    <v-col cols="5" class="text-center">
      <v-row>
        <v-col>
          <h4>Següent rotul</h4>
          <div class="FHDWrapper">
            <v-col >
              <div class="FHD text-center" style="white-space: pre;" :style="estiloTextoNext">
                <p v-if="next !== null">{{ textoNext }}</p>
              </div>
            </v-col>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <v-btn @click="cambioNext(-1)" color="white">&#60;-</v-btn>
          <v-btn @click="cambioNext(1)" color="white">-&#62;</v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="2" class="text-center">
      <v-btn @click="toDirecte" color="error">-></v-btn>

    </v-col>
    <!-- LIVE -->
    <v-col cols="5" class="text-center">
      <h4>Rotul en directe</h4>
      <div class="FHDWrapper">
        <v-col >
          <div class="FHD text-center" style="white-space: pre;" :style="estiloTextoNow">
            <p v-if="now !== null">{{ textoNow.texto }}</p>
            <!-- <p>{{ textoNow.texto }}</p> -->
          </div>
        </v-col>
      </div>
    </v-col>
  </v-row>
  <!-- <v-row>
    <v-col cols=12>
      <div class="my-2" v-for="(item, index) in textosMisa" :key="item.id">
        <v-row>
          <v-col cols="3">

            <textoMisaIndividualVue :item="item" :numItem="index"/>
          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-row> -->
  <v-row>
    <v-col cols="2" v-for="(item, index) in textosMisa" :key="item.id">
      <textoMisaIndividualVue :item="item" :numItem="index"/>
    </v-col>
  </v-row>


</template>

<script setup>
import { storeToRefs } from "pinia";
import { useMisaStore } from "../../store/misa" 
import { useSwiftConnectionStore } from "../../store/swiftConnection"

import textoMisaIndividualVue from "@/components/misa/textoMisaIndividual.vue";
import { computed, ref } from "vue";
import { onBeforeMount } from "vue";


const misaStore = useMisaStore()


// onBeforeMount(async () => {
//   misaStore.cargartextoMisa()
// })

const { textoLive } = storeToRefs(misaStore)




const swiftConnectionStore = useSwiftConnectionStore()

swiftConnectionStore.startConnection()

const idMisa = ref(0)
const textosMisa = misaStore.getMisaById(idMisa.value)
// console.log(textosMisa)


const now = ref(textoLive.value)
const next = ref(0)
// const textoNow = computed(() => textosMisa[now.value].texto)
const textoNow = computed(() => misaStore.getTextoLive)
console.log(textoNow.value)
const textoNext = computed(() => textosMisa[next.value].texto)
// console.log(textosMisa[now.value])

const estiloTextoNow = computed (() => {
  if(now.value !== null) {
    return {
      fontSize: textosMisa[now.value].tamaño * 0.8 + "px",
      color: textosMisa[now.value].color
    }
  }
})
const estiloTextoNext = computed (() => {
  if(next.value !== null) {
    return {
      fontSize: textosMisa[next.value].tamaño * 0.8 + "px",
      color: textosMisa[next.value].color
    }
  }
})

const cambioNext = val => {
  if (val == 1 && next.value < textosMisa.length -1) {
    next.value ++
  } else if (val == -1 && next.value >= 1) {
    next.value --
  }
}
const cambioColor = (hex) => {
  // Remove the hash (#) if it exists
  hex = hex.replace(/^#/, '');

  // Parse the hexadecimal color components
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  // Normalize the RGB values to be between 0 and 1
  var normalizedR = r / 255;
  var normalizedG = g / 255;
  var normalizedB = b / 255;
  const str = normalizedR + "," + normalizedG + "," + normalizedB

  // Return the normalized RGB values as an object
  return str
}

const toDirecte = () => {
  console.log(now.value)
  console.log(next.value)
  console.log(textosMisa.length)
  now.value = next.value
  misaStore.setTextoLive(now.value)
  console.log(textoNow.value.texto)
  // swiftConnectionStore.rtRemote.updateFields("PRUEBA_MISA::textoMisaTEXT", "String", textosMisa[now.value].texto)
  // swiftConnectionStore.rtRemote.updateFields("PRUEBA_MISA::textoMisaSHDR", "MaterialDiffuse", cambioColor(textosMisa[now.value].color))
  swiftConnectionStore.rtRemote.updateFields("PRUEBA_MISA::textoMisaTEXT", "String", textoNow.value.texto)
  swiftConnectionStore.rtRemote.updateFields("PRUEBA_MISA::textoMisaSHDR", "MaterialDiffuse", cambioColor(textoNow.value.color))
  // misaStore.live = now.value
  // now.value ++
  // next.value ++
  if(next.value !== textosMisa.length -1) {
    next.value ++
  } 
}

const fullScreen = () => {
  window.open("http://localhost:8000/misafullscreen", '_blank','location=yes,height=1920,width=1080,scrollbars=no,status=yes')
}

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
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-wrap: wrap;
  }


</style>