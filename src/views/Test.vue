<template>
  <v-row>
    <v-col class="text-center">
      <video id="myVideoId" width="620" height="349" autoplay muted playsinline/>
    </v-col>
  </v-row>
  <!-- <v-row>
    <v-col class="text-center">
      X:{{ x }} y:{{ y }}
      <span v-if="texto">{{ texto.partial }}</span>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <video id="video1"  autoplay muted />
    </v-col>
  </v-row> -->
  <v-row>
    <v-col cols="12" class="text-center">DSK ANIMADO</v-col>
  </v-row>  
  <v-row>
    <v-col cols="4" offset="1">
      <v-text-field v-model="nombre" label="Nombre"></v-text-field>      
    </v-col>
    <v-col cols="4" offset="1">
      <v-text-field v-model="cargo" label="Cargo"></v-text-field>
    </v-col>
    <v-col cols="4" >
      <v-text-field v-model="titular" label="Titular"></v-text-field>      
    </v-col>
    <v-col cols="4" >
      <v-text-field v-model="subtitular1" label="Subtitular 1"></v-text-field>      
    </v-col>
    <v-col cols="4">
      <v-text-field v-model="subtitular2" label="Subtitular 2"></v-text-field>      
    </v-col>
  </v-row>
  <v-row>
    <v-col class="text-center">
      <BotonLive nombre="DSK_ANIMADO" @activar="activarDskAnimado"/>
      <v-btn color="success" @click="subtitularIn">SUBTITULAR IN</v-btn>
      <v-btn color="success" @click="subtitularSwitch">CAMBIO SUBTITULAR</v-btn>
      <v-btn color="success" @click="SubtitularOut">SUBTITULAR OUT</v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-row>
      <v-col>
        {{ testMSG }}
        <v-btn @click="enviarWS" color="success">ENVIAR WS</v-btn>
      </v-col>
    </v-row>
    <v-col cols="12" class="text-center">
      <BotonLive nombre="REDES_SOCIALES" @activar="activarGrafico"/>
      <BotonLive nombre="COPY" @activar="activarGrafico"/>
      <BotonLive nombre="PIP" @activar="activarGrafico"/>
      <BotonLive nombre="ORATGE" @activar="activarOratge"/>
      <v-btn color="success" @click="canviOratge" variant="flat" size="x-small">CANVI ORATGE</v-btn>
      <v-btn color="success" @click="swiftConnectionStore.getStatus('Scenegraph', 'Current')" variant="flat" size="x-small">STATUS</v-btn>
      
    </v-col>
    <v-col cols="4" offset="4">
      <v-text-field
      v-model="ciudad"
      label="Ciutat"
      >

      </v-text-field>

    </v-col>
    <v-col  cols=12 class="text-center">
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
  <v-row>
    <v-col cols="6">
      <v-row v-if="hoja">
        <v-col>
          <BotonLive nombre="TICKER" @activar="activarGrafico"/>
        </v-col>
        <v-col cols="12" v-for="(titular, index) in titulares.filter((el) => el !== null)" :key="titular" >
          <div v-if="titular !== null">{{ titular }} <v-btn :color="colorLive !== index ? 'success' : 'error'" @click="rotular(titular, index)">ENVIAR</v-btn></div>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="6">
      <p v-for="item in jsonReaderStore.data" :key="item.NOMBRE">
      
        {{ item.POS_OFICIAL }} - {{ item.DORSAL }} {{ item.NOMBRE }} - {{ item.TIEMPO_OFICIAL }} <BotonLive nombre="MARATON" @activar="activarGrafico"/>
      </p>
      
      
      
    </v-col>
  </v-row>
</template>

