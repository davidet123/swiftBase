<template>
  <div v-if="misaStore.cargandoMisa" class="text-center" style="margin-top:200px;">
    <v-progress-circular
      indeterminate
      color="primary"
      size="50"
    ></v-progress-circular>
  </div>
  <div v-if="!misaStore.cargandoMisa">

    <v-row>
      <v-col class="text-center">
        <h3>Rotulació missa</h3>
      </v-col>
    </v-row>
    <v-row>
      <!-- <v-col cols="4" class="text-center">
        <v-btn class="boton" color="white" @click="ventanaCargar = true">Carregar missa</v-btn>
      </v-col>
      <v-col cols="4" class="text-center">
        <v-btn class="boton" color="white" to="/addtextomisa">Afegir textos missa</v-btn>
      </v-col> -->
      <v-col cols="4" class="text-center" offset="4">
        <v-btn class="boton" color="success" @click="fullScreen">PANTALLA COMPLETA</v-btn>
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
      <!-- COLUMNA CENTRAK -->
      <v-col cols="2" class="text-center">
        <v-btn :disabled="!directe" @click="toDirecte(1)" color="error" class="my-1">-></v-btn>
        <br>
        <v-btn :color="colorBotonLive" @click="directe = !directe" class="my-1">DIRECTE</v-btn>  
        <br>
        <v-btn :disabled="!directe" @click="reenviarDirecte" color="error" class="my-1">REENVIAR (SPACE)</v-btn>
        <br>
        <br>
        <v-btn :disabled="!directe" @click="limpiarPantalla" color="error" class="my-1">LIMPIAR (Q)</v-btn>
        <br>
        <p>{{ tiuloNow }}</p>
        </v-col>
      <!-- LIVE -->
      <v-col cols="5" class="text-center">
        <h4>Rotul en directe</h4>
        <!-- <p>Caracteres: {{ textoNow.texto.length }}</p> -->
        <div class="FHDWrapper">
          <v-col >
            <div class="FHD text-center" style="white-space: pre;" :style="estiloTextoNow">
              <p v-if="now !== null && !limpiarLive">{{ textoNow.texto }}</p>
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
    <!-- <v-row>
      <v-col>
        <v-infinite-scroll
        :items="textosMisa"
        >
        <template v-for="(item, index) in items" :key="item">
          <textoMisaIndividualVue :item="item" :numItem="now" :nextItem="next"/>


        </template>



        </v-infinite-scroll>
      </v-col>
    </v-row> -->
    <v-row style="height: 200px;">
      <v-col :cols="12 / 5" v-for="(item, index) in listaTextos" :key="index" class="text-center">
        <textoMisaIndividualVue :item="item" :numItem="now" :nextItem="next" />
      </v-col>
    </v-row>
    
  
    <!-- VENTANA CARGAR MISA -->
    <v-dialog width="800" v-model="ventanaCargar">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <h3>Seleccionar missa</h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-center">
              <v-btn @click="cargarMisaGSheet">CARREGAR DESDE GSHEET</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" v-for="misa in misaStore.getMisas" :key="misa.id">
              <v-row>
                <v-col cols="2">
                  <h4>{{ misa.fecha }}</h4>                
                </v-col>
                <v-col cols="4">
                  <h4>{{ misa.nombreMisa }}</h4>                
                </v-col>
                <v-col cols="2">
                  <v-btn color="success" size="x-small" @click="cargarMisa(misa.id)">Carregar</v-btn>
                </v-col>
                <v-col cols="2">
                  <v-btn color="blue" size="x-small" @click="editarMisa(misa.id)">Editar</v-btn>
                </v-col>
                <v-col cols="2">
                  <v-btn color="error" size="x-small" @click="duplicarMisa">Duplicar</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class=text-center>
              <v-btn @click="ventanaCargar = false" color="error" size="x-small">TANCAR</v-btn>
              
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useMisaStore } from "../../store/misa" 
import { useSwiftConnectionStore } from "../../store/swiftConnection"
import { usegSheetStore } from "../../store/gSheet"

import textoMisaIndividualVue from "@/components/misa/textoMisaIndividual.vue";
import { computed, ref } from "vue";
import { onBeforeMount } from "vue";
import { watch } from "vue"
import router from "@/router"


const misaStore = useMisaStore()
const gSheetStore = usegSheetStore()



