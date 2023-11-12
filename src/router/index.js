import { createRouter, createWebHistory } from 'vue-router'
import LogInView from '@/views/System/LogInView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LogInView
  },

  {
    path: '/user',
    redirect: { name: 'user-dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'user-dashboard',
        component: () => import('@/views/User/Dashboard.vue'),
      },
    ]
  },
  {
    path: '/company',
    redirect: { name: 'company-dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'company-dashboard',
        component: () => import('@/views/Company/Dashboard.vue'),
      },
    ]
  },
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'login' },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
