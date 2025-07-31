<script setup lang="ts">
import { ref } from 'vue'
import { tryCatch } from '@/utils/src/index.ts'

const loading = ref(false)

async function random() {
  let rand = Math.random()
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (rand < 0.5) {
        return resolve('成功')
      } else {
        return reject('失败')
      }
    }, 1000)
  })
}

const init = async () => {
  let { data, error } = await tryCatch(random(), loading)
  console.log(`35 error`, error)
  console.log(`05 data`, data)
}
</script>

<template>
  <div>
    <el-button type="primary" @click="init()" :loading="loading">测试25</el-button>
  </div>
</template>
