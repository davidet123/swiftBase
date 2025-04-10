import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Test from '../views/Test.vue'
import TestWS from '../views/TestWS.vue'
import Proyecto from '../views/Proyecto.vue'
import Simple from '../views/simple/Simple.vue'
import SimpleConfig from '../views/simple/SimpleConfig.vue'
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
import EstBasket from '../views/basket/EstBasket.vue'
import EditarPartidoBasket from '../views/basket/EditarPartidoBasket.vue'
import Vumetro from '../views/vumetro/Vumetro.vue'
import MenuMisa from '../views/misa/MenuMisa.vue'
import ControlMisa from '../views/misa/ControlMisa.vue'
import AddTextoMisa from '../views/misa/AddTextoMisa.vue'
import MisaFullScreen from '../views/misa/MisaFullScreen.vue'
import EditarTextoMisa from '../views/misa/EditarTextoMisa.vue'
import EditarMisa from '../views/misa/EditarMisa.vue'
import Misa from '../views/misa/Misa.vue'
import Pilota from '../views/pilota/Pilota.vue'
import MenuPilota from '../views/pilota/MenuPilota.vue'
import PartidaPilota from '../views/pilota/PartidaPilota.vue'
import Teleprompter from '../views/teleprompter/Teleprompter.vue'
import Settings from '../views/Settings.vue'
import Retransmision from '../views/retransmision/Retransmision.vue'
import MenuRetransmision from '../views/retransmision/MenuRetransmision.vue'
import EstTenis from '../views/tenis/EstTenis.vue'
import MenuTenis from '../views/tenis/MenuTenis.vue'
import NuevaCompeticionTenis from '../views/tenis/NuevaCompeticionTenis.vue'
import NuevoJugadorTenis from '../views/tenis/NuevoJugadorTenis.vue'
import NuevoPartidoTenis from '../views/tenis/NuevoPartidoTenis.vue'
import PartidoTenis from '../views/tenis/PartidoTenis.vue'
import MenuBalonmano from '../views/balonmano/MenuBalonmano.vue'
import AddPartidoBalonmano from '../views/balonmano/AddPartidoBalonmano.vue'
import EstBalonmano from '../views/balonmano/EstBalonmano.vue'
import SpeechRecognition from '@/views/SpeechRecognition.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHistory(),
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
      path: '/testws',
      name: 'testws',
      component: TestWS
    },
    {
      path: '/simple',
      name: 'simple',
      component: Simple
    },
    {
      path: '/simpleconfig',
      name: 'simpleconfig',
      component: SimpleConfig
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
    },
    {
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
      path: '/basket/estbasket/:id',
      name: 'estbasket',
      component: EstBasket
    },
    {
      path: '/menumisa',
      name: 'menumisa',
      component: MenuMisa
    },
    {
      path: '/misa',
      name: 'misa',
      component: Misa
    },
    {
      path: '/addtextomisa',
      name: 'addtextomisa',
      component: AddTextoMisa
    },
    {
      path: '/misafullscreen',
      name: 'misafulscreen',
      component: MisaFullScreen
    },
    {
      path: '/controlmisa',
      name: 'controlmisa',
      component: ControlMisa
    },
    {
      path: '/editartextomisa/:id',
      name: 'editartextomisa',
      component: EditarTextoMisa
    },
    {
      path: '/editarmisa/:id',
      name: 'editarmisa',
      component: EditarMisa
    },
    {
      path: '/teleprompter',
      name: 'teleprompter',
      component: Teleprompter
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/pilota',
      name: 'pilota',
      component: Pilota
    },
    {
      path: '/menupilota',
      name: 'menupilota',
      component: MenuPilota
    },
    {
      path: '/partidapilota',
      name: 'partidapilota',
      component: PartidaPilota
    },
    {
      path: '/retransmision',
      name: 'retransmision',
      component: Retransmision
    },
    {
      path: '/menuretransmision',
      name: 'menuretransmision',
      component: MenuRetransmision
    },
    {
      path: '/esttenis',
      name: 'esttenis',
      component: EstTenis
    },
    {
      path: '/menutenis',
      name: 'menutenis',
      component: MenuTenis
    },
    {
      path: '/nuevacompeticiontenis',
      name: 'nuevacompeticiontenis',
      component: NuevaCompeticionTenis
    },
    {
      path: '/nuevojugadortenis',
      name: 'nuevojugadortenis',
      component: NuevoJugadorTenis
    },
    {
      path: '/nuevopartidotenis',
      name: 'nuevopartidotenis',
      component: NuevoPartidoTenis
    },
    {
      path: '/partidotenis',
      name: 'partidotenis',
      component: PartidoTenis
    },
    {
      path: '/menubalonmano',
      name: 'menubalonmano',
      component: MenuBalonmano
    },
    {
      path: '/addpartidobalonmano',
      name: 'addpartidobalonmano',
      component: AddPartidoBalonmano
    },
    {
      path: '/estbalonmano',
      name: 'estbalonmano',
      component: EstBalonmano
    },
    {
      path: '/speechrecognition',
      name: 'estbalospeechrecognitionnmano',
      component: SpeechRecognition
    },
  ]
})

export default router
