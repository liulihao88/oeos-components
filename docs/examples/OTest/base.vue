<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const selectValue = ref()
const options = ref([
  { label: '张三', value: 'z3' },
  { label: '李四', value: 'l4' },
  { label: '王五', value: 'w5' },
])
function customLabel(item) {
  return `<div class="cl-blue">${item.label}</div>`
}
console.log(`***** 04 13行 docs/examples/OTest/base.vue`)
let a = proxy.formatTime(new Date())
console.log(`08 a`, a);

const isShow = ref()
</script>

<template>
  <div>
    <div>1321321111111132132132132111docs/examples/OTest/base.vue</div>
    <o-select v-model="selectValue" :options="options" :customLabel="customLabel"></o-select>
    <el-button type="primary" @click="isShow = true">测试12</el-button>
    <o-dialog ref="dialogRef" title="base" v-model="isShow"></o-dialog>
  </div>
</template>
