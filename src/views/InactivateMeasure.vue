<script setup lang="ts">
import { ref } from 'vue'
import router from '../plugins/router'
import { useUserStore } from '../stores/userStore'
import { useMeasureStore } from '../stores/MeasureStore'
import { MyGlicUser, createUserBlank } from "../models/MyGlicUser"
import { MyGlicMeasure, createMeasureBlank } from "../models/MyglicMeasure"
import { formatDateFromStr, formatTimeFromStr } from "../components/MyDateUtils";

const measureURL = "http://localhost:8180/v1/measure"
const userURL = "http://localhost:8180/v1/user"

const userStore = useUserStore()
const measureStore = useMeasureStore()

const userLogged:MyGlicUser = userStore.user || createUserBlank()
const measure:MyGlicMeasure = measureStore.measure || createMeasureBlank()

if (userLogged == null) {
  router.push({
    name: 'login',
  })
}

if (measure == null || (measure.id == null || measure.id == 0)) {
  console.error("Measure not found in store!")
  router.push({
    name: 'error',
  })
}

// Issue5: need to separate date and time
const mDate = ref(formatDateFromStr(measure.dtEntry))
const mTime = ref(formatTimeFromStr(measure.dtEntry))


function inactivateMeasure() {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }
  fetch(measureURL + "/inactivate/" + measure.id, requestOptions)
    .then(async response => {
      // const data = await response.json();
      // check for error response
      if (!response.ok) {
        // get error message from body or default to response statusText
        const error = response.statusText
        return Promise.reject(error);
      }
      // console.log(data)
      measureStore.measure = null
      router.push({ name: 'mylist' })	
    })
    .catch(error => {
      // this.errorMessage = error;
      console.error("Error on inactivate measure!", error)
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
              Measure
          </h1>
          <form class="space-y-4 md:space-y-6">
            <div>
              <label for="date" 
                  class="block mb-2 text-sm font-medium text-light-900 dark:text-white">Date</label>
              <input  v-model="mDate"
                  type="string"
                  name="date" 
                  id="date"
                  placeholder="2023.01.01" 
                  disabled="true"
                  class="bg-gray-50 border border-gray-300 text-light-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-100 dark:focus:border-pink-100">
            </div>

            <div>
              <label for="time" 
                  class="block mb-2 text-sm font-medium text-light-900 dark:text-white">Time</label>
              <input  v-model="mTime"
                  type="time"
                  name="time" 
                  id="time"
                  placeholder="00:00" 
                  disabled="true"
                  class="bg-gray-50 border border-gray-300 text-light-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-100 dark:focus:border-pink-100">
            </div>
            <div>
              <label for="measureEntry" class="block mb-2 text-sm font-medium text-light-900 dark:text-white">Entry</label>
              <input v-model="measure.measureEntry"
                  type="number"
                  name="measureEntry" 
                  id="measureEntry" 
                  placeholder="70 - 120" 
                  disabled="true"
                  class="bg-gray-50 border border-gray-300 text-light-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>

            <div>
              <label for="textAreaExample" class="block mb-2 text-sm font-medium text-light-900 dark:text-white">Obs.:</label>
              <textarea v-model="measure.obs"
                    id="textAreaExample" 
                    rows="4"
                    disabled="true"
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
                        disabled="true"
                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800">
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="isactive" class="text-gray-500 dark:text-gray-300">is Active</label>
                  </div>
              </div>
              
            </div>
            <button type="button" @click="inactivateMeasure()" 
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 danger">
              Inactivate
            </button>
            <button type="button" @click="router.push({ name: 'mylist' })" 
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
