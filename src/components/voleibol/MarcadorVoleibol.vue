<template>
  <v-row>
    <v-col class="text-center">
      <video id="myVideoId" width="620" height="349" autoplay muted playsinline/>
    </v-col>
  </v-row>
  <v-card>
    <v-card-title class="text-center">
      MARCADOR VOLEIBOL
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="3" class="text-center">
          <v-row>
            <v-col cols="5" class="text-center">
              <h1 :class="saque === 'local' ? 'text-decoration-underline' : 'text-decoration-none'">{{ equipoLocal.abreviatura }}</h1>
              <h1>{{ marcador.puntosLocal}}</h1>
              <v-row>
                <v-col cols="12" class="text-center">
                  <v-btn color="success" size="x-small" @click="punto('local', 1)">+</v-btn>
                  <v-btn color="error" size="x-small" @click="punto('local', -1)">-</v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="2">
              <v-btn size="x-small" color="teal" @click="cambioSaque()">SAQUE</v-btn>
              

            </v-col>
            <v-col cols="5" class="text-center">
              <h1 :class="saque === 'visitante' ? 'text-decoration-underline' : 'text-decoration-none'">{{ equipoVisitante.abreviatura }}</h1>
              <h1>{{ marcador.puntosVisitante}}</h1>
              <v-row>
                <v-col cols="12" class="text-center">
                  <v-btn color="success" size="x-small" @click="punto('visitante', 1)">+</v-btn>
                  <v-btn color="error" size="x-small" @click="punto('visitante', -1)">-</v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-row>
              <v-col>
                <BotonLive :nombre="`MARCADOR`"  @activar="activarMarcador" />
              </v-col>
            </v-row>
          </v-row>          
        </v-col>
        <v-col cols="5" class="text-center">
          <BotonLive :nombre="'MARCADOR_BAJO'" @activar="activarMarcadorBajo"/>
          <v-table>
            <thead>
              <tr>
                <th>SET 1</th>
                <th>SET 2</th>
                <th>SET 3</th>
                <th>SET 4</th>
                <th>SET 5</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ marcador.parcialesLocal[0] }}</td>
                <td>{{ marcador.parcialesLocal[1] }}</td>
                <td>{{ marcador.parcialesLocal[2] }}</td>
                <td>{{ marcador.parcialesLocal[3] }}</td>
                <td>{{ marcador.parcialesLocal[4] }}</td>
                <td>{{ marcador.setsLocal }}</td>
              </tr>
              <tr>
                <td>{{ marcador.parcialesVisitante[0] }}</td>
                <td>{{ marcador.parcialesVisitante[1] }}</td>
                <td>{{ marcador.parcialesVisitante[2] }}</td>
                <td>{{ marcador.parcialesVisitante[3] }}</td>
                <td>{{ marcador.parcialesVisitante[4] }}</td>
                <td>{{ marcador.setsVisitante }}</td>
              </tr>
            </tbody>

          </v-table>

        </v-col>
          <v-col cols="4" class="text-center">
            <h4>SET ACTUAL</h4>
            <h2>{{ marcador.setActivo }}</h2>
            <v-row>
              <v-col cols="6">
                <h4>LOCAL</h4>
                <h2>{{ marcador.setsLocal }}</h2>
                <v-row>
                  <v-col cols="12" class="text-center">
                    <v-btn color="success" size="x-small" @click="set('local', 1)">+</v-btn>
                    <v-btn color="error" size="x-small" @click="set('local', -1)">-</v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6">
                <h4>VISITANTE</h4>
                <h2>{{ marcador.setsVisitante }}</h2>
                <v-row>
                  <v-col cols="12" class="text-center">
                    <v-btn color="success" size="x-small" @click="set('visitante', 1)">+</v-btn>
                    <v-btn color="error" size="x-small" @click="set('visitante', -1)">-</v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
      </v-row>
      <!-- {{ equipos }}-->
      {{ marcador }} 

    </v-card-text>
  </v-card>
