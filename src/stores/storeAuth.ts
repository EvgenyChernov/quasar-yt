import {defineStore} from "pinia";
import {Dialog} from "quasar";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import {auth} from "src/firebase/firebase";
import {useStoreEntries} from "stores/storeEntries";
import {reactive} from "vue";

export const useStoreAuth = defineStore('auth', () => {
  //state

  const userDetailsDefault = {
    id: null,
    email: null,
  }


  const userDetails = reactive({
    ...userDetailsDefault
  })

  //getters


  //actions

  const init = () => {
    const storeEntries = useStoreEntries()

    onAuthStateChanged(auth, (user) => {
      if (user) {
        userDetails.id = user.uid
        userDetails.email = user.email
        storeEntries.loadEntries()
      } else {
        Object.assign(userDetails, userDetailsDefault)
      }
    });
  }

  const registerUser = ({email, password}) => {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    }).catch((error) => {
      showFirebaseError(error.message)
    });
  }

  const loginUser = ({email, password}) => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    }).catch((error) => {
      showFirebaseError(error.message)
    });
  }

  const logoutUser = () => {
    signOut(auth).then(() => {
      Dialog.create({
        title: 'Внимание: ',
        message: error,
      })
    }).catch((error) => {
      showFirebaseError(error)
    });
  }
  // helpers

  const showFirebaseError = message => {
    Dialog.create({
      title: 'Ошибка: ',
      message: message,
    })
  }

  return {
    //state
    userDetails,

    //getters


    //actions
    init,
    registerUser,
    loginUser,
    logoutUser
  }
})