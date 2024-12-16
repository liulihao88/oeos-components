<template>
  <el-descriptions v-bind="{ border: true, ...$attrs }" :column="column" class="o-description">
    <el-descriptions-item v-for="(item, index) in options" :key="index">
      <template #label>
        <o-tooltip :content="item.label"></o-tooltip>
      </template>
      <template v-if="item.slotName">
        <slot :name="item.slotName" :item="item" :label="item.label" :value="item.value" :index="index"></slot>
      </template>
      <template v-else>
        <template v-if="showAll">
          {{ item.value }}
        </template>
        <o-tooltip class="w-100%" :content="parseContent(item.value)" v-else></o-tooltip>
      </template>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
const { proxy } = getCurrentInstance()

const props = defineProps({
  options: {
    type: Array,
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
const labelWidth = computed(() => {
  let maxLabelLength = 1
  ;(props.options ?? []).forEach((v) => {
    let labelStrLength = v.label.length
    if (labelStrLength > maxLabelLength) {
      maxLabelLength = labelStrLength
    }
  })
  if (props.labelWidth) {
    return proxy.processWidth(props.labelWidth, true)
  } else {
    return maxLabelLength * 12 + 'px'
  }
})
const column = computed(() => props.column)
const parseContent = (value) => {
  if (typeof value === 'function') {
    return value()
  } else {
    return value
  }
}
</script>

<style scoped lang="scss">
.o-description {
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
