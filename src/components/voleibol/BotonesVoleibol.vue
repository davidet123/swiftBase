<template>
 <v-row>
  <v-col>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col>
            <div class="d-flex ga-1 justify-center">
            <botonLive v-for="boton in botones" :nombre="boton" @activar="activarBoton" />
          </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col 
            cols="3" 
            class="text-center"
            v-for="dsk in DSKS"
            :key="dsk.tipo">
            <h3>{{ dsk.tipo }}</h3>
            <v-text-field
              density="compact"
              label="Cargo"
              v-model="dsk.cargo"
            ></v-text-field>
            <v-text-field
              density="compact"
              label="Nombre"
              v-model="dsk.nombre"
            ></v-text-field>
          <BotonLiveContenido :nombre="'DSK_INFERIOR'" :contenido="dsk" :dskActivo="dskActivo" @activar="ejecutarDSK"/>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
 </v-row>
 {{ dskActivo }}
</template>

<script setup>
  
  import { useVoleiStore } from '@/store/voleibol.js'
  import { storeToRefs } from 'pinia'
  import { useSwiftConnectionStore } from '@/store/swiftConnection'
  import BotonLiveContenido from '../simple/botonLiveContenido.vue'
  import botonLive from '../simple/botonLive.vue'
  import { ref } from 'vue'
  
  const voleibolStore = useVoleiStore()
  const swiftConnectionStore = useSwiftConnectionStore()

  const { DSKS } = storeToRefs(voleibolStore)

  const botones = ref(['DIRECTE', 'LOCALITZACIO', 'COPY',])
  
  const dskActivo = ref(false)

  const ejecutarDSK = payload => {
    const [tipo, nombre, cargo] = [payload.contenido.tipo, payload.contenido.nombre, payload.contenido.cargo]
    if(nombre === null || cargo === null) return
    if(nombre === "" || cargo === "") return

    if(payload.live) {
      // if(dskActivo) return
      swiftConnectionStore.rtRemote.updateFields("DSK_INFERIOR::CARGOTEXT","String", cargo)
      swiftConnectionStore.rtRemote.updateFields("DSK_INFERIOR::NOMBRETEXT","String", nombre)
      swiftConnectionStore.playGraphic("DSK_INFERIOR")
      swiftConnectionStore.bringOn("DSK_INFERIOR")
      dskActivo.value = true
    } else{
      swiftConnectionStore.takeOff("DSK_INFERIOR")
      dskActivo.value = false
    }

  }
  const activarBoton = payload => {
    console.log(payload)
    if(payload.live) {
      swiftConnectionStore.playGraphic(payload.nombre)
      swiftConnectionStore.bringOn(payload.nombre)
    } else{
      swiftConnectionStore.takeOff(payload.nombre)
    }
  }

</script>

<style scoped>

</style>