<template>
  {{ labelWidth2 }} ?? {{ props.labelWidth }}
  <el-descriptions v-bind="{ border: true, ...$attrs }" :column="column" class="o-descriptions">
    <el-descriptions-item v-for="(item, index) in options" :key="index">
      <template #label>
        <template v-if="item.labelRender">
          <render-comp :render="item.labelRender" :item="item" />
        </template>
        <template v-else-if="item.labelSlot">
          <slot :name="item.labelSlot" :item="item" :label="item.label" :value="parseValue(item)" :index="index"></slot>
        </template>
        <template v-else>
          <o-tooltip :content="item.label"></o-tooltip>
        </template>
      </template>

      <template v-if="item.render">
        <render-comp :render="item.render" :item="item" />
      </template>
      <template v-else-if="item.valueSlot">
        <slot :name="item.valueSlot" :item="item" :label="item.label" :value="parseValue(item)" :index="index"></slot>
      </template>
      <template v-else>
        <template v-if="showAll">
          {{ parseValue(item) }}
        </template>
        <o-tooltip class="w-100%" :content="parseContent(parseValue(item))" v-else></o-tooltip>
      </template>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">
import RenderComp from '@/components/common/renderComp.vue'
import { computed, VNode, ref } from 'vue'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import { processWidth } from '@oeos-components/utils'
import OTooltip from '@/components/tooltip'

defineOptions({
  name: 'ODescriptions',
})

type Options = {
  label: string
  value: any
  labelSlot?: string
  valueSlot?: string
  labelRender?: (item: any) => VNode | string
  render?: (item: any) => VNode | string
  filter?: (value: any) => any
}

const props = defineProps({
  options: {
    type: Array as () => Options[],
    required: true,
  },
  column: {
    type: Number,
    default: 3,
  },
  labelWidth: {
    type: String,
    default: 'auto',
  },
  showAll: {
    type: Boolean,
    default: false,
  },
})

const parseValue = (item: Options) => {
  if (item.filter) {
    return item.filter(item.value)
  } else {
    return item.value
  }
}

// 创建一个用于测量文本宽度的隐藏元素
const measureElement = ref<HTMLSpanElement | null>(null)

const getLabelWidth = (label: string): number => {
  if (!measureElement.value) {
    // 创建临时测量元素
    const tempEl = document.createElement('span')
    tempEl.style.visibility = 'hidden'
    tempEl.style.display = 'inline-block'
    tempEl.style.position = 'absolute'
    tempEl.style.whiteSpace = 'nowrap'
    tempEl.style.fontFamily = 'inherit'
    tempEl.style.fontSize = '14px' // 默认字体大小
    tempEl.style.fontWeight = 'bold'
    document.body.appendChild(tempEl)
    measureElement.value = tempEl
  }

  console.log(`73 label`, label);
  measureElement.value.textContent = label
  const width = measureElement.value.getBoundingClientRect().width
  return Math.ceil(width)
}

// 标签额外宽度补偿值，左右padding24px
const LABEL_EXTRA_WIDTH = 24

const labelWidth2 = computed(() => {
  // 如果设置了 labelWidth 为 "auto" 或者空值，则计算最大宽度
  console.log(`53 props.labelWidth`, props.labelWidth)
  if (props.labelWidth === 'auto' || !props.labelWidth) {
    let maxWidth = 0
    ;(props.options ?? []).forEach((v) => {
      const labelWidth = getLabelWidth(v.label)
      if (labelWidth > maxWidth) {
        maxWidth = labelWidth
      }
    })
    // 添加一些padding确保文本不会紧贴边界
    console.log(`64 maxWidth`, maxWidth)
    return maxWidth + LABEL_EXTRA_WIDTH + 'px'
  }

  if (props.labelWidth && props.labelWidth !== 'auto') {
    return processWidth(props.labelWidth, true)
  }
})

const column = computed(() => props.column)

const parseContent = (value: any) => {
  if (typeof value === 'function') {
    return value()
  } else {
    return value
  }
}

// 在组件卸载时清理测量元素
import { onUnmounted } from 'vue'
onUnmounted(() => {
  if (measureElement.value) {
    document.body.removeChild(measureElement.value)
  }
})
</script>

<style scoped lang="scss">
.o-descriptions {
  :deep(.el-descriptions__body),
  :deep(.el-descriptions__table) {
    table-layout: fixed;
  }

  :deep(.el-descriptions__table) tr {
    display: flex;
  }

  :deep(.el-descriptions__label) {
    width: v-bind(labelWidth2);
    min-width: 100px;
    text-align: right;
  }

  // 当labelWidth为auto时的样式处理
  :deep(.el-descriptions__label.auto-width) {
    width: auto;
    flex-shrink: 0;
  }

  :deep(.el-descriptions__content) {
    width: calc((100% - v-bind(labelWidth2) * v-bind(column)) / v-bind(column));
    min-width: 100px;
  }

  /* 去掉选择器中的空格 */
  :deep(.el-descriptions__table tr:last-child .el-descriptions__content:last-child) {
    flex: 1;
    min-width: 100px;
  }
}
</style>
