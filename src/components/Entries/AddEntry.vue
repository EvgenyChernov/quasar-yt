<template>
  <q-form
    @submit="addEntryFormSubmit"
    class="row q-px-sm q-py-sm bg-primary q-gutter-x-sm">
    <div class="col">
      <q-input
        v-model="addEntryForm.name"
        ref="nameRef"
        outlined
        placeholder="Название"
        bg-color="white"
        dense
      />
    </div>
    <div class="col">
      <q-input
        v-model.number="addEntryForm.amount"
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
      <q-btn
        type="submit"
        round
        color="primary"
        icon="add"/>
    </div>
  </q-form>
</template>

<script setup lang="ts">
/// добавление строки
import {useStoreEntries} from "stores/storeEntries";

const storeEntries = useStoreEntries()
import {reactive, ref} from "vue";

const nameRef = ref<string>(null)

const addEntryFormDefault = {
  name: '',
  amount: null,
}

const addEntryForm = reactive({
  ...addEntryFormDefault
})

const addEntryFormReset = () => {
  Object.assign(addEntryForm, addEntryFormDefault)
  nameRef.value.focus()
}

const addEntryFormSubmit = () => {
  storeEntries.addEntry(addEntryForm)
  addEntryFormReset()
}
</script>
