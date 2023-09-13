<template>
  <v-row>
    <v-col class="text-center">
      <video id="myVideoId" width="620" height="349" autoplay muted playsinline/>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="text-center">
      <BotonLive nombre="CLASIFICACIONES" @activar="activarGrafico"/>
      <v-btn theme="dark" @click="reordenar">Cambio</v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="3" offset="2">
      <p>Elemento</p>
      <v-select 
      v-model="antiguo"
      :items="clasFinal"
      >
      </v-select>
      Elemento en posicion {{ clasFinal.indexOf(antiguo) + 1 }}
    </v-col>
    <v-col cols="3" offset="1">
      <p>Posicion</p>
      <v-select 
      v-model="nuevo"
      :items="posicion"
      >
      </v-select>
    </v-col>
  </v-row>
  <v-row v-if="hoja">
    <v-col>
      <BotonLive nombre="TICKER" @activar="activarGrafico"/>
    </v-col>
    <v-col cols="12" v-for="titular in titulares" :key="titular">
      {{ titular }}
    </v-col>
    
  </v-row>
</template>

<script setup>

  import {  ref } from 'vue';
  import { useSwiftConnectionStore } from "../store/swiftConnection"
  import { usegSheetStore } from "../store/gSheet"
  import BotonLive from '@/components/simple/botonLive.vue' 
  import { computed } from 'vue';
import { watch } from 'vue';

  const swiftConnectionStore = useSwiftConnectionStore()
  const gSheetStore = usegSheetStore()
  gSheetStore.getLista()
  const hoja = computed(() => gSheetStore.getValoresHoja)
  // console.log(hoja.value)

  swiftConnectionStore.startConnection()
  swiftConnectionStore.startVideo()


  const xPos = [920, 850, 780, 710, 640, 570, 500, 430]

  let clasFinal = ref(['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'])
  const posicion = [1,2,3,4,5,6,7,8]

  // let nuevaClas = ['P1', 'P4', 'P3', 'P2', 'P5']
  let nuevaClas = []

  const duracion = 10
  
  const antiguo = ref(null)
  const nuevo = ref(null)

  const swap = (desde, hasta) => {
    nuevaClas = clasFinal.value.slice()
    

    const posDesde = nuevaClas.indexOf(desde)
    const posHasta = hasta -1

    const elemento = nuevaClas.splice(posDesde, 1)[0]
    nuevaClas.splice(posHasta, 0, elemento)

    // const temp = nuevaClas[posDesde]
    // nuevaClas[posDesde] = nuevaClas[posHasta]
    // nuevaClas[posHasta] = temp

    // console.log(nuevaClas)

    
  }

  


  const reordenar = () => {

    swap (antiguo.value, nuevo.value)
    let cambio = []
    let i = 0

    clasFinal.value.forEach(el => {
      cambio.push({nombre: el, original:xPos[i], actualizada: xPos[nuevaClas.indexOf(el)], valor: xPos[i] - xPos[nuevaClas.indexOf(el)]})
      i++
    })
    // console.log(cambio)
    ejecutar(cambio)

    let temp = clasFinal.value.slice()
    clasFinal.value = nuevaClas.slice()
    nuevaClas = temp.slice()

    // console.log(clasFinal.value, nuevaClas)
    
    
  }
  
  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  const ejecutar = (clas) => {
    let i = 1
    const timer = setInterval(() => {
      swiftConnectionStore.rtRemote.startTransaction()
      clas.forEach(item => {
        const progreso = i / (duracion)
        const valorIntermedio = item.original + (item.actualizada - item.original) * easeInOut(progreso)
        const nuevaPos = `187, ${valorIntermedio}`
        // swiftConnectionStore.rtRemote.updateFields("CLASIFICACIONES::NOMBRE_JUGADORTEXT","String", nombre)
        swiftConnectionStore.rtRemote.updateFields(`CLASIFICACIONES::${item.nombre}`,"Translate", nuevaPos)
      })
      swiftConnectionStore.rtRemote.endTransaction()
      if(i == duracion) clearInterval(timer)
      i++
    }, 5)

  }
  const activarGrafico = payload => {
    // console.log(payload)
    if (payload.live) {   
      let texto = ""
      // texto.concat(...titulares.value)
      // console.log(texto)     
      for (let i = 0; i <= 2; i++) {
        texto += titulares.value[i] + " "
      }
      // console.log(texto)

      swiftConnectionStore.rtRemote.updateFields('TICKER::slugTextTEXT', "String",  titulares.value[1].replace(/\r\n|\n\r|\n|\r/g, ' '))
      swiftConnectionStore.cueGraphic(payload.nombre)
      // swiftConnectionStore.rtRemote.updateFields('TICKER::Ticker', "Contents", titulares.value[1])
      console.log(titulares.value[1])
      // swiftConnectionStore.rtRemote.updateFields('TICKER::TITULARTEXT', "String", titulares.value[8])
      swiftConnectionStore.bringOn(payload.nombre)
    } else {
      swiftConnectionStore.takeOff(payload.nombre)
    }
  }

  const titulares = computed(() => hoja.value.map((el) => {
    const tit = el[0] + ". " + el[3]
    // console.log(el)
    return tit
    // el[0].replace(/\\/g, '')
  }))
    

  watch(() => hoja, val => {
      // console.log(val.value.length)
      // console.log(titulares.value[1])
    },{
      deep: true
    })



</script>

