<template>
  <q-page class="">
    <div class="q-pa-md">
      <q-list
        bordered
        separator
      >
        <q-item v-for="item in entries" :key="item.id">
          <q-item-section
            class="text-weight-bold"
            :class="useAmountColorClass(item.amount)"
          >
            <q-item-label>{{ item.name }}</q-item-label>
          </q-item-section>
          <q-item-section
            class="text-weight-bold"
            :class="useAmountColorClass(item.amount)"
            side
          >
            {{ useCurrencify(item.amount) }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <q-footer
      class="bg-transparent"
    >
      <div class="row q-mb-sm q-px-md q-py-sm q-col-gutter-sm shadow-up-3">
        <div class="col text-grey-7 text-h6">Баланс:</div>
        <div
          :class="useAmountColorClass(balance)"
          class="col text-h6 text-right"
        >{{  useCurrencify(balance) }}</div>
      </div>
      <div class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary">
        <div class="col">
          <q-input
            outlined
            placeholder="Название"
            bg-color="white"
            dense
          />
        </div>
        <div class="col">
          <q-input
            input-class="text-right"
            outlined
            type="number"
            step="0.01"
            placeholder="Сумма"
            bg-color="white"
            dense
          />
        </div>
        <div class="col col-auto">
          <q-btn round color="primary" icon="add"/>
        </div>
      </div>
    </q-footer>
  </q-page>
</template>

<script setup lang="ts">

import {ref, computed} from "vue";
import {useCurrencify} from "src/use/useCurrencify"
import {useAmountColorClass} from "src/use/AmountColorClass";

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

const balance = computed(() => {
 return  entries.value.reduce((accumulator, {amount}) => {
  return  accumulator + amount;
 },0)
})

</script>



