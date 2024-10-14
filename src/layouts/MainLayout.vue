<template>
  <q-layout view="lHh Lpr lFf">
    <q-img
        src="p1.jpg"
        class="fit absolute"
    />
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
</script>

<style scoped>
.q-page {
  max-width: 600px;
  margin: 0 auto;
}
</style>/