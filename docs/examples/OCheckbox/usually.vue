<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const checkboxValue = ref()
const options = ref([
  { name: '小月月11111111', id: 'xyy' },
  { name: '小鑫鑫22222222', id: 'xxx' },
])
</script>

<template>
  <div>
    <o-checkbox
      v-model="checkboxValue"
      :options="options"
      label="name"
      value="id"
    ></o-checkbox>
  </div>
</template>

<style scoped lang="scss"></style>
