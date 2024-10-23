import {defineStore} from "pinia";
import {Dialog} from "quasar";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth";
import {auth} from "src/firebase/firebase";
import {useStoreEntries} from "stores/storeEntries";
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";

export const useStoreAuth = defineStore('auth', () => {
  //state

  const authInitialized = ref(false);

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
    const storeEntries = useStoreEntries(),
      router = useRouter()

    onAuthStateChanged(auth, (user) => {
      authInitialized.value = true;
      if (user) {
        userDetails.id = user.uid
        userDetails.email = user.email
        router.push('/')
        storeEntries.init()
      } else {
        Object.assign(userDetails, userDetailsDefault)
        router.replace('/auth')
        storeEntries.clearAndStopEntries()
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
    authInitialized,

    //getters


    //actions
    init,
    registerUser,
    loginUser,
    logoutUser
  }
})