<template>

  <v-main>
    <!-- <h1>Simple</h1> -->
    <v-row>
      <v-col>
        <Visor />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">
        <h4>Grafisme Crevillent</h4>
      </v-col>
    </v-row>
    <v-row class="mx-2 my-0 px-0">
      <v-col cols="6" v-for="rotulo in retransmisionSimple" :id="rotulo.id" class="my-1 pa-0">
        <BotonSimple 
            :id ="rotulo.id" 
            :nombre="rotulo.nombre" 
            :numero="rotulo.numero" 
            :colorSeleccion="'#385F73'"
            :graficosLive="graficosLive"
            :rotuloLive="rotulo.live"
            @activar="activarGrafico" 
            @eliminar="eliminarRotulo"
            @seleccionar="seleccionar"
            />
      </v-col>
    </v-row>
    <v-row v-if="listaGSheet">
      <v-col class="my-1 pa-0">
        <BotonDesplegable 
          :lista="listaGSheet"
          @activarDesplegable="activarDesdeLista"

        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-btn @click="reload()" color="error">RECARREGAR RÓTULS</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-btn @click="router.push('/simpleconfig')" color="success">CONFIG</v-btn>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col class="text-center">
        <h4 v-if="retransmision">{{ retransmision.nombre }}</h4>
      </v-col>
    </v-row>
    <v-row class="mx-2 my-0 pa-0">
      <v-col cols="12" v-for="rotulo in retransmisionCrevillent" :id="rotulo.id" class="my-1 pa-0">
        <BotonSimple 
            :id ="rotulo.id" 
            :nombre="rotulo.nombre" 
            :numero="rotulo.numero" 
            :colorSeleccion="'#385F73'"
            @activar="activarGrafico" 
            @eliminar="eliminarRotulo"
            @seleccionar="seleccionar"
            />
      </v-col>
    </v-row>
    <v-row class="mx-2 my-0 pa-0">
      <v-col class="my-1 pa-0">
        <BotonDesplegable 
          id="1234"
          nombre="Test123"
          numero="1"
          @activarDesplegable="activarGrafico"

        />
      </v-col>
    </v-row> -->
    <!-- <v-row v-if="retransmision">
      <v-virtual-scroll
      :height="400"
      :items="listadoRetransmision"
      >
        <template v-slot:default="{item}">
          <div class="mb-1 px-4">
            <BotonSimple 
            :id ="item.id" 
            :nombre="item.nombre" 
            :numero="item.numero" 
            :colorSeleccion="idSeleccion === item.id ? '#97dbfc' : '#385F73'"
            :idSeleccion="idSeleccion"
            :activarManual="activarManual"
            @activar="activarGrafico" 
            @eliminar="eliminarRotulo"
            @seleccionar="seleccionar"
            @keydown.space="console.log('space')"/>
          </div>
        </template>
      </v-virtual-scroll>
    </v-row> -->
    <!-- <v-row>
      <v-col v-for="item in listadoRetransmision" :key="item.id" cols="12" class="ma-1 pa-0">
        <BotonSimple :id ="item.id" :nombre="item.nombre" :numero="item.numero" @activar="activarGrafico" @eliminar="eliminarRotulo"/>
      </v-col>
    </v-row> -->
    <!-- <v-row>
      <v-col cols="4" class="text-center">
        <v-btn :color="!ventanaCargar ? 'success' : 'error'" @click="ventanaCargar = !ventanaCargar">CARREGAR RETRANS</v-btn>
      </v-col>
      <v-col cols="4" class="text-center">
        <v-btn :color="!ventanaCrear ? 'success' : 'error'" @click="tipo = ventanaCrear = !ventanaCrear">CREAR RETRANS</v-btn>
      </v-col>
      <v-col cols="4" class="text-center">
        <v-btn :color="!ventanaEliminar ? 'success' : 'error'" @click="tipo = ventanaEliminar = !ventanaEliminar">ELIMINAR RETRANS</v-btn>
      </v-col>
    </v-row> -->
    <!-- CARGAR RETRANSMISION -->
    <!-- <v-row>
      <v-row v-if="ventanaCargar">
        <v-col cols="8" offset="2" class="text-center">
          <h4>Carregar retransmissió</h4>
          <v-select
          v-model="idRetransmision"
          label="Retransmisiones"
          :items="retransmisionesSimple"
          item-title="nombre"
          item-value="id"
          ></v-select>
          <v-btn color="error" @click="cargarRetransmision">ACCEPTAR</v-btn>
        </v-col>
      </v-row>
    </v-row> -->
    <!-- CREAR RETRANSMISION -->
    <!-- <v-row v-if="ventanaCrear">
        <v-col cols="12" class="text-center">
          <h4>Crear retransmissió</h4>
        </v-col>
        <v-col cols="6" offset="3" class="text-center">
          <v-text-field
            v-model="nuevaRetransmision"
          ></v-text-field>
        </v-col>
        <v-col cols="6" offset="3" class="text-center">
          <v-btn  @click="crearRetransmision" color="error"> CREAR</v-btn>
        </v-col>
      </v-row>
      <v-row>
      </v-row>
      <v-row>
    </v-row>
    <v-row v-if="retransmision" class="pa-0 ma-0">
      <v-col cols="1" offset="2">
        <v-text-field v-model="nuevoNumero" label="Num"></v-text-field>

      </v-col>
      <v-col cols="6">
        <v-text-field v-model="nuevoNombre"></v-text-field>
      </v-col>
      <v-col>
        <v-btn @click="addItem" color="success" :disabled="!nuevoNombre">ADD ITEM</v-btn>
      </v-col>
    </v-row> -->
  </v-main>