<script setup>

  import {  ref } from 'vue';
  import { useSwiftConnectionStore } from "../store/swiftConnection"
  import { useFutbolWebsocketStore } from "../store/futbolWebsocket"
  import { useWebsocketStore } from "../store/websocket"
  import { usegSheetStore } from "../store/gSheet"
  import { usejsonReaderStore } from "../store/jsonReader"
  // import { usexmlReaderStore } from "../store/xmlReader"
  import BotonLive from '@/components/simple/botonLive.vue' 
  import { computed } from 'vue';
  import { watch } from 'vue';  
  import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
  // import { createWorker } from 'tesseract.js';

  // console.log(createWorker)




  
  
  
  const swiftConnectionStore = useSwiftConnectionStore()
  const futbolWebsocket = useFutbolWebsocketStore()
  const gSheetStore = usegSheetStore()
  const jsonReaderStore= usejsonReaderStore()
  const websocketStore = useWebsocketStore()




  websocketStore.conectarWS()



// DSK ANIMADO
  const titular = ref("")
  const subtitular1 = ref("")
  const subtitular2 = ref("")
  const nombre = ref("")
  const cargo = ref("")
  const activarDskAnimado = payload => {
    console.log(payload)
    console.log(titular.value)

    if(payload.live) {
      
      swiftConnectionStore.cueGraphic(payload.nombre)
      swiftConnectionStore.rtRemote.updateFields('DSK_ANIMADO::TITULARTEXT', "String", titular.value)
      swiftConnectionStore.rtRemote.updateFields('DSK_ANIMADO::SUBTITULAR1TEXT', "String", subtitular1.value)
      swiftConnectionStore.rtRemote.updateFields('DSK_ANIMADO::SUBTITULAR2TEXT', "String", subtitular2.value)
      swiftConnectionStore.rtRemote.updateFields('DSK_ANIMADO::NOMBRETEXT', "String", nombre.value)
      swiftConnectionStore.rtRemote.updateFields('DSK_ANIMADO::CARGOTEXT', "String", cargo.value)
      swiftConnectionStore.bringOn(payload.nombre)
    } else {
      swiftConnectionStore.takeOff(payload.nombre)
    }
  }

  const subtitularIn = () => {
    swiftConnectionStore.rtRemote.playMethod("DSK_ANIMADO::subtitularesOn")
  }
  const subtitularSwitch = () => {
    swiftConnectionStore.rtRemote.playMethod("DSK_ANIMADO::subtitularSwitch")
  }
  const SubtitularOut = () => {
    swiftConnectionStore.rtRemote.playMethod("DSK_ANIMADO::subtitularesOff")
  }




  // FIN DSK ANIMADO

  const { texto } = storeToRefs(websocketStore)

  // const frase = ref("")
  let palabras = []

  

  const frase = computed(() => {
    // const temp = []
    if (texto.value) {
      if(texto.value.texto !== "") palabras.push(texto.value.text)
    }
  if(palabras.length == 20) palabras = []
    return palabras.join(' ')

  })
  // const xmlReaderStore = usexmlReaderStore()
  // gSheetStore.getLista()

  // WEBCAM
  // let video
  // onMounted(() => {
  //   video = document.getElementById("video1")
  //   console.log(document)
  // })

  // const video = document.getElementById("video1")
  // console.log(video)

  // const startWebcam = () => {
  //   navigator.mediaDevices
  //   // .enumerateDevices()
  //   // .then((devices) => {
  //   //   devices.forEach((device) => {
  //   //     console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
  //   //   });
  //   // })
  //   .getUserMedia({
  //     video: {width: 1048, height: 576},
  //     audio: false
  //   })
  //   .then( stream => {
  //     console.log(stream)
  //     video.srcObject = stream
  //   })
  // }



  // startWebcam()

  // MOVIMIENTO RATON
  const x = ref(0)
  const y = ref(0)

  // document.onmousemove = (e => {
  //   console.log(e)
  //   let h = window.innerHeight
  //   let posY = h - e.clientY

  //   swiftConnectionStore.rtRemote.updateFields("MOVIMIENTO::CIRCULOTRFM", "Translate", `${e.clientX},${posY}`)
  //   x.value = e.clientX
  //   y.value = posY

  // })
  // document.onmousemove = ((e) => {
  //   console.log(e.clientX)
  // })  


  // JSON READER

  jsonReaderStore.getJson()

  // XML READER

  // xmlReaderStore.getXML()



  const hoja = computed(() => gSheetStore.getValoresHoja)
  // console.log(hoja.value)
  
  swiftConnectionStore.startConnection()
  swiftConnectionStore.startVideo()
  
  // Prueba websocket


  futbolWebsocket.conectarWS()
  // futbolWebsocket.enviarWS()
  const enviarWS = () => futbolWebsocket.enviarWS({message: "test"})

  const testMSG = computed(() => futbolWebsocket.getTest)

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

  
  const colorLive = ref(null)

  const live = ref(false)

  let tickerLive = false

  const rotular = (titular, index) => {
    // swiftConnectionStore.getStatus("method", "Current")
    // console.log(titular)
    if (!live.value) {   
      colorLive.value = index
      let texto = ""
      // texto.concat(...titulares.value)
      // console.log(texto)     
      for (let i = 0; i <= 2; i++) {
        texto += titulares.value[i] + " "
      }
      console.log(texto)

      swiftConnectionStore.rtRemote.updateFields('TICKER::slugTextTEXT', "String",  titular.replace(/\r\n|\n\r|\n|\r/g, ' '))
      // swiftConnectionStore.rtRemote.updateFields('TICKER::Ticker', "Contents",  titular.replace(/\r\n|\n\r|\n|\r/g, ' '))
      // swiftConnectionStore.rtRemote.updateFields('TICKER::slugTextTEXT', "String",  titular.replace(/[\r\n]/g, ' '))
      swiftConnectionStore.rtRemote.updateFields('TICKER::ticker', "NumberCycles",  10)
      swiftConnectionStore.cueGraphic("TICKER")
      // console.log(titulares.value[1])
      // swiftConnectionStore.rtRemote.updateFields('TICKER::TITULARTEXT', "String", titulares.value[8])
      // swiftConnectionStore.bringOn("TICKER")
      tickerLive = true
      console.log("tickerlive true")
    } else {
      if(oratgeLive) {
        swiftConnectionStore.oratgeOff()
        setTimeout(() => {
          colorLive.value = null
          swiftConnectionStore.takeOff("TICKER")
          tickerLive = false
        }, 500)
        oratgeLive = false
      } else {
        colorLive.value = null
        swiftConnectionStore.takeOff("TICKER")
        tickerLive = false
      }
    }
    live.value = !live.value
    
  }
  
  const ciudad = ref("Gandia")
  let datosOratge = false
  let oratgeLive = false
  
  let valoresOratge = null

  // MOSTRAR ORATGE Y LA PRIMERA VEZ CARGAR LOS DATOS
  const activarOratge = (payload) => {
  
    console.log("activar aratge")
    if (tickerLive) {

    if(payload.live && ciudad.value !== null) {
      getOratge()
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        valoresOratge = {
          temperature: `${Math.floor(data.main.temp)}º C`,
          condition: data.weather[0].description,
          location: data.name,
          windDirection: degToCompass(data.wind.deg),
          windDeg: data.wind.deg,
          windSpeed: (data.wind.speed * 3.6).toFixed(1),
          icon: `${data.weather[0].icon}_2x`
        }
        canviOratge()
        // console.log(weatherData)
        datosOratge = true
        oratgeLive = true
      })

        swiftConnectionStore.oratgeOn()
        
      } else if(!payload.live) {
        swiftConnectionStore.oratgeOff()
        datosOratge = false
        oratgeLive = false
      } else {
        console.log("No hay ciudad")
      }
    } 

  }

  const getOratge = () => {
    return new Promise((resolve, reject) => {
      const apiKey = "a217a2ed8d0d1f1af10ffc3fef312c39"
      // const cityName = "Gandia"
      const cityName = ciudad.value
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=ca&appid=${apiKey}&units=metric`
  
      const data = fetch(url)
      resolve(data)

    })
    // .then(response => response.json())
    // .then(data => {
    //   // console.log(data)
    //   const weatherData = {
    //     temperature: `${data.main.temp}º`,
    //     condition: data.weather[0].description,
    //     location: data.name,
    //     windDirection: degToCompass(data.wind.deg),
    //     windDeg: data.wind.deg,
    //     windSpeed: (data.wind.speed * 3.6).toFixed(1),
    //     icon: `${data.weather[0].icon}_2x`
    //   }
    //   console.log(weatherData)
    //   return weatherData
      
    // })
    // .catch (err => {
    //   console.log(err)
    // })



  }

  const canviOratge = () => {
    console.log(datosOratge)
    if(datosOratge) {
      getOratge()
      .then(response => response.json())
      .then(resData => {
        // console.log(data)
        const weatherData = {
          temperature: `${Math.floor(resData.main.temp)}º C`,
          condition: resData.weather[0].description,
          location: resData.name,
          windDirection: degToCompass(resData.wind.deg),
          windDeg: resData.wind.deg,
          windSpeed: (resData.wind.speed * 3.6).toFixed(1),
          icon: `${resData.weather[0].icon}_2x`
        }
        console.log(weatherData)
        valoresOratge = weatherData
        cambiarValoresSwift(weatherData)
      }) 
    } else {
      cambiarValoresSwift(valoresOratge)
    }
  } 

  const cambiarValoresSwift = data => {
    swiftConnectionStore.rtRemote.updateFields('ORATGE::CIUTATTEXT', "String", data.location)
      swiftConnectionStore.rtRemote.updateFields('ORATGE::TEMPTEXT', "String", data.temperature)
      swiftConnectionStore.rtRemote.updateFields('TICKER::FLECHA', "RotateZ", parseFloat(data.windDeg))
      swiftConnectionStore.rtRemote.updateFields('ORATGE::VIENTOTEXT', "String", data.windSpeed)
      swiftConnectionStore.rtRemote.updateFields('ORATGE::CONDITIONTEXT', "String", data.condition.charAt(0).toUpperCase() + data.condition.slice(1))
      swiftConnectionStore.rtRemote.updateFields('ORATGE::ICONSHDR', "Shader", data.icon)
  } 

  const  latLngToScreenCoordinates = (latitude, longitude) => {
    const screenWidth = 1920;
    const screenHeight = 1080;

    // Ajusta el rango de latitud y longitud según tus necesidades
    const minLat = 0; // Latitud mínima
    const maxLat = 180; // Latitud máxima
    const minLng = -180; // Longitud mínima
    const maxLng = 180; // Longitud máxima

    // Calcula las coordenadas en pantalla
    const x = (longitude - minLng) / (maxLng - minLng) * screenWidth;
    const y = screenHeight - (latitude - minLat) / (maxLat - minLat) * screenHeight;

    return { x, y };
}
  const degToCompass = grados => {
              
      const val = Math.floor((grados/22.5) + 0.5)
      const arr = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
      return arr[(val % 16)]
  }
    
  const cueGrafico = payload => {

  }



  const activarGrafico = payload => {
    // console.log("status")
    // swiftConnectionStore.getStatus("Script", "Current")
    // console.log(payload)
    if (payload.live) {   

      
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
    // para corredores
    // const tit = el[1] !== undefined ? el[0] + ". " + el[1] : null
    // return tit
    // para RSS
    let tit
    if(el[0].includes("|")) {
      tit = el[0].split("|")[1] + ". " + el[3]
    } else {
      tit = el[0] + ". " + el[3]
    }
    // console.log(tit)
    return tit
    // el[0].replace(/\\/g, '')
  }))

    

  watch(() => texto, val => {
      let temp = val.value.partial
      let nuevoTexto = ""
      console.log(nuevoTexto.length)
      if(temp.length >= 60) nuevoTexto = temp.slice(60)
      
      // console.log(val.value.partial.length)
      if(val.value.partial !== null) swiftConnectionStore.rtRemote.updateFields('SUBTITULOS::SUBTITULOTEXT', "String", temp.toUpperCase())
      // console.log(titulares.value[1])
    },{
      deep: true
    })



</script>

