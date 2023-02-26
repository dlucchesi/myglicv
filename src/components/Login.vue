<script setup lang="ts">

const props = defineProps([
  'msg'
])

console.log(props.msg)

import router from '../plugins/router'
import { useUserStore } from '../stores/user.ts'
import MyglicUser from '../components/model/MyglicUser'

const store = useUserStore()

const URL = "http://localhost:8180/v1/user"

let user: MyglicUser = {
  type: "",
  id: 0,
  isDeleted: false,
  isActive: true,
  login: "",
  passwd: "",
}


const userLogin = {
  login: "" ,
  passwd: ""
}

console.log("Load OK")

function doLogin() {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userLogin)
  }
  fetch(URL + "/doLogin", requestOptions)
    .then(async response => {
      const data = await response.json();
      // check for error response
      if (!response.ok) {
        // get error message from body or default to response statusText
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      
      user.type = data.type;
      user.id = data.id;
      user.login = data.login
      user.isDeleted = data.isDeleted;
      user.isActive = data.isActive;
      user.login = data.login;
      user.passwd = data.passwd;
      console.log(user)
      store.user = user
      router.push({
        name: 'main',
      })
    })
    .catch(error => {
      // this.errorMessage = error;
      console.error("There was an error!", error);
    });
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
          <form class="space-y-4 md:space-y-6" action="#" @submit.prevent="submit">
            <div>
              <label for="email" 
                  class="block mb-2 text-sm font-medium text-light-900 dark:text-white">Your email</label>
              <input  v-model="userLogin.login"
                  type="email"
                  name="email" 
                  id="email"
                  placeholder="name@domain.com" 
                  required="Empty e-mail!!!" 
                  class="bg-gray-50 border border-gray-300 text-light-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-100 dark:focus:border-pink-100">
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-light-900 dark:text-white">Password</label>
              <input v-model="userLogin.passwd"
                  type="password" 
                  name="password" 
                  id="password" 
                  placeholder="••••••••" 
                  required="Empty password!!!"
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
                Don’t have an account yet? 
                <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

input:focus{
  border: 20px;
}

button{
  margin: 20px;
}
</style>
