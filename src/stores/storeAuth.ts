import {defineStore} from "pinia";
import {Dialog} from "quasar";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import {auth} from "src/firebase/firebase";
import {useStoreEntries} from "stores/storeEntries";

export const useStoreAuth = defineStore('auth', () => {
  //state


  //getters


  //actions

  const init = () => {
    const storeEntries = useStoreEntries()

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('пользователь авторизован', user)
        storeEntries.loadEntries()
      } else {
        console.log('пользователя нет ')
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
      showFirebaseError(error.message)
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


    //getters


    //actions
    init,
    registerUser,
    loginUser,
    logoutUser
  }
})