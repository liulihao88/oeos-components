<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const selectValue = ref('z3')
const options = ref([
  { label: '张三', value: 'z3', disabled: true },
  { label: '李四', value: 'l4' },
  { label: '王五', value: 'w5' },
])
</script>

<template>
  <div>
    <o-select v-model="selectValue" :options="options" >
      <template #default="{ options, item }">
        <span>{{ item.label }}</span>
        <span class="cl-red">{{ item.value }}</span>
      </template>
    </o-select>
  </div>
</template>
