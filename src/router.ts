import { Pinia } from "pinia"
import { createWebHistory, createRouter as createVueRouter } from 'vue-router'

import Directory from '@/pages/Directory.vue'
import UserView from '@/pages/User.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Directory,
  },
  {
    path: '/users',
    name: 'users',
    children: [
      {
        path: '/users/:id',
        name: 'individual-user',
        component: UserView,
      }
    ]
  },
]

export function createRouter (_store: Pinia) {
  return createVueRouter({
    history: createWebHistory(),
    routes,
  })
}
