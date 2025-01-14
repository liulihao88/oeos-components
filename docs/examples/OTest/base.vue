<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { OSelect } from '../../../packages/index.ts'
console.log(`98 OSelect`, OSelect)
const options = ref([
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
])
const selectValue = ref()
</script>

<template>
  <div>
    <o-select v-model="selectValue" :options="options" title="男人" />
    <o-title title="comps"></o-title>
  </div>
</template>
