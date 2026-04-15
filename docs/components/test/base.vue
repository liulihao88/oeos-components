<script setup lang="tsx">
import { ref } from 'vue'

const data = ref([
  { name: '张三', address: '北京市朝阳区' },
  { name: '李四', address: '上海市浦东新区' },
  { name: '王五', address: '河南省项城市' },
])

const columns = [
  {
    label: '名字我是个',
    prop: 'name',
    width: 120,
  },
  {
    label: '地址地址地址地址地址地址地址地址地址地址地址地址地址9876543',
    prop: 'address',
    width: 180,
  },
  {
    key: 'operation',
    label: '操作',
    btns: [
      {
        width: 50,
        render: ({ row }) => {
          const canEdit = row.status === 1

          return (
            <span
              style={{
                color: canEdit ? 'var(--blue)' : 'red',
                cursor: canEdit ? 'pointer' : 'not-allowed',
              }}
              onClick={() => {
                if (!canEdit) return
                handleEdit(row)
              }}
            >
              编辑
            </span>
          )
        },
      },
    ],
  },
]
</script>

<template>
  <div class="">
    <o-table :columns="columns" :data="data" :show-page="false" />
  </div>
</template>

<style scoped>
.header-tooltip-demo {
  padding: 16px;
}
</style>
