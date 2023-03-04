<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useMeasureStore } from '../stores/MeasureStore'
import router from '../plugins/router'
import { MyGlicUser } from "../models/MyGlicUser"
import { MyGlicMeasure } from "../models/MyglicMeasure"
import { formatTimestampFromDate } from "../components/MyDateUtils"

const URL = "http://localhost:8180/v1/measure"

const userStore = useUserStore()
const measureStore = useMeasureStore()

const userLogged: MyGlicUser = userStore.user
const userMeasures:Array<MyGlicMeasure> = new Array<MyGlicMeasure>()
const uMs:Ref<Array<MyGlicMeasure>> = ref(userMeasures)

if (userLogged==null || userLogged.login == "") {
  router.push({
    name: 'login',
  })
}

function retrieveList(userId: Number) {
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
        let m: MyglicMeasure = {
          count: cnt++,
          id: element.id,
          dtEntry: formatTimestampFromDate(element.dtEntry),
          measureEntry: element.measureEntry,
          obs: element.obs,
          isActive: element.isActive,
          isDeleted: element.isDeleted,
          userId: element.userId,
        }
        uMs.value.push(m)
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

retrieveList(userLogged.id)

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
                        <th scope="col" class="px-4 py-4">#</th>
                        <th scope="col" class="px-4 py-4">Delete</th>
                        <th scope="col" class="px-4 py-4">Active</th>
                        <th scope="col" class="px-6 py-4">Datetime</th>
                        <th scope="col" class="px-4 py-4">Rate</th>
                        <th scope="col" class="px-6 py-4">Obs.:</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="measure in uMs" 
                          class="border-b dark:border-neutral-500">
                        <td class="whitespace-nowrap px-4 py-4 font-medium">{{ measure.count }}</td>
                        <td class="whitespace-nowrap px-4 py-4 font-medium">
                          <button @click="inactivate(measure)"
                              type="button" 
                              class="btn btn-primary btn-floating btn-rounded danger">
                              <img src="../assets/trash.svg"  alt="Trash" height="15" width="15" />
                        </button>
                        </td>
                        <td class="whitespace-nowrap px-4 py-4" >
                          <input v-model="measure.isActive"
                              id="isactive" 
                              aria-describedby="is Active" 
                              type="checkbox" 
                              disabled
                              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800">
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">{{ measure.dtEntry }}</td>
                        <td class="whitespace-nowrap px-4 py-4">{{ measure.measureEntry }}</td>
                        <td class="whitespace-nowrap px-6 py-4">{{ measure.obs }}</td>
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