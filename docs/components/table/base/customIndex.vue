<script setup lang="ts">
import { tableData } from './data'
import { clone } from '@oeos-components/utils'

const indexMethod = (index: number) => {
  return index + 1 
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
  <o-table
    :data="clone(tableData, 1)"
    :columns="columns"
    :indexAttrs="{
      index: indexMethod,
    }"
  />
</template>
