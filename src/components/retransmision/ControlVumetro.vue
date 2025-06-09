<template>
  <v-card class="pa-4">
    <v-card-title>Micrófono</v-card-title>
    <v-row>
      <v-col cols="6">
        <v-select
          v-model="vumetro.selectedDeviceId"
          :items="vumetro.audioDevices"
          item-title="label"
          item-value="deviceId"
          label="Dispositivo de entrada"
          />

      </v-col>
      <v-col cols="6">
        <v-text-field
          label="Valor maximo"
          v-model="valorMaximoVumetro"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-slider
            v-model="gain"
            min="0"
            max="2"
            step="0.01"
            label="Ganancia"
          ></v-slider>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-col cols="6" class="text-center">
              <v-btn color="primary" class="mr-2" @click="vumetro.startMic" :disabled="vumetro.isListening || isFilePlaying">
                MIC ON
              </v-btn>
            </v-col>
            <v-col cols="6" class="text-center">
              <v-btn color="error" @click="vumetro.stopMic" :disabled="!vumetro.isListening">
                MIC OFF
              </v-btn>
            </v-col>
          </v-row>

        </v-col>
      </v-row>


      <div class="mt-4">
        <p>Nivel dB: {{ vumetro.dbLevel }}</p>
        <p>Escala 0-130: {{ vumetro.scaled130 }}</p>
        <p>Escala 231-421: {{ vumetro.mappedLevel }}</p>
        <p>Valor pico retenido: {{ vumetro.peakLevel }}</p>
      </div>

      <!-- <v-file-input
        accept="audio/*"
        label="Cargar archivo de audio"
        @change="onFileSelected"
        :disabled="vumetro.isListening"
        clearable
      /> -->

      <!-- <div v-if="vumetro.isFileLoaded" class="mt-4">
        <v-btn icon @click="togglePlayback" class="mr-2">
          <v-icon>{{ isPlaying ? 'mdi-pause' : 'mdi-play' }}</v-icon>
        </v-btn>
        <v-slider
          v-model="currentTime"
          :max="duration"
          @input="seekAudio"
          class="audio-slider"
        ></v-slider>
        <span class="ml-2">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
      </div> -->
    </v-card-text>
  </v-card>
  <ActualizacionVumetro />
</template>

<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import { useVumetroStore } from '@/store/vumetro'
import { useSwiftConnectionStore } from '@/store/swiftConnection'
import { storeToRefs } from 'pinia'
import ActualizacionVumetro from './ActualizacionVumetro.vue'


const vumetro = useVumetroStore()
const swiftConnectionStore = useSwiftConnectionStore()

const graficoIn = grafico => {
  // Resetear vumetro
  swiftConnectionStore.rtRemote.updateFields('VUMETRO::VALOR_VUMETROTEXT','String',"0")
  swiftConnectionStore.rtRemote.updateFields("CLIP_VUMETRO","Translate","231, 560")
  swiftConnectionStore.playGraphic(grafico)
  swiftConnectionStore.bringOn(grafico)
}

const graficoOut = grafico => {
  swiftConnectionStore.takeOff(grafico)
}


const { valorMaximoVumetro } = storeToRefs(vumetro)
const isPlaying = ref(false)
const isFilePlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const timeUpdateInterval = ref(null)

const audioElement = computed(() => vumetro.audioElement);

const isSeeking = ref(false);

// const gain = computed({
//   get: () => vumetro.gainNode?.gain.value ?? 1,
//   set: (value) => vumetro.setGain(value)
// })
  const gain = computed({
    get: () => vumetro.currentGain,
    set: (value) => vumetro.setGain(value)
  })

  // Asegurarte de que el audioContext se inicialice si no existe
  watch(() => vumetro.isListening, (isListening) => {
    if (isListening && !vumetro.audioContext) {
      vumetro.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    }
})

function onFileSelected(event) {
  // Compatibilidad con input nativo y v-file-input
  const file = event?.target?.files?.[0] || event
  if (file) {
    vumetro.loadAudioFile(file).then(() => {
      setupAudioListeners()
      duration.value = vumetro.audioElement?.duration || 0
    })
  } else {
    vumetro.stopFileAudio()
    cleanupAudioListeners()
  }
}

function setupAudioListeners() {
  if (!vumetro.audioElement) return
  
  vumetro.audioElement.addEventListener('timeupdate', updateCurrentTime)
  vumetro.audioElement.addEventListener('play', () => {
    isPlaying.value = true
    isFilePlaying.value = true
    startTimeUpdate()
  })
  vumetro.audioElement.addEventListener('pause', () => {
    isPlaying.value = false
    isFilePlaying.value = false
    stopTimeUpdate()
  })
  vumetro.audioElement.addEventListener('ended', () => {
    isPlaying.value = false
    isFilePlaying.value = false
    stopTimeUpdate()
    currentTime.value = 0
  })
}

function cleanupAudioListeners() {
  if (vumetro.audioElement) {
    vumetro.audioElement.removeEventListener('timeupdate', updateCurrentTime)
    vumetro.audioElement.removeEventListener('play', () => {})
    vumetro.audioElement.removeEventListener('pause', () => {})
    vumetro.audioElement.removeEventListener('ended', () => {})
  }
  stopTimeUpdate()
}