</template>

<script setup>

  import BotonDesplegable from '@/components/simple/botonDesplegable.vue'
  import BotonSimple from '@/components/simple/botonSimple.vue'
  import Visor from '@/components/visor/Visor.vue'

  import { computed, ref, watch } from 'vue'
  import { storeToRefs } from "pinia";

  import { useSwiftConnectionStore } from "../../store/swiftConnection"
  import { useSimpleStore } from "../../store/simple"
  import { usegSheetStore } from "../../store/gSheet"
  import { onBeforeMount } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const swiftConnectionStore = useSwiftConnectionStore()
  const simpleStore = useSimpleStore()
  const gSheetStore = usegSheetStore()


  const { retransmisionesSimple, retransmisionCrevillent, listadoBotonesLive, retransmisionSimple } = storeToRefs(simpleStore)
  const { rtRemote, graficosLive } = storeToRefs(swiftConnectionStore)

  
  
  const { listaGSheet, configSimple } = storeToRefs(gSheetStore)




  const listado = computed(() => {
    return simpleStore.listadoSimple
  })

  // console.log(rtRemote.value)

  swiftConnectionStore.startConnection()
  // swiftConnectionStore.getStatus("Node", "rootNode||ObjectNode|Name")

  // const mostrar = val => {
  //   console.log(val)
  // }

  simpleStore.getConfigSimple() 
  onBeforeMount(() => {
    // simpleStore.setRetransmisionesSimple()
    // simpleStore.setSimpleLS()
    gSheetStore.getConfigSimple()
    gSheetStore.getGseetData()
    simpleStore.cargarLS() 
  })

  const reload = () => {
    // gSheetStore.getListaCrevillent()
    gSheetStore.getGseetData("GFI")
  }

  // SELECCIONADO
  const idSeleccion = ref(null)
  const nombreSeleccion = ref(null)

  const activarManual = ref(null)

  const seleccionar = data => {
    idSeleccion.value = data.id
    nombreSeleccion.value = data.nombre
    console.log(idSeleccion.value)
  }

  document.addEventListener('keyup', e => {
    spaceLive(e.key.toUpperCase())
    // console.log(e.key.toUpperCase())
  })

  const spaceLive = key => {
    if(nombreSeleccion.value) {
      activarManual.value = idSeleccion.value
      // console.log('key')
      console.log(activarManual.value, idSeleccion.value)
    }
  }

  /* GESTION RETRANSMISIONES */

  const ventanaCargar = ref(false)
  const ventanaCrear = ref(false)
  const ventanaEliminar = ref(false)

  const tipo = ref(null)
  const idRetransmision = ref(null)

  const retransmision = ref(null)
  const listadoRetransmision = computed(() => {
    const lista = []
    if(retransmision.value) {
      retransmision.value.lista.forEach(el => {
        const elemento = simpleStore.getElementoById(el)
        if (elemento) lista.push(elemento)
      }) 
    }
    return lista.sort((a, b) => a.numero - b.numero)
  })

  const listadoRetransmisionOrdenado = computed(() => listadoRetransmision.value.sort((a, b) => a.numero - b.numero))



  const cargarRetransmision = () => {
    // listadoRetransmision.value = []
    retransmision.value = null
    retransmision.value = simpleStore.getRetransById(idRetransmision.value)
    // const lista = []
    // retransmision.value.lista.forEach(el => {
    //   const elemento = simpleStore.getElementoById(el)
    //   lista.push(elemento)
    // })
    // listadoRetransmision.value = lista
    // console.log(lista)
    ventanaCargar.value = false
  }

  // CREAR RETRANSMISION
  const nuevaRetransmision = ref(null)
  const crearRetransmision = () => {
    const nuevaId = simpleStore.addRetransmision(nuevaRetransmision.value)
    ventanaCrear.value = false
    nuevaRetransmision.value = null
    retransmision.value = simpleStore.getRetransById(nuevaId)
  }

  const eliminarRetransmision = () => {

  }


  // simpleStore.getListado("MISSA TORRENT")
  // simpleStore.addRetransmision("PEPE")

  // insertar graficos


  const activarDesdeLista = payload  => {
    if(!payload.grafico) return
    console.log(payload)

    // const listaNombres = ["BANDA_UNICA", "BANDA_DOBLE_TITULO", "TRES_LINEAS", "DSK"]
    const listaNombres = ["DSK_PRINCIPAL"]


    // const metodo = listaNombres[payload.grafico.fondo]
    const metodo = payload.grafico.metodo
    console.log(metodo)

    if (!payload.live) {
      swiftConnectionStore.rtRemote.playGraphic(metodo)
      
      if (payload.grafico.id_metodo === "0") {
        // swiftConnectionStore.rtRemote.updateFields(metodo + "::UNA_LTEXT", "String", payload.grafico.texto1)
        swiftConnectionStore.rtRemote.updateFields(metodo + "::TXT_SUPTEXT", "String", payload.grafico.texto1)
        swiftConnectionStore.rtRemote.updateFields(metodo + "::TXT_INFTEXT", "String", payload.grafico.texto2)
      } else if (payload.grafico.id_metodo === "1") {
        // console.log(payload.grafico.texto2)
        // swiftConnectionStore.rtRemote.updateFields(metodo + "::DOS_LTEXT", "String", payload.grafico.texto2)
        swiftConnectionStore.rtRemote.updateFields(metodo + "::TXT_SUPTEXT", "String", payload.grafico.texto1)
        swiftConnectionStore.rtRemote.updateFields(metodo + "::TXT_INFTEXT", "String", payload.grafico.texto2)
        
      } else if (payload.grafico.fondo === "2") {
        swiftConnectionStore.rtRemote.updateFields(metodo + "::TIT_TRES_LINEASTEXT", "String", payload.grafico.texto1)
        swiftConnectionStore.rtRemote.updateFields(metodo + "::TRES_L_TOPTEXT", "String", payload.grafico.texto2)
        swiftConnectionStore.rtRemote.updateFields(metodo + "::TRES_L_BOTTEXT", "String", payload.grafico.texto3)        
      } else if (payload.grafico.fondo === "3") {
        swiftConnectionStore.rtRemote.updateFields(metodo + "::DSK_TOPTEXT", "String", payload.grafico.texto1)
        swiftConnectionStore.rtRemote.updateFields(metodo + "::DSK_BOTTEXT", "String", payload.grafico.texto2)      
      }

      swiftConnectionStore.rtRemote.playMethod(metodo + "::bringOn")
    } else {
      swiftConnectionStore.rtRemote.playMethod(metodo + "::takeOff")
    }
    // updateBotonLive()
    // const updateBotonLive()
  }
 
  const activarGrafico = payload => {
    console.log(payload)
    if (!payload.live) {
      bringOn(payload)
    } else {
      takeOff(payload)
    }
  }

  const bringOn = (payload) => {
    // console.log(swiftConnectionStore.rtRemote)
    console.log('bringon')
    swiftConnectionStore.rtRemote.playGraphic(payload.nombre)
    if(payload.valor) swiftConnectionStore.rtRemote.updateFields(payload.nombre + "::FONDOSHDR", "Shader", payload.valor)
    swiftConnectionStore.rtRemote.playMethod(payload.nombre + "::bringOn")
    // swiftConnectionStore.getStatus("Method", "Current")
    // swiftConnectionStore.rtRemote.updateFields(metodo + "::n1_DUPL", "NumDuplicates", 0)
    getStatus()
  }
  const takeOff = (payload) => {
    console.log(payload.nombre)
    // swiftConnectionStore.rtRemote.playGraphic(payload.nombre)
    swiftConnectionStore.rtRemote.playMethod(payload.nombre + "::takeOff")
    swiftConnectionStore.rtRemote.playGraphic("CLEAR")
    // swiftConnectionStore.rtRemote.playMethod("CLEAR::bringOn")
  }


  const nuevoNombre = ref(null)
  const nuevoNumero = ref(null)

  const addItem = () => {
    if(nuevoNombre.value) {
      simpleStore.addItem(retransmision.value.id, nuevoNombre.value, nuevoNumero.value)
      nuevoNombre.value = null
      nuevoNumero.value = null

    }
  }

  const eliminarRotulo = id => {
    simpleStore.eliminarRotulo(id, retransmision.value.id)
  }

  const numColumns = computed(() => {
    let max = 12
    const longitud = listado.value.length
    // const filas =  Math.round(longitud / (max / 2)) == 0 ? 1 : Math.round(longitud / (max / 2))
    const filas = longitud % (max / 2) == 0 ? 6 : longitud % (max / 2)
    return (max / filas )
  })
  const getStatus = () => swiftConnectionStore.getStatus("Node", "rootNode||ObjectNode|Name")


  watch(() => rtRemote.value, (val) => {
    if(val) {
      getStatus()
      swiftConnectionStore.setDatosCargados(true)
    }
  })
  // watch(() => graficosLive.value, (val) => {
  //   // if(val) swiftConnectionStore.getStatus("Node", "rootNode||ObjectNode|Name")
  //   console.log(val)
  // },{
  //   deep:true
  // })
 
</script>

<style>
  

</style>