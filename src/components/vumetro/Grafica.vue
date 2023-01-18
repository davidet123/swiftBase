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

/* let labels = []
let data = [] */

/* websocketStore.arrayValues.forEach(el => {
  if (el.y >= maxValue.y) {
    maxValue2.x = el.x
    maxValue2.y = el.y
  }
  if(el.x % 1 == 0) {
    data.push(el.y)
    labels.push(el.x)
    if (el.y >= maxValue.y) {
      maxValue.x = el.x
      maxValue.y = el.y
    }
  }
}) */


watch(() =>websocketStore.arrayValues, val => {
  /* while (val) {
    console.log("DATA")
  } */
  const valor = val.slice(-1)[0].y
  const label = val.slice(-1)[0].x
  addData(chart1, label, valor)

  console.log(val.slice(-1)[0])
},
{
  deep: true
})





onMounted(() => {
    crearGrafica()
  })

let chart1 = null

const crearGrafica = () => {
  const ctx = document.getElementById('grafica');
  chart1 = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: "TEST",
        data: [],
        borderWidth: 1,
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
            beginAtZero: true
          }
        }
      }
    })
}

function addData(chart, label, data) {
  console.log(chart)
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}


  
  
  
  
  
</script>