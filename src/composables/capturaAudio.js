// Captura audio

let frameRate = 0
let recording = false
let streaming = true
let audioContext
export let valorVumetro = 0

export const captureAudio = () => {

  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  })
    .then(function(stream) {
      audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      console.log(microphone)
      const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);
  
      let factorVolumen = 0.7;
      
      valorVumetro = 0;
      
      
  
      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;
  
      microphone.connect(analyser);
      analyser.connect(scriptProcessor);
      scriptProcessor.connect(audioContext.destination);
      scriptProcessor.onaudioprocess = function() {
        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        // analyser.getByteTimeDomainData(array);
        const arraySum = array.reduce((a, value) => a + value, 0);
        const average = arraySum / array.length;
        // console.log(Math.round(average));
        
       
        // demo.setAttribute('data-val', average*factorVolumen); // AÑADIR VALORES PARA PINTAR RECUADROS DEL VOLUMEN
  
        valorVumetro = average*factorVolumen;
        // dataValue = parseInt(Math.floor(valorVumetro * factorVolumen))
        // console.log(dataValue)
  
        if (streaming) {
  
          if (frameRate % 10 == 0) {
    
            // valorVumetroEl.innerHTML = Math.round(valorVumetro * 100) / 100 + 60;
            if (recording) {
              // newDataPoints.push({y: parseFloat((valorVumetro * factorVolumen).toFixed(2))})
              // newDataPoints.push({y: parseInt(Math.floor(valorVumetro * factorVolumen))})
              // newChart.updateData(parseInt(Math.floor(valorVumetro * factorVolumen)))
            }
            // console.log(newDataPoints)
            // valorVumetroEl.innerHTML =(valorVumetro * factorVolumen).toFixed(2)
            // mostrarValor(valorVumetro.toFixed(2))
          }
          // animarVumetro(valorVumetro)
          console.log(valorVumetro)
          frameRate ++
        }
  
        if (frameRate == 299) {
          frameRate = 0;
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
}

export const stopCaptureAudio = () => {
  audioContext.close()
}
