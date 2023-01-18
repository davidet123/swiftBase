<template>
  <v-container>
    <h1>grafica 123</h1>
    <canvas id="grafica"></canvas>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue'


import Chart from 'chart.js/auto';

onMounted(() => {
    const ctx = document.getElementById('grafica');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
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

  })

  
  
  
  
  
</script>