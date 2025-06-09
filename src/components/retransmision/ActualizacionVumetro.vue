<template>
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue'
  import { useVumetroStore } from '@/store/vumetro'
  import { useSwiftConnectionStore } from '@/store/swiftConnection'
  import { storeToRefs } from 'pinia'

  const swiftConnectionStore = useSwiftConnectionStore()
  const vumetro = useVumetroStore()

  const { levelMapped, level130, peakLevel } = storeToRefs(vumetro)

  onMounted(() => {
    vumetro.fetchAudioDevices()
  })

  swiftConnectionStore.startVideo()
  swiftConnectionStore.startConnection()

  // 🔧 Definir la función throttle localmente
  function throttle(fn, delay) {
    let lastCall = 0
    return (...args) => {
      const now = Date.now()
      if (now - lastCall >= delay) {
        lastCall = now
        fn(...args)
      }
    }
  }

  // Ajusta el delay deseado (en milisegundos)
  const delayMs = 100

  // Define el handler throttled
  const throttledUpdate = throttle((val) => {
    swiftConnectionStore.rtRemote.updateFields('VALOR_VUMETRO::VALOR_VUMETROTEXT','String',val)
  }, delayMs)

  watch(() => level130.value, val => {
    // swiftConnectionStore.rtRemote.updateFields("VALOR_VUMETRO::VALOR_VUMETROTEXT","String",val)
    throttledUpdate(val)
  })
  watch(() => levelMapped.value, val => {
    swiftConnectionStore.rtRemote.updateFields("CLIP_VUMETRO","Translate",val)
  })
  watch(() => peakLevel.value, val => {
    swiftConnectionStore.rtRemote.updateFields("CLIP_VUMETRO_PEAKING_MAX","Translate",val)
    swiftConnectionStore.rtRemote.updateFields("CLIP_VUMETRO_PEAKING_MIN","Translate",val - 6)
  })

</script>

<style lang="scss" scoped>

</style>