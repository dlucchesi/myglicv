<script lang="ts">
import { ref } from 'vue'
import { router } from 'vue-router';
import myglicUser from './model/MyglicUser.ts'

const URL = "http://localhost:8180/v1/user"

const login: String = ref("")
const passwd: String = ref("")
const errorMessage: String = ""
const loginRet: String = ""


function submitUser() {
  this.user.login = this.login
  this.user.passwd = this.passwd;

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(this.user)
  }
  fetch(URL, requestOptions)
    .then(async response => {
      const data = await response.json();
      // check for error response
      if (!response.ok) {
        // get error message from body or default to response statusText
        const error = (data && data.message) || response.statusText
        this.errorMessage = error
        return Promise.reject(error);
      }
      console.log(data)
      this.loginRet = "OK"
    })
    .catch(error => {
      this.errorMessage = error;
      console.error("Internal server error!", error);
    })
  }

</script>

<template>
  <section class="dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-gray-800 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-light-900 md:text-2xl dark:text-white">
              Create User
          </h1>
          <form class="space-y-4 md:space-y-6" action="#">
            <div>
              <label for="email" 
                  class="block mb-2 text-sm font-medium text-light-900 dark:text-white">Your email</label>
              <input type="email" v-model="login"
                  name="email" 
                  id="email"
                  placeholder="name@domain.com" 
                  required="Empty e-mail!!!" 
                  class="bg-gray-50 border border-gray-300 text-light-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  {{ login }}
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-light-900 dark:text-white">Password</label>
              <input 
                  type="password" v-model="passwd"
                  name="password" 
                  id="password" 
                  placeholder="••••••••" 
                  required="Empty password!!!"
                  class="bg-gray-50 border border-gray-300 text-light-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>

            <button type="submit" 
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.test{
  background-color: #d345e6;
}
</style>