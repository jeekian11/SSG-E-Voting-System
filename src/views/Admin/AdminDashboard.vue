<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <header class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
        <p class="text-gray-500 mt-1">SSG Election Management Overview</p>
      </div>
      <button 
        @click="handleLogout"
        class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div v-for="stat in stats" :key="stat.title" class="bg-white p-6 rounded-lg shadow-md border-l-4" :class="stat.border">
        <p class="text-sm font-medium text-gray-500">{{ stat.title }}</p>
        <p class="text-3xl font-extrabold text-gray-900 mt-1">{{ stat.value }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <router-link
        v-for="link in managementLinks"
        :key="link.name"
        :to="{ name: link.route }"
        class="block p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-150 transform hover:scale-[1.02] border-t-4 border-blue-500"
      >
        <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ link.title }}</h2>
        <p class="text-gray-500">{{ link.description }}</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// import axios from 'axios';

const router = useRouter();
const stats = ref([]);

const managementLinks = [
  { title: 'Manage Candidates', description: 'Add, edit, or delete candidates and their details.', route: 'ManageCandidates' },
  { title: 'Manage Voters', description: 'Upload student lists, reset passwords, or manage eligibility.', route: 'ManageVoters' },
  { title: 'View Results', description: 'See real-time vote tally and final election outcomes.', route: 'ViewResults' },
];

const fetchStats = async () => {
  // 1. API call to get dashboard statistics
  // const response = await axios.get('/api/admin/stats');
  
  // --- MOCK DATA ---
  stats.value = [
    { title: 'Total Registered Voters', value: '5,120', border: 'border-blue-500' },
    { title: 'Votes Cast Today', value: '3,890', border: 'border-green-500' },
    { title: 'Voter Turnout', value: '76%', border: 'border-yellow-500' },
    { title: 'Active Positions', value: '7', border: 'border-red-500' },
  ];
  // --- END MOCK ---
};

const handleLogout = () => {
  localStorage.removeItem('isAdmin'); 
  router.push({ name: 'AdminLogin' });
};

onMounted(fetchStats);
</script>