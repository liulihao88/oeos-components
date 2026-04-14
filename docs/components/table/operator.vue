<script setup lang="tsx">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const data = ref([{ name: 'andy' }])
const columns = [
  {
    label: '名字',
    prop: 'name',
    render: ({ row, scope, value, column, index }) => {
      return (
        <>
          <oIcon name="delete"></oIcon> <span class="cl-blue">render1111</span>
        </>
      )
    },
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
        render: ({ row, scope, value, column, action, index }) => {
          return (
            <>
              <oIcon name="delete"></oIcon> <span class="cl-blue">render</span>
            </>
          )
        },
      },

      {
        content: '编辑3',
        render: ({ row, scope, value, column, action, index }) => {
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
