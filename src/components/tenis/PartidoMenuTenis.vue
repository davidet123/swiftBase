<template>
<v-card>
  <v-card-title>
    Partido
  </v-card-title>
  <v-card-text>
    {{ partido }}
    
  </v-card-text>
</v-card>

</template>

<script setup>

import { toRefs } from 'vue';


const props = defineProps(["partido"])

const { partido } = toRefs(props)

</script>