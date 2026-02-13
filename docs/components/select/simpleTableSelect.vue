<script lang="ts">
const LABEL = 'fullName'
const VALUE = 'id'
</script>
<script setup lang="ts">
import { ref, getCurrentInstance, watch, nextTick } from 'vue'
const { proxy } = getCurrentInstance()
const selectValue = ref('zs')
const selectName = ref('')
const selectRef = ref()
const tableRef = ref()

const editRow = (row) => {
  proxy.$message(`编辑了${row.name}`)
}
const columns = [
  {
    label: '名字',
    prop: 'name',
  },
  {
    label: '全名',
    prop: 'fullName',
  },
  {
    key: 'operation',
    label: '操作',
    btns: [
      {
        content: '编辑',
        handler: () => {},
        comp: 'o-icon',
        attrs: {
          name: 'edit',
          content: '编辑',
        },
        handler: editRow
      },
    ],
  },
]
const data = ref([
  { name: '张三', id: 'zs', fullName: '张三丰' },
  { name: '李四', id: 'ls', fullName: '李四光' },
  { name: '王五', id: 'ww', fullName: '王五平' },
])

const handleCurrentChange = (val) => {
  selectName.value = val?.[LABEL] ?? ''
  selectValue.value = val?.[VALUE] ?? ''
  selectRef.value.$refs.selectRef.blur()
}

watch(
  () => selectValue.value,
  async (val) => {
    if (val) {
      selectName.value = data.value.find((item) => item[VALUE] === val)?.[LABEL] || ''
      let taskNameIdx = data.value.findIndex((item) => {
        return item[VALUE] === val
      })
      await nextTick()
      tableRef.value.$refs.tableRef.setCurrentRow(data.value[taskNameIdx === -1 ? 0 : taskNameIdx])
    } else {
      selectName.value = ''
    }
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>

<template>
  <div>
    <o-select
      v-model="selectName"
      :title="`简单的 => ${selectValue}`"
      width="100%"
      ref="selectRef"
      value-key="value"
      @clear="handleCurrentChange(null)"
    >
      <template #empty>
        <o-table
          :columns="columns"
          :data="data"
          ref="tableRef"
          :showPage="false"
          @current-change="handleCurrentChange"
          highlight-current-row
        ></o-table>
      </template>
    </o-select>
  </div>
</template>
