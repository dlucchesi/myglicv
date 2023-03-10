<script setup lang="ts">
import router from '../plugins/router'
import { useUserStore } from '../stores/userStore'
import { useMessageStore } from '../stores/MessageStore'
import { MyGlicUser, createUserBlank } from "../models/MyGlicUser"

// const userURL = "http://localhost:8180/v1/user"
const userURL = import.meta.env.VITE_MYGLICV_API_URL + import.meta.env.VITE_MYGLICV_API_PORT + "/" + import.meta.env.VITE_MYGLICV_API_VERSION + "/user"

const userStore = useUserStore()
const messageStore = useMessageStore()

const user: MyGlicUser = createUserBlank()

function saveUser() {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  }
  fetch(userURL, requestOptions)
    .then(async response => {
      const data = await response.json();
      // check for error response
      if (!response.ok) {
        // get error message from body or default to response statusText
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      let userRet = {
        type: data.type,
        id: data.id,
        isDeleted: data.isDeleted,
        isActive: data.isActive,
        login: data.login,
        passwd: data.passwd      
      }
      userStore.setUser(userRet)
      console.log(userRet)
      if (userRet.id != null) {
        router.push({
          name: 'mylist',
        })
      }
      
    })
    .catch(error => {
      // this.errorMessage = error;
      console.error("There was an error!", error)
      router.push({ name: 'error' })
    })
}


</script>

<template>
  <section class="dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      
      <div class="w-full bg-gray-800 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-light-900 md:text-2xl dark:text-white">
              New User
          </h1>
          
          <form class="space-y-4 md:space-y-6">
            <div>
              <label for="login" 
                  class="block mb-2 text-sm font-medium text-light-900 dark:text-white">Login (E-mail)</label>
              <input  v-model="user.login"
                  type="email"
                  name="login" 
                  id="login"
                  placeholder="youremail@yourdomain.com" 
                  class="bg-gray-50 border border-gray-300 text-light-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-100 dark:focus:border-pink-100">
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-light-900 dark:text-white">Password</label>
              <input v-model="user.passwd"
                  type="password"
                  name="password" 
                  id="password" 
                  placeholder="*****" 
                  class="bg-gray-50 border border-gray-300 text-light-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
              
            <button type="button" @click="saveUser" 
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Create
            </button>
            <button type="button" @click="router.back()" 
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Cancel
            </button>
          </form>


        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
