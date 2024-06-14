<template>
  <v-row>
    <v-col>
      <MarcadorTenis :marcador = "marcador" :competicion="competicion" :equipoAlSaque = "equipoAlSaque"/>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="text-center bordeBlanco" cols="4">
      <v-row>
        <v-col class="text-center" cols="12">
          <h4>Set en juego: {{ setEnJuego }}</h4>
          tiempo {{ tiempo }}
        </v-col>
        <v-col class="text-center">
          <v-btn size="x-small" color="success" @click="iniciarCrono()">INICIAR CRONO</v-btn>
          <v-btn size="x-small" color="error" @click="pararCrono()">PARAR CRONO</v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="4" class="bordeBlanco">
      <v-row>
        <v-col cols="12" class="text-center">SERVCIO</v-col>
        <v-col cols="12" class="text-center">
          <v-btn size="x-small" color="success" @click="setEquipoAlSaque('local')">LOCAL</v-btn>
          <v-btn size="x-small" color="success" @click="setEquipoAlSaque('visitante')">VISITANTE</v-btn>
        </v-col>
      </v-row>

    </v-col>
    <v-col cols="4" class="bordeBlanco">
      <v-row>
        <v-col cols="12" class="text-center">MARCADOR</v-col>
        <v-col cols="6">
          <v-row>
            <v-col class="text-center" cols="12">Local</v-col>
            <v-col class="text-center" cols="12">{{ puntoATexto('local') }}</v-col>
            <!-- <v-col class="text-center" cols="12">{{ puntoStr[marcador[setEnJuego-1].puntos_local] }}</v-col> -->
          </v-row>
          <v-row>
            <v-col cols="6" class="text-right"><v-btn size="x-small" color="success" @click="punto('local', 1)">+</v-btn></v-col>
            <v-col cols="6" class="text-left"><v-btn size="x-small" color="error" @click="punto('local', -1)">-</v-btn></v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-col class="text-center">Visitante</v-col>
            <v-col class="text-center" cols="12">{{ puntoATexto('visitante') }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="text-right"><v-btn size="x-small" color="success" @click="punto('visitante', 1)">+</v-btn></v-col>
            <v-col cols="6" class="text-left"><v-btn size="x-small" color="error" @click="punto('visitante', -1)">-</v-btn></v-col>
          </v-row>
        </v-col>
      </v-row>

    </v-col>
  </v-row>
  <!-- jugadores  -->

  <v-row>
    <v-col v-for="(jugador, index) in jugadores" :key="jugador.id_jugador">

      <JugadorTenis :jugador="jugador" :indice="index" />
    </v-col>
  </v-row>
  <!-- <v-row v-for="est in camposEstadistica" :key="est" class="ma-0 pa-0">
    {{ jugadores }}
    <v-col cols="1" offset="4"> 
      <v-row>
        <v-col cols="12" class="text-center">
          0
        </v-col>
        <v-col class="text-center">
          <v-btn size="x-small" color="success">+</v-btn>
          <v-btn size="x-small" color="error">-</v-btn>
        </v-col>
      </v-row>

    </v-col>
    <v-col cols="2" class="text-center">
      {{ est}}
    </v-col>
    <v-col cols="1">
      <v-row>
        <v-col cols="12" class="text-center">
          0
        </v-col>
        <v-col class="text-center">
          <v-btn size="x-small" color="success">+</v-btn>
          <v-btn size="x-small" color="error">-</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row> -->

  


</template>

<script setup>

  import { storeToRefs } from "pinia";
  import { computed, ref } from "vue";
  import { useTenisStore } from "@/store/tenis"

  import MarcadorTenis from "@/components/tenis/MarcadorTenis.vue"
  import JugadorTenis from "@/components/tenis/JugadorTenis.vue"

  const tenisStore = useTenisStore()

  const { partido_en_juego, partidos } = storeToRefs(tenisStore)

  tenisStore.cargarDatos()

  const partido = computed(() => partidos.value.find(el => el.id_partido_tenis === partido_en_juego.value))
  const marcador = computed(() => partido.value.marcador_partido)
  const competicion = computed(() => partido.value.competicion)
  const jugadores = computed(() => partido.value.jugadores)

  const setEnJuego = computed(() => parseInt(partido.value.set_en_juego))

  const puntoStr = ["0", "15", "30", "40", 'AD']
  const camposEstadistica = ["ACE", "DOBLE FALTA", "GANADORES", "ERRORES", "BREAKS", "PUNTOS"]

  let tiempo = ref(0)
  let temporizador

  const setEquipoAlSaque = equipo => {
    tenisStore.setEquipoAlSaque(equipo)
  }

  const iniciarCrono = () => {
    temporizador = setInterval(() => {
      tiempo.value += 1
    }, 1000)
  }

  const pararCrono = () => {
    clearInterval(temporizador)
    tiempo.value = 0
  }

  const equipoAlSaque = computed(() => partido.value.saque)


  const puntoATexto = equipo => {
    if(partido.value.acabado) return
    const set = marcador.value.find(el => el.num_set === setEnJuego.value)

    if(!set.tie_break) return puntoStr[set[`puntos_${equipo}`]]
    return set[`puntos_${equipo}`]
  }

  const cambioDeSaque = () => partido.value.saque === 'local' ? partido.value.saque = 'visitante' : partido.value.saque = 'local'


  const punto = (equipo, val) => {
    console.log(partido.value.saque)
    if(partido.value.acabado) return
    if(tiempo.value === 0) iniciarCrono()
    const set = marcador.value.find(el => el.num_set === setEnJuego.value)
    const oponente = equipo === 'local' ? 'visitante' : 'local'
    set[`puntos_${equipo}`] += val 
    if(set[`puntos_${equipo}`] <= 0) set[`puntos_${equipo}`] = 0
    if(!set.tie_break) {

      if(set[`puntos_${equipo}`] === 3) {
        if(set[`puntos_${oponente}`] === 3) set.deuce = true
        
      } 
      if(set[`puntos_${equipo}`] > 3) {
        if(set.deuce ) {
           if (set[`puntos_${equipo}`] === 5 && set[`puntos_${oponente}`] >= 3) {
            set[`juegos_${equipo}`] += 1
            set[`puntos_${equipo}`] = 0
            set[`puntos_${oponente}`] = 0
            set.deuce = false
  
           } else if (set[`puntos_${equipo}`] === 4 && set[`puntos_${oponente}`] === 4){
            set[`puntos_${oponente}`] -= 1
           }
          
        } else {
          set[`juegos_${equipo}`] += 1
          set[`puntos_${equipo}`] = 0
          set[`puntos_${oponente}`] = 0
          set.deuce = false
  
        }
        // set[`puntos_${equipo}`] = 3
      }
      if(set[`juegos_${equipo}`] >= 6) {
        if(set[`juegos_${oponente}`] < 5) {
          set.tiempo_set = tiempo.value
          pararCrono()
          partido.value.set_en_juego += 1
          
          cambioDeSaque()
          return
        }
        if(set[`juegos_${equipo}`] === 6 && set[`juegos_${oponente}`] === 6) {
          set.tie_break = true
        }
        if(set[`juegos_${equipo}`] === 7 && set[`juegos_${oponente}`] === 5) {
          set.tiempo_set = tiempo.value
          pararCrono()
          partido.value.set_en_juego += 1
          cambioDeSaque()
          return
        }
        if(set[`juegos_${oponente}`] === 8) {
          set.tiempo_set = tiempo.value
          pararCrono()
          partido.value.set_en_juego += 1
          cambioDeSaque()
        }
  
      }
    } else if (set.tie_break) {
      const diferencia = Math.abs(set[`puntos_${equipo}`] - set[`puntos_${oponente}`])

      const max_puntos = partido.value.set_en_juego === 5 ? 10 : 7
        if (set[`puntos_${equipo}`] >= max_puntos && diferencia >= 2) {
          
          
          set[`juegos_${equipo}`] =`${set[`juegos_${equipo}`] += 1} (${set[`puntos_${oponente}`]})`
          set[`puntos_${equipo}`] = 0
          set[`puntos_${oponente}`] = 0
          set.tiempo_set = tiempo.value
          pararCrono()
          partido.value.set_en_juego += 1
          cambioDeSaque()
          
        }

      // if(partido.value.set_en_juego !== 5) {
      //   if(set[`puntos_${equipo}`] === 7) {
      //     set[`juegos_${equipo}`] += 1
      //     set[`puntos_${equipo}`] = 0
      //     set[`puntos_${oponente}`] = 0
      //   }

      // } else {
        
      // }
    }
    if(setEnJuego.value > partido.value.num_sets) {
      pararCrono()
      set.tiempo_set = tiempo.value
      partido.value.setEnJuego = partido.value.num_sets
      partido.value.acabado = true
    }
  }
</script>

<style scoped>

  .bordeBlanco {
    border: 1px solid white;
  }

</style>