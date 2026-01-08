<template>
  <div>
    <o-title title="全部disabled"></o-title>
    <o-radio v-model="value" :options="options" :disabled="true" />

    <o-title title="选项1,3disabled"></o-title>
    <o-radio v-model="value" :options="options" :optionsDisabled="optionsDisabled" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref(2)
const options = ref([
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2, disabled: true },
  { label: 'Option 3', value: 3 },
  { label: 'Option 3', value: 4 },
])
const optionsDisabled = (item, index, parseOptions) => {
  return item.value === 1 || item.value === 3
}
</script>
