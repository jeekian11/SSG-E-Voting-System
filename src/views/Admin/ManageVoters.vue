<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">Manage Voters</h1>

    <div class="bg-white p-6 rounded-lg shadow-xl mb-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      <div>
        <h2 class="text-2xl font-semibold text-blue-700 mb-4">Bulk Voter Upload (CSV)</h2>
        <label class="block text-sm font-medium text-gray-700 mb-2">Upload File (.csv)</label>
        <div class="flex items-center space-x-3">
          <input 
            type="file" 
            @change="handleFileUpload" 
            accept=".csv"
            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          >
          <button 
            @click="uploadVoters" 
            :disabled="!selectedFile"
            class="px-6 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 transition disabled:opacity-50"
          >
            Upload List
          </button>
        </div>
        <p v-if="selectedFile" class="mt-2 text-sm text-gray-500">File selected: {{ selectedFile.name }}</p>
      </div>

      <div>
        <h2 class="text-2xl font-semibold text-red-700 mb-4">Manual Voter Actions</h2>
        <form @submit.prevent="resetVoter" class="space-y-4">
          <div>
            <label for="voterId" class="block text-sm font-medium text-gray-700">Student ID</label>
            <input type="text" id="voterId" v-model="resetForm.studentId" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2" placeholder="e.g., 2024-54321">
          </div>
          <button type="submit" class="px-6 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 transition">
            Reset Voter Eligibility / Password
          </button>
        </form>
      </div>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-xl overflow-x-auto">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold text-gray-700">Registered Voters ({{ voters.length.toLocaleString() }})</h2>
        <input type="text" v-model="searchQuery" placeholder="Search by ID or Name..." class="border-gray-300 rounded-lg p-2 w-1/3">
      </div>
      
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="voter in filteredVoters" :key="voter.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ voter.studentId }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ voter.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <span :class="{'bg-green-100 text-green-800': voter.hasVoted, 'bg-yellow-100 text-yellow-800': !voter.hasVoted}" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                {{ voter.hasVoted ? 'VOTED' : 'PENDING' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="deleteVoter(voter.id)" class="text-red-600 hover:text-red-900">Remove</button>
            </td>
          </tr>
          <tr v-if="filteredVoters.length === 0">
              <td colspan="4" class="text-center py-6 text-gray-500">No voters found matching your criteria.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
// import axios from 'axios';

const voters = ref([]);
const selectedFile = ref(null);
const searchQuery = ref('');
const resetForm = ref({ studentId: '' });

const mockVoters = [
    { id: 1, studentId: '2023-00123', name: 'Alvin A. Almazan', hasVoted: true },
    { id: 2, studentId: '2023-00456', name: 'Bianca B. Buenavista', hasVoted: false },
    { id: 3, studentId: '2022-00789', name: 'Carlos C. Cruz', hasVoted: false },
    { id: 4, studentId: '2024-00111', name: 'Diane D. Diaz', hasVoted: true },
];

const fetchVoters = async () => {
  // 1. API call to get all registered voters
  // const response = await axios.get('/api/admin/voters');
  voters.value = mockVoters; 
};

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0];
};

const uploadVoters = async () => {
  if (!selectedFile.value) return alert('Please select a CSV file.');

  const formData = new FormData();
  formData.append('voters_file', selectedFile.value);
  
  // 2. API call to upload CSV file
  // await axios.post('/api/admin/voters/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  
  alert(`Successfully uploaded ${selectedFile.value.name}. Processing...`);
  selectedFile.value = null;
  // A real application would refresh the list after a successful upload/processing
  await fetchVoters();
};

const resetVoter = async () => {
  if (confirm(`Are you sure you want to reset the voting eligibility for ID: ${resetForm.value.studentId}?`)) {
    // 3. API call to reset voter's status and potentially password
    // await axios.post(`/api/admin/voters/${resetForm.value.studentId}/reset`);
    alert(`Voter ${resetForm.value.studentId} eligibility has been reset.`);
    resetForm.value.studentId = '';
    await fetchVoters();
  }
};

const deleteVoter = async (id) => {
  if (confirm('Permanently remove this voter from the system?')) {
    // 4. API call to delete voter
    // await axios.delete(`/api/admin/voters/${id}`);
    alert(`Voter ID ${id} deleted.`);
    await fetchVoters();
  }
};

const filteredVoters = computed(() => {
  if (!searchQuery.value) {
    return voters.value;
  }
  const query = searchQuery.value.toLowerCase();
  return voters.value.filter(voter => 
    voter.studentId.toLowerCase().includes(query) ||
    voter.name.toLowerCase().includes(query)
  );
});

onMounted(fetchVoters);
</script>