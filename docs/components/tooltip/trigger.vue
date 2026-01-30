<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const isTest14 = () => {
  console.log('isTest14')
}
</script>

<template>
  <div style="width: 1000px">
    <o-tooltip content="我只有在点击的时候才显示文本" trigger="click">
      <el-button type="primary" @click="isTest14">click</el-button>
    </o-tooltip>
    <o-tooltip content="我只有在点击的时候才显示文本" trigger="contextmenu">
      <el-button type="primary" @click="isTest14">contextmenu</el-button>
    </o-tooltip>
    <o-tooltip content="我只有在点击的时候才显示文本" :trigger="['contextmenu', 'click']">
      <el-button type="primary" @click="isTest14">['contextmenu', 'click']</el-button>
    </o-tooltip>
  </div>
</template>

<style scoped lang="scss"></style>
