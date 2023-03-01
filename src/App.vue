<script setup lang="ts">
import router from './plugins/router';
</script>

<template>
  <section class="dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold dark:text-white">
          <img src="./assets/marvin.png" 
              class="w-8 h-8 mr-2 mylogo" 
              alt="logo">
          <div> Myglic    </div>
      </a>

      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link to="/about">About</router-link> 
      </nav>
      <main>
        <router-view />
      </main>
    </div>
  </section>
</template>

<style scoped>

</style>
