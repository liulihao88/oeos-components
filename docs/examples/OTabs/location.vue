<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

import type { TabsInstance } from 'element-plus'

const tabPosition = ref<TabsInstance['tabPosition']>('left')
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
    <el-radio-group v-model="tabPosition" style="margin-bottom: 30px">
      <el-radio-button value="top">top</el-radio-button>
      <el-radio-button value="right">right</el-radio-button>
      <el-radio-button value="bottom">bottom</el-radio-button>
      <el-radio-button value="left">left</el-radio-button>
    </el-radio-group>
    <o-tabs :options="navList" :tab-position="tabPosition">
      <template #sys>我是服务啊</template>
      <template #base>基础服务</template>
      <template #task>高级定时</template>
    </o-tabs>
  </div>
</template>

<style lang="scss">
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
</style>
