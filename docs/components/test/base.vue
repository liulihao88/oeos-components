<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import type { TablePageChangePayload } from '@/types/index.ts'
const { proxy } = getCurrentInstance()
const data = ref([])
const editRow = (row) => {}
const columns = [
  {
    label: '名字1',
    prop: 'name',

  },
  {
    label: '年龄',
    prop: 'age',
  },
  {
    key: 'operation',
    label: '操作',
    btns: [
      {
        content: '编辑',
        comp: 'o-icon',
        attrs: {
          name: 'edit',
          type: 'svg',
          content: '编辑',
        },
      },
      {
        content: '删除',
        comp: 'o-icon',
        attrs: {
          name: 'delete',
          type: 'svg',
          content: '删除',
        },
      },
    ],
  },
]
function pageChange({pageNumber, pageSize}) {
  void {pageNumber, pageSize}
}
</script>

<template>
  <div>
    <div>docs/components/test/base.vue</div>
    <o-table :columns="columns" :data="data" ref="tableRef" @page-change="pageChange"></o-table>
  </div>
</template>