function updateTime() {
  if (!isSeeking.value && audioElement.value) {
    currentTime.value = audioElement.value.currentTime;
  }
}

function updateCurrentTime() {
  if (vumetro.audioElement) {
    currentTime.value = vumetro.audioElement.currentTime
  }
}

function startTimeUpdate() {
  stopTimeUpdate()
  timeUpdateInterval.value = setInterval(updateCurrentTime, 100)
}

function stopTimeUpdate() {
  if (timeUpdateInterval.value) {
    clearInterval(timeUpdateInterval.value)
    timeUpdateInterval.value = null
  }
}

function togglePlayback() {
  if (!audioElement.value) return;
  
  if (audioElement.value.paused) {
    audioElement.value.play().catch(e => console.error("Error al reproducir:", e));
    isPlaying.value = true;
  } else {
    audioElement.value.pause();
    isPlaying.value = false;
  }
}

function seekAudio(time) {
  if (audioElement.value) {
    isSeeking.value = true;
    audioElement.value.currentTime = time;
    // Pequeño timeout para evitar flickering
    setTimeout(() => {
      isSeeking.value = false;
    }, 100);
  }
}

function formatTime(seconds) {
  if (isNaN(seconds)) return '00:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

onUnmounted(() => {
  cleanupAudioListeners()
  vumetro.stopMic()
  vumetro.stopFileAudio()
  if (audioElement.value) {
    audioElement.value.removeEventListener('timeupdate', updateTime);
  }
})

watch(audioElement, (newElement) => {
  if (newElement) {
    newElement.addEventListener('timeupdate', updateTime);
    newElement.addEventListener('loadedmetadata', () => {
      duration.value = newElement.duration;
    });
  }
});
</script>

<style scoped>
.audio-slider {
  flex-grow: 1;
  display: inline-block;
  width: 200px;
}
</style>



<!-- <template>
  <v-card class="pa-4" max-width="400">
    <v-card-title>Micrófono</v-card-title>
    <v-select
      v-model="vumetro.selectedDeviceId"
      :items="vumetro.audioDevices"
      item-title="label"
      item-value="deviceId"
      label="Dispositivo de entrada"
      @update:modelValue="vumetro.fetchAudioDevices"
    />
    <v-card-text>
      <v-slider
        v-model="gain"
        min="0"
        max="2"
        step="0.01"
        label="Ganancia"
      ></v-slider>

      <v-btn 
        color="primary" 
        class="mr-2" 
        @click="vumetro.startMic" 
        :disabled="vumetro.isListening || vumetro.isFileLoaded"
      >
        Iniciar Micrófono
      </v-btn>
      <v-btn 
        color="error" 
        @click="vumetro.stopMic" 
        :disabled="!vumetro.isListening"
      >
        Detener Micrófono
      </v-btn>

      <div class="mt-4">
        <p>Nivel dB: {{ vumetro.dbLevel }}</p>
        <p>Escala 0-130: {{ vumetro.scaled130 }}</p>
        <p>Escala 196-376: {{ vumetro.mappedLevel }}</p>
      </div>

      <v-file-input
        accept="audio/*"
        label="Cargar archivo de audio"
        prepend-icon="mdi-music"
        @change="onFileSelected"
        :disabled="vumetro.isListening"
        clearable
        @click:clear="vumetro.stopFileAudio"
      />
      <v-btn 
      color="primary" 
      class="mt-2"
      @click="togglePlayback"
      :disabled="!vumetro.isFileLoaded"
    ></v-btn>

      <div v-if="vumetro.isFileLoaded" class="mt-4">
        <p>Reproduciendo archivo de audio</p>
        <audio :src="vumetro.audioElement?.src" controls />
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useVumetroStore } from '@/stores/vumetro'

const vumetro = useVumetroStore()
const isPlaying = ref(false);

// Ganancia con getter y setter para sincronizar con el store
const gain = computed({
  get: () => vumetro.gainNode?.gain.value ?? 1,
  set: (value) => vumetro.setGain(value)
})

// function handleFileInput(file) {
//   if (file) {
//     vumetro.loadAudioFile(file)
//   }
// }
function onFileSelected(event) {
  // Compatibilidad con input nativo y v-file-input
  const file = event?.target?.files?.[0] || event
  if (file) {
    vumetro.loadAudioFile(file)
  } else {
    vumetro.stopFileAudio()
  }
}
const togglePlayback = () => {
  if (vumetro.audioContext) {
    if (isPlaying.value) {
      vumetro.audioContext.suspend();
    } else {
      vumetro.audioContext.resume();
    }
    isPlaying.value = !isPlaying.value;
  }
};
// Cargar dispositivos al montar el componente
onMounted(() => {
  vumetro.fetchAudioDevices()
})

// Limpiar al desmontar
onUnmounted(() => {
  vumetro.stopMic()
  vumetro.stopFileAudio()
})
</script> -->