<script setup>
import { computed, ref } from 'vue'

const selectedRows = ref([])

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

const selectedText = computed(() => {
  if (!selectedRows.value.length) return '--'
  return selectedRows.value.map((item) => item.name).join(', ')
})
</script>

<template>
  <div>
    <div class="multiple-demo__value">当前选中: {{ selectedText }}</div>
    <div class="multiple-demo__value">当前选中行: {{ selectedRows }}</div>
    <o-table
      v-model="selectedRows"
      selection-type="multiple"
      :columns="columns"
      :data="data"
      :showPage="false"
    />
  </div>
</template>

<style scoped lang="scss">
.multiple-demo__value {
  margin-bottom: 12px;
  color: #606266;
  font-size: 14px;
}
</style>
