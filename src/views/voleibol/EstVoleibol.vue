<template>
  <div> 
    <MarcadorVoleibol />
  </div>
</template>

<script setup>

  import MarcadorVoleibol from '@/components/voleibol/MarcadorVoleibol.vue'
  import { useSwiftConnectionStore } from '@/store/swiftConnection'
  import { storeToRefs } from 'pinia' 

  const swiftConnectionStore = useSwiftConnectionStore()
  
  const { rtRemote } = storeToRefs(swiftConnectionStore)


  if(!rtRemote.value) swiftConnectionStore.startConnection()




</script>

<style scoped>

</style>