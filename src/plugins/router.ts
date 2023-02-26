import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'


const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/about',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/main',
    component: () => import('../views/MainView.vue'),
    name: 'main',
    props: true,
  },
  // {
  //   path: '/singup',
  //   component: () => import('../views/CreateUser.vue'),
  // },
]

const router =  createRouter({
  mode: "history",
  routes,
  history: createWebHistory(),
})

export default router