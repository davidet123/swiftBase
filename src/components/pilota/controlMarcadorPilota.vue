<template>
  <v-card width="80%" style="margin: 0 auto">
    <v-card-text class="mb-2">
      <v-row>
        <v-col class="text-center" cols="1" offset="4" style="border:1px solid black; font-weight: bold">{{ puntos[marcador.equip_roig.puntos] }}</v-col>
        <v-col class="text-center" cols="1" style="border:1px solid black; background-color: red; color: white; font-weight: bold">{{ marcador.equip_roig.jocs }}</v-col>
        <v-col class="text-center" cols="1" style="border:1px solid black; background-color: blue; color: white; font-weight: bold">{{ marcador.equip_blau.jocs }}</v-col>
        <v-col class="text-center" cols="1" style="border:1px solid black; font-weight: bold">{{ puntos[marcador.equip_blau.puntos] }}</v-col>
      </v-row>
      <v-row>
        <v-col cols="1" offset="4">
          <v-btn color="red" size="x-small" @click="punto('roig', 1)">+</v-btn>
        </v-col>
        <v-col cols="1">
          <v-btn color="red" size="x-small" @click="punto('roig', -1)">-</v-btn>
        </v-col>
        <v-col cols="1">
          <v-btn color="blue" size="x-small" @click="punto('blau', 1)">+</v-btn>
        </v-col>
        <v-col cols="1">
          <v-btn color="blue" size="x-small" @click="punto('blau', -1)">-</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>


  import { ref, toRefs } from 'vue'


  const props = defineProps(["marcador", "partidaA"])

  
  const { marcador, partidaA } = toRefs(props)

  const puntos = ["NET", "15", "30", "VAL", "JOC"]

  

  const punto = (equipo, val) => {
    
    let tempEquipo = null
    let otroEquipo = null
    if(equipo === "roig") {
      tempEquipo = marcador.value.equip_roig
      otroEquipo = marcador.value.equip_blau
    } else if(equipo === "blau") {
      tempEquipo = marcador.value.equip_blau
      otroEquipo = marcador.value.equip_roig
    }
    
    if(tempEquipo.jocs === partidaA.value && val === 1) {
      return
    }
    
    tempEquipo.puntos += val

    if(tempEquipo.puntos == 4) {
      tempEquipo.jocs += 5
      tempEquipo.puntos = 0
      otroEquipo.puntos = 0
    }
    if(tempEquipo.puntos == -1) {
      if(tempEquipo.jocs == tempEquipo.marcadorInicial) tempEquipo.puntos = 0
      if(tempEquipo.jocs !== tempEquipo.marcadorInicial) {
        tempEquipo.jocs -= 5
        tempEquipo.puntos = 3        
      }
    }
  }

  document.addEventListener("keydown", (event) => {
  console.log(event.getModifierState("Shift"))
  if(event.getModifierState("Shift")) console.log(event.key)
});

  
</script>