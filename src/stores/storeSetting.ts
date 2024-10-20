import {defineStore} from "pinia";
import {computed, reactive, ref, watch} from "vue";
import {uid, Dark, LocalStorage} from "quasar";

export const useStoreSetting = defineStore('setting', () => {

  //state

  const settings = reactive({
    promptToDelete: true,
    showRunningBalance: true,
    currencySymbol: '₽',
    darkMode: false,
  })

  watch(() => settings.darkMode, value => {
    Dark.set(value)
  }, {immediate: true})

  watch(settings, () => {
    saveSettings(settings)
  })

  //getters


  //actions
  const saveSettings = () => {
    LocalStorage.setItem("settings", settings)
  }

  const loadSettings = () => {
    const savedSettings = LocalStorage.getItem("settings")
    if (savedSettings) Object.assign(settings, savedSettings)
  }

  // helpers

  return {
    //state
    settings,

    //getters


    //actions
    loadSettings,
  }
})