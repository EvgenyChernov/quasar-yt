<template>
  <q-page class="flex flex-center text-white text-bold">
    <div class="row">
      <q-input
          input-class="text-center text-h5 text-white"
          color="teal"
          filled
          placeholder="Placeholder"
          v-model="data.counter"
      />
    </div>
    <div class="row full-width items-center">
      <div class="col text-center">
        <q-btn
            round
            color="primary"
            size="xl"
            icon="remove"
            @click="remove"
        />
      </div>
      <div class="col text-center text-h2">{{data.counter}}</div>
      <div class="col text-center">
        <q-btn round
               color="primary"
               size="xl"
               icon="add"
               @click="add"
        />
      </div>
    </div>
    <div class="row">
      <q-btn
          round
          color="primary"
          size="xl"
          icon="restart_alt"
          @click="setValueInit"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {reactive} from "vue";

const data = reactive({
  counter: 0,
})

const add = () => {
  data.counter++;
}
const remove = () => {
  data.counter--;
}
const setValueInit = () => {
  data.counter = 0;
}


</script>
