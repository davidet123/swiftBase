<template>
  <v-col cols="12" class="contenedor-video">
    <v-row>
      <v-col class="text-center">
        <video id="myVideoId" width="540" height="304" autoplay muted playsinline/>
      </v-col>
    </v-row>
  </v-col>
</template>

<script setup>

  import { useSwiftConnectionStore } from "../../store/swiftConnection"

  const swiftConnectionStore = useSwiftConnectionStore()

  swiftConnectionStore.startVideo()

</script>

<style>
  .contenedor-video {
    display: flex;
    align-items: center;
    justify-content: center;
    /* border: 2px solid white; */
    background-color: #303030;
  }
  video {
    margin: 0;
    padding: 0;
  }
  #myVideoId {
    border: 1px solid white;
  }
</style>