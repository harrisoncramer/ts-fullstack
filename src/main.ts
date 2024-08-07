import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import 'normalize.css'
import { createRouter } from "./router"
import App from './App.vue'
import PrimeVue from "primevue/config"

const pinia = createPinia()
const router = createRouter(pinia)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(PrimeVue)
app.mount('#app')
