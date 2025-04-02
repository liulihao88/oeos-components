<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const navList = [
  {
    label: '系统服务参数设置',
    value: 'sys',
  },
  {
    label: '基础服务参数设置',
    value: 'base',
  },
  {
    label: '高级定时任务',
    value: 'task',
  },
]
const navName = ref('base')
function tabChange(value) {
  console.log(`value`, value)
}
</script>

<template>
  <div>
    <h6>去掉底部的border, 去掉选中项的下划线</h6>
    <o-tabs :options="navList" v-model="navName" @tabChange="tabChange"></o-tabs>
    <div v-if="navName === 'sys'">系统服务</div>
    <div v-if="navName === 'base'">基础服务</div>
    <div v-if="navName === 'task'">高级定时</div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-tabs__nav-wrap::after) {
  height: 0;
}
:deep(.el-tabs__active-bar) {
  display: none;
}
</style>
