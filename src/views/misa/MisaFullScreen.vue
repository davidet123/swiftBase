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
  const { textoFullScreen, textoWS, paginaFullScreen, socketStatus, fullScreenLS } = storeToRefs(misaStore)

  // onBeforeMount(async () => {
  //   await misaStore.cargartextoMisa()
  // })

  misaStore.conectarWS()

  // misaStore.setPaginaFullScreen(true)

  
  
  
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
  watch(() => socketStatus.value, val => {
    if(val == 1 && fullScreenLS.value == false) misaStore.setfullScreenLS(true)
    // console.log(val)
  },
  {
    deep: true
  })

  watch(() => fullScreenLS.value, val => {
    
    if(val == false) {
      misaStore.setfullScreenLS(true)
    }
    // console.log(val)
    },
    {
      deep: true
  })

  watch(() => textoWS.value, val => {
    // if(val == false) {
    //   misaStore.setControl(true)
    // }
    console.log(val)
    // if(val.directo) {
    //   actualizarSwift(val)

    // } else {
    //   const texto = {
    //     id: 0,
    //     titulo: "NEGRO",
    //     texto: "",
    //     tamaño: 0,
    //     color: '#FFFFFF',
    //     numero: 0
    //   }
    //   // actualizarSwift(texto)
    // }
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