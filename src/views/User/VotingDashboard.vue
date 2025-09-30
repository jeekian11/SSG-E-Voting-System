<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-extrabold text-blue-800">
            DTC Elections 2025
          </h1>
          <p class="mt-1 text-sm text-gray-500">
            Welcome, <strong>{{ voterInfo.name }}</strong>! Please cast your vote carefully!
          </p>
        </div>
        
        <button 
          @click="handleLogout"
          class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-medium shadow-md"
        >
          Back
        </button>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      
      <div v-if="hasVoted" class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md">
        <p class="font-bold">Vote Submitted</p>
        <p>Thank you! Your vote has already been cast for this election.</p>
      </div>

      <div v-if="!ballot.length && !isLoading" class="text-center p-10 bg-white rounded-lg shadow-md">
          <p class="text-xl text-gray-500">The election ballot is not yet available.</p>
      </div>
      <div v-else-if="isLoading" class="text-center p-10 text-lg text-gray-600">
        Loading ballot...
      </div>

      <form v-else-if="ballot.length && !hasVoted" @submit.prevent="confirmVoteSubmission" class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Official Ballot</h2>
        
        <div v-for="position in ballot" :key="position.id" class="bg-white p-6 rounded-lg shadow-md border-t-4" :class="getBorderClass(position.id)">
          <h3 class="text-xl font-semibold mb-4 text-gray-800">
            {{ position.name }}
          </h3>

          <div class="space-y-3">
            <div v-for="candidate in position.candidates" :key="candidate.id" 
                  class="p-4 border rounded-lg cursor-pointer transition"
                  :class="{
                    'border-blue-500 bg-blue-50 ring-2 ring-blue-500': isSelected(position.id, candidate.id),
                    'hover:bg-gray-50': !isSelected(position.id, candidate.id)
                  }"
                  @click="toggleSelection(position.id, candidate.id)"
            >
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-lg text-gray-900">{{ candidate.name }}</p>
                  <p class="text-sm text-gray-500">{{ candidate.courseYear }}</p>
                  <p v-if="candidate.platform" class="text-xs text-gray-400 mt-1 italic">{{ candidate.platform }}</p>
                </div>
                <input
                  type="radio"
                  :name="`vote_${position.id}`"
                  :checked="isSelected(position.id, candidate.id)"
                  class="h-5 w-5 text-blue-600 focus:ring-blue-500"
                  @change="toggleSelection(position.id, candidate.id)"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="text-center pt-6">
          <button
            type="submit"
            :disabled="!isBallotComplete || isSubmitting"
            class="px-10 py-4 bg-green-600 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSubmitting ? 'Submitting Vote...' : 'Submit Final Vote' }}
          </button>
          <p v-if="!isBallotComplete" class="mt-3 text-red-500 text-sm">
            Please select one candidate for every position before submitting.
          </p>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
// import axios from 'axios';

export default {
    name: "VotingDashboard",
    setup() {
        const router = useRouter();
        const isLoading = ref(true);
        const isSubmitting = ref(false);
        const hasVoted = ref(false); // Controls the temporary 'Vote Submitted' message
        const ballot = ref([]);
        const selections = ref({}); // { positionId: candidateId, ... }

        // --- Mock Data ---
        const mockBallot = [
            { id: 1, name: 'President', candidates: [
                { id: 101, name: 'Jeek Ian Niepes', courseYear: 'BSIS 3', platform: 'Better Wi-Fi and student lounges.' },
                { id: 102, name: 'John Michael', courseYear: 'BSIS 3', platform: 'Focus on student welfare and security.' },
            ]},
            { id: 2, name: 'Vice President', candidates: [
                { id: 201, name: 'Jeann Lapore', courseYear: 'BSIS 2', platform: null },
                { id: 202, name: 'Angeline Magan', courseYear: 'BSIS 3', platform: null },
            ]},
            { id: 3, name: 'Secretary', candidates: [
                { id: 301, name: 'Alfred Orapa', courseYear: 'BSIS 3', platform: 'Digitalize student records.' },
            ]},
        ];

        // MOCK DATA for the logged-in user
        const voterInfo = {
            id: '2023-00123',
            name: 'Jeek Ian Niepes',
            gradeSection: 'BSIS 3'
        };

        // --- Computed Properties ---
        const isBallotComplete = computed(() => {
            // Check if the number of selections equals the number of positions
            return Object.keys(selections.value).length === ballot.value.length;
        });

        // --- Methods ---
        
        const fetchBallot = async () => {
            isLoading.value = true;
            
            // MOCK data load delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            ballot.value = mockBallot;
            isLoading.value = false;
            // NOTE: hasVoted is left as false to allow the ballot to display
        };

        const toggleSelection = (positionId, candidateId) => {
            // Allows only one selection per position
            selections.value[positionId] = candidateId;
        };

        const isSelected = (positionId, candidateId) => {
            // Note: positionId is parsed as number during initial data setup but used as string keys in selections.value
            return selections.value[positionId] === candidateId;
        };

        const confirmVoteSubmission = () => {
            if (!isBallotComplete.value) {
                alert("Please ensure you have voted for all positions before submitting.");
                return;
            }

            // Simplified confirmation for a demo
            const confirmation = confirm("Confirm submission? This action is permanent in a real election, but you can re-vote in this demo.");
            if (confirmation) {
                submitVote();
            }
        };

        const submitVote = async () => {
            isSubmitting.value = true;
            try {
                // 1. Prepare data for backend: Convert selections object to an array of votes
                const votes = Object.entries(selections.value).map(([position_id, candidate_id]) => ({
                    position_id: parseInt(position_id),
                    candidate_id: parseInt(candidate_id)
                }));

                // 2. MOCK API call to submit votes (Simulate a network request)
                console.log("Submitting votes:", votes);
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // MOCK success actions
                hasVoted.value = true; // Show the 'voted' success message temporarily
                selections.value = {}; // Clear selections

                alert("Vote submitted successfully! You are now being logged out.");
                
                // Redirect back to login page after successful submission
                router.push({ name: 'VoterLogin' }); 

            } catch (error) {
                alert("Vote submission failed. Please try again or contact support.");
                console.error("Submission Error:", error);
                
            } finally {
                isSubmitting.value = false;
            }
        };

        const handleLogout = () => {
            // Clear the user session flag
            localStorage.removeItem('isUser'); 
            // Also clear any mock persistence from other components for a clean slate
            localStorage.removeItem('isVoted'); 
            
            router.push({ name: 'VoterLogin' });
        };
        
        // --- Helper for Styling ---
        const getBorderClass = (id) => {
            const colors = ['border-blue-500', 'border-green-500', 'border-purple-500', 'border-pink-500'];
            // Use the position ID to cycle through colors
            return colors[id % colors.length];
        };

        onMounted(fetchBallot);

        return {
            voterInfo,
            isLoading,
            isSubmitting,
            hasVoted,
            ballot,
            isBallotComplete,
            handleLogout,
            toggleSelection,
            isSelected,
            confirmVoteSubmission,
            getBorderClass,
        };
    }
}
</script>