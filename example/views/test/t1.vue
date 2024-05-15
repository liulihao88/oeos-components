<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <o-popover @confirm="confirm" content="您确认删除当前行吗? ">
      <!-- <el-button type="danger">自定义popover</el-button> -->
      你好
    </o-popover>
  </div>
</template>

<style scoped lang="scss"></style>
