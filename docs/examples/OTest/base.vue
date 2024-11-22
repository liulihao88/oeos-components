<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
function handleDetail(row) {
  console.log(`row`, row)
}
function handleDetail2() {
  console.log('handleDetail2')
}
const isTest15 = () => {
  console.log('isTest15')
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
        content: '删除',
        comp: 'o-icon',
        attrs: {
          name: 'delete',
          content: '删除',
          style: {
            paddingRight: '16px',
          },
        },
        reConfirm: (row, scope) => {
          return scope.$index % 2 === 0
        },
        handler: handleDetail,
      },
      {
        comp: 'o-icon',
        attrs: {
          name: 'view',
          content: '桶浏览',
        },
        content: '桶浏览',
        handler: handleDetail,
      },
      {
        content: '编辑',
        useSlot: true,
        prop: 'edit',

        isShow: (row) => row.name === 'name2',
      },
      {
        content: '发布',
        comp: 'o-icon',
        attrs: {
          name: 'icon_file-cloud-line',
          // name="icon_file-cloud-line",
          size: 12,
          type: 'svg',
          content: '333',
        },
        handler: handleDetail,
      },
      {
        content: '下线',
        handler: handleDetail,
      },
      {
        content: '删除11',
        reConfirm: true,
        handler: handleDetail,
        isShow: (row) => row.status === 0,
        comp: 'o-icon',
        attrs: {
          name: 'delete',
          // size: 12,
          content: '333',
        },
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
      <template #edit>
        <el-button type="primary" @click="isTest15" link class="mr2">测试03</el-button>
      </template>
    </o-table>
  </div>
</template>

<style scoped lang="scss"></style>
