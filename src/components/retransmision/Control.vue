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
      <div v-if="!rotulo.desplegable" v-for="(value, key) in rotulo.contenido" :key="key">
        <v-text-field
        v-model="rotulo.contenido[key]"
        :label=key
        density="compact"
        @update:focused="foco($event)"
      ></v-text-field>

      </div>
      <div id="contenidoDesplegable" v-if="rotulo.desplegable">
        <Desplegable :rotulo="rotulo" />
      </div>
      <div id="vumetro" v-if="rotulo.vumetro">
        <ControlVumetro />
      </div>
      <div class="error" v-if="error">
        <h3>{{ error }}</h3>
      </div>
      <div id="controlActions" >
        <v-btn size="x-small" color="error">ACEPTAR</v-btn>
        <v-btn size="x-small" color="success" @click="recargarRotulos" v-if="rotulo.desplegable">RECARGAR ROTULOS</v-btn>
        <v-btn size="x-small" color="primary" @click="cambioLive()">CAMBIO ESTADO ROTULO</v-btn>
      </div>
    </div>
  </div>

</template>

<script setup>

  import { computed, toRefs, watch } from 'vue';
  import { useRetransmisionStore } from '@/store/retransmision'
  import { ref } from 'vue';
  import Desplegable from '@/components/retransmision/Desplegable.vue'
  import ControlVumetro from './ControlVumetro.vue';
  import { storeToRefs } from 'pinia'


  
  const retransmisionStore = useRetransmisionStore()
  const { error } = storeToRefs(retransmisionStore)

  const props = defineProps(["rotuloActivo"])

  // const emit = defineEmits(["evento"])

  const { rotuloActivo } = toRefs(props)





  const rotulo = computed(() => retransmisionStore.listaRotulos.find(el => el.id === rotuloActivo.value))

  console.log(rotulo.value)
  const cambioLive = () => rotulo.value.live = !rotulo.value.live

  const foco = e => retransmisionStore.setEdit(e)

  const recargarRotulos = () => {

    console.log(rotulo.value.datosDesplegable.tipo)
    const hoja = rotulo.value.datosDesplegable.hoja
    const rango = rotulo.value.datosDesplegable.rango
    if(rotulo.value.datosDesplegable.tipo === 'gSheet') {
    retransmisionStore.getDataGS(hoja, rango)
    } else if (rotulo.value.datosDesplegable.tipo === 'EXCEL'){
    retransmisionStore.getDataExcel(hoja, rango)
    }
  }



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

.error {
  width: 100%;
  color: red;
  display: flex;
  justify-content: center;
}



#controlActions {
  padding: 0 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
}

</style>