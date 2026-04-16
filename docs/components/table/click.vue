<script setup lang="ts">
import { computed, ref } from 'vue'

const selectedRow = ref<any>(null)

const data = ref([
  { id: 1, name: 'andy1' },
  { id: 2, name: 'andy2' },
  { id: 3, name: 'andy3' },
])

const columns = [
  {
    type: 'index',
    width: 70,
    label: '序号',
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
        content: '查看',
        handler: ({ row }) => {
          console.log('查看', row)
        },
      },
      {
        content: '编辑',
        handler: ({ row }) => {
          console.log('编辑', row)
        },
      },
    ],
  },
]

const selectedText = computed(() => {
  if (!selectedRow.value) return '--'
  return `${selectedRow.value.id} / ${selectedRow.value.name}`
})
</script>

<template>
  <div>
    <div class="m-b-12">当前选中: {{ selectedText }}</div>
    <o-table
      v-model="selectedRow"
      selection-type="single"
      :columns="columns"
      :data="data"
      :showIndex="false"
      :showPage="false"
    />
  </div>
</template>
