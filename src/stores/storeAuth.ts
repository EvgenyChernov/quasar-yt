import {defineStore} from "pinia";
import {Dialog} from "quasar";
import {createUserWithEmailAndPassword} from "firebase/auth";
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

  return {
    //state


    //getters


    //actions
    registerUser
  }
})