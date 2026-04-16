<script setup lang="ts">
import { ref, getCurrentInstance, computed } from 'vue'

const data = ref([
  { name: '张三', address: '北京市朝阳区', status: 0 },
  { name: '李四', address: '上海市浦东新区', status: 0 },
  { name: '王五', address: '河南省项城市', status: 0 },
])
const columns = computed(() => {
  return [
    {
      label: '名字',
      prop: 'name',
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
    <o-table :columns="columns" :data="data"></o-table>
  </div>
</template>
