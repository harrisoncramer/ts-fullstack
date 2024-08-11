import '@/style.css'
import 'normalize.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import { createRouter } from "./router"

const pinia = createPinia()
const router = createRouter(pinia)
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
