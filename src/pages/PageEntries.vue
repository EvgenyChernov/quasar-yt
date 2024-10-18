<template>
  <q-page class="">
    <div class="q-pa-md">
      <q-list
        bordered
        separator
      >
        <q-slide-item
          v-for="item in storeEntries.entries" :key="item.id"
          @right="onEntrySlideRight($event, item)"
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
      <div class="row  q-px-md q-py-sm shadow-up-3">
        <div class="col text-grey-7 text-h6">Баланс:</div>
        <div
          :class="useAmountColorClass(storeEntries.balance)"
          class="col text-h6 text-right"
        >{{ useCurrencify(storeEntries.balance) }}
        </div>
      </div>
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
    </q-footer>
  </q-page>
</template>

<script setup lang="ts">
import {useQuasar} from 'quasar'
import {ref, reactive} from "vue";
import {useCurrencify} from "src/use/useCurrencify"
import {useAmountColorClass} from "src/use/AmountColorClass";
import {useStoreEntries} from "src/stores/storeEntries"

const storeEntries = useStoreEntries()

const $q = useQuasar()

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

const addEntryFormSubmit = () =>{
  storeEntries.addEntry(addEntryForm)
  addEntryFormReset()
}

// удаление
const onEntrySlideRight = ({reset}, item) => {
  $q.dialog({
    title: 'Удаление записи',
    message: `Вы действительно хотите удалить запись?
    <div class="text-weight-bold q-mt-md ${useAmountColorClass(item.amount)}"
    >Изменится на ${useCurrencify(item.amount)}</div>
    `,
    cancel: {
      label: 'Отмена',
      color: 'positive',
    },
    ok: {
      label: 'Удалить',
      color: 'negative'
    },
    persistent: true,
    html: true
  }).onOk(() => {
    storeEntries.deleteEntry(item.id)
  }).onCancel(() => {
    reset()
  })
}

</script>



