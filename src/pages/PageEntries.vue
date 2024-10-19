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
        <Sortable
          @end="storeEntries.sortEnd"
          :list="storeEntries.entries"
          item-key="id"
          tag="div"
          :options="{
            handle: '.handle',
            animation: 150,
          }"
        >
          <template #item="{element, index}">
            <Entry
              :key="element.id"
              :item="element"
            />
          </template>
        </Sortable>

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
import {Sortable} from "sortablejs-vue3";

const storeEntries = useStoreEntries()

</script>



