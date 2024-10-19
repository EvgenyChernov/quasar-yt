<template>
  <q-slide-item
    @left="onEntrySlideLeft"
    @right="onEntrySlideRight"
    left-color="positive"
    right-color="negative"
    :class="{ 'bg-grey-2': item.paid }"
  >
    <template v-slot:right>
      <q-icon name="delete"/>
    </template>
    <template v-slot:left>
      <q-icon name="done_all"/>
    </template>
    <q-item>
      <q-item-section
        class="text-weight-bold"
        :class="[
          useAmountColorClass(item.amount),
          {'text-strike': item.paid }
          ]"
      >
        {{ item.name }}
        <q-popup-edit
          @save="onNameUpdate"
          :model-value="item.name"
          v-slot="scope"
          :cover="false"
          :offset="[16,11]"
          auto-save
          label-set="Сохранить"
          label-cancel="Отмена"
          anchor="top left"
          buttons
        >
          <q-input
            input-class="text-weight-bold letter-spacing-none"
            v-model="scope.value"
            dense
            autofocus
            @keyup.enter="scope.set"
          />
        </q-popup-edit>
      </q-item-section>
      <q-item-section
        class="text-weight-bold"
        :class="[
          useAmountColorClass(item.amount),
          {'text-strike': item.paid }
          ]"
        side
      >
        {{ useCurrencify(item.amount) }}
        <q-popup-edit
          @save="onAmountUpdate"
          :model-value="item.amount"
          v-slot="scope"
          :cover="false"
          :offset="[16,11]"
          auto-save
          label-set="Сохранить"
          label-cancel="Отмена"
          anchor="top left"
          buttons
        >
          <q-input
            v-model.number="scope.value"
            @keyup.enter="scope.set"
            input-class="text-weight-bold letter-spacing-none text-right"
            type="number"
            step="0.01"
            autofocus
            dense
          />
        </q-popup-edit>
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

const onEntrySlideLeft = ({reset}) => {
  storeEntries.updateEntry(props.item.id, {paid: !props.item.paid})
  reset()
}

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

const onNameUpdate = value => {
  storeEntries.updateEntry(props.item.id, {name: value})
}

const onAmountUpdate = value => {
  storeEntries.updateEntry(props.item.id, {amount: value})
}


</script>
