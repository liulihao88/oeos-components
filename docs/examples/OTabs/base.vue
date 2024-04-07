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
  {
    label: '服务部署设置',
    value: 'deploy',
  },
]
const navName = ref('task')
function navChange(value, ...rest) {
  console.log(`rest`, rest)
  console.log(`value`, value)
}
</script>

<template>
  <div>
    <o-tabs :options="navList">
      <template #sys>这是系统</template>
      <template #base>这是base</template>
    </o-tabs>

    <!-- <div v-if="navName === 'sys'">系统服务</div>
    <div v-if="navName === 'base'">base服务</div>
    <div v-if="navName === 'deploy'">部署设置</div> -->
  </div>
</template>

<style scoped lang="scss"></style>
