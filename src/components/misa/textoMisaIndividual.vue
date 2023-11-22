<template>
  <v-card class="textoMisa" :style="colorBorde">
    <v-card-title>
      <h6>ID texto {{ item.id }}</h6>
    </v-card-title>
    <!-- <v-card-subtitle>
      <h4>{{item.titulo}}</h4>
    </v-card-subtitle> -->
    <v-card-text>
      <v-row>
        <v-col>
          <!-- <h4>Següent rotul</h4> -->
          <div class="contenedor">
            <div class="FHDWrapper">
              <v-col >
                <div class="FHD text-center" style="white-space: pre;" :style="estiloTexto">
                  <p>{{item.texto}}</p>
                </div>
              </v-col>
            </div>

          </div>
        </v-col>
      </v-row>
      <p class="text-right">{{ numItem + 1 }} / {{ misaStore.textosMisa[0].idTextos.length }}</p>
      <!-- <p>{{item.texto}}</p> -->
    </v-card-text>
    <v-card-actions>
      <v-btn color="error" @click="goTo()">EDITAR</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>

import { toRefs } from "vue"
import {useMisaStore} from "../../store/misa.js"
import { storeToRefs } from "pinia"
import { computed } from "vue"
import { useRouter } from 'vue-router';

const router = useRouter()

const misaStore = useMisaStore()

const { textoLive } = storeToRefs(misaStore)

const props = defineProps(["item", "numItem"])
const { item, numItem } = toRefs(props)
// console.log(numItem.value)
const colorBorde = computed(() => {
  if(misaStore.getTextoLive) {
    if(misaStore.getTextoLive.id == item.value.id) {
      return {
        border: '2px solid red'
      }
    }

  }
})

const estiloTexto = computed (() => {
  return {
    fontSize: `${item.value.tamaño * 0.18}px`,
    color: item.value.color
  }
})

const goTo = () => {
  router.push(`/editartextomisa/${item.value.id}`)
}

</script>

<style scoped>
.textoMisa {
  margin: 0 auto;
  width: 250px;
}
  .contenedor {
    width: 90%;
    margin: 0 auto;
  }
</style>