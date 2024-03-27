<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const checkboxValue = ref('xrr')
const options = ref([
  { label: '小月月', value: 'xyy' },
  { label: '小鑫鑫', value: 'xxx' },
  { label: '小瑞瑞', value: 'xrr' },
])
</script>

<template>
  <div>
    <o-checkbox v-model="checkboxValue" :options="options"></o-checkbox>
  </div>
</template>

<style scoped lang="scss"></style>
