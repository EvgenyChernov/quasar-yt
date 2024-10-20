<template>
  <router-view/>
</template>

<script setup lang="ts">
import {useStoreSetting} from "stores/storeSetting";
import {useStoreEntries} from "stores/storeEntries";
import {onMounted} from "vue";
import {useRouter} from "vue-router";

const storeSetting = useStoreSetting(),
  storeEntries = useStoreEntries(),
  router = useRouter();

defineOptions({
  name: 'App'
});

onMounted(() => {
  storeSetting.loadSettings()
  storeEntries.loadEntries()

  window.electron.ipcRenderer.on('show-settings', (_event, value) => {
    router.push('/settings')
  });
})


// window.addEventListener('contextmenu', e => {
//   e.preventDefault();
// })
</script>
