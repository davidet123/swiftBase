<template>


  <v-row>
    <v-col cols="12">
      <v-card
        @click="detectClick"
      >
      <div v-if="!editing">
        <div v-if="!periodista">
          <v-card-title>{{ rotulo.titulo }}</v-card-title>
          <v-card-subtitle>{{ rotulo.subtitulo }}</v-card-subtitle>
        </div>
        <div v-if="periodista">
          <v-card-title>
            <v-row>
              <v-col cols="3">{{ rotulo.titulo }}</v-col>
              <v-col cols="7">{{ rotulo.subtitulo }}</v-col>
              <v-col cols="2" class="text-right"><botonLive v-if="!editing" class="boton" :nombre="'rotulo'" @activar="live"/></v-col>
            </v-row>
          </v-card-title>
        </div>
      </div>
      <div v-if="editing">
        <v-card-title>
          <v-text-field
            label="Titulo"
            v-model="rotulo.titulo"
          ></v-text-field>
        </v-card-title>
        <v-card-subtitle>
          <v-text-field
            label="Subtitulo"
            v-model="rotulo.subtitulo"
          ></v-text-field>
        </v-card-subtitle>
        <v-checkbox
          label="Membre del equip"
          v-model="periodista"
        ></v-checkbox>
      </div>
        <v-card-actions class="actions" v-if="!periodista || editing">
          <botonLive v-if="!editing" class="boton" :nombre="'rotulo'" @activar="live"/>
          <v-row>
            <v-col cols="6" class="text-right">
              <v-btn
                v-if="editing"
                color="success"
                style="margin:0 auto;"
                size="x-small"
                @click="aceptar()"
              >ACEPTAR</v-btn>
              
            </v-col>
            <v-col cols="6" class="text-left">
              <v-btn
                v-if="editing"
                color="error"
                style="margin:0 auto;"
                size="x-small"
                @click="eliminar()"
              >ELIMINAR</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>

      <!-- <v-card>
        <v-card-title class="titulo">
          <p class="text-h5">{{ rotulo.titulo }}</p>
          
        </v-card-title>
        <v-card-subtitle class="subtitulo">
          <p class="text-h6" style="padding-left: 30px">{{ rotulo.subtitulo }}</p>
          
        </v-card-subtitle>
      </v-card> -->
    </v-col>

  </v-row>
  <!-- <v-row style="border-bottom: 1px solid white;">
    <v-col cols="6" style="border-right: 1px solid white;">
      <p>{{ rotulo.titulo }}</p>
    </v-col>
    <v-col cols="6">
      <p>{{ rotulo.subtitulo }}</p>
    </v-col>
  </v-row> -->
</template>

<script setup>
  import { toRefs } from 'vue';
  import botonLive from '../simple/botonLive.vue'
  import { ref } from 'vue';


  const emit = defineEmits(["mostrar", "editar", "eliminar"])


  const props = defineProps(["rotulo"])
  const { rotulo } = toRefs(props)


  const editing = ref(false)

  const periodista = ref(rotulo.value.periodista)

  const live = (payload) => {
    console.log('ACTIVAR')
    payload.rotulo = rotulo.value
    payload.contenido = {titulo: rotulo.value.titulo, subtitulo: rotulo.value.subtitulo}
    emit("mostrar", payload)
  }

  let clickCount = 0

  const detectClick = () => {
    clickCount += 1;
    if (clickCount === 1) {
      var singleClick = setTimeout(() => {
        console.log("we are in singleClick");
        // this.currentPickerDate();
        clickCount = 0;
      }, 500);
    }
    if (clickCount === 2) {
      console.log("we are in double Click");
      clearTimeout(singleClick);
      editing.value = true
      // this.showEvent();
      clickCount = 0;
    }
  }

  const aceptar = () => {
    editing.value = false
    rotulo.value.periodista = periodista.value
    emit("editar", rotulo.value)
  }

  const eliminar = () => {
    editing.value = false
    emit("eliminar", rotulo.value.id_rotulo)
  }



</script>

<style scoped>
.titulo {
  border-bottom: 1px solid black;
}
.subtitulo {
  border-bottom: 1px solid black;
}

.actions {
  width: 100%;
}

.boton {
  margin: 0 auto;
}
</style>