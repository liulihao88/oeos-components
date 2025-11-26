<template>
  <component :is="component" :style="flexStyles" class="o-flex">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { processWidth } from '@oeos-components/utils'

defineOptions({
  name: 'OFlex',
})

// --- Props 定义 ---
const props = defineProps({
  // vertical: flex 主轴的方向是否垂直，使用 flex-direction: column
  direction: {
    type: String,
    default: 'row', // column row-reverse column-reverse
  },
  // wrap: 设置元素单行显示还是多行显示
  wrap: {
    type: String as () => 'nowrap' | 'wrap' | 'wrap-reverse',
    default: 'nowrap',
  },
  // justify: 设置元素在主轴方向上的对齐方式
  justify: {
    type: String as () => 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'normal',
    default: 'normal',
  },
  // align: 设置元素在交叉轴方向上的对齐方式
  align: {
    type: String as () => 'start' | 'end' | 'center' | 'baseline' | 'stretch' | 'normal',
    default: 'normal',
  },
  // flex: flex CSS 简写属性
  flex: {
    type: String,
    default: 'initial', // 使用 'initial' 代替 'normal'，因为 'normal' 在计算上和 'initial' 一样
  },
  // gap: 设置网格之间的间隙
  gap: {
    type: [String, Number],
    default: '0px', // small default large
  },
  // component: 自定义元素类型
  component: {
    type: Object as () => typeof HTMLElement,
    default: 'div',
  },
})

// --- 计算 Style ---
const flexStyles = computed(() => {
  let gapValue = parseGapValue()
  console.log(`14 gapValue`, gapValue)

  return {
    'flex-direction': props.direction,
    'flex-wrap': props.wrap,
    'justify-content': props.justify === 'normal' ? undefined : props.justify,
    'align-items': props.align === 'normal' ? undefined : props.align,
    flex: props.flex === 'normal' ? undefined : props.flex,
    gap: gapValue,
  }
})

function parseGapValue() {
  let gap = props.gap
  console.log(`14 gap`, gap);
  if (gap === 'small') {
    return '8px'
  } else if (gap === 'default') {
    return '16px'
  } else if (gap === 'large') {
    return '24px'
  } else {
    return processWidth(gap, true)
  }
}
</script>

<style scoped lang="scss">
.o-flex {
  display: flex;
  box-sizing: border-box;
  min-width: 0; /* Important for flex items to shrink properly */
}
</style>
