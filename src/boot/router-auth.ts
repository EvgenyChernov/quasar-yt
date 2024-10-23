import { boot } from 'quasar/wrappers'

export default boot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    console.log('boot', to)
    next()
  })
})