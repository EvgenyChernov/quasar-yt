import {defineStore} from "pinia";
import {Dialog} from "quasar";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {auth} from "src/firebase/firebase";

export const useStoreAuth = defineStore('auth', () => {
  //state


  //getters


  //actions
  const registerUser = ({email, password}) => {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      console.log('register user: ', user)
    }).catch((error) => {
      showFirebaseError(error.message)
    });
  }

  const loginUser = ({email, password}) => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      console.log('login user: ', user)
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
    registerUser,
    loginUser,
    logoutUser
  }
})