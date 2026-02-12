<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'

const data = ref([
  { name: '张三', address: '北京市朝阳区' },
  { name: '李四', address: '上海市浦东新区' },
])
const columns = [
  {
    label: '名字',
    prop: 'name',
  },
  {
    label: '地址',
    prop: 'address',
  },
  {
    key: 'operation',
    label: '操作',
    btns: [
      {
        content: '编辑',
        handler: () => {},
        comp: 'o-icon',
        attrs: {
          name: 'edit',
          content: '编辑',
        },
        disabled: (row) => row.status === 'Loading',
      },
    ],
  },
]
</script>

<template>
  <div>
    <o-table :columns="columns" :data="data"></o-table>
  </div>
</template>
