<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
function handleClick() {
  console.log('handleClick')
}
function handleClick3() {
  console.log('handleClick3')
}
function handleClick2() {
  console.log('handleClick2')
}
</script>

<template>
  <div>
    <o-tooltip
      width="1200px"
      placement="right"
      content="这里是需要显示的文本内容，当文本超出时会显示完整内容"
      class="m-20"
      
    >
      <o-icon name="plus"></o-icon>
    </o-tooltip>

    <o-tooltip content="好男人啊" :disabled="true" class="m-20">
      <el-button type="primary">不显示tooltip</el-button>
    </o-tooltip>
  </div>
</template>

<style scoped lang="scss"></style>
