<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div style="width: 100px">
    <o-tooltip content="这里"></o-tooltip>
    <o-tooltip content="这里是需要显示的文本内容，当文本超出时会自动隐藏内容, 鼠标移入会显示完整内容"></o-tooltip>
  </div>
  <o-tooltip
    class="w-200 p-10 cp cl-blue"
    content="这里是需要显示的文本内容，当文本超出时会自动隐藏内容, 鼠标移入会显示完整内容"
  ></o-tooltip>
</template>

<style scoped lang="scss"></style>
