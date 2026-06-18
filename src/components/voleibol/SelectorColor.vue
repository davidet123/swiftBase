<template>
  <div class="text-center pa-4">

    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        max-width="400"
      >
      <v-card-title>
        <v-row>
          <v-col class="text-center">

            Elegir color {{ equipo.nombre }}
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <div>
          <v-radio-group v-model="selectedColor" inline>
            <v-radio label="Top" value="top"></v-radio>
            <v-radio label="Bottom" value="bottom"></v-radio>
          </v-radio-group>
        </div>
        <v-color-picker v-model="equipo.color[selectedColor]"></v-color-picker>
      </v-card-text>
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Ok"
            @click="cerrar"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
  import { ref, toRefs } from 'vue'

  const props = defineProps(["dialog", "equipo"])
  const { dialog, equipo } = toRefs(props)
  
  const emit = defineEmits(["cerrar"])

  const cerrar = () => {
    emit("cerrar")
  }

  const selectedColor = ref("top")

</script>

<style lang="scss" scoped>

</style>