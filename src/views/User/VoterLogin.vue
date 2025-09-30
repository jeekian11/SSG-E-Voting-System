<template>
  <div 
    class="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
    style="background-image: url('/dtc-logo.jpg')"
  >
    <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl bg-opacity-90">
      <h1 class="text-3xl font-bold text-center text-blue-800 mb-6">
        DTC E-Voting Login
      </h1>
      <p class="text-center text-gray-500 mb-6">
        Please use your official Student ID and Password.
      </p>

      <div 
        v-if="loginError" 
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" 
        role="alert"
      >
        <span class="block sm:inline">{{ loginError }}</span>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label for="voterId" class="block text-sm font-medium text-gray-700">Student ID</label>
          <input 
            v-model="voterId"
            id="voterId"
            type="text" 
            :disabled="isLoading"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 disabled:bg-gray-50 disabled:opacity-75 transition"
            placeholder="e.g., 2023-00123 or admin"
            required
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input 
            v-model="password"
            id="password"
            type="password" 
            :disabled="isLoading"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 disabled:bg-gray-50 disabled:opacity-75 transition"
            required
          />
        </div>

        <button 
          type="submit"
          :disabled="isLoading"
          class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60 flex items-center justify-center"
        >
          <svg 
            v-if="isLoading" 
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          {{ isLoading ? 'Authenticating...' : 'Log In' }}
        </button>
      </form>
      
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          Don't have an account? 
          <router-link :to="{ name: 'VoterRegister' }" class="text-blue-600 hover:text-blue-800 font-medium underline">
            Sign up
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// --- Reactive State ---
const voterId = ref<string>('');
const password = ref<string>('');
const isLoading = ref<boolean>(false);
const loginError = ref<string>('');
const router = useRouter();

// --- Authentication Logic ---

const handleLogin = async (): Promise<void> => {
  loginError.value = '';
  isLoading.value = true;

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    let role: 'user' | 'admin' | null = null;
    
    // Mock Users for Testing
    if (voterId.value === '10112001' && password.value === 'ssgvote') {
      role = 'user';
    } else if (voterId.value === 'admin' && password.value === 'admin123') {
      role = 'admin';
    } else {
      throw new Error("Invalid ID or password. Please check your credentials.");
    }

    // 1. Store session data in localStorage
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: voterId.value,
        role: role,
        isAuthenticated: true
      })
    );

    // 2. Redirect based on role
    const routeName = role === 'admin' ? 'AdminDashboard' : 'AdminDashboard';
    router.push({ name: routeName });

  } catch (error: any) {
    loginError.value = error.message || 'Authentication failed.';
  } finally {
    isLoading.value = false;
  }
};
</script>