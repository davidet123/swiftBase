<template>
  <v-row>
    <v-col cols="12" class="text-center">
      <h4>Menú retransmisiones</h4>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="3" offset="3">
      <v-btn color="success" size="small" to="/retransmision">CREAR RETRANSMISION</v-btn>

    </v-col>
    <!-- <v-col cols="3" offset="1">
      <v-btn color="success" size="small">CARGAR RETRANSMISION</v-btn>
    </v-col> -->
  </v-row>
  <v-row v-if="cargar">
    <v-col cols="10" offset="1" v-for="retrans in listadoRetransmisiones" :key="retrans.idRetransmision">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="8"><h4>{{ retrans.idRetransmision }}</h4></v-col>
            <v-col cols="4">
              <v-btn
              color="success"
              size="x-small"
              @click="retransmisionStore.cargarRetransmision(retrans.idRetransmision)"
              
              >CARGAR</v-btn></v-col>
          </v-row>
        </v-card-text>>
      </v-card>
      
    </v-col>

  </v-row>

</template>

<script setup>

  import { storeToRefs } from "pinia";
  import { useRetransmisionStore } from "../../store/retransmision" 
  import { ref } from "vue";

  const retransmisionStore = useRetransmisionStore()
  const { listadoRetransmisiones } = storeToRefs(retransmisionStore)

  const cargar = ref(true)

  retransmisionStore.cargarRetransmisiones()




</script>