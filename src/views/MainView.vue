<script lang="ts">
import { ref, toRefs, watch } from 'vue'
import MyglicUser from '../components/model/MyglicUser'
import { storeToRefs } from "pinia";
import { useUserStore } from '../stores/user.ts'
import { isProxy, toRaw } from 'vue';

const { user } = storeToRefs(useUserStore());

const store = useUserStore()

console.log(isProxy(user) ? 'yup' : 'nope')

 const userLogin:MyglicUser = user

console.log(user)
  
</script>

<template>
  <section class="dark:bg-grey-900/50">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-gray-800 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 v-if="user"
              class="text-xl font-bold leading-tight tracking-tight text-light-900 md:text-2xl dark:text-white">
              {{ user.login }}
            
          </h1>

          <h1 v-if="!userLogin"
              class="text-xl font-bold leading-tight tracking-tight text-light-900 md:text-2xl dark:text-white">
              Error!!!
            
          </h1>
        </div>
      </div>
    </div>
  </section>
</template>

<style>

</style>