// onBeforeMount(async () => {
//   misaStore.cargartextoMisa()
// })
// misaStore.cargartextoMisa()
// onBeforeMount(() => {

// misaStore.conectarWS()
// })

const { textoFullScreen, socket } = storeToRefs(misaStore)

const ventanaCargar = ref(false)

const swiftConnectionStore = useSwiftConnectionStore()



// swiftConnectionStore.startConnection()

// const idMisa = ref(0)
const idMisa = computed(() => misaStore.misaCargada)
// console.log(misaStore.misaCargada)
// const textosMisa = misaStore.getMisaById(idMisa.value)
// const textosMisa = ref(null)



// gSheetStore.getListaMisa()

// const valoresMisaGSheet = computed(() => gSheetStore.getValoresMisaGSheet)

const cargarMisaGSheet = () => {
  misaStore.crearMisaGsheet(gSheetStore.getValoresMisaGSheet)
}

// const textosMisa = computed(() => misaStore.getMisaById(idMisa.value))
const textosMisa = computed(() => JSON.parse(localStorage.getItem('misa')))




const directe = ref(false)
let blink
let colorBotonLive = ref("success")

const misaData = JSON.parse(localStorage.getItem('misaData'))

// console.log(misaData)





const now = ref(misaData.now)
const next = ref(misaData.next)

// console.log(textosMisa.value[next.value])
const listaTextos = computed(() => {
  // const textos = misaStore.getMisaById(idMisa.value)
  const textos = JSON.parse(localStorage.getItem('misa'))
  
  let n = 5;
  let start = Math.max(0, Math.min(Math.floor(next.value-n/2), textos.length-n));
  const nuevaLista = textos.slice(start, start+n);
  // console.log(nuevaLista)
  return nuevaLista
  
})

const textoNow = computed(() => textosMisa.value[now.value])
const textoNext = computed(() => textosMisa.value[next.value].texto)
const tiuloNow = computed(() => {
  if(textoNow.value.titulo == "NEGRO") return ""
  return textoNow.value.titulo
})

const limpiarLive = ref(false)



const maxAncho = 1600


const tamañoLetra = 0.7


const estiloTextoNow = computed (() => {
  const ancho = window.innerWidth
  const relacion = ancho / maxAncho >= 1 ? 1 : ancho / maxAncho
  if(now.value !== null) {
    return {
      fontSize: textosMisa.value[now.value].tamaño * tamañoLetra * relacion + "px",
      color: textosMisa.value[now.value].color
    }
  }
})
const estiloTextoNext = computed (() => {
  const ancho = window.innerWidth
  const relacion = ancho / maxAncho >= 1 ? 1 : ancho / maxAncho
  if(textosMisa.value.length >= 2)  {
    // console.log(textosMisa.value[next.value])

    if(next.value !== null) {
      return {
        fontSize: textosMisa.value[next.value].tamaño * tamañoLetra * relacion + "px", 
        color: textosMisa.value[next.value].color
      }
    }
  }
})

