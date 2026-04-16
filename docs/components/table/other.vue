<script setup lang="ts">
import { ref, getCurrentInstance, computed } from 'vue'

const data = ref([
  { name: '张三', address: '北京市朝阳区', status: 0 },
  { name: '李四', address: '上海市浦东新区', status: 1 },
  { name: '王五', address: '河南省项城市', status: 0 },
])
const otherParams = ref({
  showPage: true,
  fixed: false,
})
const columns = computed(() => {
  return [
    {
      label: '名字',
      prop: 'name',
      width: 400,
    },
    {
      label: '状态',
      prop: 'status',
      render: ({ row }) => {
        return row.status === 0 ? '关闭' : '开启'
      },
    },
    {
      label: '状态',
      prop: 'status',
      render: ({ row }) => {
        return row.status === 0 ? '关闭' : '开启'
      },
    },
    {
      label: '状态',
      prop: 'status',
      render: ({ row }) => {
        return row.status === 0 ? '关闭' : '开启'
      },
    },
    {
      label: '状态',
      prop: 'status',
      render: ({ row }) => {
        return row.status === 0 ? '关闭' : '开启'
      },
    },
    {
      label: '状态',
      prop: 'status',
      render: ({ row }) => {
        return row.status === 0 ? '关闭' : '开启'
      },
    },
    {
      label: '状态',
      prop: 'status',
      render: ({ row }) => {
        return row.status === 0 ? '关闭' : '开启'
      },
    },
    {
      label: '状态',
      prop: 'status',
      render: ({ row }) => {
        return row.status === 0 ? '关闭' : '开启'
      },
    },
    {
      label: '地址',
      prop: 'address',
      fixed: otherParams.value.fixed ? 'left' : false,
    },
    {
      key: 'operation',
      label: '操作',
      btns: [
        {
          reConfirm: true,
          content: ({ scope }) => {
            if (data.value[scope.$index].status === 0) {
              return '关闭'
            } else {
              return '开启'
            }
          },
          title: ({ scope }) => {
            return data.value[scope.$index].status === 0 ? '确定开启吗?' : '确定关闭吗?'
          },
          handler: ({ scope }) => {
            data.value[scope.$index].status = data.value[scope.$index].status === 0 ? 1 : 0
          },
        },
      ],
    },
  ]
})
</script>

<template>
  <div>
    <o-flex gap="small" direction="column">
      <o-radio v-model="otherParams.size" :options="['small', 'default', 'large']" type="simple" title="size"></o-radio>
      <o-radio v-model="otherParams.showPage" :options="[true, false]" type="simple" title="showPage"></o-radio>
      <o-radio v-model="otherParams.fixed" :options="[true, false]" type="simple" title="地址固定: fixed"></o-radio>
    </o-flex>
    <o-table
      :columns="columns"
      :data="data"
      v-bind="otherParams"
      :pageAttrs="{
        layout: 'prev, pager, next, jumper',
      }"
    ></o-table>
  </div>
</template>
