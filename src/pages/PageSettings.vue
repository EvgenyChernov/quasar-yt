<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered padding>

        <q-item-label header>Записи</q-item-label>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Подтверждение удаления</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle
              v-model="storeSetting.settings.promptToDelete"
            />
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Показать текущий баланс</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle
              v-model="storeSetting.settings.showRunningBalance"
            />
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-input v-select-all outlined v-model="storeSetting.settings.currencySymbol" label="Знак валюты"/>
          </q-item-section>
        </q-item>
        <q-separator spaced/>

        <q-item-label header>Тема</q-item-label>

        <q-list>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="storeSetting.settings.darkMode"
                       :val="false"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>Светлая</q-item-label>
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio
                v-model="storeSetting.settings.darkMode"
                :val="true"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>Темная</q-item-label>
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple>
            <q-item-section avatar top>
              <q-radio
                v-model="storeSetting.settings.darkMode"
                val="auto"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>Авто</q-item-label>
              <q-item-label caption>В зависимости от вашего устройства</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <div class="q-px-sm q-mt-sm">
          Your selection is: <strong>{{ color }}</strong>
        </div>

      </q-list>
    </div>
  </q-page>
</template>

<script setup lang="ts">

import {useStoreSetting} from "stores/storeSetting";
import vSelectAll from "src/directives/directiveSelectorAll"

const storeSetting = useStoreSetting()

</script>
