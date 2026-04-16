<script setup lang="ts">
import { computed, ref, nextTick, watch } from 'vue'
import { $toast } from '@oeos-components/utils'

interface RepeatRecord {
  id: string
  file1Name: string
  file1LineNumber: number
  file1Amount: number
  file1OtherInfo: string
  file2Name: string
  file2LineNumber: number
  file2Amount: number
  file2OtherInfo: string
}

const displayData = ref()
const tableRef = ref()
const syncingSelection = ref(false)

const syncSelection = async () => {
  await nextTick()
  if (!tableRef.value) return

  syncingSelection.value = true
  try {
    tableRef.value.$refs.tableRef.clearSelection()
    displayData.value.forEach((row) => {
      if (selectedMap.value.has(row.id)) {
        tableRef.value.$refs.tableRef.toggleRowSelection(row, true)
      }
    })
  } finally {
    await nextTick()
    syncingSelection.value = false
  }
}

const response = ref({})

const currentPage = ref(1)
const pageSize = ref(10)
const selectedMap = ref(new Map<string, any>())

async function getCaseDuplicateData(params: { pageNo: number; pageSize: number; caseId?: string }) {
  const total = 15
  const mockData: RepeatRecord[] = Array.from({ length: total }, (_, index) => {
    const current = index + 1
    return {
      id: String(current),
      file1Name: `凭证A-${current}.pdf`,
      file1LineNumber: current,
      file1Amount: 1000 + current * 10,
      file1OtherInfo: `文件一备注-${current}`,
      file2Name: `凭证B-${current}.pdf`,
      file2LineNumber: current + 2,
      file2Amount: 1200 + current * 10,
      file2OtherInfo: `文件二备注-${current}`,
    }
  })

  await new Promise((resolve) => setTimeout(resolve, 300))

  const start = (params.pageNo - 1) * params.pageSize
  const end = start + params.pageSize
  const records = mockData.slice(start, end).map((item, index) => ({
    ...item,
    index: start + index + 1,
  }))

  return {
    total,
    pageNo: params.pageNo,
    pageSize: params.pageSize,
    records,
  }
}

const init = async () => {
  let sendParams = {
    caseId: '2034799048267980802',
    pageNo: currentPage.value,
    pageSize: pageSize.value,
  }
  let res = await getCaseDuplicateData(sendParams)
  response.value = res
  displayData.value = res.records
  await syncSelection()
}
init()

const columns = [] as any[]

const formatLine = (lineNumber: number) => `第${lineNumber}行`
const formatAmount = (amount: number) => `¥${amount}`
const selectedCount = computed(() => selectedMap.value.size)
const selectedIds = computed(() => Array.from(selectedMap.value.keys()))

const handleSelectionChange = (rows: RepeatRecord[]) => {
  if (syncingSelection.value) return

  const currentPageIds = new Set(displayData.value.map((item) => item.id))

  currentPageIds.forEach((id) => {
    selectedMap.value.delete(id)
  })

  rows.forEach((row) => {
    selectedMap.value.set(row.id, row)
  })
}

const handleUpdate = (pageNo: number, size: number) => {
  currentPage.value = pageNo
  pageSize.value = size
  init()
}

const clearSelected = () => {
  selectedMap.value.clear()
  tableRef.value?.$refs.tableRef.clearSelection()
}

const exportData = () => {
  $toast(`导出全部数据，共 ${response.value.total} 条`, 's')
}

const exportSelectedData = () => {
  if (!selectedCount.value) {
    $toast('请先选择数据', 'w')
    return
  }

  $toast(`导出选择数据，共 ${selectedCount.value} 条`, 's')
}

