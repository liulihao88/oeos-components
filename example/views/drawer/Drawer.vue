<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { sleep } from 'pkg/utils/gFunc.js'

const { proxy } = getCurrentInstance()
function btnClick() {
  console.log(`%c47 7行 example/views/drawer/Drawer.vue isShow.value`, 'background:#fff;color:red', isShow.value);
  
  isShow.value = true
}
const a = ref(33)
const isShow = ref(false)
const confirmLoading = ref(true)
async function cusConfirm() {
  confirmLoading.value = true
  await sleep(2000)
  confirmLoading.value = false
  isShow.value = false
}
</script>

<template>
  <div>
    <o-drawer
      ref="dialogRef"
      width="200"
      size="200"
      title="App"
      @confirm="cusConfirm"
      :confirmAttrs="{
        loading: confirmLoading,
      }"
      v-model="isShow"
    ></o-drawer>
    <el-button @click="btnClick" type="danger">打开drawer1</el-button>
  </div>
</template>

<style scoped lang="scss"></style>
