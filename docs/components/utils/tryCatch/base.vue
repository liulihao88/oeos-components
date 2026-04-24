<script setup lang="ts">
import { ref } from 'vue'
import { tryCatch, $toast } from '@/utils/src/index.ts'

const loading = ref(false)

function createTask(shouldThrow = false) {
  return () => {
    if (shouldThrow) {
      throw new Error('同步校验失败')
    }

    const rand = Math.random()
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (rand < 0.5) {
          resolve('异步成功')
        } else {
          reject(new Error('异步失败'))
        }
      }, 300)
    })
  }
}

const run = async (shouldThrow = false) => {
  const { data, error } = await tryCatch(createTask(shouldThrow), loading)

  if (error) {
    $toast(error.message || String(error), 'e')
  } else {
    $toast(String(data))
  }
}
</script>

<template>
  <OFunctionSourceCode functionName="tryCatch"></OFunctionSourceCode>
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <el-button type="primary" :loading="loading" @click="run()">异步测试</el-button>
    <el-button :loading="loading" @click="run(true)">同步报错</el-button>
  </div>
</template>
