<template>
  <v-row>
    <v-col cols="7">
      <v-row>
        <v-col cols="12" class="recuadro_gris">
          <v-row>
            <v-col cols="4" class="text-center"><p class="text-h2">22</p></v-col>
            <v-col cols="4" class="text-center"><p class="text-h4">1</p></v-col>
            <v-col cols="4" class="text-center"><p class="text-h2">45</p></v-col>
          </v-row>
          <v-row>
            <v-col cols="4" class="text-center"><h5>LOCAL</h5></v-col>
            <v-col cols="4" class="text-center"><h6>Periodo</h6></v-col>
            <v-col cols="4" class="text-center"><h5>VISITANT</h5></v-col>
          </v-row>
          <v-row>
            <v-col cols="4" class="text-center"><p class="text-h4">4</p></v-col>
            <v-col cols="4" class="text-center"><p class="text-h3">12:45</p></v-col>
            <v-col cols="4" class="text-center"><p class="text-h4">7</p></v-col>
          </v-row>
          <v-row>
            <v-col cols="4" class="text-center"><h5>FALTES</h5></v-col>
            <v-col cols="4" class="text-center" offset="4"><h5>FALTES</h5></v-col>
          </v-row>
        </v-col>
      </v-row>
      
      <div class="recuadro_gris">

        <v-row class="mt-4">
          <v-col cols="4" class="text-center">
            <v-btn size="x-small" color="orange">+1</v-btn>
            <v-btn size="x-small" color="orange">+2</v-btn>
            <v-btn size="x-small" color="orange">+3</v-btn>
          </v-col>
          <v-col cols="4" class="text-center">
            <v-row>
              <v-col cols="12" class="ma-0 pa-0"><v-btn size="x-small" color="success">START</v-btn></v-col>
              <v-col cols="12" class="ma-0 pa-0"><v-btn size="x-small" color="success">STOP</v-btn></v-col>
              <v-col cols="12" class="ma-0 pa-0"><v-btn size="x-small" color="error">RESET</v-btn></v-col>
            </v-row>
          </v-col>
          <v-col cols="4" class="text-center">
            <v-btn size="x-small" color="blue">+1</v-btn>
            <v-btn size="x-small" color="blue">+2</v-btn>
            <v-btn size="x-small" color="blue">+3</v-btn>
          </v-col>
        </v-row>
        <v-row class="mb-4">
          <v-col cols="12" class="text-center mt-2 mb-0 pa-0">
            <p>Periodo</p>
          </v-col>
          <v-col cols="12" class="text-center ma-0 pa-0">
            <v-btn size="x-small" color="blue">1</v-btn>
            <v-btn size="x-small" color="blue">2</v-btn>
            <v-btn size="x-small" color="blue">3</v-btn>
            <v-btn size="x-small" color="blue">4</v-btn>

          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-row>

</template>

<script setup>

  import { useRoute, useRouter } from 'vue-router'
  import { usegBasketStore } from "../../store/basket"
  import { storeToRefs } from 'pinia'

  const basketStore = usegBasketStore()

  const { marcadorBasket } = storeToRefs(basketStore)

  const route = useRoute()
  const router = useRouter()

  const id = route.params.id

  console.log(marcadorBasket.value)

</script>

<style scoped>
  .recuadro_gris {
      background-color: #303030;
      border-radius: 5px;
      border: 1px solid white;
    }

</style>