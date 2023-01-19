
import { defineStore } from 'pinia'
import { useWebsocketStore } from "./websocket"



export const useCaptureAudioStore = defineStore('captureAudio', {

  state: () => ({
    recording: true,
    streaming: true,
    audioContext: null,
    valorVumetro: 0,
    frameRate: 0,
    minIn: 0,
    maxIn: 150,
    minOut: 0,
    maxOut: 15
  }),
  getters: {
    nivelVumetro (state) {
      // (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
      return Math.round((state.valorVumetro - state.minIn) * (state.maxOut - state.minIn) / (state.maxIn - state.minIn) + state.minOut)
    },
    textoVumetro (state) {
      return state.valorVumetro.toFixed(2)
    }

  },
  actions: {
    captureAudio() {
      const websocketStore = useWebsocketStore()
      console.log("FROM WEBSOCKET STORE " + websocketStore.factorVolumen)
      this.recording = true
      // console.log(this.recording)
      const self = this
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      })
        .then(function(stream) {
          self.audioContext = new AudioContext();
          const analyser = self.audioContext.createAnalyser();
          // console.log(analyser)
          const microphone = self.audioContext.createMediaStreamSource(stream);
          // console.log(microphone)
          const scriptProcessor = self.audioContext.createScriptProcessor(2048, 1, 1);
      
          let factorVolumen = 0.7;
          
          self.valorVumetro = 0;

          analyser.smoothingTimeConstant = 0.8;
          analyser.fftSize = 1024;
      
          microphone.connect(analyser);
          analyser.connect(scriptProcessor);
          scriptProcessor.connect(self.audioContext.destination);
          scriptProcessor.onaudioprocess = function() {
            const array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            // analyser.getByteTimeDomainData(array);
            const arraySum = array.reduce((a, value) => a + value, 0);
            const average = arraySum / array.length;
            // console.log(Math.round(average));
            
           
            // demo.setAttribute('data-val', average*factorVolumen); // AÑADIR VALORES PARA PINTAR RECUADROS DEL VOLUMEN
      
            self.valorVumetro = average*factorVolumen;
            // dataValue = parseInt(Math.floor(valorVumetro * factorVolumen))
            // console.log(dataValue)
      
            if (self.streaming) {
      
              if (self.frameRate % 10 == 0) {
        
                // valorVumetroEl.innerHTML = Math.round(valorVumetro * 100) / 100 + 60;
                if (self.recording) {
                  websocketStore.arrayValues.push({x:Date.now(), y: self.dataValue})
                  // newDataPoints.push({y: parseFloat((valorVumetro * factorVolumen).toFixed(2))})
                  // newDataPoints.push({y: parseInt(Math.floor(valorVumetro * factorVolumen))})
                  // newChart.updateData(parseInt(Math.floor(valorVumetro * factorVolumen)))
                }
                // console.log(newDataPoints)
                // valorVumetroEl.innerHTML =(valorVumetro * factorVolumen).toFixed(2)
                // mostrarValor(valorVumetro.toFixed(2))
              }
              // animarVumetro(valorVumetro)
              // console.log(self.valorVumetro)
              self.frameRate ++
            }
      
            if (self.frameRate == 299) {
              self.frameRate = 0;
            };
            // colorPids(average);
            /* let demoInput = document.getElementById('demoInput');
            demoInput.oninput = function(e){
            console.log(this.value);
        }; */
        
          };
        })
        .catch(function(err) {
          console.error(err);
        });
    },
    
    stopCaptureAudio() {
      if(this.audioContext != null) {
        this.recording = false
        this.audioContext.close()
        this.valorVumetro = 0
      }
    }
    
  }
})


