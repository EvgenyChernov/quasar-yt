import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";
import {uid, Notify} from "quasar";

export const useStoreSetting = defineStore('setting', () => {

  //state

    const settings = reactive({
      promptToDelete: true,
      showRunningBalance: true,
    })

  //getters


  //actions


  // helpers

  return {
  //state
    settings

  //getters


  //actions

  }
})