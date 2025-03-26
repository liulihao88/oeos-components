<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const loading = ref(false)
const data = ref([])
const columns = [
  {
    label: '名字',
    prop: 'name',
  },
  {
    key: 'operation',
    label: '操作',
    btns: [
      {
        content: '编辑',
      },
    ],
  },
]

async function init() {
  loading.value = true
  await proxy.sleep(3000)
  loading.value = false
}
init()
</script>

<template>
  <o-table
    :columns="columns"
    :data="data"
    andy="123"
    :isLoading="loading"
    :loading="loading"
    ref="tableRef"
  ></o-table>
</template>
