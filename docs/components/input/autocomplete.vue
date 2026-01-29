<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const cc = ref()
const options = ref([
  { label: '张三', value: 'z3' },
  { label: '李四', value: 'l4' },
  { label: '王五', value: 'w5w5w5w5w5w5w5w5w5w5w5w5w5w5w5w5w5w5w5' },
])
options.value = [
  '哈哈',
  '呵呵',
  '嘿嘿',
  '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
  '哈哈哈',
]
</script>

<template>
  <div>
    <o-input v-model="cc" :options="options" width="300"></o-input>
    <o-input v-model="cc" :options="options" width="300"></o-input>
  </div>
</template>
