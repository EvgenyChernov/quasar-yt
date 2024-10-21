import {defineStore} from "pinia";
import {computed, reactive, ref, watch, nextTick} from "vue";
import {uid, Notify, LocalStorage} from "quasar";
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "src/firebase/firebase"

export const useStoreEntries = defineStore('entries', () => {

  const entries = ref([
    // {
    //   id: 'id1',
    //   name: 'Зарплата',
    //   amount: 50000.99,
    //   paid: false
    // },
    // {
    //   id: 'id2',
    //   name: 'Аренда',
    //   amount: -3000,
    //   paid: false
    // },
    // {
    //   id: 'id3',
    //   name: 'Телефон',
    //   amount: 1200,
    //   paid: false
    // },
    // {
    //   id: 'id4',
    //   name: 'Неизвестно',
    //   amount: 0,
    //   paid: false
    // },
  ])

  const entriesLoaded = ref(false)

  // watch(entries.value, () => {
  //   saveEntries()
  // })

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

  const runningBalances = computed(() => {
    let runningBalances = [],
      currentRunningBalance = 0;
    if (entries.value.length) {
      entries.value.forEach(entry => {
        let entryAmount = entry.amount ? entry.amount : 0;
        currentRunningBalance += entryAmount;
        runningBalances.push(currentRunningBalance);
      })
    }
    return runningBalances
  })


  // actions

  const loadEntries = async () => {
    entriesLoaded.value = false
    const unsubscribe = onSnapshot(collection(db, "entries"), (querySnapshot) => {
      let entriesFB = []

      querySnapshot.forEach((doc) => {
        let entry = doc.data()
        entriesFB.push(entry)
      });
      entries.value = entriesFB;
      entriesLoaded.value = true
    });

    // отключение прослушивания данных
    // unsubscribe()
  }

  const addEntry = addEntryForm => {
    const newEntry = Object.assign({}, addEntryForm, {id: uid(), paid: false})
    entries.value.push(newEntry)
  }

  const deleteEntry = id => {
    const index = getEntryIndexById(id)
    entries.value.splice(index, 1)
    removeSlideItemIfExists(id)
    Notify.create({
      message: 'Запись удалена',
      position: 'top',
    })
  }

  const updateEntry = (entryId, updates) => {
    const index = getEntryIndexById(entryId)
    Object.assign(entries.value[index], updates)
  }

  const sortEnd = ({oldIndex, newIndex}) => {
    const movedEntry = entries.value[oldIndex]
    entries.value.splice(oldIndex, 1)
    entries.value.splice(newIndex, 0, movedEntry)
  }

  // const saveEntries = () => {
  //   LocalStorage.setItem("entries", entries.value)
  // }


  // helpers

  const getEntryIndexById = id => {
    return entries.value.findIndex(entry => entry.id === id)
  }

  const removeSlideItemIfExists = (entryId) => {
    // исправление: при удалении (после сортировки)
    // иногда элемент слайда не удаляется
    // из дома. это удалит слайд
    // элемент из домена, если он еще существует
    // (после удаления записи из массива записей)
    nextTick(() => {
      const slideItem = document.querySelector(`#id-${entryId}`)
      if (slideItem) slideItem.remove()
    })

  }

  return {
    //state
    entries,
    entriesLoaded,
    options,

    //getters
    balance,
    balancePaid,

    //actions
    loadEntries,
    addEntry,
    deleteEntry,
    updateEntry,
    sortEnd,
    runningBalances
  }
})