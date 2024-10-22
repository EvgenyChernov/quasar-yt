<template>
  <q-page class="flex flex-center">
    <q-card
      class="auth bg-primary text-white q-pa-lg"
    >
      <q-card-section>
        <ToolbarTitle/>
      </q-card-section>
      <q-card-section>
        <q-tabs
          v-model="tab"
          no-caps
        >
          <q-tab name="login" label="Вход"/>
          <q-tab name="register" label="Регистрация"/>
        </q-tabs>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const tab = ref('login')

import ToolbarTitle from "components/Layout/ToolbarTitle.vue";
</script>
