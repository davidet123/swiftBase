<template>
  <v-container>
    <v-btn color="success" @click="downloadImage()">Download img</v-btn>
    <canvas id="grafica"></canvas>
  </v-container>
</template>

<script setup>
  import { onMounted } from 'vue'
  import Chart from 'chart.js/auto';

  import { useWebsocketStore } from "../../store/websocket"
  import { useSwiftConnectionStore } from "../../store/swiftConnection"
  import { watch } from 'vue';

  const websocketStore = useWebsocketStore()
  const swiftConnectionStore = useSwiftConnectionStore()

  // Watch para los datos
  watch(() =>websocketStore.arrayValues, val => {
    if(val.length != 0) {
      const valor = val.slice(-1)[0].y
      const label = val.slice(-1)[0].x
      addData(chart1, label, valor)
    
      // console.log(val.slice(-1)[0])

    } else {
      chart1.data.datasets[0].data = []
      chart1.update()
    }
  },
  {
    deep: true
  })

  // Hook para montar la grafica
  onMounted(() => {
      crearGrafica()
    })

  // Grafica
  let ctx = null
  let chart1 = null

  const crearGrafica = () => {
    ctx = document.getElementById('grafica');
    chart1 = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: false,
          data: [],
          borderWidth: 2,
          fill: {
            target: 'origin',
            above: 'rgb(0, 192, 0)',
          },
          pointRadius: 0,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          showLine: 1,
          cubicInterpolationMode: 'monotone',
        }]
      },
      options: {
        scales: {
          y: {
              beginAtZero: true,
              grid: {
                display: true,
                lineWidth: 2
              }
            },
          x: {
            grid: {
              display: false
            },
              ticks: {
                display: false
              }
            }        
          },
          aspectRatio: 5,
          plugins: {
            legend: {
                display: false,
            }
          },
          animation: {
            duration: 0
          }
        }
      })
  }

  // Añadir datos a la gráfica
  function addData(chart, label, data) {
    // console.log(chart)
      chart.data.labels.push(label);
      chart.data.datasets.forEach((dataset) => {
          dataset.data.push(data);
      });
      chart.update();
  }
  const downloadImage = () => {
    let canvasUrl = ctx.toDataURL();
    const createEl = document.createElement('a')
    createEl.href = canvasUrl
    const fileName = Date.now()
    swiftConnectionStore.fileName = fileName + '.png'
    createEl.download = fileName
    createEl.click()
    createEl.remove()
  }
</script>

<style>
  #grafica {
    background-color: white;
  }
</style>