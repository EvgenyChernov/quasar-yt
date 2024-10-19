import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";
import {uid, Notify} from "quasar";

export const useStoreEntries = defineStore('entries', () => {

  const entries = ref([
    {
      id: 'id1',
      name: 'Зарплата',
      amount: 50000.99,
      paid: false
    },
    {
      id: 'id2',
      name: 'Аренда',
      amount: -3000,
      paid: false
    },
    {
      id: 'id3',
      name: 'Телефон',
      amount: 1200,
      paid: false
    },
    {
      id: 'id4',
      name: 'Неизвестно',
      amount: 0,
      paid: false
    },
  ])

  const options = reactive({
    sort: false
  })


  const balance = computed(() => {
    return entries.value.reduce((accumulator, {amount}) => {
      return accumulator + amount;
    }, 0)
  })

  const balancePaid = computed(() => {
    return entries.value.reduce((accumulator, {amount, paid}) => {
      return paid ? accumulator + amount : accumulator;
    }, 0)
  })

  const addEntry = addEntryForm => {
    const newEntry = Object.assign({}, addEntryForm, {id: uid(), paid: false})
    entries.value.push(newEntry)
  }

  const deleteEntry = id => {
    const index = getEntryIndexById(id)
    entries.value.splice(index, 1)
    Notify.create({
      message: 'Запись удалена',
      position: 'top',
    })
  }

  const updateEntry = (entryId, updates) => {
    const index = getEntryIndexById(entryId)
    Object.assign(entries.value[index], updates)
  }

  const getEntryIndexById = id => {
    return entries.value.findIndex(entry => entry.id === id)
  }

  return {
    //state
    entries,
    options,

    //getters
    balance,
    balancePaid,

    //actions
    addEntry,
    deleteEntry,
    updateEntry,
  }
})