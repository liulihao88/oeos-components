<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
function handleClick() {
  console.log('handleClick')
}
</script>

<template>
  <div>
    <o-tooltip
      content="这里是需要显示的文本内容，当文本超出时会显示完整内容"
      width="1200px"
      placement="right"
      @click="handleClick"
    ></o-tooltip>
  </div>
</template>

<style scoped lang="scss"></style>
