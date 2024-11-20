<template>
  <v-dialog max-width="400" v-model="dialog" @afterLeave="cerrarDialog">
    <v-card>
      <v-card-title>
        <v-row class="ma-0 pa-0">
          <v-col class="text-center">
            <h5>Introducir {{ tipo }}</h5>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col class="text-center">
            <v-text-field
              v-if="numEstadistica == 1"
              label="Num jugador"
              v-model="numJugador"
              @update:focused="foco($event)"
              :autofocus="true"
            ></v-text-field>
            <v-text-field
              v-if="numEstadistica == 2"
              label="Equipo"
              v-model="numEquipo"
              @update:focused="foco($event)"
              :autofocus="true"
            ></v-text-field>
            <div v-if="numEstadistica == 3" v-on:keyup.enter="onEnter">
              <div v-if="jugador">
                <h6>{{ jugador.dorsal }} - {{ jugador.nombre }} {{ jugador.apellido }}</h6>
              </div>
              <div v-else>
                <h6 class="text-red">Jugador no encontrado</h6>

              </div>

            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

  </v-dialog>

</template>

<script setup>


  import { toRefs, ref, onBeforeUnmount, onDeactivated, onUnmounted, onMounted } from 'vue'
  import { useBalonmanoStore } from '@/store/balonmano';
import { useEventListener } from '@/composables/event';

  const balonmanoStore = useBalonmanoStore()


  const props = defineProps(["tipo", "partido"])

  const { tipo, partido } = toRefs(props)

  const emit = defineEmits(["aceptar", "cerrar"]) 


  const dialog = ref(true)

  const numJugador = ref(null)
  const numEquipo = ref(null)

  const numEstadistica = ref(1)
  const jugador = ref(null)
  const equipo = ref(null)

  const foco = e => balonmanoStore.setEditando(e)

  useEventListener(document, 'keydown', e => handleKeyDown(e) )

  const handleKeyDown = e => {
    if(e.key=="Enter") {
      if(numEstadistica.value === 1) {
        const dorsal = parseInt(numJugador.value)
        if(!(numJugador.value && dorsal))  {
          numJugador.value = null
          return
        }
      }
      if(numEstadistica.value === 2) {
        const equipo = parseInt(numEquipo.value)
        if(!(equipo === 1 || equipo === 2))  {
          numEquipo.value = null
          return
        }
      }
      numEstadistica.value ++
      if(numEstadistica.value === 3) {

        equipo.value = numEquipo.value === "1" ? 'local' : 'visitante'
        jugador.value = partido.value[equipo.value].jugadores.find(el => el.dorsal == numJugador.value)
      }
      if(numEstadistica.value === 4) {
        const datos = {
          tipo: tipo.value,
          equipo: equipo.value,
          jugador: jugador.value
        }
        emit("aceptar", datos)
        numJugador.value = null
        numEquipo.value = null
        dialog.value = false
      }
    }
  }

  

  // document.addEventListener('keydown', e => {
  //   if(e.key=="Enter") {
  //     if(numEstadistica.value === 1) {
  //       const dorsal = parseInt(numJugador.value)
  //       console.log(!(numJugador.value && dorsal))
  //       if(!(numJugador.value && dorsal))  {
  //         numJugador.value = null
  //         return
  //       }
  //     }
  //     if(numEstadistica.value === 2) {
  //       const equipo = parseInt(numEquipo.value)
  //       console.log(equipo === 1 || equipo === 2)
  //       if(!(equipo === 1 || equipo === 2))  {
  //         numEquipo.value = null
  //         return
  //       }
  //     }
  //     numEstadistica.value ++
  //     if(numEstadistica.value === 3) {

  //       equipo.value = numEquipo.value === "1" ? 'local' : 'visitante'
  //       jugador.value = partido.value[equipo.value].jugadores.find(el => el.dorsal == numJugador.value)
  //     }
  //     if(numEstadistica.value === 4) {
  //       const datos = {
  //         tipo: tipo.value,
  //         equipo: equipo.value,
  //         jugador: jugador.value
  //       }
  //       emit("aceptar", datos)
  //       numJugador.value = null
  //       numEquipo.value = null
  //       dialog.value = false
  //     }
  //   }
  // })

  
  const cerrarDialog = () => {
    dialog.value = false
    emit("cerrar")
  }

</script>