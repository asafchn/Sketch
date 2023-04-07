import { createRouter, createWebHistory } from 'vue-router'
import Canvas from '../views/Canvas.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Canvas
    },
 
  ]
})

export default router
