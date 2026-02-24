<template>
  <v-row>
    <v-col class="py-0">
      <MarcadorVoleibol />
    </v-col>
  </v-row>
  <v-row>
    <v-col class="py-0">
      <BotonesVoleibol />
    </v-col>
  </v-row>
  <div> 
  </div>
</template>

<script setup>

  import MarcadorVoleibol from '@/components/voleibol/MarcadorVoleibol.vue'
  import BotonesVoleibol from '@/components/voleibol/BotonesVoleibol.vue'
  import { useSwiftConnectionStore } from '@/store/swiftConnection'
  import { storeToRefs } from 'pinia' 

  const swiftConnectionStore = useSwiftConnectionStore()
  
  const { rtRemote } = storeToRefs(swiftConnectionStore)


  if(!rtRemote.value) swiftConnectionStore.startConnection()

  



</script>

<style scoped>

</style>