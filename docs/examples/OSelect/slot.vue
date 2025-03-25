<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const selectValue = ref()
const options = ref([
  { label: '张三', value: 'z3' },
  { label: '李四', value: 'l4' },
  { label: '王五', value: 'w5' },
])
</script>

<template>
  <div>
    <o-select v-model="selectValue" :options="options">
      <template #header>自定义头部</template>
      <template #footer>自定义底部</template>
      <!-- <template #label="{ label, value }">自定义标签内容 {{ label }} ?? {{ value }}</template> -->
      <template #tag>??????自定义标签内容===</template>
    </o-select>
  </div>
</template>
