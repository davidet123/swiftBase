<template>
  <v-row>
    <v-col cols="12">
      Editar misa {{ id }}
    </v-col>
  </v-row>
  <v-row>
    <!-- Columna izquierda -->
    <v-col cols="3">
      <v-virtual-scroll
      :items="misa"
      height="800px"
      item-height="50"
      >
      <template v-slot:default="{ item }">
        <VisorMisa class="my-2" :texto="misaStore.getTextoById(item).texto" :color="misaStore.getTextoById(item).color" :tamaño="misaStore.getTextoById(item).tamaño"/>
      </template>

      </v-virtual-scroll>
      <!-- <v-row class="pa-2">
        <v-col v-for="(texto, index) in misa" :key="index" cols="12">
          <VisorMisa :texto="texto.texto" />
          {{ misaStore.getTextoById(texto) }}
        </v-col>
      </v-row> -->
    </v-col>
    <v-col cols="1" class="text-center">
      <v-btn color="white">&#60;-</v-btn>
      <br>
      <v-btn color="white">-&#62;</v-btn>
      <br>
      <v-btn color="white">+</v-btn>
      
    </v-col>
    <!-- Columna derecha -->
    <v-col cols="3">
      <v-virtual-scroll
      :items="textos"
      height="800px"
      item-height="50"
      >
        <template v-slot:default="{ item }" class="visorSelector">
          <VisorMisa class="my-2" :texto="item.texto" :color="item.color" :tamaño="item.tamaño" />
          <v-row class="ma-0 pa-0" v-if="editar && idTextoAEditar == item.id">
            <v-col cols="12">
              <v-text-field
                v-model="nuevoTexto.texto"
              ></v-text-field>
              <v-col cols="12" class="text-center">
                <v-btn color="success" size="x-small" @click="finalizarEdicion()">ACEPTAR</v-btn>
              </v-col>
            </v-col>
          </v-row>
          <v-row class="ma-0 pa-0" v-else>
            <v-col cols="12" class="text-center">
              <v-btn color="success" size="x-small" @click="editarTexto(item.id)">EDITAR</v-btn>
            </v-col>
          </v-row>
        </template>
      </v-virtual-scroll>


    </v-col>
  </v-row>


  

  {{ misa }}
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router'
  import { useMisaStore } from "../../store/misa" 
  import { computed, watch, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import VisorMisa from '@/components/misa/VisorMisa.vue'
  

  const route = useRoute()
  
  const router = useRouter()
  
  const misaStore = useMisaStore()

  const { textos } = storeToRefs(misaStore)
  
  const id = route.params.id
  
  const misa = computed(() => misaStore.buscarMisa(id).idTextos)

  let editar = ref(false)
  let idTextoAEditar = null
  const nuevoTexto = ref(null)

  const editarTexto = id => {
    idTextoAEditar = id
    editar.value = true
    nuevoTexto.value = misaStore.getTextoById(id)
    // nuevoTexto.value = refTexto.texto

  }

  const finalizarEdicion = () => {

    editar.value = false
  }



  

  
  watch(() => id, val => {
    console.log(val)
  },{
    deep: true
  })
  watch(() => nuevoTexto, val => {
    console.log(val.value)
    misaStore.updateTextoMisa(nuevoTexto.value)
  },{
    deep: true
  })
  

</script>