import { defineStore } from "pinia"

export const useMessageStore = defineStore('messageStore',{
  state: () => {
    return {
      message: {} as string || "",
    }
  },

  getters: {
    getMessage(state): string  {
      return state.message
    }
  },

  actions: {
    setMessage(message: string) {
      this.message = message
    }
  }

})