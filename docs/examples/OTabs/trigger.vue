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
const navValue = ref('base')
</script>

<template>
  <div>
    <o-tabs :options="navList" trigger="hover" v-model="navValue">
      <template #sys>系统服务</template>
      <template #base>基础服务</template>
      <template #task>高级定时</template>
    </o-tabs>
  </div>
</template>

<style scoped lang="scss"></style>
