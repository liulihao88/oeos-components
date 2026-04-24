<script setup lang="ts">
import { h } from 'vue'

const rawHtml = `
  <div class="cl-blue fw-600">支持 raw-content</div>
  <div>可以直接传入 HTML 字符串。</div>
  <div>也可以通过 <code>&lt;br&gt;</code> 或块级标签进行换行。</div>
`

const vnodeContent = h('div', {}, [
  h('div', '1. 支持直接传入 VNode 作为 tooltip 内容'),
  h('div', '2. 适合结构化说明、规则列表等场景'),
  h('div', '3. 与 click、hover 等触发方式可以组合使用'),
  h(
    'div',
    '4. 如果内容比较复杂，优先推荐使用 VNode 或 content 插槽，而不是一大段 HTML 字符串。',
  ),
])
</script>

<template>
  <div class="demo-box">
    <o-tooltip width="220px" raw-content :content="rawHtml">HTML 字符串内容</o-tooltip>

    <o-tooltip :content="vnodeContent" trigger="click" placement="right">
      <el-button type="primary">VNode 内容</el-button>
    </o-tooltip>
  </div>
</template>

<style scoped lang="scss">
.demo-box {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 16px;
}
</style>
