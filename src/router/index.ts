// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Devices from '../views/Devices.vue'
import Dashboard from '../views/dashboard.vue'
import Block from '../views/block.vue'
import Robots from '../views/Robots.vue'
import Team from '../views/Team.vue'
import Login from '../views/Login.vue'
import { useAuthStore } from '../stores/authStore'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/devices',
    name: 'Devices',
    component: Devices,
    meta: { requiresAuth: true }
  },
  {
    path: "/robots",
    name: "Robots",
    component: Robots
  },
  {
    path: '/block',
    name: 'Block',
    component: Block
  },
  {
    path: '/team',
    name: 'Team',
    component: Team
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from) => {
  try {
    const auth = useAuthStore();
    const authenticated = auth.isAuthenticated
    if (to.meta.requiresAuth && !authenticated) {
      // User is not authenticated, redirect to login
      return { path: "/login" };
    }
    if ((to.path === "/login" || to.path === "/register") && authenticated) {
      // User is authenticated and trying to access login, redirect to dashboard
      return { path: "/dashboard" };
    }
  } catch (err) {
    alert('server is down');
  }
});

export default router