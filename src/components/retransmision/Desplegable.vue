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
    <div class="desplegableLive">
      <v-btn :color="!rotulo.live ? 'green' : 'error'" size="x-small" @click="goLive()">LIVE</v-btn>
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

  
  const { listaGSheet, desplegableElegido, tipoDesplegableAnterior, rotuloParaTakeOff, rotuloActivo } = storeToRefs(retransmisionStore)
  const hoja = rotulo.value.datosDesplegable.hoja
  const rango = rotulo.value.datosDesplegable.rango

  tipoDesplegableAnterior.value = rotulo.value.titulo
  // rotuloParaTakeOff.value = rotulo.value.titulo
  console.log(rotuloParaTakeOff.value)

  const activarCambioTexto = ref(true)

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

  const goLive = () => {
    // console.log(rotulo.value)
    retransmisionStore.setRotuloLive(rotuloActivo.value)
  }
  

  // if(!listaGSheet.value) retransmisionStore.getData()
  
  const numGraficoSeleccionado = ref(desplegableElegido.value)

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  // const cambioTexto = async () => {
  //   const tituloActual = rotulo.value.titulo
  //   const tituloAnterior = rotuloParaTakeOff.value

  //   console.log("=== cambioTexto ===")
  //   console.log("tituloActual:", tituloActual)
  //   console.log("tituloAnterior (rotuloParaTakeOff):", tituloAnterior)
  //   console.log("contenido:", JSON.stringify(rotulo.value.contenido))

  //   if(tituloActual !== tituloAnterior) {
  //     console.log("CASO 1 - cambio de rótulo")
  //     swiftConnectionStore.rtRemote.playMethod(tituloAnterior + "::takeOff")
  //     await sleep(1050)

  //     const titular = rotulo.value.contenido.TITULAR || ""
  //     const texto1 = rotulo.value.contenido.TEXTO1 || ""
  //     const texto2 = rotulo.value.contenido.TEXTO2 || ""
  //     console.log("después del sleep - contenido:", JSON.stringify({titular, texto1, texto2}))
  //     console.log("rotulo.value.titulo después del sleep:", rotulo.value.titulo)

  //     swiftConnectionStore.playGraphic(tituloActual)
  //     await sleep(500)
  //     swiftConnectionStore.rtRemote.updateFields(tituloActual + '::TITULARTEXT', 'String', titular)
  //     swiftConnectionStore.rtRemote.updateFields(tituloActual + '::TEXTO1TEXT', 'String', texto1)
  //     swiftConnectionStore.rtRemote.updateFields(tituloActual + '::TEXTO2TEXT', 'String', texto2)
  //     swiftConnectionStore.rtRemote.playMethod(tituloActual + "::bringOn")
      
  //     console.log("rotuloParaTakeOff antes de actualizar:", rotuloParaTakeOff.value)
  //     rotuloParaTakeOff.value = tituloActual
  //     console.log("rotuloParaTakeOff después de actualizar:", rotuloParaTakeOff.value)

  //   } else {
  //     console.log("CASO 2 - mismo rótulo")
  //     const titular = rotulo.value.contenido.TITULAR || ""
  //     const texto1 = rotulo.value.contenido.TEXTO1 || ""
  //     const texto2 = rotulo.value.contenido.TEXTO2 || ""

  //     swiftConnectionStore.customMetodo(tituloActual, "cambioTexto")
  //     setTimeout(() => {
  //       swiftConnectionStore.rtRemote.updateFields(tituloActual + '::TITULARTEXT', 'String', titular)
  //       swiftConnectionStore.rtRemote.updateFields(tituloActual + '::TEXTO1TEXT', 'String', texto1)
  //       swiftConnectionStore.rtRemote.updateFields(tituloActual + '::TEXTO2TEXT', 'String', texto2)
  //     }, 500)
  //   }
  // }

  // const cambioTexto = async () => {
  //   const tituloActual = rotulo.value.titulo
  //   const tituloAnterior = rotuloParaTakeOff.value

  //   console.log(rotulo.value.contenido)
  //   if(tituloActual !== tituloAnterior) {
  //     swiftConnectionStore.rtRemote.playMethod(tituloAnterior + "::takeOff")
  //     await sleep(1000)

  //     // ✅ Capturar contenido DESPUÉS del sleep, cuando ya está sincronizado
  //     const titular = rotulo.value.contenido.TITULAR || ""
  //     const texto1 = rotulo.value.contenido.TEXTO1 || ""
  //     const texto2 = rotulo.value.contenido.TEXTO2 || ""

  //     swiftConnectionStore.playGraphic(tituloActual)
  //     if(titular) console.log(tituloActual + '::TITULARTEXT', 'String', titular)
  //     if(texto1) console.log(tituloActual + '::TEXTO1TEXT', 'String', texto1)
  //     if(texto2) console.log(tituloActual + '::TEXTO2TEXT', 'String', texto2)
  //     swiftConnectionStore.rtRemote.updateFields(tituloActual + '::TITULARTEXT', 'String', titular)
  //     swiftConnectionStore.rtRemote.updateFields(tituloActual + '::TEXTO1TEXT', 'String', texto1)
  //     swiftConnectionStore.rtRemote.updateFields(tituloActual + '::TEXTO2TEXT', 'String', texto2)
  //     swiftConnectionStore.rtRemote.playMethod(tituloActual + "::bringOn")
  //     rotuloParaTakeOff.value = tituloActual

  //   } else {
  //     const titular = rotulo.value.contenido.TITULAR || ""
  //     const texto1 = rotulo.value.contenido.TEXTO1 || ""
  //     const texto2 = rotulo.value.contenido.TEXTO2 || ""

  //     swiftConnectionStore.customMetodo(tituloActual, "cambioTexto")
  //     setTimeout(() => {
  //       if(titular !== "") swiftConnectionStore.rtRemote.updateFields(tituloActual + '::TITULARTEXT', 'String', titular)
  //       if(texto1 !== "") swiftConnectionStore.rtRemote.updateFields(tituloActual + '::TEXTO1TEXT', 'String', texto1)
  //       if(texto2 !== "") swiftConnectionStore.rtRemote.updateFields(tituloActual + '::TEXTO2TEXT', 'String', texto2)
  //     }, 500)
  //   }
  // }

  const cambioTexto = async () => {
    const titular = rotulo.value.contenido.TITULAR || ""
    const texto1 = rotulo.value.contenido.TEXTO1 || ""
    const texto2 = rotulo.value.contenido.TEXTO2 || ""

    // console.log(rotulo.value.titulo)

    if(rotulo.value.titulo !== rotuloParaTakeOff.value) {
      // console.log(rotuloParaTakeOff.value)
      // console.log(rotulo.value)
      console.log(titular, texto1, texto2 )
      swiftConnectionStore.rtRemote.playMethod(rotuloParaTakeOff.value + "::takeOff")
      await sleep(1250)
      console.log(titular, texto1, texto2 )
      swiftConnectionStore.playGraphic(rotulo.value.titulo)
      if(titular !== "") swiftConnectionStore.rtRemote.updateFields(rotulo.value.titulo + '::TITULARTEXT','String',titular)
      if(texto1 !== "") swiftConnectionStore.rtRemote.updateFields(rotulo.value.titulo + '::TEXTO1TEXT','String',texto1)
      if(texto2 !== "") swiftConnectionStore.rtRemote.updateFields(rotulo.value.titulo + '::TEXTO2TEXT','String',texto2)
      swiftConnectionStore.rtRemote.playMethod(rotulo.value.titulo + "::bringOn")
      rotuloParaTakeOff.value = rotulo.value.titulo
      // return

    } else {

      swiftConnectionStore.customMetodo(rotulo.value.titulo, "cambioTexto")
      console.log("CAmbiando texto")
      setTimeout(() => {
          if(titular !== "") swiftConnectionStore.rtRemote.updateFields(rotulo.value.titulo + '::TITULARTEXT','String',titular)
          if(texto1 !== "") swiftConnectionStore.rtRemote.updateFields(rotulo.value.titulo + '::TEXTO1TEXT','String',texto1)
          if(texto2 !== "") swiftConnectionStore.rtRemote.updateFields(rotulo.value.titulo + '::TEXTO2TEXT','String',texto2)
        }, 500)
    }
  }


  watch(() => numGraficoSeleccionado.value, val => {
    

    const datos = listaGSheet.value.find(el => el.numero == val)

    
    if(!datos) {
      error.value = "EL numero no existe"
    } else {
      // if(datos.grafico === tipoDesplegableAnterior.value) {
      //   activarCambioTexto.value = true
        
      // } else {
      //   // rotuloParaTakeOff.value = tipoDesplegableAnterior.value
      //   activarCambioTexto.value = false
      // }
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
.desplegableLive, .botonEnviar {
  display: flex;
  width: 33%;
  justify-content: center;
  align-items: center;
}



.textosDesplegable {
  width: 70%;
}



</style>