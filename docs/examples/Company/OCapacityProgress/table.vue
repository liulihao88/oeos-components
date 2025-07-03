<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { formatBytes } from '@/utils'

const data = ref([
  { name: 'andy', totalSpace: 1234, overUsedSpace: 1000 },
  { name: '凌云', totalSpace: 2234, overUsedSpace: 800 },
])
const columns = [
  {
    label: '宽度大于200',
    prop: 'cap',
    width: 300,
    useSlot: true,
  },
  {
    label: '宽度小于等于200',
    prop: 'cap2',
    useSlot: true,
    width: 200,
  },
  {
    key: 'operation',
    label: '操作',
    btns: [
      {
        content: '编辑',
      },
    ],
  },
]

const row = ref({
  noUsed: -234,
  totalSpace: 100,
  usedSpace: 23,
  overUsedSpace: 200,
})

function parseSpace(space) {
  if (!space) {
    return '0.00B'
  }
  if (space < 0) {
    return '?'
  }
  return formatBytes(space ?? 0)
}
</script>

<template>
  <div>
    <o-table :columns="columns" :data="data" ref="tableRef">
      <template #cap="{ row }">
        <o-capacity-progress :total="row.totalSpace" :used="row.overUsedSpace"></o-capacity-progress>
      </template>
      <template #cap2="{ row }">
        <o-capacity-progress :total="row.totalSpace" :used="row.overUsedSpace"></o-capacity-progress>
      </template>
    </o-table>
  </div>
</template>
