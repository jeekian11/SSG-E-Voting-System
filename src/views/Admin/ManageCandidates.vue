  <template>
    <div class="min-h-screen bg-gray-100 p-6">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">Manage Candidates</h1>

      <div class="bg-white p-6 rounded-lg shadow-xl mb-10">
        <h2 class="text-2xl font-semibold text-blue-700 mb-4">{{ isEditing ? 'Edit Candidate' : 'Add New Candidate' }}</h2>
        
        <form @submit.prevent="saveCandidate" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">Position</label>
            <select v-model="form.position" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2">
              <option value="" disabled>Select Position</option>
              <option v-for="pos in positions" :key="pos" :value="pos">{{ pos }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" v-model="form.name" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Course/Year</label>
            <input type="text" v-model="form.courseYear" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2" placeholder="BSIS 3">
          </div>
          <div class="md:col-span-3">
            <label class="block text-sm font-medium text-gray-700">Platform (Optional)</label>
            <textarea v-model="form.platform" rows="2" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"></textarea>
          </div>
          <div class="md:col-span-3 flex justify-end space-x-3">
            <button v-if="isEditing" @click="cancelEdit" type="button" class="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">Cancel Edit</button>
            <button type="submit" class="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50">
              {{ isEditing ? 'Update Candidate' : 'Add Candidate' }}
            </button>
          </div>
        </form>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-xl overflow-x-auto">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Current Candidates ({{ candidates.length }})</h2>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="candidate in candidates" :key="candidate.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{{ candidate.position }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div class="flex items-center">
                  <img v-if="candidate.photo" :src="candidate.photo" class="h-8 w-8 rounded-full mr-3 object-cover" alt="Photo">
                  {{ candidate.name }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ candidate.courseYear }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button @click="editCandidate(candidate)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
                <button @click="deleteCandidate(candidate.id)" class="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="candidates.length === 0" class="text-center py-6 text-gray-500">No candidates registered yet.</p>
      </div>
    </div>
  </template>

  <script setup>
  import { ref, onMounted } from 'vue';
  // import axios from 'axios';

  const candidates = ref([]);
  const positions = ref(['President', 'Vice President', 'Secretary', 'Treasurer', 'Auditor', 'Senator']);
  const isEditing = ref(false);
  const form = ref(resetForm());

  function resetForm() {
    return { id: null, position: '', name: '', courseYear: '', platform: '', photo: null };
  }

  const fetchCandidates = async () => {
    // 1. API call to get all candidates
    // const response = await axios.get('/api/admin/candidates');
    
    // --- MOCK DATA ---
    candidates.value = [
      { id: 101, position: 'President', name: 'Jeek Ian Niepes', courseYear: 'BSIS 3', photo: null },
      { id: 102, position: 'Vice President', name: 'Jeann Lapore', courseYear: 'BSIS 2', photo: null },
    ];
    // --- END MOCK ---
  };

  const saveCandidate = async () => {
    if (isEditing.value) {
      // 2. API call to update candidate
      // await axios.put(`/api/admin/candidates/${form.value.id}`, form.value);
      console.log('Updating candidate:', form.value);
    } else {
      // 3. API call to create new candidate
      // await axios.post('/api/admin/candidates', form.value);
      console.log('Adding new candidate:', form.value);
    }
    
    await fetchCandidates();
    form.value = resetForm();
    isEditing.value = false;
  };

  const editCandidate = (candidate) => {
    form.value = { ...candidate };
    isEditing.value = true;
  };

  const cancelEdit = () => {
    form.value = resetForm();
    isEditing.value = false;
  };

  const deleteCandidate = async (id) => {
    if (confirm('Are you sure you want to delete this candidate?')) {
      // 4. API call to delete candidate
      // await axios.delete(`/api/admin/candidates/${id}`);
      console.log('Deleting candidate:', id);
      await fetchCandidates();
    }
  };

  onMounted(fetchCandidates);
  </script>