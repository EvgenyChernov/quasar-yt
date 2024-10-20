<template>
  <q-layout view="hHh lpR lFf">
    <q-header
      :elevated="useLightOrDark(true, false)"
    >
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
            <q-icon name="wallet"/>
            Мой Кашылок
          </div>
        </q-toolbar-title>
        <q-btn
          v-if="$route.fullPath === '/'"
          @click="storeEntries.options.sort = !storeEntries.options.sort"
          :label="!storeEntries.options.sort? 'Сортировать':'Не сортировать'"
          flat
          no-caps
          dense
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      class="bg-primary"
      :width="250"
      :breakpoint="767"
      show-if-above
      :elevated="useLightOrDark(true, false)"
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
        <q-item
          v-if="$q.platform.is.electron"
          @click="quitApp"
          clickable
          tag="a"
          class="text-black absolute-bottom"
        >
          <q-item-section
            avatar
          >
            <q-icon name="power_settings_new"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>Quit</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {EssentialLinkProps} from 'components/Nav/NavLink.vue';
import NavLink from "components/Nav/NavLink.vue";
import {useStoreEntries} from "stores/storeEntries";
import {useLightOrDark} from "src/use/useLightOrDark";
import {useQuasar} from 'quasar'
import {useAmountColorClass} from "src/use/AmountColorClass";
import {useCurrencify} from "src/use/useCurrencify";

const $q = useQuasar(),
  storeEntries = useStoreEntries()

const quitApp = () => {
  $q.dialog({
    message: 'Вы действительно хотите выйти?',
    cancel: {
      label: 'Отмена',
      color: 'positive',
    },
    ok: {
      label: 'Выйти',
      color: 'negative'
    },
    persistent: true,
    html: true
  }).onOk(() => {
    console.log('выход')
  })
}

defineOptions({
  name: 'MainLayout'
});

const navLinks: EssentialLinkProps[] = [
  {
    title: 'Записи',
    icon: 'wallet',
    link: '/'
  },
  {
    title: 'Настройки',
    icon: 'settings',
    link: '/settings'
  }
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
