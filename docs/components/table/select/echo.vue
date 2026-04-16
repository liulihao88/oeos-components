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

const selectedRows = ref([{ ...data[0] }, { ...data[2] }])

const selectedText = computed(() => {
  if (!selectedRows.value.length) return '--'
  return selectedRows.value.map((item) => item.name).join(', ')
})

const setSelectedRows = (rows = []) => {
  selectedRows.value = rows.map((item) => ({ ...item }))
}
</script>

<template>
  <div>
    <div class="multiple-demo__toolbar">
      <span class="multiple-demo__value">当前回显值: {{ selectedText }} {{ selectedRows.length }}</span>
      <o-button @click="setSelectedRows([data[0], data[2]])">回显前后两行</o-button>
      <o-button @click="setSelectedRows([data[1]])">回显第二行</o-button>
      <o-button @click="setSelectedRows()">清空</o-button>
    </div>

    <o-table
      v-model="selectedRows"
      selection-type="multiple"
      :columns="columns"
      :data="data"
      :showIndex="false"
      :showPage="false"
      row-key="id"
    />
  </div>
</template>

<style scoped lang="scss">
.multiple-demo__toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}

.multiple-demo__value {
  color: #606266;
  font-size: 14px;
}
</style>
