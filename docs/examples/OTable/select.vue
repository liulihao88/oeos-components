<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
function handleDetail(row) {
  proxy.$toast(row.name)
}
function handleDetail2() {}
function selectableFn(val, index) {
  return index % 2 === 0
}
const columns = [
  {
    type: 'selection',
    key: 'name',
    selectable: selectableFn,
  },
  {
    label: 'I wan',
    prop: 'name',
    handler: handleDetail,
  },
  {
    label: '负责人',
    prop: 'owner',
    sortable: true,
    handler: handleDetail2,
  },
  {
    label: '状态',
    prop: 'status',
    width: 100,
    filter: (row) => {
      return row.status === 0 ? '进行中' : '已完成'
    },
  },
]

const data = ref([])
const orgData = [
  {
    name: 'name1',
    owner: 'owner1I want ',
    endTime: '2022-08-02 12:12:00',
    status: 0,
  },
  {
    name: 'name2',
    owner: 'owner2',
    endTime: 'owner1I want to set som',
    status: 1,
  },
  {
    name: 'name3',
    owner: 'owner2',
    endTime: 'owner1I want to set som',
    status: 1,
  },
  {
    name: 'name4',
    owner: 'owner2',
    endTime: 'owner1I want to set som',
    status: 1,
  },
]
const num = ref(0)
const total = ref(0)
async function init() {
  await proxy.sleep(300)
  num.value++
  data.value = proxy.clone(orgData, num.value)
  total.value = data.value.length ?? 0
}
init()
const multipleSelection = ref([])
const handleSelectionChange = (val, ...a) => {
  multipleSelection.value = val
}
</script>

<template>
  <div class="">
    <el-button type="primary" @click="init">新增数据</el-button>
    {{ total }}
    <o-table
      :columns="columns"
      :total="total"
      :showIndex="false"
      @selection-change="handleSelectionChange"
      :data="data"
      ref="tableRef"
    ></o-table>
  </div>
</template>

<style scoped lang="scss"></style>
