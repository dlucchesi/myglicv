<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useMessageStore } from '../stores/MessageStore'
import router from '../plugins/router'
import { MyGlicUser } from "../models/MyGlicUser"

const userStore = useUserStore()
const messageStore = useMessageStore()
// const userURL = "http://localhost:8180/v1/user"
const userURL = import.meta.env.VITE_MYGLICV_API_URL + import.meta.env.VITE_MYGLICV_API_PORT + "/" + import.meta.env.VITE_MYGLICV_API_VERSION + "/user"
const usernotfound:boolean = false

const emit = defineEmits(['userIsLogged'])

const userLogin = {
  login: "",
  passwd: "",
}

let user: MyGlicUser = {
  type: "",
  id: 0,
  isDeleted: false,
  isActive: true,
  login: "",
  passwd: "",
}

function doLogin() {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userLogin)
  }
  fetch(userURL + "/doLogin", requestOptions)
    .then(async response => {
      if (response.ok == false) {
        // get error message from body or default to response statusText
        const error = response.statusText
        if (response.status == 403) {
          if(userLogin.login != ""){
            // Put login into the message store to retrieve it in the new user page
            messageStore.setMessage(userLogin.login)
          }
          router.push({ name: 'usernotfound' })
        } else {
          return Promise.reject(error)
        }
      }
      if (response.ok == true) {
        const data = await response.json();
        user.type = data.type;
        user.id = data.id;
        user.login = data.login
        user.isDeleted = data.isDeleted;
        user.isActive = data.isActive;
        user.login = data.login;
        user.passwd = data.passwd;
        
        userStore.setUser(user)
        router.push({
          name: 'mylist',
        })
        emit("userIsLogged")
      }
    })
    // check for error response
    .catch(error => {
      // this.errorMessage = error;
        console.error(error)
        if (error == "Forbidden"){
          router.push({ name: 'error' })
        }
    })
}

</script>

<template>
  <section class="dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      
      <div class="w-full bg-gray-800 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-light-900 md:text-2xl dark:text-white">
              User
          </h1>
          <form class="space-y-4 md:space-y-6" v-on:submit.prevent="">
            <div>
              <label for="email" 
                  class="block mb-2 text-sm font-medium text-light-900 dark:text-white">Your email</label>
              <input  v-model="userLogin.login"
                  type="email"
                  name="email" 
                  id="email"
                  placeholder="name@domain.com" 
                  class="bg-gray-50 border border-gray-300 text-light-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-100 dark:focus:border-pink-100">
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-light-900 dark:text-white">Password</label>
              <input v-model="userLogin.passwd"
                  type="password" 
                  name="password" 
                  id="password" 
                  placeholder="••••••••" 
                  class="bg-gray-50 border border-gray-300 text-light-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="remember" 
                        aria-describedby="remember" 
                        type="checkbox" 
                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800">
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
              </div>
              <div>
                <a href="#"
                    class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
              </div>
            </div>
            <button type="button" @click="doLogin" 
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Sign in
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                <h2>Don’t have an account yet? </h2>
                <button type="button" @click="router.push({name: 'newuser'})" 
                      class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Sign up
                </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style>

</style>