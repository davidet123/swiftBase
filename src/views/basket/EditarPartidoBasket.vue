<template>
  <v-row>
    <v-col cols="12" class="text-center">
      <h3>Editar Partido Basket</h3>
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
  
  
  <v-row class="px-3">
    <v-col cols="12" v-for="(equipo, index) in equipos" :key="equipo.id_equipo">
      <v-row>
        <v-col cols="12" class="text-center">
          <h3>Equipo {{ etiqueta_equipos[index] }}</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
          label="Nombre equipo"
          v-model="equipo.nombre_equipo">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row v-for="jugador in equipo.jugadores" :key="jugador.id_jugador">
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
      <v-row v-for="(tecnico, index) in equipo.cuerpo_tecnico" :key="tecnico.id_cuerpo_tecnico" class="px-4">
        <v-col cols=!2>

          <v-row>
            <v-col cols="12">
  
              <h4>{{ etiqueta_cuerpo_tecnico[index] }}</h4>
            </v-col>
            <v-col cols="4">
              <v-text-field density="compact" v-model="tecnico.nombre" label="Nombre"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field density="compact" v-model="tecnico.nacionalidad" label="Nacionalidad"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field density="compact" v-model="tecnico.fecha_nacimiento" label="Fecha nacimiento"></v-text-field>
            </v-col>
          </v-row>
        </v-col>

      </v-row>

    </v-col>
  </v-row>
  <v-row>
      <v-col cols="12"><h3>Equipo arbitral</h3></v-col>
      <v-col cols="3">
        <v-text-field
          v-model="nuevoPartido.equipo_arbitral.primer_arbitro"
          label="Primer árbitro"
        ></v-text-field>
      </v-col><v-col cols="3">
        <v-text-field
          v-model="nuevoPartido.equipo_arbitral.segundo_arbitro"
          label="Segundo árbitro"
        ></v-text-field>
      </v-col><v-col cols="3">
        <v-text-field
          v-model="nuevoPartido.equipo_arbitral.tercer_arbitro"
          label="Tercer árbitro"
        ></v-text-field>
      </v-col><v-col cols="3">
        <v-text-field
          v-model="nuevoPartido.equipo_arbitral.cuarto_arbitro"
          label="Cuarto árbitro"
        ></v-text-field>
      </v-col>
    </v-row>
  <v-row class="mb-5">
    <v-col class="text-center">
      <v-btn color="success" @click="editarPartido">ACEPTAR</v-btn>
      <v-btn color="error" @click="resetPartido">RESET</v-btn>
      <v-btn color="success" @click="volver">TORNAR</v-btn>
    </v-col>
  </v-row>


</template>

<script setup>

  import { useRoute, useRouter } from 'vue-router'
  import { useBasketStore } from "../../store/basket"
  import { storeToRefs } from 'pinia'
  import { computed } from 'vue'

  const route = useRoute()
  const router = useRouter()

  const basketStore = useBasketStore()

  const id = route.params.id

  const { partidoBasket, marcadorBasket } = storeToRefs(basketStore)

  
  const nuevoPartido = computed(() => partidoBasket.value)
  
  // console.log(nuevoPartido.value)

  const etiqueta_equipos = ["local", "visitante"]
  const etiqueta_cuerpo_tecnico = ["Primer entrenador", "Segundo entrenador", "Delegado"]
  const posiciones = [...basketStore.getPosicionesBasket]

  const equipos = computed(() => [nuevoPartido.value.equipo_local, nuevoPartido.value.equipo_visitante])
  // console.log(equipos.value)

  const editarPartido = () => {
    // basketStore.updatePartidoBasket(nuevoPartido.value
    basketStore.guardarEnLocalStorage()
  }

  const resetPartido = () => {
    // basketStore.resetPartidoBasket()
    basketStore.resetPartidoYMarcador()
  }

  const volver = () => router.push('/basket')




</script>