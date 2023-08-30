<template>
  <v-card color="black">
    <v-card-title>
      Sustituciones
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="3" offset="2" class="text-center">
          <h4>Jugador que sale</h4>
          <v-select
            :items ="listadoTitular"
            v-model = "sale"
            item-title="etiqueta"
            item-value="dorsal"
            item-color="#0000ff"
          ></v-select>

        </v-col>
        <v-col cols="2" class="text-center" >
          <v-btn color="success" @click="efectuarSustitucion">SUBSTITUCIO</v-btn>

        </v-col>
        <v-col cols="3" class="text-center">
          <h4>Jugador que entra</h4>
          <v-select
            :items ="listadoSuplentes"
            v-model = "entra"
            item-title="etiqueta"
            item-value="dorsal"
            item-color="#0000ff"
          ></v-select>

        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" offset="3">
          <h4>Per rotular</h4>
          <div v-for="cambio in sustitucionesSinRotular" :key="cambio.tiempo">
            <v-card class="mb-4">
              <v-card-text>
                <v-row>
                  <!-- <v-col cols="8"> Sale del campo {{ buscaJugador(cambio.entra) }} y entra {{ buscaJugador(cambio.sale) }}</v-col> -->
                  <v-col cols="8"> <h3>{{ buscaJugador(cambio.sale) }} x {{ buscaJugador(cambio.entra) }}</h3></v-col>
                  <v-col cols="4" class="text-center">
                    <BotonLive nombre="SUSTITUCION" @activar="e => rotularSustitucion(cambio, e)"/>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </div>
          <h4>Rotulades</h4>
          <div v-for="cambio in sustitucionesRotuladas" :key="cambio.tiempo">
            <v-card class="mb-4">
              <v-card-text>
                <v-row>
                  <!-- <v-col cols="8"> Sale del campo {{ buscaJugador(cambio.entra) }} y entra {{ buscaJugador(cambio.sale) }}</v-col> -->
                  <v-col cols="8"> <h3>{{ buscaJugador(cambio.sale) }} x {{ buscaJugador(cambio.entra) }}</h3></v-col>
                  <v-col cols="4" class="text-center">
                    <BotonLive nombre="SUSTITUCION" @activar="e => rotularSustitucion(cambio, e)"/>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </div>

        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-row>
        <v-col class="text-center">
          <v-btn color="error" @click="emit('cerrarVentana')">CERRAR</v-btn>
          <!-- <v-btn color="error" @click="crearFormacion">CREAR FORMACION</v-btn> -->
          <v-btn  color="success" @click="aceptar">ACEPTAR</v-btn>

        </v-col>
      </v-row>
    </v-card-actions>
    
  </v-card>


</template>

<script setup>

import { computed } from 'vue'
import { ref, toRefs } from 'vue'

import BotonLive from '@/components/simple/botonLive.vue' 

import { useSwiftConnectionStore } from "../../store/swiftConnection"

const swiftConnectionStore = useSwiftConnectionStore()






const props = defineProps(["equipo", "local"])

const { equipo, local } = toRefs(props)

const emit = defineEmits(["cerrarVentana", "actualizar", "rotularSustitucion"])


const sale = ref(null)
const entra = ref(null)


const titulares = computed(() => {
  // const lista = equipo.value.jugadores.filter(jug => equipo.value.titulares.includes(jug.numero))
  return equipo.value.jugadores.filter(jug => equipo.value.titulares.includes(jug.numero)).sort((a,b) => parseInt(a.numero) - parseInt(b.numero))
})

const buscaJugador = (dorsal) => {
   const jugador = equipo.value.jugadores.find(jug => jug.numero === dorsal)
   return jugador.apodo
}


const listaSuplentes = equipo.value.jugadores.filter(jug => !equipo.value.titulares.includes(jug.numero)).sort((a,b) => parseInt(a.numero) - parseInt(b.numero))


// const etiqueta = 
const listadoTitular = computed(() => titulares.value.map(jug => ({dorsal: jug.numero, etiqueta:`${jug.numero} - ${jug.apodo}` })))
const listadoSuplentes = computed(() => listaSuplentes.map(jug => ({dorsal: jug.numero, etiqueta:`${jug.numero} - ${jug.apodo}` })))

const listadoCompleto = computed(() => equipo.value.jugadores.map(jug => ({dorsal: jug.numero, etiqueta:`${jug.numero} - ${jug.apodo}` })))


const efectuarSustitucion = () => {
  const indice = titulares.value.findIndex(el => el.numero === sale.value)
  console.log(equipo.value.titulares[indice])
  equipo.value.titulares[indice] = entra.value


  equipo.value.sustituciones.push({
    sale: sale.value,
    entra: entra.value,
    tiempo: Date.now(),
    rotulo: false
  })

  sale.value = ""
  entra.value = ""
  
  // emit('cerrarVentana')
}

const sustitucionesRotuladas = computed(() => equipo.value.sustituciones.filter(el => el.rotulo == true))
const sustitucionesSinRotular = computed(() => equipo.value.sustituciones.filter(el => el.rotulo !== true))

const aceptar = () => emit('actualizar', {local: local.value, equipo: equipo.value})

const rotularSustitucion = (cambio, metodo) => {
  // console.log(jugadorSale)
  console.log(metodo)
  
  
  if(metodo.live) {
    // console.log(listadoTitular.value.length)
    const jugadorSale = listadoCompleto.value.find(jug => jug.dorsal === cambio.sale)
    const jugadorEntra = listadoCompleto.value.find(jug => jug.dorsal === cambio.entra)
    // emit("rotularSustitucion", {metodo: metodo.nombre, equipo: equipo.value.nombre_equipo, sale: jugadorSale.etiqueta, entra: jugadorEntra.etiqueta})
    swiftConnectionStore.cueGraphic(metodo.nombre)

    swiftConnectionStore.rtRemote.updateFields("SUSTITUCION::TEXTO_EQUIPOTEXT", "String", equipo.value.nombre_equipo)
    swiftConnectionStore.rtRemote.updateFields("SUSTITUCION::TEXTO_SALETEXT", "String", jugadorSale.etiqueta)
    swiftConnectionStore.rtRemote.updateFields("SUSTITUCION::TEXTO_ENTRATEXT", "String", jugadorEntra.etiqueta)

    
    swiftConnectionStore.bringOn(metodo.nombre)

  } else {
    swiftConnectionStore.takeOff(metodo.nombre)
    cambio.rotulo = true
  }
}






</script>