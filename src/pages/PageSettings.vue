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

      </q-list>
    </div>
  </q-page>
</template>

<script setup lang="ts">

import {useStoreSetting} from "stores/storeSetting";

const storeSetting = useStoreSetting()

</script>
