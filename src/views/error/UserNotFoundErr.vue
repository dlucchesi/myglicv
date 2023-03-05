<script setup lang="ts">
import { useMessageStore } from '../../stores/MessageStore'
import router from '../../plugins/router'

const messageStore = useMessageStore()

function doNewUserRedirect() {
  router.push("/newuser")
}

</script>

<template>
  <section class="dark:bg-grey-900/50">
    <div class="flex flex-col items-center justify-center px-10 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-gray-800 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-light-900 md:text-2xl dark:text-white">
            Sorry but it's apeear to have some issue with your login or password. 
          </h1>
          <p>
            If your user is not inputed on our database yet, please click on the button below to create a new user.
          </p>
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            <button type="button" @click="doNewUserRedirect()" 
                  class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style>

</style>