const cambioNext = val => {
  if (val == 1 && next.value < textosMisa.value.length -1) {
    next.value ++
  } else if (val == -1 && next.value >= 1) {
    next.value --
  }
}
const cambioColor = (hex) => {
  // console.log(hex)
  if(hex) {

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
}

const limpiarPantalla = () => {
  // const textoNowTemp = now.value
  // now.value = 0
  // console.log(now.value)
  // console.log(next.value)

  if(limpiarLive.value == false) {

    let texto = {
      id: 0,
      titulo: "NEGRO",
      texto: "",
      tamaño: 0,
      color: '#FFFFFF',
      numero: 0
    }
  
  
    // misaStore.actualizarTextoFullScreen(texto)  
    misaStore.enviarWS(texto)
    // now.value = textoNowTemp
  
    if(next.value >= 1 && now.value >= 1) {
      now.value  -= 1
      next.value  -= 1
    }
    limpiarLive.value = true
  }

}

const toDirecte = (val) => {
  // console.log(textosMisa.length)
  limpiarLive.value = false

  
  now.value = next.value
  const color = textoNow.value.color == '#00FF00' ? '#00AF00' : '#FFFFFF'
  // misaStore.setTextoLive(now.value)
  // misaStore.actualizarTextoFullScreen(textoNow.value)
  // console.log(color)
  
  // swiftConnectionStore.rtRemote.updateFields("PRUEBA_MISA::textoMisaTEXT", "String", textoNow.value.texto)
  // swiftConnectionStore.rtRemote.updateFields("PRUEBA_MISA::textoMisaSHDR", "MaterialDiffuse", cambioColor(textoNow.value.color))
  // misaStore.live = now.value
  // now.value ++
  // next.value ++
  // if(val == 1) {
  //   if(next.value !== textosMisa.value.length -1) {
  //     // console.log(next.value)
  //     next.value += val
  //   } else if (next.value == 0 && val == -1) {
  //     next.value = 1
  //     now.value = 0
  //   }

  // } else if (val == -1) {
  //   if(next.value !== textosMisa.value.length -1) {
  //     // console.log(next.value)
  //     next.value = now.value + 1
  //   } else if (next.value == 0 && val == -1) {
  //     next.value = 1
  //     now.value = 0
  //   }
  // }

  if(next.value !== textosMisa.value.length -1) {
      // console.log(next.value)
      next.value += val
    } else if (next.value == 0 && val == -1) {
      next.value = 1
      now.value = 0
    }

  // console.log(now.value)
  // console.log(next.value)
  // console.log(textoNow.value)
  setLocalStorage()
  misaStore.enviarWS(textoNow.value)
}

const reenviarDirecte = () => {
  let texto = {
      id: 0,
      titulo: "NEGRO",
      texto: "     ",
      tamaño: 0,
      color: '#FFFFFF',
      numero: 0
    }
  // misaStore.actualizarTextoFullScreen(texto) 
  // misaStore.actualizarTextoFullScreen(textosMisa.value[now.value]) 
  misaStore.enviarWS(texto)
  // console.log(textosMisa.value[now.value].texto)
//  if (textoNow.value) misaStore.reenviarTextoFullScreen(textoNow.value)
}

const fullScreen = () => {
  window.open("/misafullscreen", '_blank','location=yes,height=1920,width=1080,scrollbars=no,status=yes')
}

const cargarMisa = id => {
  // console.log(id)
  misaStore.setMisaCargada(id)
  misaStore.setTextoLive(0)
  // misaStore.actualizarTextoFullScreen({
  //       id: 0,
  //       titulo: "NEGRO",
  //       texto: "",
  //       tamaño: 70,
  //       color: '#000000'
  //     })
  now.value = 0
  next.value = 1
  // misaStore.cargarMisa(id)
  // console.log(textosMisa.value)
}

const editarMisa = id => {
  router.push(`editarmisa/${id}`)
}

const duplicarMisa = () => {
  // console.log("duplicarMisa")
}

document.addEventListener("keyup", (event) => {
  if(directe.value) {
    const key = event.key

    if (event.key === "ArrowRight") toDirecte(1)

    if (event.key === "ArrowLeft") toDirecte(-1)
    if (key.toUpperCase() === "Q") limpiarPantalla()
    if (event.key === " ") reenviarDirecte()
    
  }
  // console.log(event.key)
});

const setLocalStorage = () => {
  // const data = {
  //   now: now.value,
  //   next: next.value
  // }
  const data = JSON.parse(localStorage.getItem('misaData'))
  data.now = now.value
  data.next = next.value
  // console.log(data)
  localStorage.setItem('misaData', JSON.stringify(data))

}

// watch(() => textoFullScreen, (newValue, oldValue) => {
//   // console.log(newValue.value, oldValue.value)
//   // if(directe.value) {
//   //   swiftConnectionStore.rtRemote.updateFields("PRUEBA_MISA::textoMisaTEXT", "String", textoNow.value.texto)
//   //   swiftConnectionStore.rtRemote.updateFields("PRUEBA_MISA::textoMisaSHDR", "MaterialDiffuse", cambioColor(textoNow.value.color))
//   // }
//   // textosMisa.value = misaStore.getMisaById(val.value)
//   // console.log(val.value)
// },{
//   deep: true
// })
watch(() => directe, val => {
  if(!val.value) {
    clearInterval(blink)
    colorBotonLive.value = "success"
  } else if (val.value) {
    let i = 1
    blink = setInterval(() => {
      if(i%2 == 0) {
        colorBotonLive.value = "white"
      } else {
        colorBotonLive.value = "error"
      }
      i++
    }, 500)
  }
},{
  deep: true
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
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    /* text-wrap: wrap; */
    white-space: normal;
  }


</style>