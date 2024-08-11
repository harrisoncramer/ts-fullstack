import { Pinia } from "pinia"
import { createRouter as createVueRouter, createWebHistory } from 'vue-router'

import Directory from '@/pages/Directory.vue'
import HomeView from '@/pages/Home.vue'
import UserView from '@/pages/User.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/users',
    name: 'directory',
    component: Directory,
  },
  {
    path: '/users/:id',
    name: 'individual-user',
    component: UserView,
  },
]

export function createRouter (_store: Pinia) {
  return createVueRouter({
    history: createWebHistory(),
    routes,
  })
}
