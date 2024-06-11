<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

function confirm() {
  console.log('confirm')
}
function isTest65() {
  console.log('isTest65')
}
</script>

<template>
  <div>
    <o-popconfirm @confirm="confirm">
      <el-button type="primary" @click="isTest65">测试66</el-button>
    </o-popconfirm>

    <br />
    <br />
    <br />

    <o-popconfirm @confirm="confirm" :reConfirm="false">
      <el-button type="primary" @click="isTest65">有些情况(比如本地开发), 不希望弹出弹框浪费时间, 可以设置:reConfirm="false"</el-button>
    </o-popconfirm>
  </div>
</template>

<style scoped lang="scss"></style>
