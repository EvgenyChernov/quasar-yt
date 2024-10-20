<template>
  <router-view/>
</template>

<script setup lang="ts">
import {useStoreSetting} from "stores/storeSetting";
import {useStoreEntries} from "stores/storeEntries";
import {onMounted} from "vue";

const storeSetting = useStoreSetting();
const storeEntries = useStoreEntries();
defineOptions({
  name: 'App'
});

onMounted(() => {
  storeSetting.loadSettings()
  storeEntries.loadEntries()
})


// window.addEventListener('contextmenu', e => {
//   e.preventDefault();
// })
</script>
