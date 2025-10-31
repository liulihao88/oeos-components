<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { sleep, $toast } from '@/utils/src/index.ts'
const loading = ref(false)

const sleepHandler = async () => {
  loading.value = true
  await sleep(2000)
  loading.value = false
  $toast('sleep后显示')
}
</script>

<template>
  <div>
    <el-button type="primary" @click="sleepHandler" :loading="loading">2秒后显示</el-button>
  </div>
</template>
