<template>
  <q-page class="flex flex-center">
    <q-card
      class="auth bg-primary text-white q-pa-lg"
    >
      <q-card-section>
        <ToolbarTitle/>
      </q-card-section>
      <q-card-section>
        <q-tabs
          v-model="tab"
          no-caps
        >
          <q-tab name="login" label="Вход"/>
          <q-tab name="register" label="Регистрация"/>
        </q-tabs>
      </q-card-section>
      <q-card-section>
        <q-form
          @submit="formSubmit"
        >
          <q-input
            v-model="credentials.email"
            class="q-mb-md"
            :bg-color="useLightOrDark('white', 'dark')"
            label="Email"
            type="email"
            autocomplete="email"
            filled
          />
          <q-input
            v-model="credentials.password"
            class="q-mb-md"
            :bg-color="useLightOrDark('white','dark')"
            label="Пароль"
            type="password"
            autocomplete="password"
            filled
          />
          <q-btn
            type="submit"
            class="full-width"
            outline
            :label="submitButtonTitle"
            color="white"
            no-caps
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from 'vue'
import {useRouter} from "vue-router";
import {useQuasar} from "quasar";
import {useLightOrDark} from "src/use/useLightOrDark";
import ToolbarTitle from "components/Layout/ToolbarTitle.vue";
import {useStoreAuth} from "stores/storeAuth";

const $q = useQuasar()
const storeAuth = useStoreAuth()


// router

const router = useRouter()

// tabs

const tab = ref('register')

// submit
const submitButtonTitle = computed(() => {
  return tab.value === 'login' ? 'Войти' : 'Зарегистрироваться'
})

// form

const credentials = reactive({
  email: '',
  password: ''
})

const formSubmit = () => {
  if (!credentials.email || !credentials.password) {
    $q.dialog({
      title: 'Ошибка',
      message: 'Пожалуйста введите email и пароль'
    })
  }
  else {
    formSubmitSuccess()
  }
}

const formSubmitSuccess = () => {
  if (tab.value === 'register') {
    storeAuth.registerUser(credentials)
  }
  else {
    console.log('вход')
  }
  router.push('/')

}

</script>
