<script setup lang="ts">
const longText =
  '这是一段比较长的提示文本，用来演示 o-tooltip 的 line-clamp 能力。你可以限制默认展示区域最多显示 2 行或 3 行，超出之后会出现省略，并在鼠标移入时显示完整内容。'
</script>

<template>
  <div class="demo-box">
    <div class="demo-item">
      <div class="demo-label">两行省略</div>
      <o-tooltip :content="longText" width="220px" :line-clamp="2" placement="top" />
    </div>

    <div class="demo-item">
      <div class="demo-label">三行省略</div>
      <o-tooltip :content="longText" width="220px" :line-clamp="3" placement="top" effect="light" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo-box {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.demo-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.demo-label {
  color: var(--45);
  font-size: 13px;
}
</style>
