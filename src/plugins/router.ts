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
    name: 'login',
  },
  {
    path: '/error',
    component: () => import('../views/Error.vue'),
    name: 'error',
  },
  {
    path: '/about',
    component: () => import('../views/About.vue'),
    name: 'about',
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
  {
    path: '/newuser',
    component: () => import('../views/NewUser.vue'),
    name: 'newuser',
  },
  {
    path: '/usernotfound',
    component: () => import('../views/error/UserNotFoundErr.vue'),
    name: 'usernotfound',
  },
]

const router =  createRouter({
  mode: "history",
  routes,
  history: createWebHistory(),
})

export default router