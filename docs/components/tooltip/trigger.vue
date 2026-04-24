<template>
  <div class="demo-row">
    <o-tooltip content="默认使用 hover 触发" trigger="hover">
      <el-button type="primary">hover</el-button>
    </o-tooltip>
    <o-tooltip content="点击按钮时显示 tooltip" trigger="click">
      <el-button type="primary">click</el-button>
    </o-tooltip>
    <o-tooltip content="右键触发 tooltip" trigger="contextmenu">
      <el-button type="primary">contextmenu</el-button>
    </o-tooltip>
    <o-tooltip content="点击或右键都可以触发" :trigger="['contextmenu', 'click']">
      <el-button type="primary">click + contextmenu</el-button>
    </o-tooltip>
  </div>
</template>

<style scoped lang="scss">
.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
