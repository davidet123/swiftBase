<template>
  <v-container>
    <canvas id="grafica"></canvas>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue'
import Chart from 'chart.js/auto';

import { useWebsocketStore } from "../../store/websocket"
import { watch } from 'vue';

const websocketStore = useWebsocketStore()

// Watch para los datos
watch(() =>websocketStore.arrayValues, val => {
  const valor = val.slice(-1)[0].y
  const label = val.slice(-1)[0].x
  addData(chart1, label, valor)

  console.log(val.slice(-1)[0])
},
{
  deep: true
})

// Hook para montar la grafica
onMounted(() => {
    crearGrafica()
  })

// Grafica
let chart1 = null

const crearGrafica = () => {
  const ctx = document.getElementById('grafica');
  chart1 = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: false,
        data: [],
        borderWidth: 2,
        /* fill: {
          target: 'origin',
          above: 'rgb(0, 192, 0)',
        }, */
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
  console.log(chart)
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}
</script>

<style>
  #grafica {
    background-color: white;
  }
</style>