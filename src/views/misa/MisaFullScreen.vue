<template>
      <div class="FHDWrapperFull">
          <div class="FHDFull text-center" style="white-space: pre;" :style="estiloTexto">
            <p v-if="textoMisa !== null">{{ textoMisa.texto }}</p>
          </div>
      </div>
</template>

<script setup>
  import { computed } from "vue"
  import { watch } from "vue"

  import { storeToRefs } from "pinia"
  import { useMisaStore } from "../../store/misa" 
  import { useRotulosStore } from "../../store/rotulos" 
  // import { useSwiftConnectionStore } from "../../store/swiftConnection"


  const misaStore = useMisaStore()
  const rotulosStore = useRotulosStore()

  // const swiftConnectionStore = useSwiftConnectionStore()
  // swiftConnectionStore.startConnection()

  const { textoLive } = storeToRefs(misaStore)
  // console.log(live.value)

  
  // const textoMisa = computed(() => misaStore.getTextoById(textoLive.value))
  // console.log(textoMisa.value)
  // const texto = computed(() => textoMisa.value.texto.replace(/&#10;/g, "\n"))
  // console.log(texto.value)

  const textoMisa = computed(() => misaStore.getTextoLive)
  // console.log(textoMisa.value)
  
  
  const estiloTexto = computed (() => {

    return {
      fontSize: textoMisa.value.tamaño * 2.8 + "px",
      color: textoMisa.value.color
    }
    
  })
//   const cambioColor = (hex) => {
//   // Remove the hash (#) if it exists
//   hex = hex.replace(/^#/, '');

//   // Parse the hexadecimal color components
//   var bigint = parseInt(hex, 16);
//   var r = (bigint >> 16) & 255;
//   var g = (bigint >> 8) & 255;
//   var b = bigint & 255;

//   // Normalize the RGB values to be between 0 and 1
//   var normalizedR = r / 255;
//   var normalizedG = g / 255;
//   var normalizedB = b / 255;
//   const str = normalizedR + "," + normalizedG + "," + normalizedB

//   // Return the normalized RGB values as an object
//   return str
// }


// watch(() => textoMisa, val => {
//   console.log(val.value)
//   swiftConnectionStore.rtRemote.updateFields("PRUEBA_MISA::textoMisaTEXT", "String", val.value.texto)
//   swiftConnectionStore.rtRemote.updateFields("PRUEBA_MISA::textoMisaSHDR", "MaterialDiffuse", cambioColor(val.value.color))
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