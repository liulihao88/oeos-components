<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { $toast } from '@oeos-components/utils'

const data = ref([
  { name: '张三', address: '北京市朝阳区', status: 0 },
  { name: '李四', address: '上海市浦东新区', status: 1 },
  { name: '王五', address: '河南省项城市', status: 0 },
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
        handler: ({ row, value, index, column, prop }) => {
          console.log(`46 prop`, prop);
          console.log(`59 column`, column);
          console.log(`84 index`, index)
          console.log(`34 value`, value)
          console.log(`17 row`, row)
        },
        comp: 'o-icon',
        attrs: {
          name: 'edit',
          content: '编辑',
        },
        disabled: ({ row }) => {
          console.log(`74 row`, row)

          return row.status === 0
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