</template>

<script setup>

  import { computed, ref, watch } from 'vue'
  
  import { useVoleiStore } from '@/store/voleibol.js'
  import { useSwiftConnectionStore } from '@/store/swiftConnection'

  import BotonLive from '@/components/simple/botonLive.vue'

  import { storeToRefs } from 'pinia' 

  const voleiStore = useVoleiStore()
  const swiftConnectionStore = useSwiftConnectionStore()

  swiftConnectionStore.startVideo()

  
  const { equipos, marcador } = storeToRefs(voleiStore)
  
  const equipoLocal = computed(() => equipos.value.local)
  const equipoVisitante = computed(() => equipos.value.visitante)
  const saque = computed(() => marcador.value.saque)
  
  const punto = (equipo, val) => {
    voleiStore.actualizarPunto(equipo, val)
    if(equipo === 'local') {
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::PUNTOS_LOCALTEXT","String", marcador.value.puntosLocal)
    } else if(equipo === 'visitante') {
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::PUNTOS_VISITANTETEXT","String", marcador.value.puntosVisitante)
    }
  }
  
  const set = (equipo, val) => {
    voleiStore.actualizarSet(equipo, val)
    if(equipo === 'local') {
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::SETS_LOCALTEXT","String", marcador.value.setsLocal)
    } else if(equipo === 'visitante') {
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::SETS_VISITANTETEXT","String", marcador.value.setsVisitante)
    }
  }


  let marcadorActivo = false
  
  const activarMarcador = payload => {
    console.log(payload)
    swiftConnectionStore.playGraphic(payload.nombre)
    if(payload.live) {

      // ENVIO COLORES

      swiftConnectionStore.rtRemote.updateFields("MARCADOR::COLOR_LOCALSHDR","MaterialDiffuse", swiftConnectionStore.hex_to_swift(equipos.value.local.color))
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::COLOR_VISITANTESHDR","MaterialDiffuse", swiftConnectionStore.hex_to_swift(equipos.value.visitante.color))
      

      // ENVIO DATOS MARCADOR

      // ENVIO PUNTOS
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::PUNTOS_LOCALTEXT","String", marcador.value.puntosLocal)
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::PUNTOS_VISITANTETEXT","String", marcador.value.puntosVisitante)
      // ENVIO SETS
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::SETS_LOCALTEXT","String", marcador.value.setsLocal)
      swiftConnectionStore.rtRemote.updateFields("MARCADOR::SETS_VISITANTETEXT","String", marcador.value.setsVisitante)


      swiftConnectionStore.bringOn(payload.nombre)
      if(saque.value === 'local') {
        swiftConnectionStore.customMetodo('MARCADOR', 'saqueLocalIn')
      } else if(saque.value === 'visitante') {
        swiftConnectionStore.customMetodo('MARCADOR', 'saqueVisitanteIn')
      }
      marcadorActivo = true
    }
    if(!payload.live) {
      swiftConnectionStore.takeOff(payload.nombre)
      if(saque.value === 'local') {
        swiftConnectionStore.customMetodo('MARCADOR', 'saqueLocalOut')
      } else if(saque.value === 'visitante') {
        swiftConnectionStore.customMetodo('MARCADOR', 'saqueVisitanteOut')
    }
      marcadorActivo = false
  }
    
  }
  const activarMarcadorBajo = payload => {
    swiftConnectionStore.playGraphic(payload.nombre)

    if(payload.live) {
      for(let i = 0; i < 5; i++) {
        if(marcador.value.parcialesLocal[i] === 0 && marcador.value.parcialesVisitante[i] === 0) {
          swiftConnectionStore.rtRemote.updateFields(`MARCADOR_BAJO::FONDO_SET_${i + 1}_LOCALSHDR`, "Display", "false")
          swiftConnectionStore.rtRemote.updateFields(`MARCADOR_BAJO::FONDO_SET_${i + 1}_VISITANTESHDR`, "Display", "false")
          swiftConnectionStore.rtRemote.updateFields(`MARCADOR_BAJO::SET${i + 1}_LOCALSHDR`,"MaterialDiffuse", swiftConnectionStore.hex_to_swift('#FFFFFF'))
          swiftConnectionStore.rtRemote.updateFields(`MARCADOR_BAJO::SET${i + 1}_VISITANTESHDR`,"MaterialDiffuse", swiftConnectionStore.hex_to_swift('#FFFFFF'))

        }
      }
      

      // ENVIAR VALORES AL MARCADOR BAJO
      
      for(let i = 0; i < 5; i++) {
        swiftConnectionStore.rtRemote.updateFields(`MARCADOR_BAJO::SET${i + 1}_LOCALTEXT`,`String`, marcador.value.parcialesLocal[i])
        swiftConnectionStore.rtRemote.updateFields(`MARCADOR_BAJO::SET${i + 1}_VISITANTETEXT`,`String`, marcador.value.parcialesVisitante[i])
        swiftConnectionStore.rtRemote.updateFields(`MARCADOR_BAJO::SETS_LOCALTEXT`,`String`, marcador.value.setsLocal)
        swiftConnectionStore.rtRemote.updateFields(`MARCADOR_BAJO::SETS_VISITANTETEXT`,`String`, marcador.value.setsVisitante)
        if(marcador.value.parcialesLocal[i] > marcador.value.parcialesVisitante[i]) {
          swiftConnectionStore.rtRemote.updateFields(`MARCADOR_BAJO::FONDO_SET_${i + 1}_LOCALSHDR`, "Display", "true")
          swiftConnectionStore.rtRemote.updateFields(`MARCADOR_BAJO::FONDO_SET_${i + 1}_VISITANTESHDR`, "Display", "false")
          swiftConnectionStore.rtRemote.updateFields(`MARCADOR_BAJO::SET${i + 1}_LOCALSHDR`,"MaterialDiffuse", swiftConnectionStore.hex_to_swift('#FFFFFF'))
          swiftConnectionStore.rtRemote.updateFields(`MARCADOR_BAJO::SET${i + 1}_VISITANTESHDR`,"MaterialDiffuse", swiftConnectionStore.hex_to_swift('#000000'))

        } else if(marcador.value.parcialesLocal[i] < marcador.value.parcialesVisitante[i]) {
          swiftConnectionStore.rtRemote.updateFields(`MARCADOR_BAJO::FONDO_SET_${i + 1}_LOCALSHDR`, "Display", "false")
          swiftConnectionStore.rtRemote.updateFields(`MARCADOR_BAJO::FONDO_SET_${i + 1}_VISITANTESHDR`, "Display", "true")
          swiftConnectionStore.rtRemote.updateFields(`MARCADOR_BAJO::SET${i + 1}_LOCALSHDR`,"MaterialDiffuse", swiftConnectionStore.hex_to_swift('#000000'))
          swiftConnectionStore.rtRemote.updateFields(`MARCADOR_BAJO::SET${i + 1}_VISITANTESHDR`,"MaterialDiffuse", swiftConnectionStore.hex_to_swift('#FFFFFF'))
      }
    }
      
      swiftConnectionStore.bringOn(payload.nombre)
    } else {
      swiftConnectionStore.takeOff(payload.nombre)
    }

    
  }
  const cambioSaque = () => {
    voleiStore.cambiarSaque()
  }

  watch(() => saque.value, val => {
    if(!marcadorActivo) return
    if(val === 'local') {
      swiftConnectionStore.customMetodo('MARCADOR', 'saqueLocalIn')
      swiftConnectionStore.customMetodo('MARCADOR', 'saqueVisitanteOut')
    } else if(val === 'visitante') {
      swiftConnectionStore.customMetodo('MARCADOR', 'saqueVisitanteIn')
      swiftConnectionStore.customMetodo('MARCADOR', 'saqueLocalOut')
    }
  })


</script>

<style scoped>

</style>