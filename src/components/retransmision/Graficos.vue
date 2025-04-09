<template>
  <div class="contenedor" @dblclick="editarGrafico">
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
            <v-col cols="12" v-if="!desplegable">
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

          <!-- DESPLEGABLE -->

          <v-row v-if="desplegable">
            <v-row>
              <v-col cols="12">
                <h4>Tipo desplegable</h4>
                {{  datosDesplegable.tipo }}
              </v-col>
              <v-col cols="2" v-for="tipo in tipoDesplegable" :key="tipo">
                <v-checkbox
                  :label="tipo"
                  v-model="datosDesplegable.tipo"
                  :value="tipo"
                ></v-checkbox>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  label="Nº columnas"
                  v-model="datosDesplegable.columnas"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  label="Nº filas"
                  v-model="datosDesplegable.filas"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-col cols=12 v-if="datosDesplegable.tipo === 'gSheet'">
              <v-row>
                <v-col cols="6" class=text-center>
                  <v-text-field
                  label="Nombre hoja gSheet"
                  v-model="datosDesplegable.hoja"
                ></v-text-field>
                </v-col>
                <!-- <v-col cols="6" class=text-center>
                  <v-text-field
                  label="Rango desplegable"
                  v-model="datosDesplegable.rango"
                ></v-text-field>
                </v-col> -->
              </v-row>
            </v-col>
            <v-col cols=12 v-if="datosDesplegable.tipo === 'EXCEL'">
              <v-row>
                <v-col cols="6" class=text-center>
                  <v-text-field
                  label="Nombre hoja EXCEL"
                  v-model="datosDesplegable.hoja"
                ></v-text-field>
                </v-col>
                <!-- <v-col cols="6" class=text-center>
                  <v-text-field
                  label="Rango desplegable"
                  v-model="datosDesplegable.rango"
                ></v-text-field>
                </v-col> -->
              </v-row>
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

              <v-btn @click="aceptar()" color="success" size="small">ACEPTAR</v-btn>
              <v-btn @click="dialog=false" color="primary" size="small">CANCELAR</v-btn>
              <v-btn @click="eliminarGrafico(grafico.id)" color="error" size="small">ELIMINAR</v-btn>
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
  import { storeToRefs } from 'pinia';

  const retransmisionStore = useRetransmisionStore()

  const props = defineProps(["grafico", "orden"])

  const emit = defineEmits(["evento"])

  const { grafico, orden } = toRefs(props)

  const { listaGraficos } = storeToRefs(retransmisionStore)

  const listadoGraficos = computed(() => {
    const lista = [...listaGraficos.value]
    lista.pop()
    return lista
  })

  const add = computed(() => grafico.value.clase === 'ADD')

  const dialog = ref(false)

  const editar = ref(false)

  const nombreGrafico = ref(grafico.value.nombre || null)
  const claseGrafico = ref(grafico.value.clase|| null)
  const lineasTexto = ref(grafico.value.lineasTexto || 0)
  const desplegable = ref(grafico.value.desplegable || false)
  const nombreCampoSwift = ref(grafico.value.nombreCampoSwift || [])
  const datosDesplegable = ref(grafico.value.datosDesplegable || 
    {
    hoja: null,
    rango: null,
    graficos: [],
    elegido: null,
    tipo: null,
    filas: null,
    columnas: null

  })
  const tipoDesplegable = ref(['gSheet','EXCEL'])
  const tipoDesplegableElegido = ref(grafico.value.tipoDesplegableElegido || null)


  

  const startDrag = (event, item) => {
    retransmisionStore.setDragGrafico(true)
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.eventAllowed = 'copy'
    event.dataTransfer.setData = ('item', item)
    emit("evento", item)
  }

  const addGrafico = () => {
    claseGrafico.value = null
    dialog.value = true
  }

  const eliminarGrafico = id => {
    retransmisionStore.eliminarGrafico(id)
    dialog.value = false
  }

  const numeroAColumna = n => {
    let result = '';
    while (n > 0) {
        let remainder = (n - 1) % 26;
        result = String.fromCharCode(65 + remainder) + result;
        n = Math.floor((n - 1) / 26);
    }
    return result;

  }

  const aceptar = () => {
    // const graficoSwift = lineasTexto === 0 ? titulo : nombre
    const fila = datosDesplegable.value.filas
    const col = numeroAColumna(datosDesplegable.value.columnas)
    const rango = `A1:${col}${fila}`
    console.log(rango)
    if(!editar.value) {

      const nuevoGrafico = {
        // graficoSwift,
        titulo: nombreGrafico.value,
        nombre: nombreGrafico.value,
        clase: claseGrafico.value,
        lineasTexto: lineasTexto.value,
        desplegable: desplegable.value,
        nombreCampoSwift: nombreCampoSwift.value,
        datosDesplegable: datosDesplegable.value,
        tipoDesplegableElegido: tipoDesplegableElegido.value
      }
      nuevoGrafico.datosDesplegable.rango = rango
      console.log(tipoDesplegableElegido.value)
      retransmisionStore.addGrafico(nuevoGrafico)
    } else {
      grafico.value.titulo = nombreGrafico.value
      grafico.value.nombre = nombreGrafico.value
      grafico.value.clase = claseGrafico.value
      grafico.value.lineasTexto = lineasTexto.value
      grafico.value.desplegable = desplegable.value
      grafico.value.nombreCampoSwift = nombreCampoSwift.value
      grafico.value.datosDesplegable = datosDesplegable.value
      grafico.value.datosDesplegable.rango = rango
      grafico.tipoDesplegableElegido = tipoDesplegableElegido.value

      console.log(tipoDesplegableElegido.value)
    }

    dialog.value = false
    editar.value = false
    console.log(grafico.value)
  }

  const editarGrafico = () => {
    editar.value = true
    if(grafico.value.clase === "ADD") return
    console.log(grafico.value)



    dialog.value = true
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