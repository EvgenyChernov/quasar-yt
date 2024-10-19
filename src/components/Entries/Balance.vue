<template>
  <div class="row  q-px-md q-py-sm shadow-up-3 items-center">
    <div class="col text-grey-7 text-h6">Баланс:</div>
    <div
      :class="useAmountColorClass(storeEntries.balance)"
      class="col text-h6 text-right"
    >
      <div class="row">
        <div class="col">
          {{ useCurrencify(storeEntries.balance) }}
        </div>
      </div>
      <div
        v-if="storeEntries.balancePaid"
        class="row">
        <div class="col text-caption text-grey-6">
          Оплачено:
          <span class="text-weight-bold"
                :class="useAmountColorClass(storeEntries.balancePaid)">
            {{ useCurrencify(storeEntries.balancePaid) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {useStoreEntries} from "stores/storeEntries";
import {useAmountColorClass} from "src/use/AmountColorClass";
import {useCurrencify} from "src/use/useCurrencify";

const storeEntries = useStoreEntries()
</script>
