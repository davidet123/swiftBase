
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
          <h3>APLICACIONES</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <v-btn @click="cargarFutbol" class="boton-home">FUTBOL</v-btn>
          <v-btn to="/basket" class="boton-home">BASKET</v-btn>
          <v-btn to="/menutenis" class="boton-home">TENIS</v-btn>
          <v-btn to="/menubalonmano" class="boton-home">BALONMANO</v-btn>
          <v-btn to="/vumetro" class="boton-home">VUMETRO</v-btn>
          <v-btn to="/simple" class="boton-home">GRAFISME SIMPLE</v-btn>
          <v-btn to="/menumisa" class="boton-home">MISA</v-btn>
          <v-btn to="/menuretransmision" class="boton-home">RETRANSMISION</v-btn>
          <!-- <v-btn to="/controlmisa">CONTROL MISA</v-btn> -->
          <v-btn to="/test" class="boton-home">TEST</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <h3>AJUSTES</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <v-btn to="/settings" color="error">SETTINGS</v-btn>
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
  import { usegFutbolStore } from "../store/futbol"
  import { useRotulosStore } from "../store/rotulos"

  import { useRouter } from 'vue-router';

  const router = useRouter()

  const gStore = usegSheetStore()
  const dbStore = useDatabaseStore()
  const futbolStore = usegFutbolStore()
  const rotulosStore = useRotulosStore()

  const cargarFutbol = () => {
    if(futbolStore.getPartidos.length == 0) {

      futbolStore.cargarJugadores()
      futbolStore.cargarEquipos()
      futbolStore.cargarCompeticiones()
    
      futbolStore.cargarPartidos()
      futbolStore.cargarMarcadores()
      rotulosStore.cargarRotulos()
    }

    router.push("/futbolinicio")


  }

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
  .botonFutbol {
    color: black !important;
  }
  .boton-home {
    color: black !important;
    background-color: white !important;
    margin: 0 3px;
    width: 150px;
  }
  .boton-home:hover {
    color: white !important;
    background-color: rgba(0, 149, 79, 0.88) !important;
    margin: 0 3px;
    width: 150px;
  }

</style>