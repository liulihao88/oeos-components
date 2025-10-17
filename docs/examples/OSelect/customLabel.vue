<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const selectVal = ref()
const options = ref([
  { label: '小月月', value: 'xyy', age: 19 },
  { label: '小鑫鑫', value: 'xxx', age: 18 },
])

const customLabel = (item) => {
  return `${item.label} - ${item.age}岁`
}
</script>

<template>
  <div>
    <o-select v-model="selectVal" :options="options" :customLabel="customLabel"></o-select>
  </div>
</template>

<style scoped lang="scss"></style>
