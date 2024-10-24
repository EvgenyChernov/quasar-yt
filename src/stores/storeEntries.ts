import {defineStore} from "pinia";
import {computed, reactive, ref, watch, nextTick} from "vue";
import {Dialog, Notify} from "quasar";
import {useStoreAuth} from "stores/storeAuth";
import {collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc, query, orderBy} from "firebase/firestore";
import {db} from "src/firebase/firebase"

// const entriesCollectionRef = collection(db, "users", 'xGV6k98LkaRoYJWhUhLsMXKxiTs2', 'entries')
let entriesCollectionRef = null,
  entriesQueryRef  = null,
  getEntriesSnapshot = null

export const useStoreEntries = defineStore('entries', () => {

  const entries = ref([
    // {
    //   id: 'id1',
    //   name: 'Зарплата',
    //   amount: 50000.99,
    //   paid: false,
    //   order: 1
    // },
    // {
    //   id: 'id2',
    //   name: 'Аренда',
    //   amount: -3000,
    //   paid: false,
    //   order: 2
    // },
    // {
    //   id: 'id3',
    //   name: 'Телефон',
    //   amount: 1200,
    //   paid: false,
    //   order: 3
    // },
    // {
    //   id: 'id4',
    //   name: 'Неизвестно',
    //   amount: 0,
    //   paid: false,
    //   order: 4
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

  const init = () => {
    const storeAuth = useStoreAuth();
    entriesCollectionRef = collection(db, "users", storeAuth.userDetails.id, 'entries')
    entriesQueryRef = query(entriesCollectionRef, orderBy('order', ))
    loadEntries()
  }


  const loadEntries = async (showLoader = true) => {
    if (showLoader) entriesLoaded.value = false
    getEntriesSnapshot = onSnapshot(entriesQueryRef, (querySnapshot) => {
      let entriesFB = []

      querySnapshot.forEach((doc) => {
        let entry = doc.data()
        entry.id = doc.id
        entriesFB.push(entry)
      });
      entries.value = entriesFB;
      entriesLoaded.value = true
    }, error => {
      Dialog.create({
        title: 'Ошибка: ',
        message: error.message,
      })
    })
  }

  const clearAndStopEntries = () => {
    entries.value = []
    if (getEntriesSnapshot) getEntriesSnapshot()
  }

  const addEntry = async addEntryForm => {
    const newEntry = Object.assign({}, addEntryForm, {paid: false, order: generateOrderNumber()})
    await addDoc(entriesCollectionRef, newEntry);
  }


  const deleteEntry = async id => {
    // const index = getEntryIndexById(id)
    // entries.value.splice(index, 1)
    await deleteDoc(doc(entriesCollectionRef, id));
    removeSlideItemIfExists(id)
    Notify.create({
      message: 'Запись удалена',
      position: 'top',
    })
  }

  const updateEntry = async (entryId, updates) => {
    await updateDoc(doc(entriesCollectionRef, entryId), updates);
  }

  const updateEntryOrderNumbers = async () => {
    let currentOrder = 1
    entries.value.forEach(entry => {
      entry.order = currentOrder
      currentOrder++
    })

    getEntriesSnapshot()
    await Promise.all(entries.value.map(async entry => {
      await updateEntry(entry.id, {order: entry.order})
    }))
    loadEntries(false)
  }

  const sortEnd = ({oldIndex, newIndex}) => {
    const movedEntry = entries.value[oldIndex]
    entries.value.splice(oldIndex, 1)
    entries.value.splice(newIndex, 0, movedEntry)
    updateEntryOrderNumbers()
  }

  // const saveEntries = () => {
  //   LocalStorage.setItem("entries", entries.value)
  // }


  // helpers

  const generateOrderNumber = () => {

    const orderNumbers = entries.value.map(entry => entry.order),
      newOrderNumber = orderNumbers.length
        ? Math.max(...orderNumbers) + 1
        : 1
    return newOrderNumber

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
    init,
    loadEntries,
    clearAndStopEntries,
    addEntry,
    deleteEntry,
    updateEntry,
    sortEnd,
    runningBalances
  }
})