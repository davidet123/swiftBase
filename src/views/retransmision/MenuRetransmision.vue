<template>
  <v-row class="mt-4">
    <v-col cols="12" class="text-center"><h4>Listado Retransmisiones</h4></v-col>
  </v-row>
  <v-row v-if="cargar">
    <v-col cols="8" offset="2" v-for="retrans in listadoRetransmisiones" :key="retrans.idRetransmision">
      <v-card>
        <v-card-text>
          <v-row>

            <v-col cols="7" v-if="editando !== retrans.idRetransmision"><h4>{{ retrans.nombreRetransmision }} |  {{  fechaCreacion(retrans.idRetransmision) }}</h4></v-col>
            <v-col cols="7" v-else>
              <v-text-field v-model="retrans.nombreRetransmision"></v-text-field>
            </v-col>
            <v-col cols="5">
              <v-btn
              color="success"
              size="x-small"
              :disabled="editando == retrans.idRetransmision"
              @click="cargarRetransmision(retrans.idRetransmision)"
              >CARGAR</v-btn>
              <v-btn
              color="error"
              size="x-small"
              class="ml-2"
              :disabled="editando == retrans.idRetransmision"
              @click="retransmisionStore.eliminarRetransmision(retrans.idRetransmision)"
              >ELIMINAR</v-btn>
              <v-btn
              color="primary"
              size="x-small"
              class="ml-2"
              :disabled="editando == retrans.idRetransmision"
              @click="retransmisionStore.duplicarRetransmision(retrans.idRetransmision)"
              >DUPLICAR</v-btn>
              <v-btn
              color="orange-darken-1"
              size="x-small"
              class="ml-2"
              @click="editarRetransmision(retrans.idRetransmision)"
              ><span v-if="editando !== retrans.idRetransmision">EDITAR</span><span v-else>TERMINAR EDICIOM</span></v-btn>
            </v-col>
          </v-row>

        </v-card-text>
      </v-card>
      
    </v-col>

  </v-row>
  <v-divider class="my-5"></v-divider>
  <v-row>
    <v-col cols="12" class="text-center">
      <h4>Menú retransmisiones</h4>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" id="nuevaRetrans">
      <v-card width="60%">
        <v-card-title>
          <v-row>
            <v-col class="text-center">
              <h4>Nueva retransmision</h4>
            </v-col>
          </v-row>
        </v-card-title>
        <v-row>
          <v-col cols="6" offset="3">
            <v-text-field
              v-model="nombreRetransmision"
              label="Nombre retransmision"
            ></v-text-field>

          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2" offset="5" class="text-center">
            <v-btn color="success" @click="crearRetransmision(nombreRetransmision)">CREAR</v-btn>
          </v-col>
        </v-row>
        <v-card-text>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>

  import { storeToRefs } from "pinia"
  import { useRouter } from 'vue-router'
  import { useRetransmisionStore } from "../../store/retransmision" 
  import { ref, computed } from "vue"

  const retransmisionStore = useRetransmisionStore()
  const { listadoRetransmisiones } = storeToRefs(retransmisionStore)
  const router = useRouter()

  const cargar = ref(true)

  const editando = ref(null)

  retransmisionStore.cargarRetransmisiones()
  const nombreRetransmision = ref(null)

  const fechaCreacion = valor => {
    return new Date(valor).toLocaleString()
  }

  const cargarRetransmision = id => {
    retransmisionStore.cargarRetransmision(id)
    router.push('/retransmision')
  }

  const crearRetransmision = nombre => { 
    if(!nombre) return
    retransmisionStore.crearRetransmision(nombre)
    router.push('/retransmision')
  }

  const editarRetransmision = id => {
    if(editando.value) {
      retransmisionStore.editarRetransmision(id)
      editando.value = null
      return
    }
    editando.value = id
  }




</script>

<style scoped>
  #nuevaRetrans {
   display: flex;
   justify-content: center; 
  }

</style>