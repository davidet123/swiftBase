<template>
  <v-row>
    <v-col>
      <h3>Control Misa</h3>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="6" offset="3">
      <div class="FHDWrapperFull">
          <div class="FHDFull text-center" style="white-space: pre;" :style="estiloTexto">
            <VisorMisa class="my-2" :texto="textoWS.texto" :color="textoFullScreen.color" :tamaño="textoFullScreen.tamaño"/>            
          </div>
      </div>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="text-center">      
      <p v-if="cargandoMisa"><v-icon size="large" color="red" icon="mdi-circle-medium"></v-icon>Carregant base de dades</p>
      <p v-if="!cargandoMisa"><v-icon size="large" color="green" icon="mdi-circle-medium"></v-icon>Base de dades carregades</p>
      <p v-if="gSheetMisaLoading"><v-icon size="large" color="red" icon="mdi-circle-medium"></v-icon>Carregant dades gSheet</p>
      <p v-if="!gSheetMisaLoading"><v-icon size="large" color="green" icon="mdi-circle-medium"></v-icon>Dades gSheet carregades</p>
      <p v-if="swiftConnectionStatus == 0"><v-icon size="large" color="red" icon="mdi-circle-medium"></v-icon>Conectant a swift</p>
      <p v-if="swiftConnectionStatus == 1"><v-icon size="large" color="green" icon="mdi-circle-medium"></v-icon>Conectat a Swift</p>
      <p v-if="socketStatus !== 1"><v-icon size="large" color="red" icon="mdi-circle-medium"></v-icon>Conectant al websocket</p>
      <p v-if="socketStatus == 1"><v-icon size="large" color="green" icon="mdi-circle-medium"></v-icon>Conectat al websocket</p>
      <p v-if="!fullScreenLS"><v-icon size="large" color="red" icon="mdi-circle-medium"></v-icon>Pagina full screen sense obrir</p>
      <p v-if="fullScreenLS == 1"><v-icon size="large" color="green" icon="mdi-circle-medium"></v-icon>Pagina full screen oberta</p>
      <br>
      {{ misaStore.getSocketStatus }}
      {{ socket }}
      <!-- <p v-if="cargandoMisa || gSheetMisaLoading"><v-icon size="large" color="red" icon="mdi-circle-medium"></v-icon>Carregant dades missa...</p>
      <p v-else><v-icon size="large" color="green" icon="mdi-circle-medium"></v-icon>Dades carregades</p> -->
    </v-col>

  </v-row>
</template>

<script setup>
  import { computed, watch } from "vue"

  import { storeToRefs } from "pinia"
  import { useMisaStore } from "../../store/misa" 
  import { usegSheetStore } from "../../store/gSheet"
  import VisorMisa from "@/components/misa/VisorMisa.vue";
  import { useSwiftConnectionStore } from "../../store/swiftConnection"
  import { ref } from "firebase/storage";
import { onBeforeMount } from "vue";

  const misaStore = useMisaStore()
  const swiftConnectionStore = useSwiftConnectionStore()
  const gSheetStore = usegSheetStore()
  
  const { textoFullScreen, idTextoLive, cargandoMisa, textoWS, controlLS, paginaFullScreen, socket, socketStatus, fullScreenLS } = storeToRefs(misaStore)
  const { gSheetMisaLoading } = storeToRefs(gSheetStore)
  const { swiftConnectionStatus } = storeToRefs(swiftConnectionStore)
  
  // if(!idTextoLive.value) misaStore.cargartextoMisa()
  
  // onBeforeMount(() => {

  //   misaStore.conectarWS()
  // })
  swiftConnectionStore.startConnection()

  // misaStore.setPaginaFullScreen(false)
  

  const { rtRemote } = storeToRefs(swiftConnectionStore)
  // const { paginaFullScreen, socket, socketStatus } = storeToRefs(misaStore)

  // const textoFS = computed(() => {
  //   if(textoWS.value) return textoFS.value.texto
  //   return " "
  // })

  // const textoFS = ref(textoWS.value.texto || "")

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
  
  
  const estiloTexto = computed (() => {
    return {
      fontSize: textoFullScreen.value.tamaño * 1 + "px" || "70px",
      color: textoFullScreen.value.color || "#ffffff"
    }
    
  })

  // if (socket) misaStore.setControlLS(true)

  // const control = computed(() => misaStore.control)
  // const control = computed(() => misaStore.controlLS)


  const actualizarSwift = value => {
    
    // console.log(value.color)
    const color = value.color == '#FFFFFF' ? '#000000' : '#00FF00'
    let altura = "80"
    if(value.texto.length >= 66) altura = "140"
    // if(directe.value) {
    const textoRectangleSize = `1580, ${altura}`
    // console.log(value.texto.length)
    
    swiftConnectionStore.startTransaction()
    if(value.texto === "" || value.texto === " " || value.color !== '#FFFFFF') {
      if(swiftConnectionStatus.value == 1) swiftConnectionStore.rtRemote.updateFields("ROTULACIO_MISSA::GRUPO", "Display", "false")
    } else {
      if(swiftConnectionStatus.value == 1) swiftConnectionStore.rtRemote.updateFields("ROTULACIO_MISSA::textoMisaTEXT", "String", value.texto)
      if(swiftConnectionStatus.value == 1) swiftConnectionStore.rtRemote.updateFields("ROTULACIO_MISSA::rectangle2DGEOM", "RectangleSize", textoRectangleSize)
      if(swiftConnectionStatus.value == 1) swiftConnectionStore.rtRemote.updateFields("ROTULACIO_MISSA::textoMisaSHDR", "MaterialDiffuse", cambioColor(color))
      if(swiftConnectionStatus.value == 1) swiftConnectionStore.rtRemote.updateFields("ROTULACIO_MISSA::GRUPO", "Display", "true")

    }
    // if(swiftConnectionStatus.value == 1) swiftConnectionStore.rtRemote.updateFields("ROTULACIO_MISSA::textoMisaSombraTEXT", "String", newValue.value.texto)
    swiftConnectionStore.endTransaction()
    // status = swiftConnectionStore.getStatus("Metho", "Current")
    // console.log(swiftConnectionStore.getStatus("Script", "Current"))

  }

  const fullScreenAbierta = ref(false)

  watch(() => socketStatus.value, val => {
    if(val == 1 && !controlLS.value) misaStore.setControlLS(true)
    if(val == 1) misaStore.setfullScreenLS(false)
    // console.log(val)
  },
  {
    deep: true
  })

  watch(() => controlLS.value, val => {
    // console.log(val)
    
    if(val == false) {
      misaStore.setControlLS(true)
      // console.log("watch controlLS")
    }
  },
  {
    deep: true
  })
  watch(() => textoWS.value, val => {
    // if(val == false) {
    //   misaStore.setControl(true)
    // }
    // console.log(val)
    actualizarSwift(val)
  },
  {
    deep: true
  })

