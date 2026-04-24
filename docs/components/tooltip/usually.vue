<script setup lang="ts">
import { ElMessage } from 'element-plus'

function handleClick() {
  ElMessage.success('点击了 tooltip 的触发内容')
}
</script>

<template>
  <div class="demo-box">
    <o-tooltip
      content="默认 dark 主题，文本超出宽度时会显示完整内容。"
      width="200px"
      placement="bottom"
    />

    <o-tooltip
      content="light 主题也支持默认的溢出检测，点击文字还能触发 click 事件。"
      width="200px"
      placement="bottom"
      @click="handleClick"
      effect="light"
    />
  </div>
</template>

<style scoped lang="scss">
.demo-box {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
