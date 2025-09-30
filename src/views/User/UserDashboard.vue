<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-extrabold text-blue-800">DTC E-VOTING PORTAL</h1>
          <p class="mt-1 text-sm text-gray-500">
            Welcome, <strong>{{ voterInfo.name }}</strong> ( {{ voterInfo.gradeSection }} )
          </p>
        </div>
        
        <button 
          @click="handleLogout"
          class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-medium shadow-md"
        >
          Log Out
        </button>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      
      <div class="mb-8 p-6 rounded-lg shadow-xl" 
           :class="isVoted ? 'bg-green-100 border-l-4 border-green-600' : 'bg-yellow-100 border-l-4 border-yellow-600'">
        <h2 class="text-2xl font-bold" :class="isVoted ? 'text-green-800' : 'text-yellow-800'">
          🗳️ Voting Status: {{ isVoted ? 'Voted' : 'Not Voted Yet' }}
        </h2>
        
        <p class="mt-2 text-lg text-gray-700">
          {{ isVoted ? 'Thank you for casting your vote. Results will be posted when available.' : 'The election is open. Your vote is important!' }}
        </p>

        <div v-if="!isVoted" class="mt-4">
          <button
            @click="goToBallot"
            class="px-6 py-3 bg-blue-600 text-white text-lg font-bold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Vote Now!
          </button>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div class="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold text-gray-800 mb-3">Election Rules & Reminders</h3>
          <ul class="list-disc list-inside text-gray-700 space-y-2">
            <li>You must select **one candidate** for every position listed on the ballot.</li>
            <li>Your vote is **final** upon submission and cannot be changed.</li>
            <li>Ensure your identity remains **secure** throughout the voting process.</li>
            <li>**REMINDER:** Voting will close promptly at 5:00 PM today.</li>
          </ul>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold text-gray-800 mb-3">📢 Announcements</h3>
          <div class="space-y-3">
            <p v-for="(announcement, index) in announcements" :key="index"
               class="text-sm p-2 rounded-md border-l-2"
               :class="announcement.urgent ? 'bg-red-50 border-red-400 text-red-700' : 'bg-gray-50 border-blue-400 text-gray-700'">
              {{ announcement.text }}
            </p>
            <p v-if="announcements.length === 0" class="text-sm text-gray-500 italic">No new announcements at this time.</p>
          </div>
        </div>

        <div v-if="isVoted" class="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold text-gray-800 mb-3">📊 Election Results</h3>
          <p v-if="resultsAvailable" class="text-green-600 font-medium">
            The **Official Winners** have been announced! <a href="#" class="underline font-bold">Click here to view the results.</a>
          </p>
          <p v-else class="text-orange-600 italic">
            Voting is complete, but results are **temporarily hidden** until the official count is verified. Check back soon.
          </p>
        </div>

      </div>

    </main>
  </div>
</template>

<script>
export default {
    name: "UserDashboard",
    data() {
      return {
        // Initialize with default or empty data
        voterInfo: {
            id: 'loading...',
            name: 'Voter',
            gradeSection: 'Loading...'
        },
        isVoted: false, 
        resultsAvailable: false, // Added resultsAvailable state
        announcements: [
            { text: 'Final day for voting! Deadline at 5 PM.', urgent: true },
        ]
      };
    },
    methods: {
      loadVoterData() {
        // Retrieve the user object stored during login
        const userJson = localStorage.getItem('user');
        
        if (userJson) {
            try {
                const userData = JSON.parse(userJson);
                // The 'id' from login is used as the Student ID
                this.voterInfo.id = userData.id || 'N/A';
                // Mock or retrieve the full name and section (This part usually comes from an API/DB)
                this.voterInfo.name = userData.name || 'Student Voter';
                this.voterInfo.gradeSection = userData.section || 'BSIS 3'; 
            } catch (e) {
                console.error("Error parsing user data:", e);
            }
        }
      },
      checkVotingStatus() {
          // Checks voting status flag. It should be unique per user in a real app.
          this.isVoted = localStorage.getItem('isVoted') === 'true';
      },
      goToBallot() {
          // Navigates to the voting page
          this.$router.push({ name: 'VotingDashboard' });
      },
      /**
       * The function that handles logout and redirects to VoterLogin.
       */
      handleLogout() {
          // 1. Clear ALL session-related data from local storage
          localStorage.removeItem('user'); 
          localStorage.removeItem('isVoted'); 
          
          // 2. Redirect to the Login page (This is the line that fulfills your request)
          this.$router.push({ name: 'VoterLogin' });
      },
    },
    created() {
      // 1. Load the data when the component is created
      this.loadVoterData();
      
      // 2. Check the voting status
      this.checkVotingStatus();
    },
}
</script>