<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <header class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900">Real-Time Election Results</h1>
      <p class="text-gray-500 mt-2">Live tally of votes per candidate and position.</p>
    </header>

    <div class="flex justify-end mb-6 space-x-4">
      <button 
        @click="exportResults('pdf')"
        class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
      >
        Export PDF
      </button>
      <button 
        @click="exportResults('excel')"
        class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Export Excel
      </button>
    </div>

    <div v-for="position in results" :key="position.id" class="bg-white shadow-xl rounded-lg p-6 mb-8">
      <h2 class="text-3xl font-semibold text-blue-700 mb-6 border-b pb-2">{{ position.name }}</h2>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-1">
          <ul class="space-y-4">
            <li v-for="candidate in position.candidates" :key="candidate.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-md border-l-4 border-blue-500">
              <div>
                <p class="font-medium text-gray-900">{{ candidate.name }}</p>
                <p class="text-sm text-gray-500">{{ candidate.courseYear }}</p>
              </div>
              <span class="text-2xl font-bold text-blue-600">{{ candidate.votes.toLocaleString() }}</span>
            </li>
          </ul>
        </div>
        
        <div class="lg:col-span-2">
          <ResultChart :chartData="getChartData(position)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ResultChart from '../../components/ResultChart.vue';
// import axios from 'axios';

const results = ref([]);

// Function to fetch real-time results
const fetchResults = async () => {
  // In a real app, this would be an API call to load the results
  // const response = await axios.get('/api/admin/results');
  // results.value = response.data;
  
  // --- MOCK DATA ---
  results.value = [
    { id: 1, name: 'President', candidates: [
      { id: 101, name: 'Jeek Ian Niepes', courseYear: 'BSIS 3', votes: 650 },
      { id: 102, name: 'John Michael', courseYear: 'BSIS 3', votes: 420 },
      { id: 103, name: 'Abstain', courseYear: '', votes: 80 },
    ]},
    { id: 2, name: 'Vice President', candidates: [
      { id: 201, name: 'Jeann Lapore', courseYear: 'BSIS 2', votes: 580 },
      { id: 202, name: 'Angeline Magan', courseYear: 'BSIS 3', votes: 570 },
    ]},
  ];
  // --- END MOCK ---
};

// Computes the data structure needed by Chart.js
const getChartData = (position) => {
  return {
    labels: position.candidates.map(c => c.name),
    datasets: [
      {
        label: position.name + ' Votes',
        backgroundColor: ['#3b82f6', '#10b981', '#ef4444', '#f59e0b', '#6366f1'],
        data: position.candidates.map(c => c.votes)
      }
    ]
  };
};

const exportResults = (format) => {
  console.log(`Attempting to export results in ${format} format...`);
  alert(`The backend API endpoint for exporting ${format} needs to be implemented.`);
  // In a real app, you would make an API call:
  // window.open(`/api/admin/export?format=${format}`, '_blank');
};

onMounted(() => {
  fetchResults();
  // Optional: Set up an interval for real-time updates (e.g., every 5 seconds)
  // setInterval(fetchResults, 5000);
});
</script>