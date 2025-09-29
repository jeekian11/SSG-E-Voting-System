import { createRouter, createWebHistory } from 'vue-router';
// User Views
import VoterLogin from '../views/User/VoterLogin.vue';
import VotingDashboard from '../views/User/VotingDashboard.vue';
import ConfirmationPage from '../views/User/ConfirmationPage.vue';
// Admin Views
import AdminLogin from '../views/Admin/AdminLogin.vue';
import AdminDashboard from '../views/Admin/AdminDashboard.vue';
import ManageCandidates from '../views/Admin/ManageCandidates.vue';
import ManageVoters from '../views/Admin/ManageVoters.vue';
import ViewResults from '../views/Admin/ViewResults.vue';
import VoterRegister from '../views/User/VoterRegister.vue'; 

const routes = [
  // User Routes
  { path: '/', name: 'VoterLogin', component: VoterLogin },
  { path: '/register', name: 'VoterRegister', component: VoterRegister },
  { path: '/vote', name: 'VotingDashboard', component: VotingDashboard, meta: { requiresAuth: true } },
  { path: '/confirm', name: 'ConfirmationPage', component: ConfirmationPage, meta: { requiresAuth: true } },
  
  // Admin Routes
  { path: '/admin/login', name: 'AdminLogin', component: AdminLogin },
  { path: '/admin/dashboard', name: 'AdminDashboard', component: AdminDashboard, meta: { requiresAdmin: true } },
  { path: '/admin/candidates', name: 'ManageCandidates', component: ManageCandidates, meta: { requiresAdmin: true } },
  { path: '/admin/voters', name: 'ManageVoters', component: ManageVoters, meta: { requiresAdmin: true } },
  { path: '/admin/results', name: 'ViewResults', component: ViewResults, meta: { requiresAdmin: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Simple Navigation Guard (For demonstration)
router.beforeEach((to, from, next) => {
  const isAdminLoggedIn = localStorage.getItem('isAdmin');
  const isUserLoggedIn = localStorage.getItem('isUser');
  
  if (to.meta.requiresAdmin && !isAdminLoggedIn) {
    next({ name: 'AdminLogin' });
  } else if (to.meta.requiresAuth && !isUserLoggedIn) {
    next({ name: 'VoterLogin' });
  } else {
    next();
  }
});


export default router;