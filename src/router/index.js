import { createRouter, createWebHistory } from 'vue-router';

// User Views
import VoterLogin from '../views/User/VoterLogin.vue';
import VotingDashboard from '../views/User/VotingDashboard.vue';
import ConfirmationPage from '../views/User/ConfirmationPage.vue';
import VoterRegister from '../views/User/VoterRegister.vue';
import UserDashboard from '../views/User/UserDashboard.vue';

// Admin Views
import AdminDashboard from '../views/Admin/AdminDashboard.vue';
import ManageCandidates from '../views/Admin/ManageCandidates.vue';
import ManageVoters from '../views/Admin/ManageVoters.vue';
import ViewResults from '../views/Admin/ViewResults.vue';

const routes = [
  { path: '/', name: 'VoterLogin', component: VoterLogin },
  { path: '/register', name: 'VoterRegister', component: VoterRegister },

  // User
  { path: '/dashboard', name: 'UserDashboard', component: UserDashboard, meta: { requiresAuth: true, role: 'user' } },
  { path: '/vote', name: 'VotingDashboard', component: VotingDashboard, meta: { requiresAuth: true, role: 'user' } },
  { path: '/confirm', name: 'ConfirmationPage', component: ConfirmationPage, meta: { requiresAuth: true, role: 'user' } },

  // Admin
  { path: '/admin/dashboard', name: 'AdminDashboard', component: AdminDashboard, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/admin/candidates', name: 'ManageCandidates', component: ManageCandidates, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/admin/voters', name: 'ManageVoters', component: ManageVoters, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/admin/results', name: 'ViewResults', component: ViewResults, meta: { requiresAuth: true, role: 'admin' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (to.meta.requiresAuth) {
    if (!user || !user.isAuthenticated) {
      return next({ name: 'VoterLogin' });
    }
    if (to.meta.role && to.meta.role !== user.role) {
      return next({ name: user.role === 'admin' ? 'AdminDashboard' : 'UserDashboard' });
    }
  }

  if (user && user.isAuthenticated && (to.name === 'VoterLogin' || to.name === 'VoterRegister')) {
    return next({ name: user.role === 'admin' ? 'AdminDashboard' : 'UserDashboard' });
  }

  next();
});

export default router;
  