<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
function handleDetail(row) {
  console.log(`row`, row)
  // console.log('handleDetail')
  proxy.$toast(row.name)
  proxy.log(`row`, row, '9行 test/t1.vue')
}
function handleDetail2() {
  console.log('handleDetail2')
}
const columns = [
  {
    label:
      'I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!',
    prop: 'name',
    sortable: true,
    handler: handleDetail,
    // filter: (row) => {
    //   return row.status === 0 ? '进行中' : '已完成'
    // },
  },
  {
    label: '负责人',
    prop: 'owner',
    width: 200,
    sortable: true,
    handler: handleDetail2,
  },
  {
    label: '结束时间',
    prop: 'endTime',
  },
  {
    label: '状态',
    prop: 'status',
    filter: (row) => {
      // console.log(`row`, row)
      return row.status === 0 ? '进行中' : '已完成'
    },
  },
  {
    prop: 'operation',
    label: '操作',
    btns: [
      {
        content: '查看',
        type: 'primary',
        isShowColumn: false,
        handler: handleDetail,
        disabled: (ddd, scope) => {
          return true
        },
      },
      {
        content: '编辑',
        handler: handleDetail,
        reConfirm: true,
      },
      {
        content: '发布',
        disabled: true,
      },
      {
        content: '下线',
      },
      {
        content: '删除11',
        reConfirm: true,
        handler: handleDetail,
        isShow: false,
      },
    ],
  },
]
const data = ref([])
const orgData = [
  {
    name: 'name1',
    owner:
      'owner1I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!',
    endTime: '2022-08-02 12:12:00',
    status: 0,
  },
  {
    name: 'name2',
    owner: 'owner2',
    endTime:
      'owner1I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!',
    status: 1,
  },
  {
    name: 'name4',
    owner: 'owner2',
    endTime:
      'owner1I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!',
    status: 1,
  },
  {
    name: 'name2',
    owner: 'owner2',
    endTime:
      'owner1I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!',
    status: 0,
  },
]
const num = ref(1)
const total = ref(0)
async function init() {
  await proxy.sleep(300)
  num.value++
  data.value = proxy.clone(orgData, num.value)
  console.log(`data.value`, data.value)
  total.value = data.value.length ?? 0
}
init()
</script>

<template>
  <div>
    <el-button type="primary" @click="init">新增数据</el-button>
    {{ total }}
    <o-table :columns="columns" :total="total" :data="data" ref="tableRef">
      <!-- <template #endTime="{ scope, row }">
        {{ row.endTime }}
      </template> -->
    </o-table>
  </div>
</template>

<style scoped lang="scss"></style>
