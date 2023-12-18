<template>
  <!-- {{ !cargando_equipos  && !cargando_partidos }} -->

  <div v-if="!partido" class="text-center" style="margin-top:200px;">
    <v-progress-circular
      indeterminate
      color="primary"
      size="50"
    ></v-progress-circular>
  </div>

  <div v-if="partido">
    <v-row>
      <v-col cols="12" class="text-center">
        <h3>EDITAR PARTIDO FUTBOL {{ partido.equipo_local.nombre_equipo }} vs {{ partido.equipo_visitante.nombre_equipo }}</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" offset="3">
        <v-select
          v-model="nuevoPartido.competicion"
          :items="competiciones"
          item-title="nombre"
          item-value="nombre"
          density="compact"
          label="Competició"
        ></v-select> 
      </v-col>
    </v-row>
    <v-row>      
      <v-col cols="3">
        <v-text-field
          v-model="nuevoPartido.estadio"
          label="Estadio"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="nuevoPartido.lugar"
          label="Lugar"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="nuevoPartido.fecha"
          label="Fecha"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="nuevoPartido.hora"
          label="Hora"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="id !== 'localStorage'">
      <v-col cols="6">
        <v-select
          v-model="nuevoPartido.equipo_local.nombre_equipo"
          :items="equipos"
          item-title="nombre_equipo"
          item-value="nombre_equipo"
          density="compact"
          label="Equipo Local"
        ></v-select> 
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="nuevoPartido.equipo_visitante.nombre_equipo"
          :items="equipos"
          item-title="nombre_equipo"
          item-value="nombre_equipo"
          density="compact"
          label="Equipo Visitante"
        ></v-select>
      </v-col>
    </v-row>

    <!-- EQUIPO DESDE LOCAL STORAGE -->
    <v-row v-else class="mx-4">
      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model="nuevoPartido.equipo_local.nombre_equipo"
            label="Equipo local"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="nuevoPartido.equipo_local.display_name"
            label="Equipo local"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
          v-model="nuevoPartido.equipo_visitante.nombre_equipo"
            label="Equipo visitante"
          ></v-text-field>
        </v-col >
        <v-col cols="2">
          <v-text-field
          v-model="nuevoPartido.equipo_visitante.display_name"
            label="Equipo visitante"
          ></v-text-field>
        </v-col >
        <!-- Jugadores local -->
        <v-col cols="6" v-for="equipoWS in equiposWS" :key="equipoWS.nombre_equipo"> 
          <v-col cols="12" v-for="jugador in equipoWS.jugadores" :key="jugador.id_jugador">
            <v-row>
              <v-col cols="1" class="ma-0 pa-0">
                <v-text-field density="compact" v-model="jugador.numero" label="Numero"></v-text-field>
              </v-col>
              <v-col cols="3" class="ma-0 pa-0">
                <v-text-field density="compact" v-model="jugador.nombre_jugador" label="Nombre"></v-text-field>
              </v-col>
              <v-col cols="2" class="ma-0 pa-0">
                <v-text-field density="compact" v-model="jugador.apodo" label="Apodo"></v-text-field>
              </v-col>
              <v-col cols="2" class="ma-0 pa-0">
                <v-text-field density="compact" v-model="jugador.nacionalidad" label="Nacionalidad"></v-text-field>
              </v-col>
              <v-col cols="1" class="ma-0 pa-0">
                <v-text-field density="compact" v-model="jugador.fecha_nacimiento" label="Fecha nacimiento"></v-text-field>
              </v-col>
              <v-col cols="1" class="ma-0 pa-0">
                <v-text-field density="compact" v-model="jugador.altura" label="Altura"></v-text-field>
              </v-col>
              <v-col cols="2" class="ma-0 pa-0">  
                <v-select
                  v-model="jugador.posicion"
                  :items="posiciones"
                  item-title="descripcion"
                  item-value="descripcion"
                  density="compact"
                  label="Posicion"
                ></v-select> 
              </v-col>                                
            </v-row>
          </v-col>

          <v-row>
            <v-col cols="12">
              <h3>Cuerpo Técnico</h3>
              <v-row v-for="persona in equipoWS.cuerpo_tecnico" :key="persona.id_cuerpo_tecnico">
                <v-col cols="12">
                  <p>{{ persona.titulo }}</p>
                </v-col>
                <v-col cols="6" class="ma-0 pa-0">
                  <v-text-field density="compact" v-model="persona.nombre" label="Nombre"></v-text-field>
                </v-col>
                <v-col cols="3" class="ma-0 pa-0">
                  <v-text-field density="compact" v-model="persona.nacionalidad" label="Nacionalidad"></v-text-field>
                </v-col>
                <v-col cols="3" class="ma-0 pa-0">
                  <v-text-field density="compact" v-model="persona.fecha_nacimiento" label="Fecha nacimiento"></v-text-field>
                </v-col>
              </v-row>
              <!-- {{ equipoWS.cuerpo_tecnico }} -->
    
            </v-col>
          </v-row>

        </v-col>
      </v-row>





    </v-row>
    <v-row>
      <v-col cols="12"><h3>Equipo arbitral</h3></v-col>
      <v-col cols="3">
        <v-text-field
          v-model="partido.equipo_arbitral.primer_arbitro"
          label="Primer árbitro"
        ></v-text-field>
      </v-col><v-col cols="3">
        <v-text-field
          v-model="partido.equipo_arbitral.segundo_arbitro"
          label="Segundo árbitro"
        ></v-text-field>
      </v-col><v-col cols="3">
        <v-text-field
          v-model="partido.equipo_arbitral.tercer_arbitro"
          label="Tercer árbitro"
        ></v-text-field>
      </v-col><v-col cols="3">
        <v-text-field
          v-model="partido.equipo_arbitral.cuarto_arbitro"
          label="Cuarto árbitro"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2" offset="3" class="text-center">
        <v-btn color="success" @click="editarPartido()">ACEPTAR</v-btn>
      </v-col>
      <v-col cols="2" class="text-center">
        <v-btn color="error" @click="dialog = true">ELIMINAR</v-btn>
      </v-col>
      <v-col cols="2" class="text-center">
        <v-btn color="success" @click="volver">TORNAR</v-btn>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="auto"
      >
        <!-- <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            v-bind="props"
          >
            Open Dialog
          </v-btn>
        </template> -->

        <v-card class="pa-4">
          <v-card-text>
            <p class="font-weight-black">SEGUR QUE VOLS ELIMINAR EL PARTIT?</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" block @click="eliminarPartido()">ELIMINAR</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

  </div>
  <!-- <v-row>
    <v-col cols="12" class="text-center">
      <h2>Editar Partido</h2>
      <h4>{{ equipo_local.nombre_equipo }} vs {{ equipo_visitante.nombre_equipo }}</h4>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="2" offset="4">
      <v-text-field v-model="partido.fecha"></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-text-field v-model="partido.hora"></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="6" class="ml-2 text-center">
      <v-text-field class="mb-2" density="compact" v-model="equipo_local.nombre_equipo"></v-text-field>
      <v-row v-for="jugador in equipo_local.jugadores" :key="jugador.id_jugador">
        <v-col cols="2" class="ma-0 pa-0">
          <v-text-field density="compact" v-model="jugador.numero"></v-text-field>
        </v-col>
        <v-col cols="6" class="ma-0 pa-0">
          <v-text-field density="compact" v-model="jugador.nombre_jugador"></v-text-field>
        </v-col>
        <v-col cols="4" class="ma-0 pa-0">  
          <v-select
            v-model="jugador.posicion"
            :items="posiciones"
            item-title="descripcion"
            item-value="descripcion"
            density="compact"
          ></v-select> 

        </v-col>
      </v-row>

    </v-col>
  </v-row> -->
 
