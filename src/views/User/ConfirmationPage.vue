<template>
  <div class="min-h-screen flex items-center justify-center bg-green-50 p-4">
    <div class="w-full max-w-lg bg-white p-10 rounded-xl shadow-2xl text-center">
      <svg class="w-20 h-20 text-green-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      
      <h1 class="text-4xl font-extrabold text-green-700 mb-4">
        Vote Recorded!
      </h1>
      
      <p class="text-xl text-gray-700 mb-6">
        ✅ Your vote has been recorded successfully.
      </p>
      
      <p class="text-gray-500 mb-8">
        Thank you for exercising your right to vote in the SSG Elections 2025.
      </p>

      <button
        @click="handleLogout"
        class="w-full sm:w-auto py-3 px-8 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogout = () => {
  // Clear user session/token
  localStorage.removeItem('isUser'); 
  // Redirect to login page
  router.push({ name: 'VoterLogin' });
};
</script>