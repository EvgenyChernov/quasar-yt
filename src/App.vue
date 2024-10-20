<template>
  <router-view />
</template>

<script setup lang="ts">
import {useStoreSetting} from "stores/storeSetting";
import {onMounted} from "vue";

const storeSetting = useStoreSetting();
defineOptions({
  name: 'App'
});

onMounted(()=>{
  storeSetting.loadSettings()
})


// window.addEventListener('contextmenu', e => {
//   e.preventDefault();
// })
</script>
