<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const isShow = ref(false)
const confirm = async () => {
  await proxy.sleep(2000)
  isShow.value = false
}
</script>

<template>
  <div>
    <o-dialog v-model="isShow" :confirm="confirm"></o-dialog>
    <el-button type="primary" @click="isShow = true">打开dialog</el-button>
  </div>
</template>
