<template>
  <div class="contenedorFlexVideo" :style="colorLive">
    <video class="visorFlex" id="myVideoId" width="540" height="304" autoplay muted playsinline/>

  </div>
  <!-- <v-col cols="12" class="contenedor-video">
    <v-row>
      <v-col class="text-center">
        <video id="myVideoId" width="540" height="304" autoplay muted playsinline/>
      </v-col>
    </v-row>
  </v-col> -->
</template>

<script setup>

  import { storeToRefs } from "pinia";
  import { computed } from "vue";
  import { useSwiftConnectionStore } from "../../store/swiftConnection"
  import { useRetransmisionStore } from "../../store/retransmision" 

  const swiftConnectionStore = useSwiftConnectionStore()
  const retransmisionStore = useRetransmisionStore()
  const { rotuloActivo, listaRotulosLive } = storeToRefs(retransmisionStore)

  swiftConnectionStore.startVideo()

  const colorLive = computed(() => {
    let color
    if(listaRotulosLive.value.includes(rotuloActivo.value) ) {
      color =  {'background-color': '#ff0000 !important' }
    } else {
      color = {'background-color': '#303030'}
    }
    return color
  })

</script>

<style scoped>
  .contenedorFlexVideo {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    /* display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    background-color: #303030;
    padding-top: 56.25%; */
  }
  /* video {
    width: 80%; */

    /* margin: 0 auto; */
    /* position: absolute; */
    /* top: 0; */
    /* height: 100%; */
    /* object-fit: cover; */
    
  /* } */
  .visorFlex {
    /* height: 100%; */
    /* padding-top: 56.25%; */
    border: 1px solid white;
  }
</style>