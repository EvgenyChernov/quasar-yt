<template>
  <q-slide-item
    @right="onEntrySlideRight"
    left-color="positive"
    right-color="negative"
  >
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
</template>

<script setup lang="ts">
import {useStoreEntries} from "stores/storeEntries";
import {useAmountColorClass} from "src/use/AmountColorClass";
import {useCurrencify} from "src/use/useCurrencify";
import {useQuasar} from "quasar";

const storeEntries = useStoreEntries()
const $q = useQuasar()


const props = defineProps({
  item: {
    type: Object,
    required: true,

  }
})

// удаление
const onEntrySlideRight = ({reset}) => {
  $q.dialog({
    title: 'Удаление записи',
    message: `Вы действительно хотите удалить запись?
    <div class="text-weight-bold q-mt-md ${useAmountColorClass(props.item.amount)}"
    >Изменится на ${useCurrencify(props.item.amount)}</div>
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
    storeEntries.deleteEntry(props.item.id)
  }).onCancel(() => {
    reset()
  })
}
</script>
