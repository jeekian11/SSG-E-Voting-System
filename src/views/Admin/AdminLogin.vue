<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 p-4">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
      <h1 class="text-3xl font-bold text-center text-red-700 mb-6">
        SSG Admin Panel Login
      </h1>
      <p class="text-center text-gray-500 mb-8">
        Enter your secure credentials to access the election management system.
      </p>

      <div v-if="loginError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        <span class="block sm:inline">{{ loginError }}</span>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="mb-5">
          <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
            Admin Username
          </label>
          <input
            v-model="username"
            id="username"
            type="text"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            placeholder="admin.user"
          />
        </div>

        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            v-model="password"
            id="password"
            type="password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
        >
          {{ isLoading ? 'Authenticating...' : 'Secure Log In' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// import axios from 'axios';

const router = useRouter();
const username = ref('');
const password = ref('');
const isLoading = ref(false);
const loginError = ref('');

const handleLogin = async () => {
  loginError.value = '';
  isLoading.value = true;

  try {
    // 1. API call to authenticate admin credentials
    // const response = await axios.post('/api/admin/login', { username: username.value, password: password.value });

    // --- MOCK LOGIC ---
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (username.value === 'admin' && password.value === 'dtc2025') {
      localStorage.setItem('isAdmin', 'true'); // Required by router guard
      router.push({ name: 'AdminDashboard' });
    } else {
      throw new Error('Invalid username or password.');
    }
    // --- END MOCK ---
    
  } catch (error) {
    loginError.value = error.message || 'Authentication failed.';
  } finally {
    isLoading.value = false;
  }
};
</script>