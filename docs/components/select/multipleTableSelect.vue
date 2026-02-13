<script lang="tsx">
const LABEL = 'name'
const VALUE = 'id'
</script>
<script setup lang="tsx">
import { ref, getCurrentInstance, watch, nextTick } from 'vue'
const { proxy } = getCurrentInstance()
const selectValue = ref(['zs'])
const selectName = ref('')
const selectRef = ref()
const tableRef = ref()

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

const handleCurrentChange = (val) => {
  console.log(`15 val`, val)
  selectValue.value = val.map((v) => v[VALUE])
  selectName.value = val.map((v) => v[LABEL])
}

watch(
  () => selectValue.value,
  async (val) => {
    if (val) {
      selectName.value = data.value.filter((v) => val.includes(v[VALUE])).map((v) => v[LABEL])
    } else {
      selectName.value = []
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
    {{ selectValue }} ??? {{ selectName }}
    <o-select
      v-model="selectName"
      :title="`多选的 => ${selectValue}`"
      width="100%"
      ref="selectRef"
      multiple
      :collapse-tags="true"
      :collapse-tags-tooltip="true"
      :max-collapse-tags="2"
      @clear="handleCurrentChange(null)"
    >
      <template #empty>
        <o-table
          :columns="columns"
          :showIndex="false"
          :data="data"
          ref="tableRef"
          :showPage="false"
          @selection-change="handleCurrentChange"
          highlight-current-row
        ></o-table>
      </template>
    </o-select>
  </div>
</template>
