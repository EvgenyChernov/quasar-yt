<template>
  <q-page class="">
    <div class="q-pa-md">
      <q-list
          bordered
          separator
      >
        <q-item v-for="item in entries" :key="item.id">
          <q-item-section>
            <q-item-label>{{ item.name }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            {{ currencify(item.amount) }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup lang="ts">

import {ref} from "vue";

const entries = ref([
  {
    id: 'id1',
    name: 'Зарплата',
    amount: 50000.99
  },
  {
    id: 'id2',
    name: 'Аренда',
    amount: -3000
  },
  {
    id: 'id3',
    name: 'Телефон',
    amount: 1200
  },
  {
    id: 'id4',
    name: 'Неизвестно',
    amount: 0
  },
])


function currencify(amount: number) {
 //
   const amountFormatted = amount.toLocaleString('ru-RU', {
     minimumFractionDigits: 2,
     maximumFractionDigits: 2
   })
  return amountFormatted
}

</script>



