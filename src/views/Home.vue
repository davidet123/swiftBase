
<template>
  <main>
    <v-app-bar title="Swift CG Controller"></v-app-bar>
    <v-main class="main_bg">
      <v-row>
        <v-col class="text-center">
          <img src="@/assets/loao_a_punt.svg" alt="logo a punt" class="logo">
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <h3>APLICACIONS</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <v-btn to="/futbol">FUTBOL</v-btn>
          <v-btn to="/vumetro">VUMETRO</v-btn>
          <v-btn to="/simple">GRAFISME SIMPLE</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <h3>AJUSTOS</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <v-btn to="/settings">SETTINGS</v-btn>
        </v-col>
      </v-row>
      <!-- <div class="text-center">
        <v-progress-circular v-if="gStore.gSheetLoading"
        indeterminate
        color="red"
        class="text-center"
      ></v-progress-circular>

      </div>
      <v-row>
        <v-col cols="6">

          <v-table class="mx-2" v-if="!gStore.gSheetLoading">
            <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Enviar
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item) in gStore.valoresHoja"
                :key="item.id"
              >
                <td><p :class="tempNombre == item.nombre.join(' ') ? 'font-weight-black' : 'font-weight-regular'">{{ item.nombre.join(" ") }}</p></td>
                <td><v-btn 
                  :color="tempNombre == item.nombre.join(' ') ? 'red' : 'green'"
                  size="x-small" @click="mostrarNombre(item.nombre.join(' '))">
                  {{ tempNombre !== item.nombre.join(' ') ? "mostrar" : "ocultar" }} 
                </v-btn></td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row> -->
    </v-main>
  </main>
</template>

<script setup>
  import { ref } from "vue"
  import { usegSheetStore } from "../store/gSheet"
  import { useDatabaseStore } from "../store/db"

  const gStore = usegSheetStore()
  const dbStore = useDatabaseStore()

  // dbStore.cargarDb()

  /* dbStore.addPlayer({nombre: "Antonio",
        numero: 7,
        posicion: "DC"}) */
  
  gStore.getLista()
  

  let tempNombre = ref("-")

  const mostrarNombre = (nombre) => {
    if (nombre !== tempNombre.value) {
      tempNombre.value = nombre

    } else {
      tempNombre.value = "-"
    }
  }


</script>

<style>
  .main_bg {
    background-color: black;
    color: white
  }
  .logo {
    width: 10%
  }
</style>