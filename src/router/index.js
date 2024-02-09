import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/registroView.vue')
    },
    {
      path: '/inicio',
      name: 'inicio',
      component: () => import('@/views/inicioView.vue')
    },
  ]
})

export default router
