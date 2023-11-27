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
            <VisorMisa class="my-2" :texto="textoFullScreen.texto" :color="textoFullScreen.color" :tamaño="textoFullScreen.tamaño"/>
            
          </div>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
  import { computed, watch } from "vue"

  import { storeToRefs } from "pinia"
  import { useMisaStore } from "../../store/misa" 
  import VisorMisa from "@/components/misa/VisorMisa.vue";
  import { useSwiftConnectionStore } from "../../store/swiftConnection"

  const misaStore = useMisaStore()
  const { textoFullScreen } = storeToRefs(misaStore)

  const swiftConnectionStore = useSwiftConnectionStore()

  swiftConnectionStore.startConnection()

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

  watch(() => textoFullScreen, val => {
  console.log(cambioColor(textoFullScreen.value.color))
  // if(directe.value) {
    swiftConnectionStore.rtRemote.updateFields("PRUEBA_MISA::textoMisaTEXT", "String", textoFullScreen.value.texto)
    swiftConnectionStore.rtRemote.updateFields("PRUEBA_MISA::textoMisaSHDR", "MaterialDiffuse", cambioColor(textoFullScreen.value.color))
  // }
  // textosMisa.value = misaStore.getMisaById(val.value)
  // console.log(val.value)
},{
  deep: true
})

</script>

<style scoped>


/* template {
  max-height: 80vh;
  overflow: hidden; 
} */
  .FHDWrapperFull {
    width: 100%;
    /* height: 337px; */
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
    text-wrap: wrap;
  }



</style>