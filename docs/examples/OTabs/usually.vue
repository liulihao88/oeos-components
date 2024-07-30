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
    <o-tabs :options="navList" v-model="navName" @tabChange="tabChange"></o-tabs>
    <div v-if="navName === 'sys'">系统服务</div>
    <div v-if="navName === 'base'">基础服务</div>
    <div v-if="navName === 'task'">高级定时</div>
  </div>
</template>

<style scoped lang="scss"></style>
