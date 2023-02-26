<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import { MyglicUser } from "./components/model/MyglicUser";

const login: MyglicUser = {
  type: "",
  id: 0,
  isDeleted: false,
  isActive: true,
  login: "",
  passwd: "",
}

const props = defineProps({
  
})

</script>

<template>
  <section class="dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold dark:text-white">
          <img class="w-8 h-8 mr-2" src="./assets/marvin.png" 
              alt="logo">
          Myglic    
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
router-link {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
router-link:hover {
  color: #535bf2;
}
</style>
