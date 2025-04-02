<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const isShow = ref(false)
const confirm = async () => {
  await proxy.sleep(1000)
  proxy.$toast(11)
  await proxy.sleep(5000)
  proxy.$toast(2)
  isShow.value = false
}
</script>

<template>
  <div>
    <o-dialog v-model="isShow" :confirm="confirm"></o-dialog>
    <el-button type="primary" @click="isShow = true">打开dialog</el-button>
  </div>
</template>
