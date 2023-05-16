<template>

  <v-main>
    <h1>Simple</h1>
    <v-row>
      <v-col>
        <Visor />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="9">
        <v-text-field v-model="newItem"></v-text-field>
      </v-col>
      <v-col>
        <v-btn @click="addItem" color="success" :disabled="!newItem">ADD ITEM</v-btn>
        <!-- <v-btn @click="editItem" color="success">EDITAR</v-btn> -->
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="nombre, index in listado" :key="index" cols="2">
        <BotonSimple :nombre="nombre" @activar="activarGrafico"/>
      </v-col>
    </v-row>

    <!-- <BotonSimple nombre="Juan"  @activar="mostrar"/>
    <BotonSimple nombre="Antonio"  @activar="mostrar"/>
    <BotonSimple nombre="Pepet"  @activar="mostrar"/>
    <BotonSimple nombre="Pepet"  @activar="mostrar"/>
    <BotonSimple nombre="Pepet"  @activar="mostrar"/>
    <BotonSimple nombre="Pepet"  @activar="mostrar"/> -->
  </v-main>
</template>

<script setup>

  import BotonSimple from '@/components/simple/botonSimple.vue'
  import Visor from '@/components/visor/Visor.vue'

  import { computed, ref, watch } from 'vue'

  import { useSwiftConnectionStore } from "../../store/swiftConnection"
  import { useSimpleStore } from "../../store/simple"

  const swiftConnectionStore = useSwiftConnectionStore()
  const simpleStore = useSimpleStore()

  const listado = computed(() => {
    return simpleStore.listado
  })

  swiftConnectionStore.startConnection()

  const mostrar = val => {
    console.log(val)
  }

  // insertar graficos


  const activarGrafico = payload => {
    // console.log(payload)
    if (!payload.live) {
      // console.log("brngon")
      bringOn(payload.nombre)
    } else {
      // console.log("takeoff")
      takeOff(payload.nombre)
    }
  }

  const bringOn = (metodo) => {
  // console.log(swiftConnectionStore.rtRemote)
  swiftConnectionStore.rtRemote.playGraphic(metodo)
  swiftConnectionStore.rtRemote.playMethod(metodo + "::bringOn")
  swiftConnectionStore.rtRemote.updateFields(metodo + "::n1_DUPL", "NumDuplicates", 0)
}
  const takeOff = (metodo) => {
    swiftConnectionStore.rtRemote.playGraphic(metodo)
    swiftConnectionStore.rtRemote.playMethod(metodo + "::takeOff")
  }


  const newItem = ref(null)

  const addItem = () => {
    if(newItem.value) {
      simpleStore.addItem(newItem.value)
      newItem.value = null

    }
  }

  const numColumns = computed(() => {
    let max = 12
    const longitud = listado.value.length
    // const filas =  Math.round(longitud / (max / 2)) == 0 ? 1 : Math.round(longitud / (max / 2))
    const filas = longitud % (max / 2) == 0 ? 6 : longitud % (max / 2)
    console.log(filas)
    return (max / filas )
  })


 /*  watch(() => textoVumetro.value, (val) => {
  try {
    simpleStore.listado
  } catch (err) {
    console.log(err)
  }
}) */
 
</script>

<style>
  

</style>