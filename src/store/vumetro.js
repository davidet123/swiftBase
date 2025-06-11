import { defineStore } from 'pinia'

export const useVumetroStore = defineStore('vumetro', {
  state: () => ({
    audioContext: null,
    analyser: null,
    gainNode: null,
    sourceNode: null,
    micStream: null,
    dataArray: null,
    isListening: false,
    levelDb: 0,
    level130: 0,   // de 0 a 130
    levelMapped: 231,
    animationFrame: null,
    audioDevices: [],
    selectedDeviceId: null,
    audioFile: null,
    audioBufferSource: null,
    audioElement: null,
    isFileLoaded: false,
    currentGain: 1,
    audioFileSource: null,
    dbUpdateInterval: 50, // ms entre actualizaciones de dB
    lastDbUpdate: 0,
    peakLevel: 231,         // valor máximo retenido
    peakLastUpdated: Date.now(), // para controlar el tiempo de inactividad
    peakSpeed: 6,
    peakHold: 400,
    valorMaximoVumetro: 130,
    curveExponent: 1.8, // Valor entre 1.5-3 (1.8 es buen balance)
    maxDbValue: 130,    // Valor máximo para dB (level130)
    minMapped: 231,     // Valor mínimo para levelMapped
    maxMapped: 421      // Valor máximo para levelMapped
  }),

  getters: {
    dbLevel(state) {
      return isFinite(state.levelDb) ? state.levelDb.toFixed(1) : '-∞'
    },
    mappedLevel(state) {
      return state.levelMapped
    },
    scaled130(state) {
      return Math.round(state.level130)
    },
    roundedPeakLevel: state => Math.round(state.peakLevel),
  },

  actions: {
    async fetchAudioDevices() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        this.audioDevices = devices.filter(device => device.kind === 'audioinput')

        // Opcional: selecciona automáticamente el primero si no hay uno ya
        if (!this.selectedDeviceId && this.audioDevices.length > 0) {
          this.selectedDeviceId = this.audioDevices[0].deviceId
        }
      } catch (error) {
        console.error('Error al obtener dispositivos de audio:', error)
      }
    },
    async startMic() {
      try {
      //   this.audioContext = new (window.AudioContext || window.webkitAudioContext)()

      //   if (this.audioContext.state === 'suspended') {
      //     await this.audioContext.resume()
      //   }

      //   this.analyser = this.audioContext.createAnalyser()
      //   this.analyser.fftSize = 2048 // Más precisión en el dominio temporal
      //   const bufferLength = this.analyser.fftSize
      //   this.dataArray = new Uint8Array(bufferLength)

      //   this.gainNode = this.audioContext.createGain()
      //   this.gainNode.gain.value = 1
      if (!this.audioContext) {
          this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
        }
        
        if (this.audioContext.state === 'suspended') {
          await this.audioContext.resume()
        }

        this.analyser = this.audioContext.createAnalyser()
        this.analyser.fftSize = 2048
        this.dataArray = new Uint8Array(this.analyser.fftSize)

        // Siempre crea el gainNode si no existe
        if (!this.gainNode) {
          this.gainNode = this.audioContext.createGain()
          this.gainNode.gain.value = this.currentGain
        }

        const constraints = {
          audio: {
            deviceId: this.selectedDeviceId ? { exact: this.selectedDeviceId } : undefined,
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false
          }
        }
        const stream = await navigator.mediaDevices.getUserMedia(constraints)

        // const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        this.micStream = stream

        this.sourceNode = this.audioContext.createMediaStreamSource(stream)
        this.sourceNode.connect(this.gainNode)
        this.gainNode.connect(this.analyser)
        // this.gainNode.connect(this.audioContext.destination) // Si quieres escucharte

        this.isListening = true
        this.updateLevel()
      } catch (error) {
        console.error('Error al iniciar micrófono:', error)
      }
    },

    stopMic() {
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame)
        this.animationFrame = null
      }
      
      if (this.micStream) {
        this.micStream.getTracks().forEach(track => track.stop())
        this.micStream = null
      }

      if (this.sourceNode) {
        try {
          this.sourceNode.disconnect()
        } catch (_) {}
        this.sourceNode = null
      }

      this.isListening = false
    },

    setGain(value) {
      // this.currentGain = parseFloat(value)
      // if (this.gainNode) {
      //   this.gainNode.gain.value = this.currentGain
      // }
      // Actualiza siempre el estado
      this.currentGain = parseFloat(value);
      
      // Si hay un gainNode activo, actualiza su valor
      if (this.gainNode) {
        this.gainNode.gain.value = this.currentGain;
      }
      
      // Si hay un audioElement (para archivos), actualiza su volumen
      if (this.audioElement) {
        this.audioElement.volume = this.currentGain;
      }
    },

    updateLevel() {
       if (!this.analyser || !this.dataArray) return;

      // this.analyser.getByteFrequencyData(this.dataArray);

      // // Calcular RMS (Root Mean Square) para obtener el nivel
      // let sum = 0;
      // for (let i = 0; i < this.dataArray.length; i++) {
      //   sum += Math.pow(this.dataArray[i] / 255, 2);
      // }
      // const rms = Math.sqrt(sum / this.dataArray.length);

      // // Convertir a dB
      // const db = 20 * Math.log10(rms);
      // this.levelDb = isFinite(db) ? db : -Infinity;

      // // Mapear para tus escalas
      // this.level130 = Math.max(0, Math.min(130, (rms * 130)));
      // this.levelMapped = Math.round(this.mapRange(this.level130, 0, 130, 231, 421));


      this.analyser.getByteFrequencyData(this.dataArray);
      let now = performance.now();
      if (now - this.lastDbUpdate > this.dbUpdateInterval) {
        
        
        const maxLevel = Math.max(...this.dataArray);
        const normalizedLevel = maxLevel / 255; // Normalizar a 0-1

        // Obtener el valor crudo en dB (0-130)
        const rawDb = normalizedLevel * this.valorMaximoVumetro;
        
        // Aplicar la curva a ambos valores
        const curvedValues = this.applyCurve(rawDb);
        
        // Asignar los valores curveados
        this.levelDb = rawDb; // Mantenemos el dB original para referencia
        this.level130 = Math.round(curvedValues.db) // dB con curva aplicada (0-130)
        this.levelMapped = curvedValues.mapped; // Valor mapeado con misma curva (231-421)
        
        this.lastDbUpdate = now;

        
        
        // // Calcular dB en escala 0-130 (como en tu versión)
        // this.levelDb = normalizedLevel * this.valorMaximoVumetro;
        
        // // Mapear a tu rango 231-421
        // // this.levelMapped = Math.round(this.mapRange(normalizedLevel, 0, 1, 231, 421));
        // const rawMapped = this.mapRange(this.level130, 0, this.valorMaximoVumetro, 231, 421)
        // const step = 6.3
        // const steppedMapped = ((rawMapped - 231) / step) * step + 231

        // // Asegúrate de no pasarte del rango permitido
        // this.levelMapped = Math.max(231, Math.min(421, steppedMapped))
        
        // // Escala 0-130
        // this.level130 = Math.round(this.levelDb);

        // // Mapeo con curva exponencial ajustable
        // const exponent = 2.2; // Más alto = más sensible en altos niveles
        // const normalized = this.level130 / this.valorMaximoVumetro;
        // const curved = Math.pow(normalized, exponent);
        // this.levelMapped = Math.round(231 + curved * (421 - 231));


        // this.lastDbUpdate = now
        // PEAKING
        const nowPeaking = Date.now()

        if (this.levelMapped > this.peakLevel) {
          this.peakLevel = this.levelMapped
          this.peakLastUpdated = nowPeaking
        }
        const timeSincePeak = nowPeaking - this.peakLastUpdated

        if (timeSincePeak > this.peakHold && this.peakLevel > 231) {
          // Disminuir suavemente el pico (por ejemplo, 2 unidades por frame)
          this.peakLevel = Math.max(231, this.peakLevel - this.peakSpeed)
        }
      }
      this.animationFrame = requestAnimationFrame(() => this.updateLevel());
    },
    // mapRange(value, inMin, inMax, outMin, outMax) {
    //   return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
    // },
    mapRange(value, inMin, inMax, outMin, outMax) {
        // Normalizar el valor entre 0 y 1
        const normalized = (value - inMin) / (inMax - inMin);
        // Aplicar curva exponencial (puedes ajustar el 2.5 para más/menos curvatura)
        const curved = Math.pow(normalized, 2.5); 
        // Mapear al rango de salida
        return curved * (outMax - outMin) + outMin;
    },
    applyCurve(value) {
    // Normaliza el valor (0-1) dentro del rango dB
    const normalized = Math.min(1, Math.max(0, value / this.maxDbValue));
    
    // Aplica curva exponencial
    const curved = Math.pow(normalized, this.curveExponent);
    
    // Calcula ambos valores de forma consistente
      return {
        db: curved * this.maxDbValue,          // level130 (0-130)
        mapped: this.minMapped + curved * (this.maxMapped - this.minMapped) // levelMapped (231-421)
      };
    },
    async loadAudioFile(file) {
  try {
    this.stopMic();
    this.stopFileAudio();

    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    await this.audioContext.resume();

    // Crear elemento audio
    const audioURL = URL.createObjectURL(file);
    const audio = new Audio(audioURL);
    audio.crossOrigin = 'anonymous';
    audio.preload = 'metadata'; // Mejor manejo de duración
    
    // Esperar a que cargue la metadata
    await new Promise((resolve) => {
      audio.onloadedmetadata = resolve;
    });

    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    this.dataArray = new Uint8Array(this.analyser.fftSize);

    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = this.currentGain;

    const source = this.audioContext.createMediaElementSource(audio);
    source.connect(this.gainNode);
    this.gainNode.connect(this.analyser);
    this.gainNode.connect(this.audioContext.destination);

    this.audioElement = audio;
    this.isFileLoaded = true;

    this.updateLevel();
    
    return audio;
  } catch (error) {
    console.error('Error al cargar archivo:', error);
    this.stopFileAudio();
    throw error;
  }
},
    stopFileAudio() {
      if (this.audioFileSource) {
        this.audioFileSource.stop();
        this.audioFileSource.disconnect();
        this.audioFileSource = null;
      }
      this.isFileLoaded = false;
      cancelAnimationFrame(this.animationFrame);
    },

  }
})
