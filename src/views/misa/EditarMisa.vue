<template>
  <v-row>
    <v-col cols="12">
      Editar misa {{ id }}
    </v-col>
  </v-row>

  <v-row>
    <v-col v-for="(texto, index) in misa" :key="index" cols="12">
      {{ misaStore.getTextoById(texto) }}

    </v-col>
  </v-row>

  

  {{ misa }}
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router'
  import { useMisaStore } from "../../store/misa" 
  import { computed } from 'vue'
  import { watch } from 'vue'
  import { ref } from 'firebase/storage'

  const route = useRoute()
  
  const router = useRouter()
  
  const misaStore = useMisaStore()
  
  const id = route.params.id
  
  const misa = computed(() => misaStore.buscarMisa(id).idTextos)

  

  
  watch(() => id, val => {
    console.log(val)
  },{
    deep: true
  })
  

</script>