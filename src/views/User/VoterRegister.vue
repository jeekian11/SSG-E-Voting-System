<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div class="w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl">
      <h1 class="text-3xl font-bold text-center text-blue-800 mb-4">
        Voter Registration
      </h1>
      <p class="text-center text-gray-600 mb-8">
        Complete the form to register for the SSG E-Voting System.
      </p>

      <div v-if="message" :class="message.type === 'error' ? 'bg-red-100 border-red-400 text-red-700' : 'bg-green-100 border-green-400 text-green-700'" class="border px-4 py-3 rounded relative mb-4" role="alert">
        <span class="block sm:inline">{{ message.text }}</span>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label for="studentId" class="block text-sm font-medium text-gray-700">Student ID</label>
          <input
            v-model="formData.studentId"
            id="studentId"
            type="text"
            required
            :disabled="isLoading"
            placeholder="e.g., 2024-00123"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 disabled:bg-gray-50 disabled:opacity-75"
          />
        </div>

        <div>
          <label for="fullName" class="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            v-model="formData.fullName"
            id="fullName"
            type="text"
            required
            :disabled="isLoading"
            placeholder="Juan Dela Cruz"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 disabled:bg-gray-50 disabled:opacity-75"
          />
        </div>

        <div>
          <label for="course" class="block text-sm font-medium text-gray-700">Course & Year</label>
          <input
            v-model="formData.course"
            id="course"
            type="text"
            required
            :disabled="isLoading"
            placeholder="BSIT 3"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 disabled:bg-gray-50 disabled:opacity-75"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="formData.password"
            id="password"
            type="password"
            required
            :disabled="isLoading"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 disabled:bg-gray-50 disabled:opacity-75"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-60 flex items-center justify-center"
        >
          <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isLoading ? 'Registering...' : 'Create Account' }}
        </button>
      </form>

      <router-link :to="{ name: 'VoterLogin' }" class="text-blue-600 hover:text-blue-800 underline mt-6 block text-sm">
        Already registered? Log in
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// import axios from 'axios'; // You'll need this for actual backend communication

const router = useRouter();

// Reactive State
const formData = ref({
  studentId: '',
  fullName: '',
  course: '',
  password: '',
});
const isLoading = ref(false);
const message = ref(null); // { text: '...', type: 'success' | 'error' }

const handleRegister = async () => {
  message.value = null;
  isLoading.value = true;

  try {
    // --- MOCK REGISTRATION LOGIC (Replace with actual API call) ---
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

    // 1. **Password Check:** (Optional but recommended)
    if (formData.value.password.length < 6) {
        throw new Error("Password must be at least 6 characters long.");
    }
    
    // 2. **API Call to Backend:**
    // const response = await axios.post('/api/voter/register', formData.value);

    // Assuming a successful registration response:
    message.value = { 
        text: 'Registration successful! Redirecting to login...', 
        type: 'success' 
    };

    // 3. **Redirect:** Redirect to the login page after a short delay
    setTimeout(() => {
      router.push({ name: 'VoterLogin' });
    }, 2500);

    // --- END MOCK ---

  } catch (error) {
    // Handle API/Validation error
    message.value = { 
        text: error.message || 'Registration failed. The Student ID might already be in use.', 
        type: 'error' 
    };
    console.error("Registration failed:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>