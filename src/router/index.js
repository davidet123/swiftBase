import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Proyecto from '../views/Proyecto.vue'
import Futbol from '../views/futbol/Futbol.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/proyecto',
      name: 'proyecto',
      component: Proyecto
    },
    {
      path: '/futbol',
      name: 'futbol',
      component: Futbol
    }
  ]
})

export default router