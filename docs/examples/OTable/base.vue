<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

const num = ref(0)

// setInterval(() => {
//   num.value++
// }, 3000)

const data = ref([
  { name: '张三', address: '北京市朝阳区' },
  { name: '李四', address: '上海市浦东新区' },
  { name: '王五', address: '广州市天河区' },
  { name: '赵六', address: '深圳市南山区' },
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
