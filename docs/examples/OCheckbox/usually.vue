<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const checkboxValue = ref(['xxx'])
const options = ref([
  { name: '小月月11111111', id: 'xyy' },
  { name: '小鑫鑫22222222', id: 'xxx' },
  { name: '小瑞瑞', id: 'xrr' },
])

const simpleValue = ref(['7'])
const simpleOptions = ['1', '2', '3', '4', '5']
</script>

<template>
  <div>
    <o-checkbox
      v-model="checkboxValue"
      :options="options"
      label="name"
      value="id"
    ></o-checkbox>
    <o-checkbox
      v-model="simpleValue"
      :options="simpleOptions"
      type="simple"
    ></o-checkbox>
  </div>
</template>

<style scoped lang="scss"></style>
