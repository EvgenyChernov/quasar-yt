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
      <q-card-section>
        <q-input
          class="q-mb-md"
          :bg-color="useLightOrDark('white', 'dark')"
          label="Email"
          type="email"
          autocomplete="email"
          filled
        />
        <q-input
          class="q-mb-md"
          :bg-color="useLightOrDark('white','dark')"
          label="Пароль"
          type="password"
          autocomplete="password"
          filled
        />
        <q-btn
          to="/"
          class="full-width"
          outline
          label="Продолжить"
          color="white"
          no-caps
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useLightOrDark} from "src/use/useLightOrDark";

const tab = ref('login')

import ToolbarTitle from "components/Layout/ToolbarTitle.vue";
</script>
