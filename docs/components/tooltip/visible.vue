<template>
  <div class="demo-row">
    <o-tooltip :visible="visible" content="当前 tooltip 由外部 visible 状态完全控制" placement="top">
      <el-button>受控 tooltip</el-button>
    </o-tooltip>
    <el-button type="primary" @click="visible = true">显示</el-button>
    <el-button @click="visible = false">隐藏</el-button>
    <el-button text @click="visible = !visible">{{ visible ? '切换为隐藏' : '切换为显示' }}</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<style scoped lang="scss">
.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
