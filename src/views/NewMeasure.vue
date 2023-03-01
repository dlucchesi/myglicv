<script setup lang="ts">
import router from '../plugins/router'
import { useUserStore } from '../stores/userStore.ts'
import MyGlicUser from "../models/MyGlicUser.ts"
import MyglicMeasure from "../models/MyglicMeasure.ts"

const measureURL = "http://localhost:8180/v1/measure"
const userURL = "http://localhost:8180/v1/user"

const userStore = useUserStore()
const userLogged: MyGlicUser = userStore.user
let measure: MyglicMeasure = {
  type: "measureImp",
  id: null,
  isDeleted: false,
  isActive: true,
  dtEntry: new Date(),
  measureEntry: 0,
  obs: "",
  user: userLogged,
}

if (userLogged.login == "") {
  router.push({
    name: 'login',
  })
}

function saveMeasure() {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(measure)
  }
  fetch(measureURL, requestOptions)
    .then(async response => {
      const data = await response.json();
      // check for error response
      if (!response.ok) {
        // get error message from body or default to response statusText
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      
      console.log(data)
      router.push({ name: 'mylist' })	
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
              Measure
          </h1>
          <form class="space-y-4 md:space-y-6" action="#" @submit.prevent="submit">
            <div>
              <label for="date" 
                  class="block mb-2 text-sm font-medium text-light-900 dark:text-white">Date and time</label>
              <input  v-model="measure.dtEntry"
                  type="datetime-local"
                  name="date" 
                  id="date"
                  placeholder="2023-01-01 00:00:00" 
                  required="Empty date!!!" 
                  class="bg-gray-50 border border-gray-300 text-light-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-100 dark:focus:border-pink-100">
            </div>
            <div>
              <label for="measureEntry" class="block mb-2 text-sm font-medium text-light-900 dark:text-white">Entry</label>
              <input v-model="measure.measureEntry"
                  type="number"
                  name="measureEntry" 
                  id="measureEntry" 
                  placeholder="70 - 120" 
                  required="Empty entry!!!"
                  class="bg-gray-50 border border-gray-300 text-light-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>

            <div>
              <label for="textAreaExample" class="block mb-2 text-sm font-medium text-light-900 dark:text-white">Obs.:</label>
              <textarea v-model="measure.obs"
                    id="textAreaExample" 
                    rows="4"
                    class="bg-gray-50 border border-gray-300 text-light-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </textarea>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input v-model="measure.isActive"
                        id="isactive" 
                        aria-describedby="is Active" 
                        type="checkbox" 
                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800">
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="isactive" class="text-gray-500 dark:text-gray-300">is Active</label>
                  </div>
              </div>
              
            </div>
            <button type="button" @click="saveMeasure" 
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Save
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
