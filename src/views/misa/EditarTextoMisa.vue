<template>
  <v-row>
    <v-col>
      <h2>Afegir nou text</h2>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-textarea class="textoMisa"
      v-model="nuevoTexto.texto"
      ></v-textarea>

    </v-col>
  </v-row>
  <v-row class="pa-6">
    <v-col cols="6" class="text-center">
      <h4>Tamañy lletra</h4>
      {{ nuevoTexto.tamaño }}
      <br/>
      <v-btn @click="nuevoTexto.tamaño += 1" color="white">+</v-btn>
      <v-btn @click="nuevoTexto.tamaño -= 1" color="white">-</v-btn>
      
      
    </v-col>
  
    <v-col cols="6" class="text-center">
      <h4>Color del text</h4>
      {{nuevoTexto.color }}
      <br>
      
      <v-btn @click="nuevoTexto.color='#00ff00'" color="green"></v-btn>
      <v-btn @click="nuevoTexto.color='#ffffff'" color="white"></v-btn>
      <v-btn @click="nuevoTexto.color='#ff0000'" color="red"></v-btn>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="6" offset="3">
      <VisorMisa :texto="nuevoTexto.texto" :tamaño="nuevoTexto.tamaño" :color="nuevoTexto.color"/>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="text-center">
      <v-btn color="success" @click="aceptarEdicion">ACCEPTAR</v-btn>
    </v-col>
  </v-row>

  Editar {{ nuevoTexto }}
</template>

<script setup>

  import { useRoute, useRouter } from 'vue-router'
  import { useMisaStore } from "../../store/misa" 
  import { computed, ref } from 'vue'
  import VisorMisa from '@/components/misa/VisorMisa.vue'


  const route = useRoute()
  const router = useRouter()

  const misaStore = useMisaStore()
  
  const id = route.params.id
  const texto = computed(() => misaStore.getTextoById(id))

  const nuevoTexto = ref({...texto.value})

  const aceptarEdicion = () => {
    const editar = misaStore.updateTextoMisa(nuevoTexto.value)
    console.log(editar)
    if(editar) {
      console.log("OK")
      router.push("/misa")
    }
  }



</script>