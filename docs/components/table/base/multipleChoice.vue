<script setup lang="ts">
import { computed, ref } from 'vue'
import { tableData } from './data'

const multipleSelection = ref([])
const setSelection = (rows?: any[]) => {
  multipleSelection.value = rows ? [...rows] : []
}

const selectedText = computed(() => {
  if (!multipleSelection.value.length) return '--'
  return multipleSelection.value.map((item) => item.name).join(', ')
})

const columns: TableColumnList = [
  {
    label: '日期',
    prop: 'date',
  },
  {
    label: '姓名',
    prop: 'name',
  },
  {
    label: '地址',
    prop: 'address',
  },
]
</script>

<template>
  <div>
    <div class="multiple-demo__value">当前选中: {{ selectedText }}</div>
    <o-table
      v-model="multipleSelection"
      :data="tableData"
      :columns="columns"
      selection-type="multiple"
      :showPage="false"
      row-key="name"
    />
    <div style="margin-top: 20px">
      <el-button @click="setSelection([tableData[1], tableData[2]])">回显第二、三行</el-button>
      <el-button @click="setSelection([tableData[0]])">回显第一行</el-button>
      <el-button @click="setSelection()">清空</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.multiple-demo__value {
  margin-bottom: 12px;
  color: #606266;
  font-size: 14px;
}
</style>
