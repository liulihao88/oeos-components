<script lang="tsx">
const LABEL = 'name'
const VALUE = 'id'
</script>
<script setup lang="tsx">
import { ref, getCurrentInstance, watch, nextTick } from 'vue'
const { proxy } = getCurrentInstance()
const selectRow = ref([])
const selectValue = ref(['zs'])
const selectName = ref([])
const selectRef = ref()
const tableRef = ref()
const isClear = ref(false)

const editRow = (row) => {
  proxy.$message(`编辑了${row.name}`)
}
const columns = [
  {
    type: 'selection',
    key: 'name',
  },
  {
    label: '名字',
    prop: 'name',
    width: 100,
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
        comp: 'o-icon',
        attrs: {
          name: 'edit',
          content: '编辑',
        },
        handler: editRow,
      },
    ],
  },
]
const data = ref([
  { name: '张三', id: 'zs', fullName: '张三丰' },
  { name: '李四', id: 'ls', fullName: '李四光' },
  { name: '王五', id: 'ww', fullName: '王五平' },
])

const clear = async () => {
  console.log(`24 isClear.value`, isClear.value)
  isClear.value = true
  selectRow.value = []
  selectValue.value = []
  selectName.value = []
  await nextTick()
}

const handleCurrentChange = (val) => {
  console.log(`84 val`, val)
  selectRow.value = val
  if (val?.length > 0) {
    selectValue.value = val.map((v) => v[VALUE])
    selectName.value = val.map((v) => v[LABEL])
  } else {
    selectValue.value = []
    selectName.value = []
  }
}

watch(
  () => selectValue.value,
  async (val) => {
    console.log(`02 val`, val)
    selectRow.value = data.value.filter((v) => val.includes(v[VALUE]))
    selectName.value = data.value.filter((v) => val.includes(v[VALUE])).map((v) => v[LABEL])
    console.log(`35 selectName.value`, selectName.value)
  },
  {
    deep: true,
    immediate: true,
  },
)

const change = (val, ...a) => {
  console.log(`18 a`, a)
  console.log(`97 isClear.value`, isClear.value)
  if (isClear.value) {
    return
  }
  console.log(`1198 84行 docs/components/select/multipleTableSelect.vue val `, val)
  selectRow.value = data.value.filter((v) => val.includes(v[LABEL]))
  console.log(`86 selectRow.value`, selectRow.value)
  selectValue.value = selectRow.value.map((v) => v[VALUE])
  console.log(`54 selectValue.value`, selectValue.value)
}

watch(
  () => selectRow.value,
  async (val) => {
    await nextTick()
    console.log(`58 isClear.value`, isClear.value)
    if (isClear.value) {
      tableRef.value.$refs.tableRef.clearSelection()
      isClear.value = false
      return
    }
    data.value.forEach(async (row) => {
      if (selectValue.value.includes(row[VALUE])) {
        tableRef.value.$refs.tableRef.toggleRowSelection(row, true)
      } else {
        tableRef.value.$refs.tableRef.toggleRowSelection(row, false)
      }
    })
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>

<template>
  <div>
    {{ selectValue }} ??? {{ selectName }} === {{ selectRow }}
    <o-select
      v-model="selectName"
      :title="`多选的 => ${selectValue}`"
      width="100%"
      ref="selectRef"
      multiple
      @change="change"
      :collapse-tags="true"
      :collapse-tags-tooltip="true"
      @clear="clear"
    >
      <template #empty>
        <o-table
          :columns="columns"
          :showIndex="false"
          :data="data"
          ref="tableRef"
          :showPage="false"
          @selection-change="handleCurrentChange"
        ></o-table>
      </template>
    </o-select>
  </div>
</template>
