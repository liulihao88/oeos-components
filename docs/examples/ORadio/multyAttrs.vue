<template>
  <o-radio
    v-model="value"
    :options="options"
    value="id"
    label="name"
    type="button"
    size="small"
    border
    @change="change"
    :props="{ disabled: 'isDis' }"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref(3)
const options = ref([
  { name: 'Option 111', id: 1, isDis: false },
  { name: 'Option 2', id: 2, isDis: true },
  { name: 'Option 3', id: 3, isDis: false },
])
function change(value) {
  console.log(`value`, value)
}
</script>
