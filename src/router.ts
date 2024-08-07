import { Pinia } from "pinia"
import { createWebHistory, createRouter as createVueRouter } from 'vue-router'

import Home from '@/pages/Home.vue'
import UsersView from '@/pages/Users.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView,
  },
]

export function createRouter (_store: Pinia) {
  return createVueRouter({
    history: createWebHistory(),
    routes,
  })
}
