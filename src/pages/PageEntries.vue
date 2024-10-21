<template>
  <q-page class="">
    <div class="q-pa-md">
      <template
      v-if="storeEntries.entriesLoaded"
      >
        <transition
          appear
          enter-active-class="animated jackInTheBox slower"
        >
          <NothingHere
            v-if="!storeEntries.entries.length"
          />
        </transition>
        <q-list
          v-if="storeEntries.entries.length"
          class="entries"
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
                :index="index"
              />
            </template>
          </Sortable>

        </q-list>
      </template>
    </div>
    <q-footer
      class="bg-transparent"
    >
      <transition
        appear
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOutDown"
      >
        <Balance v-if="storeEntries.entries.length"/>
      </transition>
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



