<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const checkAllValue = ref()
const options = ref([
  { name: '小月月11111111', id: 'xyy' },
  { name: '小鑫鑫22222222', id: 'xxx' },
])
</script>

<template>
  <div>
    <o-check-all
      v-model="checkAllValue"
      :options="options"
      label="name"
      value="id"
    ></o-check-all>
  </div>
</template>

<style scoped lang="scss"></style>
