<template>
  <v-row>
    <v-col class="text-center">
      <h1>Menu Voleibol</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="text-center">
      <v-btn color="primary" @click="resetPartido()">Nuevo partido</v-btn>
      <!-- <v-btn color="primary" to="/voleibol/equipos">Equipos</v-btn>
      <v-btn color="primary" to="/voleibol/jugadores">Jugadores</v-btn> -->
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title class="text-center">
          INFORMACION DEL PARTIDO
        </v-card-title>
        <v-card-text>
          <v-row>

            <v-col cols="4" class="my-0 py-0">
              <v-text-field
              label="Fecha"
              v-model="fecha"
              density="compact"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="my-0 py-0">
              <v-text-field
              label="Hora"
              v-model="infoPartido.hora"
              density="compact"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="my-0 py-0">
              <v-text-field
              label="Lugar"
              v-model="infoPartido.lugar"
              density="compact"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      {{ infoPartido }}
      <v-btn color="error" @click="aceptar()">ACEPTAR</v-btn>
    </v-col>
  </v-row>
  {{ equipos }}
  <v-row>
    <v-col cols="6" v-for="(equipo, index) in equipos" :key="index">
      <v-card>
        <v-card-title class="text-center">EQUIPO {{ index.toUpperCase() }}</v-card-title>
        <v-card-text>
          <div class="d-flex ga-3">
            <v-text-field
              label="Nombre"
              v-model="equipo.nombre"
            >
            </v-text-field>
            <v-text-field
              label="Abreviatura"
              v-model="equipo.abreviatura"
            >
            </v-text-field>
            <v-text-field
              label="Ciudad"
              v-model="equipo.ciudad"
            >
            </v-text-field>
          </div>
          <div class="d-flex align-center flex-column justify-center mb-4">
            <div class="d-flex flex-column align-center" style="position: relative; height: 60px; width: 60px;">
              
              <!-- <v-icon icon="mdi-tshirt-crew" size="x-large" :color="equipo.color.top" style="position: absolute; bottom: 5px; z-index: 1;"></v-icon>
              <v-icon icon="mdi-toy-brick" size="medium" class="mt-n2" :color="equipo.color.bottom" style="position: absolute; top: 0; z-index: 2;"></v-icon> -->
              <v-icon 
                icon="mdi-toy-brick" 
                :size="25" 
                :color="equipo.color.bottom"
                class="reflect-y"
                style="position: absolute; bottom: 3px; z-index: 1;"
              ></v-icon>

              <v-icon 
                icon="mdi-tshirt-crew" 
                :size="42" 
                :color="equipo.color.top"
                style="position: absolute; top: 0; z-index: 2;"
              ></v-icon>
            </div>
            <v-btn @click="abrirDialog(equipo)" color="success" size="x-small" flat>ELEGIR COLOR</v-btn>
          </div>
          <div>
            <h3 class="text-center">JUGADORES</h3>
          </div>
          <div v-for="(jugador, index) in equipo.jugadores" :key="index">
            <v-row>
              <v-col cols="1" class="my-0 py-0">
                <v-text-field
                  label="Dorsal"
                  v-model="jugador.dorsal"
                  density="compact"
                >
                </v-text-field>
              </v-col>
              <v-col cols="8" class="my-0 py-0">
                <v-text-field
                  label="Nombre"
                  v-model="jugador.nombre"
                  density="compact"
                >
                </v-text-field>
              </v-col>
              <v-col cols="3" class="my-0 py-0">
                <v-select
                   :items="posicionesVoleibol"
                   label="Posición"
                   v-model="jugador.posicion"
                   density="compact"
                >
                </v-select>
              </v-col>
            </v-row>

          </div>
        </v-card-text>
        <v-card-actions>
          <v-row>
            <v-col class="text-center">
              <v-btn color="success" @click="addJugadorVoleibol(index)">AÑADIR JUGADOR</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>

  </v-row>
  <v-row>
    <v-col class="text-center">
      <v-btn color="error" @click="empezarPartido()">EMPEZAR PARTIDO</v-btn>
    </v-col>
  </v-row>
  <div>
    <SelectorColor :dialog="dialog" :equipo="equipoElegido" @cerrar="cerrarDialog"/>
  </div>
