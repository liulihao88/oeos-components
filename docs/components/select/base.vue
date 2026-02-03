<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const selectVal = ref()
const options = ref([
  { label: '小月月', value: 'xyy' },
  { label: '小鑫鑫', value: 'xxx' },
])
</script>

<template>
  <div>
    <o-select v-model="selectVal" :options="options" title="哈哈"></o-select>
  </div>
</template>

<style scoped lang="scss"></style>
