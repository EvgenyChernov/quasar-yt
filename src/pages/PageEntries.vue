<template>
  <q-page class="">
    <div class="q-pa-md">
      <q-list
        bordered
        separator
      >
        <q-slide-item
          v-for="item in entries" :key="item.id"
          @right="onEntrySlideRight($event, item.id)"
          left-color="positive"
          right-color="negative"
        >
<!--          <template v-slot:left>-->
<!--            <q-icon name="done"/>-->
<!--          </template>-->
          <template v-slot:right>
            <q-icon name="delete"/>
          </template>

          <q-item>
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
        </q-slide-item>
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
        >{{ useCurrencify(balance) }}
        </div>
      </div>
      <q-form
        @submit="addEntry"
        class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary">
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
    </q-footer>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar, uid } from 'quasar'
import {ref, computed, reactive} from "vue";
import {useCurrencify} from "src/use/useCurrencify"
import {useAmountColorClass} from "src/use/AmountColorClass";

const $q = useQuasar()

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
  return entries.value.reduce((accumulator, {amount}) => {
    return accumulator + amount;
  }, 0)
})

/// добавление строки

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

const addEntry = () => {
  // const newEntry = {
  //   id: uid(),
  //   name: addEntryForm.name,
  //   amount:addEntryForm.amount,
  // }
  const newEntry = Object.assign({}, addEntryForm, {id: uid()})
  entries.value.push(newEntry)
  addEntryFormReset()
}

// удаление
const onEntrySlideRight = ({reset}, id) => {
  $q.dialog({
    title: 'Удаление записи',
    message: 'Вы действительно хотите удалить запись?',
    cancel: {
      label: 'Отмена',
      color: 'positive',
    },
    ok: {
      label: 'Удалить',
      color: 'negative'
    },
    persistent: true
  }).onOk(() => {
   deleteEntry(id)
  }).onCancel(() => {
    reset()
  })
}

const deleteEntry = (id) => {
  const index = entries.value.findIndex(entry => entry.id === id)
  entries.value.splice(index, 1)
}


</script>



