<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

const data: any = ref([])

const selectRow = ref({})
const tableRef = ref(null)

const pageNumber = ref(1)
const pageSize = ref(10)

const indexMethod = (index) => {
  // 如果当前页是最后一页（数据量不足 pageSize），则基于实际数据量计算
  return (pageNumber.value - 1) * pageSize.value + index + 1
}

const columns = [
  {
    prop: 'radio', // 添加radio类型列
    width: 50,
    align: 'center',
    useSlot: true,
  },
  {
    type: 'index',
    width: 70,
    label: '序号',
    index: indexMethod,
  },
  {
    label: '人物单',
    prop: 'name',
  },
  {
    key: 'operation',
    label: '操作',
    btns: [
      {
        handler: editRow,
        comp: 'o-icon',
        attrs: {
          name: 'delete',
          content: '删除',
        },
      },
      {
        content: '编辑1',
        handler: editRow,
        comp: 'o-icon',
        attrs: {
          name: 'edit',
          content: '编辑1',
        },
      },
      {
        handler: editRow,
        comp: 'o-icon',
        attrs: {
          name: 'view',
          content: '查看',
        },
      },
      {
        content: '添加',
        prop: 'plus',
        useSlot: true,
      },
    ],
  },
]

async function editRow(row, scope, evt) {
  console.log(`36 val`, val)
  console.log(`46 row`, row)
  console.log(`88 scope`, scope)
  console.log(`86 evt`, evt)
}

async function init() {
  await proxy.sleep(0)
  data.value = [
    { id: 1, name: 'andy1' },
    { id: 2, name: 'andy2' },
    { id: 3, name: 'andy3' },
  ]
  _handleRowClick()
}
init()

const handleCurrentChange = async (currentRow, oldCurrentRow) => {
  if (proxy.notEmpty(currentRow)) {
    selectRow.value = currentRow
    proxy.setStorage('schedule-id', currentRow.value)
    // 请求接口
    // let res = await getScheduleTaskList(currentRow.value)
    // list.value = res
  }
}

const reset = () => {
  selectRow.value = {}
  tableRef.value.$refs.tableRef.setCurrentRow(null)
}

const _handleRowClick = () => {
  let clickIdx = 0
  let localScheduleId = proxy.getStorage('schedule-id') || ''
  if (data.value.length === 0) {
    reset()
    return
  }
  if (localScheduleId) {
    let taskNameIdx = data.value.findIndex((item) => {
      return item.value === localScheduleId
    })
    clickIdx = taskNameIdx === -1 ? 0 : taskNameIdx
  }
  tableRef.value.$refs.tableRef.setCurrentRow(data.value[clickIdx])
}
</script>

<template>
  <div>
    {{ selectRow }}
    <o-table
      ref="tableRef"
      :columns="columns"
      :data="data"
      :showIndex="false"
      :showPage="false"
      height="100%"
      highlight-current-row
      @current-change="handleCurrentChange"
    >
      <template #radio="{ value, row }">
        <div class="f-ct-ct w-100%">
          <el-radio v-model="selectRow.id" :value="row.id"></el-radio>
        </div>
      </template>
    </o-table>
  </div>
</template>
