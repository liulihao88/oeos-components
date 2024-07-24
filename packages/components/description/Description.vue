<template>
  <el-descriptions v-bind="{ border: true, ...$attrs }" :column="column" class="o-description">
    <el-descriptions-item v-for="(item, index) in options" :key="index">
      <template #label>
        <o-tooltip :content="item.label"></o-tooltip>
      </template>
      <o-tooltip class="" :content="item.value"></o-tooltip>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'

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
    default: '100px',
  },
})
const labelWidth = computed(() => props.labelWidth)
const column = computed(() => props.column)
</script>

<style scoped lang="scss">
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
</style>
