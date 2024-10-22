import {defineStore} from "pinia";
import {Dialog} from "quasar";
import {createUserWithEmailAndPassword, signOut } from "firebase/auth";
import {auth} from "src/firebase/firebase";

export const useStoreAuth = defineStore('auth', () => {
  //state


  //getters


  //actions
  const registerUser = ({email, password}) => {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      Dialog.create({
        title: 'Ошибка: ' + errorCode,
        message: errorMessage,
      })
    });
  }

  const logoutUser = () => {
    signOut(auth).then(() => {
      Dialog.create({
        title: 'Внимание: ',
        message: error,
      })    }).catch((error) => {
      Dialog.create({
        title: 'Ошибка: ',
        message: error,
      })
    });
  }


  return {
    //state


    //getters


    //actions
    registerUser,
    logoutUser
  }
})