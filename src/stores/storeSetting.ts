import {defineStore} from "pinia";
import {computed, reactive, ref, watch} from "vue";
import {uid, Dark} from "quasar";

export const useStoreSetting = defineStore('setting', () => {

  //state

    const settings = reactive({
      promptToDelete: true,
      showRunningBalance: true,
      currencySymbol: '₽',
      darkMode: false,
    })

  watch(()=> settings.darkMode, value => {
    Dark.set(value)
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