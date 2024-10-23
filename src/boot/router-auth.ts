import {boot} from 'quasar/wrappers'
import {useStoreAuth} from "stores/storeAuth";

// убрали next и возвращаем путь если выполняется условие пользователя нет и другой путь
export default boot(({router}) => {
  router.beforeEach((to) => {
    const storeAuth = useStoreAuth()
    if (!storeAuth.userDetails.id && to.path !== '/auth') {
      return '/auth'
    }
    // запрет пользователю заходить в auth
    if (storeAuth.userDetails.id && to.path === '/auth') {
      return false
    }
  })
})