watch(
  selectedMap,
  (val) => {
    console.log(`14 103行 test/t2.vue val`, val)
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>

<template>
  <div class="repeat-page">
    <div class="repeat-page__wrap">
      <div class="repeat-page__toolbar">
        <o-button type="primary" @click="exportData">导出数据</o-button>
        <o-button type="primary" @click="exportSelectedData">导出选择数据</o-button>
        <div>
          已选ID: {{ selectedIds.length ? selectedIds.join(', ') : '--' }}
        </div>
      </div>

      <div class="repeat-page__selection-bar">
        <span class="repeat-page__selection-icon">i</span>
        <template v-if="selectedCount">
          <span>已选中 {{ selectedCount }} 条记录(可跨页)</span>
          <span class="repeat-page__selection-split">|</span>
          <span class="repeat-page__selection-clear" @click="clearSelected">清空</span>
        </template>
        <span v-else>未选中任何数据</span>
      </div>

      <o-table
        ref="tableRef"
        :columns="columns"
        :data="displayData"
        :total="response.total"
        :pageSize="pageSize"
        :currentPage="currentPage"
        :showIndex="false"
        row-key="id"
        height="560"
        class="repeat-page__table"
        @selection-change="handleSelectionChange"
        @update="handleUpdate"
      >
        <el-table-column type="selection" width="58" align="center" :reserve-selection="true" />
        <el-table-column prop="index" label="序号" width="70" align="center" />
        <el-table-column label="文件一" align="center">
          <el-table-column prop="file1Name" label="文件名称" min-width="100" align="center" show-overflow-tooltip />
          <el-table-column label="行号" min-width="100" align="center">
            <template #default="{ row }">
              {{ formatLine(row.file1LineNumber) }}
            </template>
          </el-table-column>
          <el-table-column label="发生金额" min-width="100" align="center">
            <template #default="{ row }">
              {{ formatAmount(row.file1Amount) }}
            </template>
          </el-table-column>
          <el-table-column label="其他信息" min-width="100" align="center">
            <template #default="{ row }">
              {{ row.file1OtherInfo || '--' }}
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="文件二" align="center">
          <el-table-column prop="file2Name" label="文件名称" min-width="100" align="center" show-overflow-tooltip />
          <el-table-column label="行号" min-width="100" align="center">
            <template #default="{ row }">
              {{ formatLine(row.file2LineNumber) }}
            </template>
          </el-table-column>
          <el-table-column label="发生金额" min-width="100" align="center">
            <template #default="{ row }">
              {{ formatAmount(row.file2Amount) }}
            </template>
          </el-table-column>
          <el-table-column label="其他信息" min-width="100" align="center">
            <template #default="{ row }">
              {{ row.file2OtherInfo || '--' }}
            </template>
          </el-table-column>
        </el-table-column>
      </o-table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.repeat-page {
  height: 100%;
  padding: 10px 14px 22px;
  background: #fff;

  &__top-line {
    height: 6px;
    margin-bottom: 8px;
    background: #ebf5ff;
    border: 1px solid #8fd0ff;
    border-radius: 3px;
  }

  &__wrap {
    overflow: hidden;
    background: #fff;
    border: 1px solid #ebeef5;
  }

  &__toolbar {
    display: flex;
    gap: 16px;
    padding: 16px;
    border-bottom: 1px solid #ebeef5;

    :deep(.el-button) {
      min-width: 132px;
      height: 42px;
      font-size: 16px;
    }
  }

  &__selection-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 12px 16px 12px;
    padding: 8px 20px;
    color: #303133;
    font-size: 16px;
    background: #dff3ff;
    border: 1px solid #4bb8ff;
    border-radius: 8px;
  }

  &__selection-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    background: #1890ff;
    border-radius: 50%;
  }

  &__selection-split {
    color: #96a3b5;
  }

  &__selection-clear {
    color: #1890ff;
    cursor: pointer;
  }

  &__group-header {
    display: grid;
    grid-template-columns: 58px 62px minmax(600px, 1fr) minmax(600px, 1fr);
    background: #fff;
    border-bottom: 1px solid #ebeef5;
  }

  &__group-header-empty,
  &__group-header-title {
    height: 48px;
    border-right: 1px solid #ebeef5;
  }

  &__group-header-empty--index {
    border-right: 1px solid #ebeef5;
  }

  &__group-header-title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: 700;
    color: #303133;
  }

  &__group-header-title:last-child {
    border-right: 0;
  }

  :deep(.el-table th.el-table__cell) {
    padding: 10px 0;
    font-size: 15px;
    font-weight: 700;
    color: #303133;
    background: #fff;
  }

  :deep(.el-table td.el-table__cell) {
    padding: 14px 0;
    font-size: 14px;
    color: #606266;
  }

  :deep(.el-table .cell) {
    line-height: 1.4;
  }

  :deep(.el-table__body .el-table__row:hover > td.el-table__cell) {
    background: #f8fbff;
  }
}
</style>
