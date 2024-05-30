<template>
  <div id="fondoComandos">
    <div id="textoComandos">
      <p>{{ textoComando }} {{ guardado }}</p>
      <span v-if="!guardado">
        <v-icon
            icon="mdi-circle-small"
            color="error"
          ></v-icon>   
      </span>
    </div>
    <div id="iconosComandos">
      <div class="icono">
        <v-icon
          icon="mdi-home-outline"
          size="x-small"
          @click="inicio()"
        ></v-icon>
      </div>
      <div class="icono">
        <v-icon
          icon="mdi-content-save-all-outline"
          size="x-small"
          @click="retransmisionStore.guardarRetransmision()"
        ></v-icon>
      </div>
      <!-- <div class="icono">
        <v-icon
          icon="mdi-trash-can-outline"
          size="x-small"
        ></v-icon>
      </div> -->
    </div>
  </div>
</template>

<script setup>

  import { ref } from 'vue';
  import { useRouter } from 'vue-router'
  import { useRetransmisionStore } from '@/store/retransmision'
  import { storeToRefs } from 'pinia';

  const router = useRouter()

  const retransmisionStore = useRetransmisionStore()

  const { nombreRetransmision, guardado } = storeToRefs(retransmisionStore)

  const inicio = () => router.push("/menuretransmision")

  const textoComando = ref(nombreRetransmision.value || "---")

</script>

<style scoped>
  #fondoComandos {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* background-color: #782b2b; */
  }

  #textoComandos {
    width: 90%;
    height: 100%;
    /* background-color: #228784; */
    display: flex;
    align-items: center;
    padding-left: 10px;
    
  }
  #iconosComandos {
    width: 10%;
    height: 100%;
    /* background-color: #a3d91b; */
    display: flex;
    justify-content: end;
    align-items: center;
    padding-right: 10px;
  }

  #iconosComandos .icono  {
    margin: 0 4px;
    cursor: pointer;
  }

</style>

