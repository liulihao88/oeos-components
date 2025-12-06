<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div style="width: 1000px">
    <o-tooltip content="">
      <el-button type="primary" @click="isTest14">测试36</el-button>
    </o-tooltip>
    <el-button type="primary" @click="isTest63">测试31</el-button>
    <el-button type="primary" @click="isTest14">测试212</el-button>
    <el-button type="primary" @click="isTest14">测试224</el-button>
    <o-tooltip content="">
      <el-button type="primary" @click="isTest14">测试36</el-button>
    </o-tooltip>
    <o-tooltip content="这里"></o-tooltip>
    <o-tooltip content="这里是需要显示的文本内容，当文本超出时会自动隐藏内容, 鼠标移入会显示完整内容"></o-tooltip>
  </div>
  <o-tooltip
    class="w-200 p-10 cp cl-blue"
    content="这里是需要显示的文本内容，当文本超出时会自动隐藏内容, 鼠标移入会显示完整内容"
  ></o-tooltip>
</template>

<style scoped lang="scss"></style>
