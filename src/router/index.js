import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Test from '../views/Test.vue'
import Proyecto from '../views/Proyecto.vue'
import Simple from '../views/simple/Simple.vue'
import Futbol from '../views/futbol/Futbol.vue'
import FutbolInicio from '../views/futbol/FutbolInicio.vue'
import EstFutbol from '../views/futbol/EstFutbol.vue'
import AddEquipoFutbol from '../views/futbol/AddEquipoFutbol.vue'
import AddPartidoFutbol from '../views/futbol/AddPartidoFutbol.vue'
import EditarPartidoFutbol from '../views/futbol/EditarPartidoFutbol.vue'
import EditarEquipoFutbol from '../views/futbol/EditarEquipoFutbol.vue'
import ListaEquiposFutbol from '../views/futbol/ListaEquiposFutbol.vue'
import ResumenFutbol from '../views/futbol/ResumenFutbol.vue'
import AddCompeticionFutbol from '../views/futbol/AddCompeticionFutbol.vue'
import Basket from '../views/basket/Basket.vue'
import EditarPartidoBasket from '../views/basket/EditarPartidoBasket.vue'
import Vumetro from '../views/vumetro/Vumetro.vue'
import Settings from '../views/Settings.vue'

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
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/simple',
      name: 'simple',
      component: Simple
    },
    {
      path: '/futbol',
      name: 'futbol',
      component: Futbol
    },
    {
      path: '/futbolinicio',
      name: 'futbolinicio',
      component: FutbolInicio
    },
    {
      path: '/futbol/listaequiposfutbol',
      name: 'listaequiposfutbol',
      component: ListaEquiposFutbol
    },
    {
      path: '/futbol/addpartidofutbol',
      name: 'addpartidofutbol',
      component: AddPartidoFutbol
    },
    {
      path: '/futbol/estfutbol/:id',
      name: 'estfutbol',
      component: EstFutbol
    },
    {
      path: '/futbol/resumenfutbol/:id',
      name: 'resumenfitbol',
      component: ResumenFutbol
    },
    {
      path: '/futbol/addequipofutbol',
      name: 'addequipofutbol',
      component: AddEquipoFutbol
    },
    {
      path: '/futbol/editarpartidofutbol/:id',
      name: 'editarpartidofutbol',
      component: EditarPartidoFutbol
    },
    {
      path: '/futbol/editarequipofutbol/:id',
      name: 'editarequipofutbol',
      component: EditarEquipoFutbol
    },{
      path: '/futbol/addcompeticionfutbol',
      name: 'addcompeticionfutbol',
      component: AddCompeticionFutbol
    },
    {
      path: '/vumetro',
      name: 'vumetro',
      component: Vumetro
    },
    {
      path: '/basket',
      name: 'basket',
      component: Basket
    },
    {
      path: '/basket',
      name: 'basket',
      component: Basket
    },
    {
      path: '/basket/editarpartidobasket/:id',
      name: 'editarpartidobasekt',
      component: EditarPartidoBasket
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})

export default router
