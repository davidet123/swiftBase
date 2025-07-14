<template>
  <div id="listaDesplegable" v-if="listaGSheet">
    <!-- CUADRO DE TEXTO PARA BUSCAR ROTULO AQUI!! -->
     <!-- <v-row>
      <v-col cols="6">
        <v-select
          label="Grafico"
          :items="listaGSheet"
          v-model="numGraficoSeleccionado"
          item-title="label"
          item-value="numero"
          :active="desplegableActivo"
          :min-width="anchoDesplegable"
          @update:focused="cogerFoco"
          class="desplegable"
        >
        </v-select>
        
      </v-col>
    </v-row> -->
    <v-select
      label="Desplegable"
      :items="listaGSheet"
      v-model="numGraficoSeleccionado"
      item-title="label"
      item-value="numero"
      :active="desplegableActivo"
      @update:focused="cogerFoco"
      class="desplegable"
    >
    </v-select>
    <v-text-field
      label="Entrada manual"
      v-model="numGraficoSeleccionado"
      class="seleccionManual"
    ></v-text-field>
  </div>
  <v-divider class="my-2"></v-divider>
  <div v-if="!error" class="contenidos">
    <div class="textosDesplegable">

      <p>{{ rotulo.numeroDesplegable }}</p>
      <p v-for="(texto, id) in rotulo.contenido">{{ texto }}</p>
    </div>
    <div class="botonEnviar">
      <v-btn color="teal" size="x-small" @click="cambioTexto()" :disabled="!activarCambioTexto">CAMBIO TEXTO</v-btn>
    </div>
    <!-- {{ rotuloElegido }} -->
  </div>
  <div v-else>
    <p>{{ error }}</p>

  </div>
  <v-divider class="my-2"></v-divider>
  <!-- {{ listaGSheet }} -->
    <!-- {{ desplegableActivo }} -->
</template>

<script setup>
  import { computed, ref, toRefs, watch } from "vue"
  import { useRetransmisionStore } from '@/store/retransmision'
  import { useSwiftConnectionStore } from "@/store/swiftConnection";


  
  
  import { storeToRefs } from 'pinia';
  
  const retransmisionStore = useRetransmisionStore()  
  const swiftConnectionStore = useSwiftConnectionStore()
  const props = defineProps(["rotulo"])

  const { rotulo } = toRefs(props)

  
  const { listaGSheet, desplegableElegido, tipoDesplegableAnterior, rotuloParaTakeOff } = storeToRefs(retransmisionStore)
  const hoja = rotulo.value.datosDesplegable.hoja
  const rango = rotulo.value.datosDesplegable.rango

  tipoDesplegableAnterior.value = rotulo.value.titulo
  // rotuloParaTakeOff.value = rotulo.value.titulo
  // console.log(rotuloParaTakeOff.value)

  const activarCambioTexto = ref(false)

  const desplegableActivo = ref(false)
  // const rotuloElegido = computed(() => listaGSheet.value.find(el => el.numero == desplegableElegido.value))

  const cogerFoco = e => desplegableActivo.value = e

  // const anchoDesplegable = computed(() => !desplegableActivo.value ? '1700px' : '1560px')
  const anchoDesplegable = ref('930px')
  if(rotulo.value.datosDesplegable.tipo === 'gSheet') {

    retransmisionStore.getDataGS(hoja, rango)
  } else if (rotulo.value.datosDesplegable.tipo === 'EXCEL'){
    retransmisionStore.getDataExcel(hoja, rango)
  }

  const error = ref(null)
  

  // if(!listaGSheet.value) retransmisionStore.getData()
  
  const numGraficoSeleccionado = ref(desplegableElegido.value)

  const cambioTexto = () => {
    const titular = rotulo.value.contenido.TITULAR || ""
    const texto1 = rotulo.value.contenido.TEXTO1 || ""
    const texto2 = rotulo.value.contenido.TEXTO2 || ""
    swiftConnectionStore.customMetodo(rotulo.value.titulo, "cambioTexto")
    setTimeout(() => {
        if(titular !== "") swiftConnectionStore.rtRemote.updateFields(rotulo.value.titulo + '::TITULARTEXT','String',titular)
        if(texto1 !== "") swiftConnectionStore.rtRemote.updateFields(rotulo.value.titulo + '::TEXTO1TEXT','String',texto1)
        if(texto2 !== "") swiftConnectionStore.rtRemote.updateFields(rotulo.value.titulo + '::TEXTO2TEXT','String',texto2)
      }, 500)
  }


  watch(() => numGraficoSeleccionado.value, val => {
    // console.log(val)

    const datos = listaGSheet.value.find(el => el.numero == val)

    
    if(!datos) {
      error.value = "EL numero no existe"
    } else {
      if(datos.grafico === tipoDesplegableAnterior.value) {
        activarCambioTexto.value = true
        
      } else {
        // rotuloParaTakeOff.value = tipoDesplegableAnterior.value
        activarCambioTexto.value = false
      }
      // console.log(rotuloParaTakeOff.value)
      error.value = null
      retransmisionStore.setDesplagableElegido(datos, rotulo.value.id, val)
      
      // document.activeElement.blur()
      desplegableActivo.value = false
      setTimeout(() => {

        tipoDesplegableAnterior.value = datos.grafico
      }, 1000)

    }
  })


  watch(() => desplegableActivo.value, val => {
    if(val) { 
      anchoDesplegable.value = '1600px'
    } else {
      anchoDesplegable.value = '930px'
    }
  })
</script>

<style scoped>

#listaDesplegable {
  width: 100%;
  display: flex;
  gap: 30px;
}
.desplegable  {
  width: 50%;
}

.seleccionManual {
  width: 50%;
}

.contenidos {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.textosDesplegable {
  width: 70%;
}



</style>