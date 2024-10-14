<template>
  <q-page
      v-touch-pan.vertical.prevent.mouse="handlePan"
      class="flex flex-center text-white text-bold">
    <div class="row">
      <q-input
          input-class="text-center text-h5 text-white"
          color="teal"
          filled
          placeholder="Counter"
          v-model="data.name"
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
            v-touch-repeat:300:300:300:300:50.mouse="remove"
        />
      </div>
      <div class="col text-center text-h2">{{ data.counter }}</div>
      <div class="col text-center">
        <q-btn
            round
            color="primary"
            size="xl"
            icon="add"
            @click="add"
            v-touch-repeat:300:300:300:300:50.mouse="add"
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
import {reactive, watch} from "vue";
import {LocalStorage} from "quasar";

const data = reactive({
  counter: 0,
  name: ''
})

const add = () => {
  data.counter++;
}
const remove = () => {
  if (data.counter > 0) data.counter--;
}
const setValueInit = () => {
  data.counter = 0;
  data.name = '';
}

const savedData = LocalStorage.getItem('data');
if (savedData) Object.assign(data, savedData);
const handlePan = e => {
  console.log(e.delta.y)
  if (e.delta.y < 0) add()
  else remove()
}

watch(data, value => {
 LocalStorage.set("data", value);

})


</script>
