<template>
  <v-row>
    <v-col cols="12" class="text-center">
      <h3>Configuración retransmissio simple</h3>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="4" offset="1" class="text-center">
      <h3>Página Google Sheet</h3>
      <v-text-field
          label="Pagina GSheet"
          v-model="pagina"
      ></v-text-field>
    </v-col>
    <v-col cols="4" offset="1" class="text-center">
      <h3>Rango Google Sheet</h3>
      <v-text-field
          label="Rango GSheet"
          v-model="rango"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" class="text-center">
      <h3>Elementos estáticos</h3>
      <v-row v-if="elementosEstaticos.length > 0" v-for="el in elementosEstaticos" :key="el.id">
        <!-- <v-col cols="2">
          <v-text-field
            label="id"
          >
          </v-text-field>
        </v-col> -->
        <v-col cols="2" offset="2">
          <v-text-field
            label="numero"
            v-model="el.numero"
          >
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="nombre"
            v-model="el.nombre"
          >
          </v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn @click="eliminarElemento(el.numero)" color="error">X</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <v-row>
            <v-col cols="2" offset="4">

              <v-btn @click="nuevoElemento()" color="error" :disabled="!pagina || !rango">NUEVO ELEMENTO</v-btn>
            </v-col>
            <v-col cols="2">

              <v-btn color="success" @click="guardarCambios" :disabled="!pagina || !rango">ACEPTAR</v-btn>
            </v-col>
          </v-row>
          <span> </span>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" class="text-center">
      <v-btn color="error" @click="reset">RESET</v-btn>
    </v-col>
  </v-row>
</template>

<script setup>

  import { computed, ref, watch } from 'vue'
  import { usegSheetStore } from "../../store/gSheet"
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router'

  const gSheetStore = usegSheetStore()

  const { configSimple } = storeToRefs(gSheetStore)

  gSheetStore.getConfigSimple()

  const router = useRouter()



  // const pagina = ref(null)
  // const rango = ref(null)

  // const elementosEstaticos = ref([])
  const pagina = ref(configSimple.value.pagina)
  const rango = ref(configSimple.value.rango)

  const elementosEstaticos = ref([...configSimple.value.elementos])


  const nuevoElemento = () => {
    const id = `${pagina.value}-${elementosEstaticos.value.length}`
    
    const plantillaElemento = {
      id,
      numero: elementosEstaticos.value.length + 1,
      nombre: null,
      live: false
    }
    elementosEstaticos.value.push(plantillaElemento)
  }

  const eliminarElemento = numero => {
    const temp = elementosEstaticos.value.filter(el => el.numero !== numero)
    elementosEstaticos.value = [...temp]
    console.log(temp)
  }

  const reset = () => {
      pagina.value = null
      rango.value = null
      elementosEstaticos.value = []
  }



  const guardarCambios = () => {
    const data = {
      pagina: pagina.value,
      rango: rango.value,
      elementos: [
        ...elementosEstaticos.value
      ]
    }
    gSheetStore.setConfigSimple(data)
    localStorage.setItem('configSimple', JSON.stringify(data))
    router.push("/simple")
  }

  watch(() => configSimple.value, (val) => {
    if(val) {
      console.log(val)
    }
  },{
    deep: true
  })


</script>