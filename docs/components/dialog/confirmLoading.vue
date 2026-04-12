<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { $toast } from '@oeos-components/utils'
const isShow = ref(false)
const closeType = ref()
const confirm = async () => {
  if (closeType.value === 'noClose') {
    await proxy.sleep(300)
    $toast('点击了确认但不关闭')
    return
  }
  await proxy.sleep(300)
  proxy.$toast(1)
  await proxy.sleep(300)
  proxy.$toast(2)
  isShow.value = false
}
const open = (type: string) => {
  isShow.value = true
  closeType.value = type
}
</script>

<template>
  <div>
    <o-dialog v-model="isShow" :confirm="confirm">
      <div>1秒后弹出1</div>
      <div>然后5秒后弹出2并关闭</div>
    </o-dialog>
    <el-button type="primary" @click="open('base')">打开dialog</el-button>
    <el-button type="primary" @click="open('noClose')">打开dialog并且点击确认不关闭</el-button>
  </div>
</template>
