<template>
  <v-row>
    <v-col>
      <h2>Afegir nou text</h2>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-textarea class="textoMisa"
      v-model="text"
      @update:model-value="texto1"
      ></v-textarea>

    </v-col>
  </v-row>
  <v-row class="pa-6">
    <v-col cols="6" class="text-center">
      <h4>Tamañy lletra</h4>
      {{ tamaño }}
      <br/>
      <v-btn @click="tamaño += 1" color="white">+</v-btn>
      <v-btn @click="tamaño -= 1" color="white">-</v-btn>
      
      
    </v-col>
  
    <v-col cols="6" class="text-center">
      <h4>Color del text</h4>
      {{ color }}
      <br>
      
      <v-btn @click="color='#00ff00'" color="green"></v-btn>
      <v-btn @click="color='#ffffff'" color="white"></v-btn>
      <v-btn @click="color='#ff0000'" color="red"></v-btn>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <div class="FHDWrapper">
        <v-col >
          <div class="FHD text-center" style="white-space: pre;" :style="estiloTexto">
            <p>{{ text }}</p>
          </div>
        </v-col>
      </div>
    </v-col>
  </v-row>


</template>

<script setup>
import { computed, ref } from "vue";
import { useMisaStore } from "../../store/misa" 

const misaStore = useMisaStore()

const tamaño = ref(20)

// const tamañoTexto = ref({
//   fontSize: "13px"
// })

const estiloTexto = computed (() => {
  return {
    fontSize: `${tamaño.value}px`,
    color: color.value
  }
})

const color = ref("#ffffff")
const text = ref(" ")
const texto = ref([])
let tempText = ""
let indice = 0
const texto1 = val => {
  // if(val.charCodeAt(val.length-1) !== 10) {
  //   tempText += val.charAt(val.length-1)
  //   texto.value[indice] = tempText
  //   console.log(tempText)
  // } else {
  //   texto.value.push("")
  //   indice ++
  //   tempText = []
  // }

  // console.log(texto.value)
  console.log(text.value.replace(/\n/g, "&#10;"))
}

const addTexto = () => {
  const el = {
    id: 0,
      titulo: "Comunion",
      texto: "asdfasdfadafa",
      tamaño: 12,
      color: '#ffffff'
  }
}



</script>

<style scoped>
  .textoMisa {
    width: 80%;
    margin: 0 auto;
  }

  /* .FHDWrapper {
    width: 600px;
    height: 337px;
    margin: 0 auto;
    position: relative;
    background-color: black;
    border: 2px solid white;
  } */
  /* .FHD {
    position:relative;
    width: 100%;
    padding-bottom: 56.25%;
    color: white;
  } */

  /* .FHD p {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  } */
</style>