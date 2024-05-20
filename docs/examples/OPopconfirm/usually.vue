<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
function confirm() {
  console.log('confirm')
}
</script>

<template>
  <div>
    <o-popconfirm title="自定义title" content="自定义content" @confirm="confirm" trigger="click" width="500">
      <el-button type="danger">自定义popconfirm</el-button>
    </o-popconfirm>
  </div>
</template>

<style scoped lang="scss"></style>
