<template>
  <div class="demo-box">
    <div class="demo-row">
      <o-tooltip
        width="220px"
        content="这是一段比较长的提示文本，默认只展示单行，超出当前宽度后鼠标移入会显示完整内容。"
      />
      <o-tooltip width="300px" content="这段文字没有超出宽度，所以不会显示 tooltip。" />
    </div>

    <div class="demo-row">
      <o-tooltip content="可以直接包裹按钮、图标等自定义触发内容">
        <el-button type="primary">按钮触发</el-button>
      </o-tooltip>
      <el-button>普通按钮</el-button>
    </div>

    <div class="demo-row">
      <o-tooltip content="">`content` 为空时，`o-tooltip` 会自动禁用提示。</o-tooltip>
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
