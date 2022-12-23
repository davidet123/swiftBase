<template>
  <v-main>
    <h1>FUTBOL</h1>
    <!-- <p>{{ futbolStore.local }}</p> -->
    <v-table class="mx-2">
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <!-- <th class="text-left">
            Enviar
          </th> -->
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item) in futbolStore.local"
          :key="item.id"
        >
          <td><p>{{ item.nombre }}</p></td>
          <!-- <td><v-btn 
            :color="tempNombre == item.nombre.join(' ') ? 'red' : 'green'"
            size="x-small" @click="mostrarNombre(item.nombre.join(' '))">
            {{ tempNombre !== item.nombre.join(' ') ? "mostrar" : "ocultar" }} 
          </v-btn></td> -->
        </tr>
      </tbody>
    </v-table>
  </v-main>
</template>

<script setup>
import { usegFutbolStore } from "../../store/futbol"

const futbolStore = usegFutbolStore()

futbolStore.cargarEquipo()

</script>

<style>

</style>