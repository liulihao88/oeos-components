<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const checkboxValue = ref()
const options = ref([
  { label: '小月月', value: 'xyy' },
  { label: '小鑫鑫', value: 'xxx' },
])
</script>

<template>
  <div>
    <o-checkbox v-model="checkboxValue" :options="options"></o-checkbox>
  </div>
</template>

<style scoped lang="scss"></style>
