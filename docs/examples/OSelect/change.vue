<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const selectVal = ref()
const simpleSelectRef = ref(null)
const options = ref([
  { label: '张三', value: 'z3' },
  { label: '李四', value: 'l4' },
  { label: '王五', value: 'w5' },
])
function selectChange(val) {
  console.log(`33 val`, val)
}
function isTest52() {
  simpleSelectRef.value?.$refs?.selectRef?.$emit('change', options.value[2].value)
}
</script>

<template>
  <div>
    <el-button type="primary" @click="isTest52">测试调用简单的select方法</el-button>
    <o-select ref="simpleSelectRef" v-model="selectVal" :options="options" @change="selectChange"></o-select>
  </div>
</template>

<style scoped lang="scss"></style>
