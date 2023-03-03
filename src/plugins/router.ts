import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'


const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/about',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/mylist',
    component: () => import('../views/UserList.vue'),
    name: 'mylist',
  },
  {
    path: '/newmeasure',
    component: () => import('../views/NewMeasure.vue'),
    name: 'newmeasure',
  },
  {
    path: '/inactivatemeasure',
    component: () => import('../views/InactivateMeasure.vue'),
    name: 'inactivatemeasure',
  },
]

const router =  createRouter({
  mode: "history",
  routes,
  history: createWebHistory(),
})

export default router