<template>
  <div class="FHDWrapper">
    <v-col>
      <div class="FHD text-center" style="white-space: pre;" :style="estiloTexto">
        <p>{{ texto }}</p>
      </div>
    </v-col>
  </div>
</template>

<script setup>
import { computed, toRefs } from 'vue'

const props = defineProps(["texto", "tamaño", "color"])
const { texto, tamaño, color } = toRefs(props)

const estiloTexto = computed (() => {
  return {
    fontSize: `${tamaño.value * 0.35}px`,
    color: color.value
  }
})

</script>