<template>
  <div class="FHDWrapperFull">
      <div class="FHDFull text-center" style="white-space: pre;" :style="estiloTexto">
        <p v-if="textoFullScreen !== null">{{ textoWS.texto }}</p>
      </div>
  </div>
</template>

<script setup>
  import { computed, watch } from "vue"

  import { storeToRefs } from "pinia"
  import { useMisaStore } from "../../store/misa" 
  import { onBeforeMount } from "vue";

  const misaStore = useMisaStore()
  const { textoFullScreen, textoWS, paginaFullScreen } = storeToRefs(misaStore)

  onBeforeMount(async () => {
    await misaStore.cargartextoMisa()
  })

  misaStore.conectarWS()

  misaStore.setPaginaFullScreen(true)

  
  
  
  const estiloTexto = computed (() => {
    let mult = 2.8
    if(textoWS.value.texto.length <= 22) mult = 3.8 
    if(textoWS.value.texto.length >= 60 && textoFullScreen.value.texto.length <= 80) mult = 2.3 
    if(textoWS.value.texto.length >= 80) mult = 2.3
    return {
      fontSize: textoWS.value.tamaño * mult + "px" || "70px",
      color: textoWS.value.color || "#ffffff"
    }
    
  })
  // const estiloTexto = computed (() => {
  //   let mult = 2.8
  //   if(textoFullScreen.value.texto.length <= 22) mult = 4 
  //   if(textoFullScreen.value.texto.length >= 60 && textoFullScreen.value.texto.length <= 80) mult = 2.5 
  //   if(textoFullScreen.value.texto.length >= 80) mult = 2.5
  //   return {
  //     fontSize: textoFullScreen.value.tamaño * mult + "px" || "70px",
  //     color: textoFullScreen.value.color || "#ffffff"
  //   }
    
  // })

  watch(() => paginaFullScreen.value, val => {
    
    if(val == false) {
      misaStore.setPaginaFullScreen(true)
    }
    // console.log(val)
    },
    {
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
    height: 100%;
    padding: 30px;
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
    /* text-wrap: wrap; */
    white-space: normal;
  }



</style>