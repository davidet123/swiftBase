<template>
  <v-card color="black">
    <v-card-title>
      <p>{{ equipo.nombre_equipo }}</p>
    </v-card-title>
    <v-card-subtitle></v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-row >
            <v-col cols="6" offset="3">
              <v-select
              v-model = "equipo.titulares"
              :items = "listado"
              item-title="etiqueta"
              item-value="dorsal"
              :bg-color="equipo.titulares.length <= 11 ? '#006400' : '#cc0000'"
              item-color="#0000ff"
              
              multiple
              >
              </v-select>              
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <p>Jugadores Titulares</p>
            </v-col>
            <v-col cols="3" v-for="dorsal in equipo.titulares" :key="dorsal" class="text-">
              <v-card>
                <v-card-title>
                  {{ jugador(dorsal).posicion }}
                </v-card-title>
                <v-card-subtitle>
                  {{ dorsal }} - {{ jugador(dorsal).apodo }}
                </v-card-subtitle>
              </v-card>
               
            </v-col>
          </v-row>

        </v-col>
      </v-row>
        <v-row>
          <v-col cols="12" class="text-center">
            <h4>Formació</h4>  
          </v-col>
        </v-row>
        <div v-if="equipo.titulares.length > 0">          
          <v-row>
            <v-col cols="4" offset="4">              
              <v-select
              :items = "listadoFormaciones"
              v-model = "equipo.tipoFormacion"
              >
            </v-select>
          </v-col>
          {{ equipo.tipoFormacion }}
        </v-row>
        <div class="formacion" v-if="equipo.tipoFormacion">    
            <!-- pintar alineacion -->
            <!-- portero -->
            <v-row justify="space-around">
              <div>
                <v-col class="text-center">
                  <div>
                    <v-select
                      :items="equipo.titulares"
                      v-model="formacion[0].dorsal"
                      style="width: 80px"
                      
                    ></v-select>
                    
                  </div>
                </v-col>
              </div>
            </v-row>
            <v-row justify="space-around">
              <div v-for="i in primera" :key="i">
                <v-col class="text-center" :cols="12">
                  <div>
                    <v-select
                      :items="equipo.titulares"
                      v-model="formacion[i].dorsal"
                    ></v-select>
                  </div>
                </v-col>
              </div>
            </v-row>
            <v-row justify="space-around">
              <div v-for="i in segunda" :key="i">
                <v-col class="text-center" :cols="12">
                  <div>
                    <v-select
                      :items="equipo.titulares"
                      v-model="formacion[i + primera].dorsal"
                    ></v-select>
                  </div>
                </v-col>
              </div>
            </v-row>
            <v-row justify="space-around">
              <div v-for="i in tercera" :key="i">
                <v-col class="text-center" :cols="12">
                  <div>
                    <v-select
                      :items="equipo.titulares"
                      v-model="formacion[i + primera + segunda].dorsal"
                    ></v-select>
                  </div>
                </v-col>
              </div>
            </v-row>
            <v-row v-if="cuarta > 0" justify="space-around">
              <div v-for="i in cuarta" :key="i">
                <v-col class="text-center" :cols="12">
                  <div>
                    <v-select
                      :items="equipo.titulares"
                      v-model="formacion[i + primera + segunda + tercera].dorsal"
                    ></v-select>
                  </div>
                </v-col>
              </div>
            </v-row>
          </div>
        </div>
    </v-card-text>
    <v-card-actions>
      <v-row>
        <v-col class="text-center">
          <v-btn color="error" @click="emit('cerrarVentana')">CERRAR</v-btn>
          <v-btn color="error" @click="crearFormacion">CREAR FORMACION</v-btn>
          <v-btn  color="success" @click="aceptar">ACEPTAR</v-btn>

        </v-col>
      </v-row>
    </v-card-actions>


  </v-card>
  
</template>

<script setup>
import { computed } from 'vue'
import { ref, toRefs } from 'vue'



const props = defineProps(["equipo", "local"])

const { equipo, local } = toRefs(props)

const emit = defineEmits(["cerrarVentana", "actualizar"])

const jugadores = computed(() => equipo.value.jugadores)

const listadoOrdenado = jugadores.value.sort((a,b) => parseInt(a.numero) - parseInt(b.numero))

const listado = computed(() => listadoOrdenado.map(jug => ({dorsal: jug.numero, etiqueta:`${jug.numero} - ${jug.apodo} - ${jug.posicion}` })))

const jugador = dorsal => jugadores.value.find(j => j.numero === dorsal)

// Formación

const listadoFormaciones = [
  '4-4-2',
  '4-3-3',
  '4-2-3-1',
  '4-3-1-2'
]

const primera = computed(() => parseInt(tipoFormacion.value.split("-")[0]))
const segunda = computed(() => parseInt(tipoFormacion.value.split("-")[1]))
const tercera = computed(() => parseInt(tipoFormacion.value.split("-")[2]))
const cuarta = computed(() => parseInt(tipoFormacion.value.split("-")[3]))

const tipoFormacion = computed(() => equipo.value.tipoFormacion)

const formacion = computed(() => equipo.value.formacion)

// VALORES PARA SWIFT
const x = {
    1: [0],
    2: [-140, 140],
    3: [-265, 0, 265],
    4: [-400, -125, 125, 400],
    5: [-485, -235, -0, -235, -485]
  }

const y = [170, 78, -90, -221, -350]

const crearFormacion = () => {
  let nuevaFormacion = []
  const numFilas = tipoFormacion.value.split("-").length
  let valoresFormacion = tipoFormacion.value.split("-")
  valoresFormacion.unshift("1")
  let posY = 0
  let posX = 0
  formacion.value.forEach(jug => {
    const jugador = buscaJugador(jug.dorsal)
    // console.log(jugador)
    jugador.pos = {x: x[valoresFormacion[posY]][posX], y: y[posY]}
    // console.log(jugador.pos)
    posX ++  
    if( posX >= valoresFormacion[posY]) {
      posY ++
      posX = 0
      
    }
    nuevaFormacion.push(jugador)

  })
  equipo.value.formacion = nuevaFormacion
}

const buscaJugador = (dorsal) => {
   const jugador = jugadores.value.find(jug => jug.numero === dorsal)
   return {dorsal: jugador.numero, apodo: jugador.apodo}
}


const aceptar = () => {
  crearFormacion()
  // equipo.value.tipoFormacion = tipoFormacion.value
  emit('actualizar', {local: local.value, equipo: equipo.value})

}





</script>

<style scoped>
.formacion {
  padding: 80px 20px;
  background-color: #015f18;
  margin: 0 30px;
  border-radius: 10px;
  border: 1px solid white;
  background-image: url(../../../src/assets/fondo_campo_formacion.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  
}

  /* .v-select__selection {
    width: 90%;
    justify-content: center;
} */

</style>