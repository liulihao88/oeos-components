<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const checkAllValue = ref()
const options = ref([
  { label: '小月月', value: 'xyy' },
  { label: '小鑫鑫', value: 'xxx' },
])
</script>

<template>
  <div>
    <o-check-all v-model="checkAllValue" :options="options"></o-check-all>
  </div>
</template>

<style scoped lang="scss"></style>
