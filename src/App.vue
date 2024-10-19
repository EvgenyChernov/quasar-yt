<template>
  <router-view />
</template>

<script setup lang="ts">
defineOptions({
  name: 'App'
});

window.addEventListener('contextmenu', e => {
  e.preventDefault();
})
</script>
