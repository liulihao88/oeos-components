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
const type = ref('')
const stretch = ref(false)
</script>

<template>
  <div>
    <o-flex direction="column" gap="small">
      <o-radio v-model="type" :options="['', 'card', 'border-card']" type="simple" title="类型"></o-radio>
      <o-radio v-model="stretch" :options="[false, true]" type="simple" title="是否自动撑开"></o-radio>
    </o-flex>
    <o-tabs :options="navList" :type="type" :stretch="stretch">
      <template #sys>系统服务</template>
      <template #base>基础服务</template>
      <template #task>高级定时</template>
    </o-tabs>
  </div>
</template>

<style scoped lang="scss"></style>
