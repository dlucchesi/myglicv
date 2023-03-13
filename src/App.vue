<script setup lang="ts">
import { ref } from 'vue'
import router from './plugins/router'
import { useUserStore } from './stores/userStore'

const userStore = useUserStore()
const userLogged = ref(false)

function userIsLogged() {
  userLogged.value = true
}

</script>

<template>
  <section class="dark:bg-gray-900">
    <div id="myCanvas" 
        class="flex flex-col items-center justify-center">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold dark:text-white">
          <img src="./assets/marvin.png" 
              class="w-8 h-8 mr-2 mylogo" 
              alt="logo">
          <div> Myglic</div>
      </a>

      <nav class=" border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div class="container flex flex-wrap items-center justify-between mx-auto">
          <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span class="sr-only">Menu</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
            </svg>
          </button>
          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul 
                class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-1 md:hover:bg-purple-500 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <button @click="router.push('/')"
                    href="#" 
                    class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">
                  Home
                </button>
              </li>
              <li v-if="!userLogged" >
                <button @click="router.push({ name: 'login' })"
                    class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">
                  Login
                </button>
              </li>
              <li v-if="userLogged" >
                <button @click="router.push({ name: 'mylist' })"
                    href="#" 
                    class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">
                  My List
                </button>
              </li>
              <li>
                <button @click="router.push({ name: 'about' })"
                    href="#" 
                    class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">
                  About
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main>
        <router-view v-on:userIsLogged="userIsLogged" />
      </main>
    </div>
  </section>
</template>

<style scoped>

</style>
