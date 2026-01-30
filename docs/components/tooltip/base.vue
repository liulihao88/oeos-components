<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div style="width: 1000px">
    <o-title title="这里测试o-tooltip跟不通button之间的间距" b="16"></o-title>
    <o-tooltip content="">
      <el-button type="primary" @click="isTest14">测试36</el-button>
    </o-tooltip>
    <el-button type="primary" @click="isTest63">测试31</el-button>
    <el-button type="primary" @click="isTest14">测试212</el-button>
    <el-button type="primary" @click="isTest14">测试224</el-button>
    <o-tooltip content="">
      <el-button type="primary" @click="isTest14">测试36</el-button>
    </o-tooltip>
    <!-- <hr /> -->
    <o-tooltip content="">如果content为空, 什么都不显示. 这与el-tooltip有区别</o-tooltip>
    <o-tooltip content="这里是需要显示的文本内容，当文本超出时会自动隐藏内容, 鼠标移入会显示完整内容">
      <el-button type="primary">你好啊</el-button>
    </o-tooltip>
  </div>
  <o-tooltip
    class="w-200 p-10 cp cl-blue"
    content="这里是需要显示的文本内容，当文本超出时会自动隐藏内容, 鼠标移入会显示完整内容"
  ></o-tooltip>
</template>

<style scoped lang="scss"></style>
