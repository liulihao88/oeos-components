<script setup>
import { computed, ref } from 'vue'

const selectedRow = ref(null)

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
  if (!selectedRow.value) return '--'
  return `${selectedRow.value.id} / ${selectedRow.value.name} / ${selectedRow.value.role}`
})
</script>

<template>
  <div>
    <div class="single-demo__value">当前选中: {{ selectedText }}</div>
    <o-table
      v-model="selectedRow"
      selection-type="single"
      :columns="columns"
      :data="data"
      :showIndex="false"
      :showPage="false"
      highlight-current-row
    />
  </div>
</template>

<style scoped lang="scss">
.single-demo__value {
  margin-bottom: 12px;
  color: #606266;
  font-size: 14px;
}
</style>
