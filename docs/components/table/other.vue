<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'

const data = ref([
  { name: '张三', address: '北京市朝阳区' },
  { name: '李四', address: '上海市浦东新区' },
  { name: '王五', address: '河南省项城市' },
])
const columns = [
  {
    label: '名字',
    prop: 'name',
    width: 700,
  },
  {
    label: '地址',
    prop: 'address',
    fixed: true,
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
        disabled: (row) => row.status === 'Loading',
      },
    ],
  },
]
const otherParams = ref({
  size: 'large',
  showPage: false,
})
</script>

<template>
  <div>
    <o-flex gap="small" direction="column">
      <o-radio v-model="otherParams.size" :options="['small', 'default', 'large']" type="simple" title="size"></o-radio>
      <o-radio v-model="otherParams.showPage" :options="[true, false]" type="simple" title="showPage"></o-radio>
    </o-flex>
    <o-table :columns="columns" :data="data" v-bind="otherParams"></o-table>
  </div>
</template>
