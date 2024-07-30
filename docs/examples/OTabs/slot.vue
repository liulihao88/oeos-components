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
</script>

<template>
  <div>
    <o-tabs :options="navList">
      <template #sys-label>
        <o-icon name="plus"></o-icon>
        系统服务
      </template>
      <template #base-label>
        <o-icon name="delete"></o-icon>
        基础服务
      </template>
      <template #task-label>
        <o-icon name="refresh"></o-icon>
        高级定时
      </template>
    </o-tabs>
  </div>
</template>

<style scoped lang="scss"></style>
