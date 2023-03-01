import { defineStore } from "pinia"
import { MyGlicUser } from "../models/MyGlicUser"

export const useUserStore = defineStore('userStore',{
  state: () => {
    return {
      user: {} as MyGlicUser | null,
    }
  },

  getters: {
    getUser: (state) => {
      return state.user
    }
  },

  actions: {
    setUser(user: MyGlicUser) {
      this.user = user
    }
  }

})