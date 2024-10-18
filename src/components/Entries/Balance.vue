<template>
  <div class="row  q-px-md q-py-sm shadow-up-3">
    <div class="col text-grey-7 text-h6">Баланс:</div>
    <div
      :class="useAmountColorClass(storeEntries.balance)"
      class="col text-h6 text-right"
    >{{ useCurrencify(storeEntries.balance) }}
    </div>
  </div>
</template>

<script setup lang="ts">

import {useStoreEntries} from "stores/storeEntries";
import {useAmountColorClass} from "src/use/AmountColorClass";
import {useCurrencify} from "src/use/useCurrencify";

const storeEntries = useStoreEntries()
</script>
