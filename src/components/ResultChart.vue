<script>
// Install: npm install chart.js vue-chartjs
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'ResultChart',
  components: { Bar },
  props: {
    chartData: {
      type: Object,
      required: true
    },
    chartOptions: {
      type: Object,
      default: () => ({ 
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false } 
        }
      })
    }
  }
}
</script>

<template>
  <Bar
    :data="chartData"
    :options="chartOptions"
    class="h-96 w-full"
  />
</template>