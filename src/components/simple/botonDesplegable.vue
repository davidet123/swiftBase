<template>

  <div v-if="lista">
    <v-card
        class="mx-auto"
        color="#385F73"
        theme="dark"
        > 
        <v-card-text>
          <v-row>
            <!-- <v-col cols="1">
              <h3>2</h3>
            </v-col> -->
            <v-col cols="6" >
              <!-- <h4>{{ nuevoNombre }} <span :class="cuenta <= 3 ?'red--text' : 'white--text'">{{ tiempo != 0 && cuenta != 0 ? cuenta : "" }}</span> {{ tiempo != 0 && cuenta != 0 ? " segs" : "" }}</h4> -->
              <h4>Listado graficos</h4>
            </v-col>
            <!-- <v-col cols="1">
              <v-btn size="x-small" variant="flat" :color="!live ? 'success' : 'error'" @click="insertarGrafico(nuevoNombre)">LIVE</v-btn>
            </v-col> -->
            <v-col cols="1" offset=1>
              <!-- <v-btn size="x-small" color="error" @click="emit('eliminar', id)">X</v-btn> -->
            </v-col>
            <v-col cols="1">
              <!-- <v-btn size="x-small" @click="abrirSettings" color="blue">SETTINGS</v-btn> -->
            </v-col>
          </v-row>
          <v-row>
            <v-select
              label="Grafico"
              :items="lista"
              item-title="label"
              item-value="numero"
              v-model="numGraficoSeleccionado"
            >
            </v-select>
          </v-row>
          <v-row>
            <v-col cols="2" offset="5" class="text-center">
              <v-btn size="small" variant="flat" :color="!live ? 'success' : 'error'" @click="insertarGrafico(nuevoNombre)">LIVE</v-btn>
            </v-col>
          </v-row>
            <!-- <v-divider color="#ffffff" class="my-2"></v-divider>
          <v-row>
            <v-col cols="12" class="text-center">
              <v-btn :color="nuevoElemento ? 'error' : 'blue'" size="x-small" @click="nuevoElemento = !nuevoElemento">NUEVO ELEMENTO</v-btn>
            </v-col>
            <v-row v-if="nuevoElemento">

              <v-col cols="2">
                <v-text-field
                  label="numero"
                  v-model="nuevoNumero"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Grafico"
                  v-model="nuevoNombre"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-btn @click="aceptar" color="error" size="x-small">ACEPTAR</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="text-center mt-4">
              < v-btn color="error" size="x-small" @click="dialog=true">EDITAR LISTADO</v-btn>
              </v-col>
            </v-row>
          </v-row> -->
        </v-card-text>
    </v-card>

    <!-- <v-dialog
      v-model="dialog"
      width="900px">
      <v-card
        color="#6d738c"
      >
        <v-card-text>
          <v-row>
            <v-col cols="12" class="text-center"><p>Editar listado graficos</p></v-col>
          </v-row>
          <v-row v-for="elemento in listado" class="pa-0 ma-0">
            <v-col cols="1" offset="2" class="pa-0">
                <v-text-field                
                  density="compact"
                  label="Numero"
                  v-model="elemento.numero"
                ></v-text-field>
              </v-col>
              <v-col cols="6" offset="1" class="pa-0">
                <v-text-field
                  density="compact"
                  label="Nombre"
                  v-model="elemento.nombre"
                ></v-text-field>
              </v-col>
              <v-divider></v-divider>
          </v-row>
          <v-row>
            <v-col cols="2" offset="5" class=text-center>
              <v-btn color="success" @click="updateLista" size="small">ACEPTAR</v-btn>

            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

    </v-dialog> -->

  </div>


</template>

<script setup>
  import { toRefs } from 'vue';
  import { ref } from 'vue';

  import { useSimpleStore } from "../../store/simple"
  import { storeToRefs } from 'pinia';
  const simpleStore = useSimpleStore()

  simpleStore.getListaCrevillent()

  

  const emit = defineEmits(["activarDesplegable"])

  const props = defineProps(["lista"])

  const { lista } = toRefs(props)

  console.log(lista.value)

  // const { listaCrevillent } = storeToRefs(simpleStore)

  const listado = ref([...lista.value])

  const elementos = ref([1,2,3,4,5,6,7,8,9,10])
  const nuevoNumero = ref(null)
  const nuevoNombre = ref(null) 

  const nuevoElemento = ref(false)

  const dialog = ref(false)



  const live = ref(false)

  const numGraficoSeleccionado = ref(null)
  const seleccionarGrafico = num => {
    return lista.value.find( el => el.numero === num)
  }

  const listaNombres = ["BANDA_UNICA", "BANDA_DOBLE", "TRES_LINEAS"]
  

  const insertarGrafico = () => {
    // console.log(seleccionarGrafico(numGraficoSeleccionado.value))
    const grafico = seleccionarGrafico(numGraficoSeleccionado.value)
    
    emit('activarDesplegable', {grafico: grafico, live: live.value, desplegable: true})
    
    // if(!live.value) {
      
    // }
    live.value = !live.value
    
  }

  const aceptar = () => {
    simpleStore.addItemCrevillent({
      numero: nuevoNumero.value,
      nombre: nuevoNombre.value
    })
    
    console.log(nuevoNombre.value)
  }

  const updateLista = () => {
    simpleStore.updateListaCrevillent(listado.value)
    dialog.value = false
  }

</script>