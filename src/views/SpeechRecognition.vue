<template>
  <v-row>
    <v-col class="text-center">
      <h3>Speech recognition</h3>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-btn @click="startRecording" color="success">Start</v-btn>
      <v-btn @click="stopRecording" color="error">STOP</v-btn>
      <h3>{{ final }} - {{ palabras}}</h3>
    </v-col>
  </v-row>

  <v-row>
    <v-col class="text-center">
      {{ texto }}
    </v-col>
  </v-row>
  <v-row>
    <v-col class="text-center">
      {{ tempResult }}
    </v-col>
  </v-row>
  <v-row>
    <v-col class="text-center">
      {{ result }}
    </v-col>
  </v-row>
  
</template>

<script setup>
import { ref, watch } from 'vue';



  let recognition = window.SpeechRecognition || window.webkitSpeechRecognition

  const result = ref('')
  const tempResult = ref('')
  const final = ref(false)
  const confidence = ref(0)
  const evento = ref(null)
  let palabras = ref(0)
  const texto = ref([])
  let frase = 0
  let maxPalabras = 0
  let maxPalabrasTemp = 0

  if(recognition) {
    recognition = new recognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'ca-ES'

    recognition.onstart = () => {
      console.log("Capturando audio")
    }

    recognition.onresult = event => {
      // console.log("event")
      result.value = ''
      
      // texto.value.push(event.results[0][0].transcript)
      for (let i = event.resultIndex; i < event.results.length; i++) {
        final.value = event.results[i].isFinal
        confidence.value = event.results[i][0].confidence
        if (event.results[i].isFinal) {
          result.value += event.results[i][0].transcript + ' ';
          console.log("isfinal")
        } else {
          // evento.value = event
          // if(countWords(event.results[i][0].transcript) >= 15) result.value = "" 
          // console.log(event.results[i])
          // if(result.value.length > 100) result.value = ''
          result.value += event.results[i][0].transcript
          console.log()
          maxPalabrasTemp = countWords(result.value)
          if(maxPalabrasTemp > maxPalabras) {
            tempResult.value = result.value
            maxPalabras = maxPalabrasTemp
          }
        }
      }
      if(countWords(tempResult.value)%15 == 0) {
        texto.value.push(tempResult.value)
        const ultimoTexto = texto.value[texto.value.length -1]
        if(texto.value.length >= 2) {

          let resultado = texto.value[texto.value.length -1].replace(new RegExp(texto.value[texto.value.length -2], 'g'), '').trim()
          console.log(resultado)
        }



      }

      // tempResult.value = event.results[0][0].transcript
      // texto.value[frase] = event.results[0][0].transcript
    }
    recognition.onspeechstart = event => {
      console.log(event)
    }
    recognition.onnomatch = event => {
      //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
      console.log(event);
  }
  }

  const countWords = str => {
    if(str) return str.trim().split(/\s+/).length;
  }


  const startRecording = () => {
    recognition.start()
  }

  const stopRecording = () => {
    recognition.stop()
  }

  // watch(()=> palabras.value, val => {
  //   console.log(val)
  //   if(val > 15) result.value = ''
  // })

</script>