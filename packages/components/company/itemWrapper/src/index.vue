<template>
  <div class="item-wrapper-box" :class="{ 'with-columns': props.columns }">
    <component :is="item" class="col" v-for="(item, index) in validSlots" :key="index" />
  </div>
</template>

<script setup lang="ts">
import { useSlots, computed } from 'vue'

defineOptions({
  name: 'OItemWrapper',
})

const props = defineProps({
  gap: {
    type: [String, Number],
    default: '16px',
  },
  columns: {
    type: Number,
    default: null, // null 表示不分组，保持原样
  },
})

const slots = useSlots()
const defaultSlots = computed(() => slots.default?.() || [])

// 只保留元素节点 (过滤掉注释和文本节点)
const validSlots = computed(() => {
  return (slots.default?.() || []).filter((node) => {
    // Vue 3 中的 Comment 节点类型
    const isComment = node.type?.toString() === 'Symbol(v-cmt)'
    // Vue 3 中的空白 Text 节点类型（`\n    ` 或 `\n  ` 等）
    const isWhitespaceText = node.type?.toString() === 'Symbol(Text)' && !node.children?.toString()?.trim()

    // 保留元素节点 `<div>`、组件 `<MyComponent>`、有内容的文本 `Hello` 等
    return !isComment && !isWhitespaceText
  })
})

// 根据columns分组插槽内容
const slotRows = computed(() => {
  if (!props.columns) {
    return [validSlots.value]
  }

  const result = []
  for (let i = 0; i < validSlots.value.length; i += props.columns) {
    result.push(validSlots.value.slice(i, i + props.columns))
  }
  return result
})
</script>

<!-- <style lang="scss" scoped>
.item-wrapper-box {
  display: flex;
  flex-direction: column;
  gap: v-bind('props.gap');

  .row {
    display: flex;
    gap: v-bind('props.gap');

    > :deep(.col),
    > .col {
      // width: calc(100% / v-bind('props.columns || 1'));
      flex: 1;
      min-width: 0; // 防止内容溢出
    }
    .fill-empty {
      visibility: hidden; // 隐藏填充项
      pointer-events: none; // 防止交互
    }
  }
}
</style> -->

<style lang="scss" scoped>
.item-wrapper-box {
  /* 默认 flex 布局（无 columns） */
  display: flex;
  flex-wrap: wrap;
  gap: v-bind('props.gap');

  /* 设置了 columns 时切换为 grid 布局 */
  &.with-columns {
    display: grid;
    grid-template-columns: repeat(v-bind('props.columns'), minmax(0, 1fr)); /* 关键点1：强制等宽 */
  }

  /* 所有子项的通用约束 */
  > :deep(.col) {
    min-width: 0;              /* 关键点2：允许收缩 */
    width: 100%;               /* 强制占满可用空间 */
    overflow: hidden;          /* 超出隐藏 */
    text-overflow: ellipsis;   /* 文字省略号 */
    white-space: wrap;       /* 禁止换行（可选） */

    /* 如果内容需要换行（如多行文本），改用以下方案 */
    /*
    display: -webkit-box;
    -webkit-line-clamp: 2;     // 限制行数
    -webkit-box-orient: vertical;
    overflow: hidden;
    */
  }
}

</style>
