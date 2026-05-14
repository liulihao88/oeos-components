<script setup lang="ts">
import { tableData } from './data'

const tableRowClassName = ({ rowIndex }: { rowIndex: number }) => {
  if (rowIndex === 1 || rowIndex === 5) {
    return 'o-warning-row'
  } else if (rowIndex === 3 || rowIndex === 7) {
    return 'o-success-row'
  }
  return ''
}

const columns: TableColumnList = [
  {
    label: '日期',
    prop: 'date',
  },
  {
    label: '姓名',
    prop: 'name',
  },
  {
    label: '地址',
    prop: 'address',
  },
]
</script>

<template>
  <o-table :data="tableData" :columns="columns" :row-class-name="tableRowClassName" />
</template>

<style scoped lang="scss">
:deep(.o-warning-row) {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

:deep(.o-success-row) {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
