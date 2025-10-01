// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Devices from '../views/Devices.vue'
import Dashboard from '../views/dashboard.vue'
import Block from '../views/block.vue'
import Robots from '../views/Robots.vue'
import Team from '../views/Team.vue'

const routes: RouteRecordRaw[] = [
  { 
    path: '/', 
    name: 'Dashboard',
    component: Dashboard 
  },
  {
    path:'/dashboard',
    name:'Dashboard',
    component: Dashboard  },
  { 
    path: '/devices', 
    name: 'Devices',
    component: Devices 
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

export default router