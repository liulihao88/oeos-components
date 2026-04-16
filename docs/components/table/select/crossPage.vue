<script setup>
import { computed, ref } from 'vue'

const fullData = [
  { id: 1, name: 'Andy', role: '前端开发', dept: '研发一部' },
  { id: 2, name: 'Bella', role: '测试工程师', dept: '质量保障部' },
  { id: 3, name: 'Chris', role: '产品经理', dept: '产品中心' },
  { id: 4, name: 'Dora', role: '后端开发', dept: '研发二部' },
  { id: 5, name: 'Eason', role: '交互设计', dept: '设计中心' },
  { id: 6, name: 'Fiona', role: '数据分析', dept: '数据中心' },
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

const currentPage = ref(1)
const pageSize = ref(2)
const displayData = ref([])
const selectedRows = ref([])

const updateDisplayData = () => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  displayData.value = fullData.slice(start, end)
}

updateDisplayData()

const selectedText = computed(() => {
  if (!selectedRows.value.length) return '--'
  return selectedRows.value.map((item) => item.name).join(', ')
})

const handleUpdate = (pageNumber, size) => {
  currentPage.value = pageNumber
  pageSize.value = size
  updateDisplayData()
}

const clearSelected = () => {
  selectedRows.value = []
}
</script>

<template>
  <div>
    <div class="multiple-demo__toolbar">
      <span class="multiple-demo__value">当前页: 第 {{ currentPage }} 页</span>
      <span class="multiple-demo__value">已选: {{ selectedText }}</span>
      <o-button @click="clearSelected">清空</o-button>
    </div>

    <o-table
      v-model="selectedRows"
      selection-type="multiple"
      :columns="columns"
      :data="displayData"
      :total="fullData.length"
      :pageSize="pageSize"
      :pageNumber="currentPage"
      :showIndex="false"
      row-key="id"
      @update="handleUpdate"
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