</template>

<script setup>
  import SelectorColor from '@/components/voleibol/SelectorColor.vue'

  import { useVoleiStore } from '@/store/voleibol.js'
  import { useSwiftConnectionStore } from '@/store/swiftConnection'
  import { storeToRefs } from 'pinia'
  import { computed, ref } from 'vue'
  import router from '@/router' 

  import { defineAsyncComponent } from 'vue'

  const voleiStore = useVoleiStore()
  const swiftConnectionStore = useSwiftConnectionStore()

  const { equipos, infoPartido } = storeToRefs(voleiStore)

  const fecha = ref(null)

  const dialog = ref(false)
  const equipoElegido = ref(null)

  const abrirDialog = (equipo) => {
    dialog.value = true
    equipoElegido.value = equipo
  }

  const cerrarDialog = () => {
    dialog.value = false
    voleiStore.guardarPartidoVoleibol()
    // equipoElegido.value = null
  }

  const aceptar = () => {
    voleiStore.guardarDatos(fecha.value)
  }

  const posicionesVoleibol = [
    "Líbero",
    "Opuesto",
    "Central",
    "Receptor",
    "Colocador"
  ]

  // const equipoLocal = computed(() => equipos.value.local)
  // console.log(equipoLocal.value)

  // equipoLocal.value.jugadores.forEach(jugador => console.log(jugador))

  // for (let jugador of equipoLocal.value.jugadores) {
  //   console.log(jugador)
  // }

  // // const equipoLocal = ref(voleiStore.getEquipoLocal)
  // const equipoLocal = ref(voleiStore.equipos.value.local)

  // // const totalPuntos = computed(() => {
  // //   return equipoLocal.value.jugadores.reduce((total, jugador) => total + jugador.puntos, 0)
  // // })

  // const equipoLocalNoReactivo = voleiStore.getEquipoLocal


  const addJugadorVoleibol = equipo => {
    voleiStore.addJugadorVoleibol(equipo)
  }

  const resetPartido = () => {
    voleiStore.resetPartidoVoleibol()
  }

  const empezarPartido = () => {


    // ENVIO COLORES
      // swiftConnectionStore.rtRemote.updateFields("MARCADOR::COLOR_LOCALSHDR","MaterialDiffuse", swiftConnectionStore.hex_to_swift(equipos.value.local.color))
      // swiftConnectionStore.rtRemote.updateFields("MARCADOR::COLOR_VISITANTESHDR","MaterialDiffuse", swiftConnectionStore.hex_to_swift(equipos.value.visitante.color))

    voleiStore.guardarPartidoVoleibol()

    // ENVIAR EL COLOR AL MARCADOR

      // swiftConnectionStore.rtRemote.updateFields("MARCADOR::COLOR_LOCAL_TOPSHDR","MaterialDiffuse", hex_to_swift(partido.value.local.color.top))
      // swiftConnectionStore.rtRemote.updateFields("MARCADOR::COLOR_LOCAL_BOTSHDR","MaterialDiffuse", hex_to_swift(partido.value.local.color.bottom))
      // swiftConnectionStore.rtRemote.updateFields("MARCADOR::COLOR_VISITANTE_TOPSHDR","MaterialDiffuse", hex_to_swift(partido.value.visitante.color.top))
      // swiftConnectionStore.rtRemote.updateFields("MARCADOR::COLOR_VISITANTE_BOTSHDR","MaterialDiffuse", hex_to_swift(partido.value.visitante.color.bottom))



    // ENVIAR NOMBRE EQUIPOS AL MARCADOR

    // ENVIAR ALINEACIONES AL MARCADOR


    router.push('estvoleibol')





  }

</script>

<style scoped>

.reflect-y {
  /* Invierte el elemento verticalmente */
  transform: scaleY(-1);
}

</style>