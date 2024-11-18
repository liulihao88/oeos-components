<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const selectVal = ref()
const options = ref([
  { label: '小月月', value: 'xyy' },
  { label: '小鑫鑫', value: 'xxx' },
])
const changeOptions = ref([1])
const simpleOptions = ref([1, 3, 5, 7, 9])
</script>

<template>
  <div>
    <o-select v-model="selectVal" title="哈哈" :options="options" class="m"></o-select>
    <o-select v-model="selectVal" :options="options">
      <template #prefix>11</template>
    </o-select>

    <o-select v-model="selectVal" :options="changeOptions" type="simple"></o-select>
    <o-select v-model="selectVal" :options="changeOptions" type="simple" ></o-select>
  </div>
</template>

<style scoped lang="scss"></style>
