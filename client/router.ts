import { Pinia } from "pinia"
import { createMemoryHistory, createRouter as createVueRouter } from 'vue-router'

import Home from '@/pages/Home.vue'

const routes = [
  { path: '/', component: Home },
]

export function createRouter (_store: Pinia) {
  return createVueRouter({
    history: createMemoryHistory(),
    routes,
  })
}
