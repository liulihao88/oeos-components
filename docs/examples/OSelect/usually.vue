<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const selectVal = ref()
const options = ref([
  { name: '小月月', id: 'xyy' },
  { name: '小鑫鑫', id: 'xxx' },
])
</script>

<template>
  <div>
    <o-select
      v-model="selectVal"
      :options="options"
      label="name"
      value="id"
    ></o-select>
  </div>
</template>

<style scoped lang="scss"></style>
