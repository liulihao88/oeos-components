<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const data = ref([])

for (let i = 0; i < 32; i++) {
  let obj = {
    name: 'andy' + i,
  }
  data.value.push(obj)
}
const columns = [
  {
    label: '名字',
    prop: 'name',
    isShow: false,
  },
  {
    key: 'operation',
    label: '操作',
    isShow: (row) => row.name === 'andy',
    btns: [
      {
        content: '编辑',
      },
      {
        content: '删除',
        isShow: (row) => {
          return row.name === 'tom'
        },
      },
    ],
  },
]
</script>

<template>
  <div>
    <o-table :columns="columns" :data="data" :pageSize="10" ref="tableRef"></o-table>
  </div>
</template>
