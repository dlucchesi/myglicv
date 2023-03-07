<script setup lang="ts">
import { ref, Ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useMeasureStore } from '../stores/MeasureStore'
import router from '../plugins/router'
import { MyGlicUser,createUserBlank } from "../models/MyGlicUser"
import { MyGlicMeasure,createMeasureAny } from "../models/MyglicMeasure"
import { formatTimestampFromDate } from "../components/MyDateUtils"

const URL = "http://localhost:8180/v1/measure"

const userStore = useUserStore()
const measureStore = useMeasureStore()

const userLogged:MyGlicUser = userStore.user || createUserBlank()
const userMeasures:Array<MyGlicMeasure> = new Array<MyGlicMeasure>()
const uMs:Ref<Array<MyGlicMeasure>> = ref(userMeasures)
  
const orderReverse = ref(true)

if (userLogged==null || userLogged.login == "") {
  router.push({
    name: 'login',
  })
}

function invertOrder() {
  orderReverse.value = !orderReverse.value
  orderMeasuresByDate()
}

function orderMeasuresByDate() {
  uMs.value.sort((a:MyGlicMeasure, b:MyGlicMeasure) => {
    if (!orderReverse.value) {
      if (a.dtEntry < b.dtEntry) {
        return -1
      }
      if (a.dtEntry > b.dtEntry) {
        return 1
      }
      return 0
    } else {
      if (a.dtEntry < b.dtEntry) {
        return 1
      }
      if (a.dtEntry > b.dtEntry) {
        return -1
      }
      return 0
    }
  })
  // let c:Number = 1
  // uMs.value.forEach((element:MyGlicMeasure) => {
  //   element.count = c++
  // })
}

function retrieveList(userId: number) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }
  fetch(URL + "/userId/" + userId, requestOptions)
    .then(async response => {
      const data = await response.json();
      // check for error response
      if (!response.ok) {
        // get error message from body or default to response statusText
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      let cnt:Number = 1
      data.forEach((element: any) => {
        let m:MyGlicMeasure = createMeasureAny(element)
        uMs.value.push(m)
        orderMeasuresByDate()
      })
    })
    .catch(error => {
      // this.errorMessage = error;
      console.error("There was an error!", error)
      router.push({ name: 'error' })
    })
}

function inactivate(m: MyGlicMeasure) {
  measureStore.measure = m
  router.push({ name: 'inactivatemeasure' })
}

retrieveList(userLogged.id as number)

</script>

<template>
  <section class="dark:bg-grey-900/50">
    <div class="flex flex-col items-center justify-center py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-gray-800 rounded-lg shadow dark:border md:max-xl  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-light-900 md:text-2xl dark:text-white">
            Welcome user: {{ userLogged.login }}
          </h1>
        </div>

        <button @click="router.push({ name: 'newmeasure' })"
              type="button" 
              class="btn btn-primary btn-floating btn-rounded">
          +
        </button>

        <div class="flex flex-col overflow-x-auto">
            <div class="sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 sm:px-1 lg:px-20">
                <div class="overflow-x-auto">
                  <table class="min-w-full text-sm font-light place-items-center">
                    <thead class="border-b font-medium dark:border-neutral-500">
                      <tr>                       
                        <th scope="col" class="px-4 py-4">Active</th>
                        <th scope="col" class="px-6 py-4" >
                          <div class="flex items-center">
                            Datetime
                            <a @click.prevent="invertOrder()" >
                              <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  class="w-3 h-3 ml-1" 
                                  aria-hidden="true" 
                                  fill="currentColor" 
                                  viewBox="0 0 320 512">
                                <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/>
                              </svg>
                            </a>
                          </div>
                        </th>
                        <th scope="col" class="px-4 py-4">Rate</th>
                        <th scope="col" class="px-6 py-4">Obs.:</th>
                        <th scope="col" class="px-4 py-4">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="measure in uMs"
                          class="border-b dark:border-neutral-500 hover:bg-gray-50">
                        <td class="whitespace-nowrap px-4 py-4" >
                          <input v-model="measure.isActive"
                              id="isactive" 
                              aria-describedby="is Active" 
                              type="checkbox" 
                              disabled
                              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800">
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">{{ measure.dtEntry }}</td>
                        <td class="whitespace-nowrap px-4 py-4">{{ formatTimestampFromDate(measure.dtEntry) }}</td>
                        <td class="whitespace-nowrap px-6 py-4">{{ measure.obs }}</td>
                        <td class="whitespace-nowrap px-4 py-4 font-medium">
                          <button @click="inactivate(measure)"
                              type="button" 
                              class="btn btn-primary btn-floating btn-rounded danger">
                            <img src="../assets/trash.svg"  alt="Trash" height="15" width="15" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

      </div>
    </div>
  </section>
</template>

<style>

</style>