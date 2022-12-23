/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Pinia
import { createPinia } from 'pinia'

// Router
import router from './router'

// Plugins
import { registerPlugins } from '@/plugins'

const pinia = createPinia()

const app = createApp(App)

registerPlugins(app)

app.use(pinia)
app.use(router)

app.mount('#app')
