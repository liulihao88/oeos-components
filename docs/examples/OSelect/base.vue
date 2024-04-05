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
    <o-select v-model="selectVal" :options="options"></o-select>
    <o-select v-model="selectVal" disabled :options="options"></o-select>
    <o-select v-model="selectVal" :disabled="true" :options="options"></o-select>
    <o-select v-model="selectVal" :options="options"></o-select>
  </div>
</template>

<style scoped lang="scss"></style>