</template>

<script setup>

  import { ref } from 'vue';

  import { useRoute, useRouter } from 'vue-router';
  import { usegFutbolStore } from "../../store/futbol"
  import { useFutbolWebsocketStore } from "../../store/futbolWebsocket"
  
  import { storeToRefs } from "pinia";
  import { computed } from 'vue';
  import { watch } from 'vue';
  
  
  const futbolStore = usegFutbolStore()
  const futbolWebsocket = useFutbolWebsocketStore()
  const route = useRoute()
  const router = useRouter()
  
  // const cargandoPartidos = futbolStore.cargandoPartidos
  // const loading = futbolStore.loading
  
  const id = route.params.id

  
  const { cargando_equipos, cargando_partidos, equipos, partidos } = storeToRefs(futbolStore)
  const { wsPartido, wsMarcador } = storeToRefs(futbolWebsocket)

  
  // futbolStore.cargarEquipos()
  // futbolStore.cargarPartidos()

  
  // const equipo_localWS = ref(wsPartido.value.equipo_local.jugadores)
  // const equipo_visitanteWS = ref(wsPartido.value.equipo_visitante.jugadores)

  const posiciones = futbolStore.getPosiciones
  
  const dialog = ref(false)
  let partido 
  if(id !== 'localStorage') {
    partido = computed(() => futbolStore.buscarPartido(id))
  } else {
    partido = computed(() => wsPartido.value)
    console.log("partido localStorage")
  }
  const competiciones = computed(() => futbolStore.getCompeticiones)
  
  let nuevoPartido = ref(null)
  const equiposWS = computed(() => [nuevoPartido.value.equipo_local, nuevoPartido.value.equipo_visitante])
  
  // const partido = computed(() => {
  //   const refPartido =  partidos.value.find(partido=> {
  //   return partido.id_partido == id
  //   })
   
  //   nuevoPartido.value = {...refPartido}
  //   return refPartido
  // })


 /*  const refPartido = computed(() => {
    return partidos.value.find(partido => {
    console.log(partido)
    return partido.id_partido == id
    })
  }) */
 

  const editarPartido = () => {
    // console.log(nuevoPartido.value)
    if(id !== 'localStorage') {
      futbolStore.editarPartido(nuevoPartido.value)
    } else {
      console.log(nuevoPartido.value)
      futbolWebsocket.editarPartido(nuevoPartido.value)
    }

    
    router.push('/futbol')
  }

  const cargaPartido = (partido) => {
    // console.log(partido)
    nuevoPartido.value = {...partido}
  }
/* 
  const equipo_local = futbolStore.buscarEquipo(partido.id_equipo_local)
  const equipo_visitante = futbolStore.buscarEquipo(partido.id_equipo_visitante)  

  const posiciones = futbolStore.getPosiciones */


  const eliminarPartido = () => {
    if(id !== 'localStorage') {
      futbolStore.eliminarPartido(id)
    } else {
      futbolWebsocket.resetLocalStorage()
    }
    dialog.value = true
    router.push('/futbol')
  }
  if(partido) cargaPartido(partido.value)

  const volver = () => router.push('/futbol')

  watch(() => partido.value, partido => {
    cargaPartido(partido)
  })

  

</script>