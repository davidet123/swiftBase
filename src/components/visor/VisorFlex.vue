<template>
  <div class="contenedor-video">
    <video id="myVideoId" autoplay muted playsinline/>

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

  import { useSwiftConnectionStore } from "../../store/swiftConnection"

  const swiftConnectionStore = useSwiftConnectionStore()

  swiftConnectionStore.startVideo()

</script>

<style>
  /* .contenedor-video {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    background-color: #303030;
    padding-top: 56.25%;
  } */
  video {
    margin: 0;
    position: absolute;
    top: 0;
    height: 100%;
    object-fit: cover;
    
  }
  #myVideoId {
    border: 1px solid white;
  }
</style>