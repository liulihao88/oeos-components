<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const reConfirm = ref(false)
function confirm() {
  console.log('confirm')
}
</script>

<template>
  <div>
    <o-popconfirm title="自定义title" content="自定义content" @confirm="confirm" trigger="click" width="500">
      <el-button type="danger">自定义popconfirm</el-button>
    </o-popconfirm>

    <br />
    <br />

    <o-popconfirm title="自定义title" width="500" :reConfirm="reConfirm">
      <el-button type="danger" :disabled="reConfirm">自定义popconfirm</el-button>
    </o-popconfirm>
    <el-button type="primary" @click="reConfirm = !reConfirm">reConfirm切换</el-button>
  </div>
</template>

<style scoped lang="scss"></style>
