<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const options = ref([
  { label: '张三', value: 'z3' },
  { label: '李四', value: 'l4' },
  { label: '王五', value: 'w5' },
])
const selectValue = ref([])
const optionsDisabled = (item, index) => {
  return index % 2 !== 0
}
</script>

<template>
  <div>
    <o-select v-model="selectValue" :options="options" multiple :optionsDisabled="optionsDisabled" />
  </div>
</template>
