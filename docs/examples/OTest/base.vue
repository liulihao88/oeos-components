<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

const data = ref([
  {
    name: 'andy',
  },
  {
    name: 'andy2',
  },
  {
    name: 'andy3',
  },
  {
    name: 'andy4',
  },
])
const columns = [
  {
    label: '名字',
    prop: 'name',
  },
  {
    key: 'operation',
    label: '操作',
    maxBtns: 6,
    btns: [
      {
        content: '编辑',
        isShow: (row) => {
          return row.name === 'andy'
        },
      },
      {
        content: '编辑2',
        isShow: (row) => {
          return row.name === 'andy2'
        },
      },
      {
        content: '编辑3',
        isShow: (row) => {
          return row.name.indexOf('andy') !== -1
        },
      },
      {
        content: '编辑4',
        isShow: (row) => {
          return row.name === 'andy4'
        },
      },
      {
        content: '编辑5',
        isShow: (row) => {
          return row.name === 'andy'
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

<style scoped lang="scss"></style>
