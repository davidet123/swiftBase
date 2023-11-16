<template>
  <v-card>
    <v-card-title>
      <h4>{{ item.id }}</h4>
    </v-card-title>
    <v-card-subtitle>
      <h4>{{item.titulo}}</h4>
    </v-card-subtitle>
    <v-card-text>
      <p>{{item.texto}}</p>
    </v-card-text>
  </v-card>
</template>

<script setup>

import { toRefs } from "vue"



const props = defineProps(["item"])
const { item } = toRefs(props)
console.log(item.value)

</script>