<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const isShow = ref(false)
const confirm = async () => {
  await proxy.sleep(1000)
  proxy.$toast(1)
  await proxy.sleep(5000)
  proxy.$toast(2)
  isShow.value = false
}
</script>

<template>
  <div>
    <o-dialog v-model="isShow" :confirm="confirm">
      <div>1秒后弹出1</div>
      <div>然后5秒后弹出2并关闭</div>
    </o-dialog>
    <el-button type="primary" @click="isShow = true">打开dialog</el-button>
  </div>
</template>
