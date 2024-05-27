<template>
  <div class="contenedor">
    <div v-if="!add" class="contenedorGraficos" draggable="true" @dragstart="startDrag($event, grafico)">
      <div class="numero">{{ orden + 1 }}</div>
      <div id="texto"><p>{{ grafico.titulo}}</p></div>
      <div id="tipo"><p>{{ grafico.clase}}</p></div>
    </div>  
    <div v-else class="contenedorGraficos numero">
      <div class="add" @click="addGrafico()">
        <p>+</p>
      </div>
    </div>
    <div>
      <v-dialog
        v-model="dialog"
        width="auto"
      > 
      <v-card
        width="1000px"
      >
        <v-card-title>
          <h4>{{ !editar ? 'Añadir grafico' : 'Editar grafico'}}</h4>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="5" class="ma-0 py-0">
             <v-text-field
              label="Nombre grafico"
              v-model="nombreGrafico"
            ></v-text-field> 
            </v-col>
            <v-col cols="5" class="ma-0 py-0">
             <v-text-field
              label="Tipo grafico"
              v-model="claseGrafico"
            ></v-text-field> 
            </v-col>
            <v-col cols="2" class="ma-0 py-0" v-if="!desplegable">
              <v-text-field
                label="Lineas de texto"
                v-model="lineasTexto"
              ></v-text-field> 
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <h3>Campos Swift</h3>
              <v-row>
                <v-col cols="4" v-for="nombre in nombreCampoSwift" :key="nombre.id">
                  <v-text-field
                  label="Nombre swift"
                  v-model="nombre.nombreSwift"
                ></v-text-field>  
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row v-if="desplegable">
            <v-col cols="6" class=text-center>
              <v-text-field
              label="Nombre hoja gSheet"
              v-model="nombreDesplegable"
            ></v-text-field>
            </v-col>
            <v-col cols="6" class=text-center>
              <v-text-field
              label="Rango desplegable"
              v-model="rangoDesplegable"
            ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" class="text-center ma-0 pa-0">
              <v-checkbox
                label="Desplegable"
                v-model="desplegable"
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-center">

              <v-btn @click="aceptar()" color="error" size="small">ACEPTAR</v-btn>
              <v-btn @click="dialog=false" color="primary" size="small">CANCELAR</v-btn>
            </v-col>
          </v-row>
          
        </v-card-text>
      </v-card>
  
      </v-dialog>
    </div>
  </div>
</template>

<script setup>

  import { computed, ref, toRefs, watch } from 'vue'
  import { useRetransmisionStore } from '@/store/retransmision'

  const retransmisionStore = useRetransmisionStore()

  const props = defineProps(["grafico", "orden"])

  const emit = defineEmits(["evento"])

  const { grafico, orden } = toRefs(props)

  const add = computed(() => grafico.value.clase === 'ADD')

  const dialog = ref(false)

  const editar = ref(false)

  const nombreGrafico = ref(null)
  const claseGrafico = ref(null)
  const lineasTexto = ref(0)
  const desplegable = ref(false)
  const nombreDesplegable = ref(null)
  const rangoDesplegable = ref(null)
  const nombreCampoSwift = ref([])

  const startDrag = (event, item) => {
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.eventAllowed = 'copy'
    event.dataTransfer.setData = ('item', item)
    emit("evento", item)
  }

  const addGrafico = () => {
    dialog.value = true
  }

  const aceptar = () => {

    const nuevoGrafico = {
      titulo: nombreGrafico.value,
      clase: claseGrafico.value,
      lineasTexto: lineasTexto.value,
      desplegable: desplegable.value,
      opciones: {
        nombreDesplegable: nombreDesplegable.value,
        rangoDesplegable: rangoDesplegable.value
      },
      nombreCampoSwift: nombreCampoSwift.value
    }
    retransmisionStore.addGrafico(nuevoGrafico)
    dialog.value = false
  }

  watch(() => lineasTexto.value, val => {
    nombreCampoSwift.value = []
    for(let i = 1; i <= val; i++) {
      const data = {id: i-1, nombreSwift: null}
      nombreCampoSwift.value.push(data)

    }
  })

</script>

<style scoped>
  .contenedor {
    display: flex;
    height: 100%;
  }

  .contenedorGraficos {
    height: 100%;
    width: 150px;
    background-color: rgb(55, 55, 55);
    border: 1px solid white;
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
    align-items: center;
    padding: 5px
  }

  .numero {
    color: red;
    font-weight: bold;
    font-size: 2em;
  }

  .add {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

  }

</style>