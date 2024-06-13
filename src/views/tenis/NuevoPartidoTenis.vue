<template>
  <v-row>
    <v-col cols="12" class="text-center mt-2">
      <h4>Crear partido tenis</h4>
    </v-col>
  </v-row>
  <v-divider class="my-4"></v-divider>
  <v-row>
    <v-col cols="4" style="margin: 0 auto">
      <v-select
        label="Competicion"
        :items="competiciones"
        item-title="nombre_competicion"
        item-value="nombre_competicion"
        v-model="partido.competicion"
      ></v-select>

    </v-col>
  </v-row>
  <v-row>
    <v-col cols="2" offset="1" class="text-center">
      <v-text-field
        label="dia"
        v-model="partido.dia"
        density="compact"
      ></v-text-field>
    </v-col>
    <v-col cols="2" class="text-center">
      <v-text-field
        label="hora"
        v-model="partido.hora"
        density="compact"
      ></v-text-field>
    </v-col>
    <v-col cols="2" class="text-center">
      <v-text-field
        label="Nombre pista"
        v-model="partido.nombre_pista"
        density="compact"
      ></v-text-field>
    </v-col>
    <v-col cols="2" class="text-center">
      <v-text-field
        label="Lugar partido"
        v-model="partido.lugar_partido"
        density="compact"
      ></v-text-field>
    </v-col>
    <v-col cols="2" class="text-center">
      <v-text-field
        label="Num sets"
        v-model="partido.num_sets"
        density="compact"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="2" offset="5">
      <v-radio-group v-model="partido.jugadores_por_equipo" inline>
        <v-radio label="Individual" :value="1"></v-radio>
        <v-radio label="Dobles" :value="2"></v-radio>
      </v-radio-group>
      <!-- <v-text-field
        label="Num jugadores"
        v-model="partido.jugadores_por_equipo"
      ></v-text-field> -->
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="6" v-for="index in totalJugadores" :key="index">
      <v-select
        :label="`Jugador ${index}`"
        :items="jugadores"
        item-title="nombre"
        item-value="id_jugador"
        v-model="partido.jugadores_id[index-1]"
      ></v-select>

      <!-- {{index}} -->

    </v-col>
  </v-row>
  <v-row>
    <v-col class="text-center">
      <v-btn color="success" @click="crearPartido()">CREAR PARTIDO</v-btn>
      <v-btn color="primary" :disabled="!partido.id_partido_tenis" @click="empezarPartido(partido.id_partido_tenis)">EMPEZAR PARTIDO</v-btn>
    </v-col>
  </v-row>
  <v-row>
    {{ partidos }}
  </v-row>
  <!-- <v-row>
    {{ partido }}
  </v-row> -->

</template>

<script setup>

  import { storeToRefs } from "pinia";
  import { useTenisStore } from "@/store/tenis"
  import { computed, ref, watch } from "vue";
  import { useRouter } from 'vue-router'

  const tenisStore = useTenisStore()

  const router = useRouter()

  const { jugadores, competiciones, partido, marcador, partidos } = storeToRefs(tenisStore)

  tenisStore.cargarDatos()

  const totalJugadores = computed(() => parseInt(partido.value.jugadores_por_equipo) * 2)

  const nuevosJugadores = ref([
    {jugador1: null},
    {jugador2: null}
  ])
  
  const crearPartido = () => {
    if(!partido.value.id_partido_tenis) {

      partido.value.id_partido_tenis = `part${Date.now()}`
    }
    console.log(partido.value)
    tenisStore.crearPartidoTenis(partido.value)
    // jugador.value.id_jugador = `jug${Date.now()}`
    // tenisStore.addJugadorTenis(jugador.value)
  }
  
  const empezarPartido = id => {
    if(!partido.value.id_partido_tenis) return
    tenisStore.setIdPartidoTenis(id)
    router.push("/esttenis")
  }


  watch(() => partido.value.jugadores_por_equipo, val => {
    const total = parseInt(val) * 2
    nuevosJugadores.value = []
    for(let i = 1; i <= total; i++) {
      const el = {}
      el[`jugador${i}`] = null
      nuevosJugadores.value.push(el)
    }

    
  })

  watch(() => partido.value.jugadores_id, val => {
    let index = 0
    let temp = []
    val.forEach(id => {
      const nuevojugador = jugadores.value.find(el => el.id_jugador === id)
      let jug = nuevosJugadores.value[index]
      jug = {...nuevojugador}
      temp.push(jug)
      index ++
    })
    partido.value.jugadores = temp
    console.log(val)
  },{deep: true})

  watch(() => partido.value.num_sets, val => {
    const sets = parseInt(partido.value.num_sets)
    if(!Number.isInteger(sets)) return
    if(!(sets == 3 || sets == 5)) return
    partido.value.marcador_partido = []
    for (let i = 1; i <= val; i++) {
      let set = JSON.parse(JSON.stringify(marcador.value))
      set.num_set = i
      partido.value.marcador_partido.push(set)

    }

    
  },{deep: true})

</script>

<style scoped>

</style>