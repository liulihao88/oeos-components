<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

const data: any = ref([])

const selectRow = ref({})
const tableRef = ref(null)

const columns = [
  {
    label: '人物单',
    prop: 'name',
  },
  {
    key: 'operation',
    label: '操作',
    btns: [
      {
        content: '编辑',
        handler: editRow,
        comp: 'o-icon',
        attrs: {
          name: 'edit',
          content: '编辑',
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
        content: '编辑',
        handler: editRow,
        comp: 'o-icon',
        attrs: {
          name: 'edit',
          content: '编辑2',
        },
      },
      // {
      //   content: '编辑',
      //   handler: editRow,
      //   comp: 'o-icon',
      //   attrs: {
      //     name: 'edit',
      //     content: '编辑3',
      //   },
      // },
      // {
      //   content: '编辑',
      //   handler: editRow,
      //   comp: 'o-icon',
      //   attrs: {
      //     name: 'edit',
      //     content: '编辑4',
      //   },
      // },
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
  data.value = [{ name: 'andy1' }, { name: 'andy2' }, { name: 'andy3' }]
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
    <o-table
      ref="tableRef"
      :columns="columns"
      :data="data"
      :showPage="false"
      height="100%"
      highlight-current-row
      @current-change="handleCurrentChange"
    />
  </div>
</template>
