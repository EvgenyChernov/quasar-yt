<template>
  <router-view/>
</template>

<script setup lang="ts">
import {useStoreSetting} from "stores/storeSetting";
import {onMounted} from "vue";
import {useRouter} from "vue-router";
import {useQuasar} from "quasar";
import {useStoreAuth} from "stores/storeAuth";

const storeAuth = useStoreAuth(),
  storeSetting = useStoreSetting(),
  router = useRouter(),
  $q = useQuasar()

defineOptions({
  name: 'App'
});

onMounted(() => {
  storeAuth.init()
  storeSetting.loadSettings()


  if ($q.platform.is.electron){
    if (window.electron && window.electron.ipcRenderer) {
      window.electron.ipcRenderer.on('show-settings', (_event, value) => {
        router.push('/settings');
      });
    } else {
      console.error('ipcRenderer is not available');
    }
  }
})


// window.addEventListener('contextmenu', e => {
//   e.preventDefault();
// })
</script>
