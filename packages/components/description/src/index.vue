<template>
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
import { computed, VNode } from 'vue'
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
    default: '',
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

const labelWidth = computed(() => {
  let maxLabelLength = 1
  ;(props.options ?? []).forEach((v) => {
    let labelStrLength = v.label.length
    if (labelStrLength > maxLabelLength) {
      maxLabelLength = labelStrLength
    }
  })
  if (props.labelWidth) {
    return processWidth(props.labelWidth, true)
  } else {
    return maxLabelLength * 12 + 'px'
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
    width: v-bind(labelWidth);
    min-width: 100px;
    text-align: right;
  }
  :deep(.el-descriptions__content) {
    width: calc((100% - v-bind(labelWidth) * v-bind(column)) / v-bind(column));
    min-width: 100px;
  }
  /* 去掉选择器中的空格 */
  :deep(.el-descriptions__table tr:last-child .el-descriptions__content:last-child) {
    flex: 1;
    min-width: 100px;
  }
}
</style>
