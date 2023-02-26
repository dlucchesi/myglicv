import { defineStore } from "pinia"
import MyglicUser from '../components/model/MyglicUser'

 export const useUserStore = defineStore('useUserStore',{
  state: () => {
    return {
      user: null as MyglicUser | null,
    }
  },
  
  getters: {
    getUser: (state) => state.user
  },

  actions: {
    addUser(user){
      this.user = user
    },
  },
})