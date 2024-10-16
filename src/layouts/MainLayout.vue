<template>
  <q-layout view="hHh lpR lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <div class="absolute-center	">
            <q-icon name="account_balance_wallet"/>
            Мой Кашылок
          </div>
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      class="bg-primary"
      :width="250"
      :breakpoint="767"
      show-if-above
      elevated
    >
      <q-list>
        <q-item-label
            class="text-black"
          header
        >
          Навигация
        </q-item-label>

        <NavLink
          v-for="link in navLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { EssentialLinkProps } from 'components/Nav/NavLink.vue';
import NavLink from "components/Nav/NavLink.vue";

defineOptions({
  name: 'MainLayout'
});

const navLinks: EssentialLinkProps[] = [
  {
    title: 'Записи',
    icon: 'savings',
    link: '/'
  },
  {
    title: 'Настройки',
    icon: 'settings',
    link: '/settings'
  }
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
