import { defineStore } from "pinia"
import { MyGlicMeasure } from "../models/MyglicMeasure.ts";

export const useMeasureStore = defineStore('measureStore',{
  state: () => {
    return {
      measure: {} as MyGlicMeasure | null,
    }
  },

  getters: {
    getMeasure: (state) => {
      return state.measure
    }
  },

  actions: {
    setUser(measure: MyGlicMeasure) {
      this.measure = measure
    }
  }

})