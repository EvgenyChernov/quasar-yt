import {defineStore} from "pinia";
import {computed, reactive, ref, watch, nextTick} from "vue";
import {Notify} from "quasar";
import {useStoreAuth} from "stores/storeAuth";
import {collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc} from "firebase/firestore";
import {db} from "src/firebase/firebase"

// const entriesCollectionRef = collection(db, "users", 'xGV6k98LkaRoYJWhUhLsMXKxiTs2', 'entries')
let entriesCollectionRef = null

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


  const entriesOrder = computed(() => {
    return entries.value.sort((a, b) => a.order - b.order)
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
    loadEntries()
  }


  const loadEntries = async () => {
    entriesLoaded.value = false
    const unsubscribe = onSnapshot(entriesCollectionRef, (querySnapshot) => {
      let entriesFB = []

      querySnapshot.forEach((doc) => {
        let entry = doc.data()
        entry.id = doc.id
        entriesFB.push(entry)
      });
      entries.value = entriesFB;
      entriesLoaded.value = true
    });

    // отключение прослушивания данных
    // unsubscribe()
  }

  const clearEntries = () => {
    entries.value = []
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
  const updateEntryOrderNumbers = () => {
    let currentOrder = 1
    entries.value.forEach(entry => {
      entry.order = currentOrder
      currentOrder++
    })
    entries.value.forEach(entry => {
      updateEntry(entry.id, {order: entry.order})
    })
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
    entriesOrder,

    //actions
    init,
    loadEntries,
    clearEntries,
    addEntry,
    deleteEntry,
    updateEntry,
    sortEnd,
    runningBalances
  }
})