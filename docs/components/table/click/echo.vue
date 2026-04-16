<script setup>
import { computed, ref } from 'vue'

const data = [
  { id: 1, name: 'Andy', role: '前端开发', dept: '研发一部' },
  { id: 2, name: 'Bella', role: '测试工程师', dept: '质量保障部' },
  { id: 3, name: 'Chris', role: '产品经理', dept: '产品中心' },
]

const columns = [
  {
    label: '姓名',
    prop: 'name',
  },
  {
    label: '岗位',
    prop: 'role',
  },
  {
    label: '部门',
    prop: 'dept',
  },
]

const selectedRow = ref({ ...data[1] })

const selectedText = computed(() => {
  if (!selectedRow.value) return '--'
  return `${selectedRow.value.id} / ${selectedRow.value.name} / ${selectedRow.value.role}`
})

const setSelectedRow = (row) => {
  selectedRow.value = row ? { ...row } : null
}
</script>

<template>
  <div>
    <div class="single-demo__toolbar">
      <span class="single-demo__value">当前回显值: {{ selectedText }}</span>
      <o-button @click="setSelectedRow(data[0])">回显第一行</o-button>
      <o-button @click="setSelectedRow(data[1])">回显第二行</o-button>
      <o-button @click="setSelectedRow()">清空</o-button>
    </div>

    <o-table
      v-model="selectedRow"
      selection-type="single"
      :columns="columns"
      :data="data"
      :showIndex="false"
      :showPage="false"
      row-key="id"
      highlight-current-row
    />
  </div>
</template>

<style scoped lang="scss">
.single-demo__toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}

.single-demo__value {
  color: #606266;
  font-size: 14px;
}
</style>
