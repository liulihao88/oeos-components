<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'

const data = ref([
  { name: '张三', address: '北京市朝阳区' },
  { name: '李四', address: '上海市浦东新区' },
  { name: '王五', address: '河南省项城市' },
])
const columns = [
  {
    label: '名字',
    prop: 'name',
    isShow: ({ column }) => {
      console.log(column)
      return false
    },
  },
  {
    label: '地址',
    prop: 'address',
    useSlot: true,
  },
  {
    key: 'operation',
    label: '操作',
    btns: [
      {
        content: '编辑',
        handler: () => {},
        isShow: ({ scope }) => {
          return scope.$index === 1 ? true : false
        },
        comp: 'o-icon',
        attrs: {
          name: 'edit',
          content: '编辑',
        },
        disabled: ({ row }) => row.status === 'Loading',
      },
      {
        content: 'haha',
        comp: 'o-icon',
        attrs: {
          name: 'delete',
          content: '删除',
        },
        isShow: true,
      },
    ],
  },
]
</script>

<template>
  <div>
    <o-table :columns="columns" :data="data" :showPage="false">
      <template #address="{ index, scope, index2 }">
        {{ scope.$index }} !!{{ index }} ?? {{ $index }} =={{ index2 }}
      </template>
    </o-table>
  </div>
</template>
