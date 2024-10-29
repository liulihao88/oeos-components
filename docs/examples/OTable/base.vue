<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

const data = ref([
  {
    name: 'andy',
  },
  {
    name: '   ',
  },
  {
    name: null,
  },
  {
    name: undefined,
  },
  {
    name: '',
  },
  {
    name: [],
  },
  {
    name: true,
  },
  { name: 0 },
])
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
