<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

const num = ref(0)

// setInterval(() => {
//   num.value++
// }, 3000)

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
    isShow: (row, scope) => {
      return scope.$index % 2 === 0
    },
    btns: [
      {
        content: '编辑',
      },
    ],
  },
]
function editRow(row, scope, evt) {
  console.log(`42 evt`, evt)
  console.log(`46 scope`, scope)
  console.log(`86 row`, row)
}
</script>

<template>
  <div>
    <el-button type="primary" @click="num++">测试13</el-button>
    <o-table
      :columns="columns"
      :data="data"
      ref="tableRef"
      :header-cell-style="{
        textAlign: 'left',
      }"
    ></o-table>
  </div>
</template>

<style scoped lang="scss"></style>
