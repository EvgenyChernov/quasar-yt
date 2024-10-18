import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {uid, Notify} from "quasar";

export const useStoreEntries = defineStore('entries', () => {

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

  const addEntry = addEntryForm => {
    const newEntry = Object.assign({}, addEntryForm, {id: uid()})
    entries.value.push(newEntry)
  }

  const deleteEntry = id => {
    const index = entries.value.findIndex(entry => entry.id === id)
    entries.value.splice(index, 1)
    Notify.create({
      message: 'Запись удалена',
      position: 'top',
    })
  }


  return {
    entries,
    balance,
    addEntry,
    deleteEntry
  }
})