<script setup lang="tsx">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const data = ref([{ name: 'andy' }])
const columns = [
  {
    label: '名字',
    prop: 'name',
  },
  {
    key: 'operation',
    label: '操作',
    btns: [
      {
        content: '编辑',
      },
      {
        width: 80,
        content: '编辑',
        render: (row, scope, value) => {
          return (
            <>
              <oIcon name="delete"></oIcon> <span class="cl-blue">render</span>
            </>
          )
        },
      },
      {
        content: '编辑',
      },
      {
        content: '编辑1',
      },
      {
        content: '编辑2',
      },
      {
        content: '编辑3',
        render: (row, scope, value) => {
          console.log(`15 value`, value)
          console.log(`31 scope`, scope)
          console.log(`55 row`, row)
          return (
            <>
              <oIcon name="plus"></oIcon> <span class="cl-blue">我是蓝色</span>
            </>
          )
        },
      },
    ],
  },
]
</script>

<template>
  <div>
    <o-table :columns="columns" :data="data" ref="tableRef"></o-table>
  </div>
</template>
