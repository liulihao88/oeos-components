<script setup>
const data = [
  {
    id: '1',
    index: 1,
    file1Name: '凭证A-1.pdf',
    file1LineNumber: 1,
    file1Amount: 1010,
    file1OtherInfo: '文件一备注-1',
    file2Name: '凭证B-1.pdf',
    file2LineNumber: 3,
    file2Amount: 1210,
    file2OtherInfo: '文件二备注-1',
  },
  {
    id: '2',
    index: 2,
    file1Name: '凭证A-2.pdf',
    file1LineNumber: 2,
    file1Amount: 1020,
    file1OtherInfo: '文件一备注-2',
    file2Name: '凭证B-2.pdf',
    file2LineNumber: 4,
    file2Amount: 1220,
    file2OtherInfo: '文件二备注-2',
  },
]

const columns = []

const formatLine = (lineNumber) => `第${lineNumber}行`
const formatAmount = (amount) => `¥${amount}`
</script>

<template>
  <div class="group-header-demo">
    <o-table :columns="columns" :data="data" :showIndex="false" :showPage="false">
      <el-table-column prop="index" label="序号" width="70" align="center" />

      <el-table-column label="文件一" align="center">
        <el-table-column prop="file1Name" label="文件名称" min-width="140" align="center" show-overflow-tooltip />
        <el-table-column label="行号" min-width="100" align="center">
          <template #default="{ row }">
            {{ formatLine(row.file1LineNumber) }}
          </template>
        </el-table-column>
        <el-table-column label="发生金额" min-width="120" align="center">
          <template #default="{ row }">
            {{ formatAmount(row.file1Amount) }}
          </template>
        </el-table-column>
        <el-table-column label="其他信息" min-width="140" align="center">
          <template #default="{ row }">
            {{ row.file1OtherInfo || '--' }}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="文件二" align="center">
        <el-table-column prop="file2Name" label="文件名称" min-width="140" align="center" show-overflow-tooltip />
        <el-table-column label="行号" min-width="100" align="center">
          <template #default="{ row }">
            {{ formatLine(row.file2LineNumber) }}
          </template>
        </el-table-column>
        <el-table-column label="发生金额" min-width="120" align="center">
          <template #default="{ row }">
            {{ formatAmount(row.file2Amount) }}
          </template>
        </el-table-column>
        <el-table-column label="其他信息" min-width="140" align="center">
          <template #default="{ row }">
            {{ row.file2OtherInfo || '--' }}
          </template>
        </el-table-column>
      </el-table-column>
    </o-table>
  </div>
</template>

<style scoped lang="scss">
.group-header-demo {
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
}
</style>
