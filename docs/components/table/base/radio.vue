<script setup lang="ts">
import { computed, ref } from 'vue'
import { tableData } from './data'

const currentRow = ref(null)

const setCurrent = (row?: any) => {
  currentRow.value = row ?? null
}

const currentText = computed(() => {
  if (!currentRow.value) return '--'
  return `${currentRow.value.date} / ${currentRow.value.name} / ${currentRow.value.address}`
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
    <div class="single-demo__value">当前选中: {{ currentText }}</div>
    <o-table
      v-model="currentRow"
      :data="tableData"
      :columns="columns"
      selection-type="single"
      :showPage="false"
      row-key="name"
    />
    <div style="margin-top: 20px">
      <el-button @click="setCurrent(tableData[1])">选中第二行</el-button>
      <el-button @click="setCurrent()">清空</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.single-demo__value {
  margin-bottom: 12px;
  color: #606266;
  font-size: 14px;
}
</style>
