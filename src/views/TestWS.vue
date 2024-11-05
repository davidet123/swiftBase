<template>
  
  <v-row>
    <v-col>
      <v-btn color="success" @click="websocketStore.conectarPythonWS()">Conectar</v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      {{ texto }}
    </v-col>
  </v-row>
</template>

<script setup>
  import { computed, ref, watch } from "vue";
  import { useWebsocketStore } from "../store/websocket"
  import { useSwiftConnectionStore } from "../store/swiftConnection"

  const websocketStore = useWebsocketStore()
  const swiftConnectionStore = useSwiftConnectionStore()

  swiftConnectionStore.startConnection()


  const texto = computed(() => websocketStore.testPython)

  

  // const texto_temp1 = texto.value.substring(1, texto.value.length-1)

  // const texto_temp2 = texto_temp1.split(",")

  // const x = ref(texto_temp2[0])
  // const y = ref(texto_temp2[1])
  // const w = ref(texto_temp2[2])
  // const h = ref(texto_temp2[3])
  const centro = (x1, x2) => {
    return (x1+x2) / 2
  }

  const ancho_largo = (x1, x2) => {
    return x2 - x1
  }
  const convertirAArray = texto => {
    const parts = texto.match(/\[([^\]]+)\]/g);

    // Convertir cada parte en un array de números
    const arrayOfArrays = parts.map(part => {
      // Eliminar los corchetes y dividir por comas
      return part.replace(/[\[\]]/g, '').split(',').map(Number);
});
  }
  let frame = 0

  watch(() => texto.value, val => {
    if(frame%3 == 0) {

      swiftConnectionStore.startTransaction()
      for (let i = 0; i <= 1; i++) {
        if(val[i]) {
          let [x, y, w, h] = val[i]
          y = 1080 - y
          // swiftConnectionStore.startTransaction()
          swiftConnectionStore.rtRemote.updateFields('YOLO::RECTANGULO' + i + 'TRFM', "Translate", x + "," + y)
              // swiftConnectionStore.rtRemote.updateFields('YOLO::PUNTOTRFM', "Translate", x + "," + y)
          swiftConnectionStore.rtRemote.updateFields('YOLO::RECTANGULO' + i + 'DGEOM', "RectangleSize", w + "," + h)
          
        }
      }
      swiftConnectionStore.endTransaction()
      // console.log(frame)
    }
    // for (let i = 0; i <= 4 ; i++) {
    //   const numero = i + 1
    //   if(val[i]) {
    //     let [x, y, w, h] = val[i]
    //     y = 1080 - y
    //     // y = y - h
    //     // swiftConnectionStore.rtRemote.updateFields('YOLO::RECTANGULOTRFM' + numero, "Display", "false")
    //     swiftConnectionStore.rtRemote.updateFields('YOLO::RECTANGULOTRFM' + numero, "Display", "true")
    //     swiftConnectionStore.rtRemote.updateFields('YOLO::RECTANGULOTRFM' + numero, "Translate", x + "," + y)
    //     // swiftConnectionStore.rtRemote.updateFields('YOLO::PUNTOTRFM', "Translate", x + "," + y)
    //     swiftConnectionStore.rtRemote.updateFields('YOLO::RECTANGULODGEOM' + numero, "RectangleSize", w + "," + h)
    //     // console.log('YOLO::RECTANGULO' + numero + 'TRFM')
    //   } else {
    //     swiftConnectionStore.rtRemote.updateFields('YOLO::RECTANGULOTRFM' + numero, "Display", "false")
    //     // console.log("false")
    //   }
    // }
    // swiftConnectionStore.endTransaction()
    // const mostrar = ['false', 'false','false','false','false']
    // val.forEach(el => {
    //   let [x, y, w, h] = el
    //   y = 1080 - y
    //   // y = y - h
    //   swiftConnectionStore.rtRemote.updateFields('YOLO::RECTANGULOTRFM' + i, "Translate", x + "," + y)
    //   // swiftConnectionStore.rtRemote.updateFields('YOLO::PUNTOTRFM', "Translate", x + "," + y)
    //   swiftConnectionStore.rtRemote.updateFields('YOLO::RECTANGULODGEOM' + i, "RectangleSize", w + "," + h)
    //   console.log('YOLO::RECTANGULO' + i + 'TRFM')
    //   i++
    // }); 
    // console.log(val)
      // console.log(convertirAArray(val))
      // let [x1, y1, x2, y2] = val

      
      // const w = Math.round(ancho_largo(x1, x2))
      // const h = Math.round(ancho_largo(y1, y2))
      
      // const x = Math.round(centro(x1, x2))
      // const y = 1080 - Math.round(centro(y1, y2))
      frame ++
      if(frame >= 999) frame = 0
      // console.log(frame)

    },{
      deep: true
    })





</script>