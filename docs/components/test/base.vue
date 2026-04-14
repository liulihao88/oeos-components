<script setup lang="tsx">
import { ref } from 'vue'

const data = ref([
  { name: '张三', address: '北京市朝阳区', status: 1 },
  { name: '李四', address: '上海市浦东新区', status: 0 },
  { name: '王五', address: '河南省项城市', status: 1 },
])

const handleEdit = (row) => {
  console.log('编辑', row)
}

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
    label: '状态',
    prop: 'status',
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

const loading = ref(false)
const toggleLoading = async () => {
  loading.value = true
  await new Promise((resolve) => setTimeout(resolve, 2000))
  loading.value = false
}
</script>

<template>
  <div>
    <el-button type="primary" @click="toggleLoading">请求loading</el-button>
    <o-table :columns="columns" :data="data" :loading="loading"></o-table>
  </div>
</template>
