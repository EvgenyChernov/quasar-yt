<template>
  <q-page class="">
    <div class="q-pa-md">
      <NothingHere
        v-if="!storeEntries.entries.length"
      />
      <q-list
        v-else
        bordered
        separator
      >
        <Entry
          v-for="item in storeEntries.entries"
          :key="item.id"
          :item="item"
        />
      </q-list>
    </div>
    <q-footer
      class="bg-transparent"
    >
      <Balance/>
      <AddEntry/>
    </q-footer>
  </q-page>
</template>

<script setup lang="ts">
import {useStoreEntries} from "src/stores/storeEntries"
import Balance from "components/Entries/Balance.vue";
import AddEntry from "components/Entries/AddEntry.vue";
import Entry from "components/Entries/Entry.vue";
import NothingHere from "components/Entries/NothingHere.vue";

const storeEntries = useStoreEntries()

</script>



