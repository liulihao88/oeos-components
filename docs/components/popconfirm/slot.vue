<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const popoverRef = ref()
function confirm() {
  console.log('confirm')
}
function cusConfirm() {
  console.log('cusConfirm')
  popoverRef.value?.close()
}
</script>

<template>
  <div>
    <o-popconfirm trigger="click" @confirm="confirm" title="" ref="popoverRef">
      <template #content>我是slot的content</template>
      <template #footer>
        <el-button size="small" type="primary" @click="cusConfirm">我是slot的footer</el-button>
      </template>
      <el-button type="danger">
        <o-icon name="delete"></o-icon>
        你好啊
      </el-button>
    </o-popconfirm>
  </div>
</template>

<style scoped lang="scss"></style>
