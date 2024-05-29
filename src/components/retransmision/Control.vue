<template>

  <div id="control">
    <div id="configRotulo" v-if="rotulo">
      <p>{{ rotulo.titulo }}</p>
      <!-- <input :value="rotulo.titulo" placeholder="Titulo grafico" class="inputConfig" > -->
      <v-text-field
        v-model="rotulo.nombre"
        label="Título grafico"
        density="compact"
        @update:focused="foco($event)"
      ></v-text-field>
    </div>
    <div id="contenidoRotulo" v-if="rotulo">
      <div v-if="!rotulo.desplegable" v-for="(texto, index) in rotulo.contenido" :key="index">
        <!-- <input :value="texto.valor" :placeholder="texto.nombre" class="inputConfig" > -->
        <v-text-field
        v-model="texto.valor"
        :label=texto.nombreSwift
        density="compact"
        @update:focused="foco($event)"
      ></v-text-field>

      </div>
      <div id="contenidoDesplegable" v-if="rotulo.desplegable">
        <Desplegable :rotulo="rotulo" />
      </div>
      <div id="controlActions">
        <v-btn size="x-small" color="error">ACEPTAR</v-btn>
      </div>
    </div>
  </div>

</template>

<script setup>

  import { computed, toRefs, watch } from 'vue';
  import { useRetransmisionStore } from '@/store/retransmision'
  import { ref } from 'vue';
  import Desplegable from '@/components/retransmision/Desplegable.vue'


  
  const retransmisionStore = useRetransmisionStore()

  const props = defineProps(["rotuloActivo"])

  // const emit = defineEmits(["evento"])

  const { rotuloActivo } = toRefs(props)

  const rotulo = computed(() => retransmisionStore.listaRotulos.find(el => el.id === rotuloActivo.value))

  const foco = e => retransmisionStore.setEdit(e)

  // watch(() => foco.value, val => console.log(val))


</script>

<style scoped>

.inputConfig {
  width: 80%;
  border: 1px solid white;
  border-radius: 5px;
  color: white;
  padding: 0 5px;
  margin: 5px 0;
}

</style>