//   watch(() => textoFullScreen, (newValue, oldValue) => {
//     // console.clear()
//     // console.log(newValue.value)
//     let status = null
//     // console.log(swiftConnectionStatus.value)
//     // swiftConnectionStore.cueGraphic("ROTULACIO_MISSA")
//       //   swiftConnectionStore.startTransaction()
//       //   if(newValue.value.texto === "" || newValue.value.texto === " ") {
//       //     if(swiftConnectionStatus.value == 1) swiftConnectionStore.rtRemote.updateFields("ROTULACIO_MISSA::GRUPO", "Display", "false")
//       //   } else {
//       //     if(swiftConnectionStatus.value == 1) swiftConnectionStore.rtRemote.updateFields("ROTULACIO_MISSA::GRUPO", "Display", "true")
//       //   }
//       //   const color = newValue.value.color == '#FFFFFF' ? '#000000' : '#003099'
//       //   let altura = "80"
//       //   if(textoFullScreen.value.texto.length >= 73) altura = "140"
//       // // if(directe.value) {
//       //   const textoRectangleSize = `1580, ${altura}`
//       //   // console.log(textoFullScreen)

//       //   if(swiftConnectionStatus.value == 1) swiftConnectionStore.rtRemote.updateFields("ROTULACIO_MISSA::rectangle2DGEOM", "RectangleSize", textoRectangleSize)
//       //   if(swiftConnectionStatus.value == 1) swiftConnectionStore.rtRemote.updateFields("ROTULACIO_MISSA::textoMisaTEXT", "String", newValue.value.texto)
//       //   if(swiftConnectionStatus.value == 1) swiftConnectionStore.rtRemote.updateFields("ROTULACIO_MISSA::textoMisaSHDR", "MaterialDiffuse", cambioColor(color))
//       //   // if(swiftConnectionStatus.value == 1) swiftConnectionStore.rtRemote.updateFields("ROTULACIO_MISSA::textoMisaSombraTEXT", "String", newValue.value.texto)
//       //   swiftConnectionStore.endTransaction()
//       //   // status = swiftConnectionStore.getStatus("Metho", "Current")
//       //   console.log(swiftConnectionStore.getStatus("Script", "Current"))
//       // // }
//       // // textosMisa.value = misaStore.getMisaById(val.value)
//       // // console.log(val.value)
//     // actualizarSwift(newValue.value)
//     // status = swiftConnectionStore.getStatus("Method", "Current")
//     // console.log(status)

    
// },{
//   deep: true
// })

</script>

<style scoped>


/* template {
  max-height: 80vh;
  overflow: hidden; 
} */
  .FHDWrapperFull {
    width: 100%;
    height: 337px;
    margin: 0 auto;
    position: relative;
    background-color: black;
    /* border: 2px solid white; */
  }
  .FHDFull {
    position:relative;
    width: 100%;
    padding-bottom: 56.25%;
    color: white;
    /* background: gold; */
  }

  .FHDFull p {
    width: 100%;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    /* text-wrap: wrap; */
    white-space: normal;
  }



</style>