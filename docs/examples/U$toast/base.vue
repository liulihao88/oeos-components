<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
// import { $toast, sleep } from '@oeos-components/utils'
import { $toast, sleep } from '@/utils/src/index.ts'
const { proxy } = getCurrentInstance()
const base = () => {
  $toast('基础成功')
  $toast('基础成功', 's')
  $toast('基础警告', 'w')
  $toast('基础信息', 'i')
  $toast('基础错误', 'e')
}
const duration5000 = () => {
  $toast('持续5秒', {
    duration: 5000,
  })
}
const noClose = () => {
  $toast('永不关闭', {
    duration: 0,
  })
}
const closeOther = async () => {
  for (let i = 0; i < 10; i++) {
    $toast(i, {
      duration: 5000,
    })
  }
  $toast('1秒后其他的都关闭')
  await sleep(1000)
  $toast('天下之大唯我独尊', { closeAll: true })
}

const obj = {
  name: 'andy',
  age: 18,
  hobbies: ['羽毛球', '乒乓球', '排期', '水球'],
}
const showObject = () => {
  $toast({
    dangerouslyUseHTMLString: true,
    message: `<pre>${JSON.stringify(obj, null, 2)}</pre>`,
    type: 'success',
    duration: 10000,
  })
}
</script>

<template>
  <div>
    <el-button type="primary" @click="base">基础</el-button>
    <el-button type="primary" @click="duration5000">持续5秒</el-button>
    <el-button type="primary" @click="noClose">永不关闭</el-button>
    <el-button type="primary" @click="closeOther">关闭其他, 只保留一个</el-button>
    <el-button type="primary" @click="showObject">显示对象</el-button>
  </div>
</template>
