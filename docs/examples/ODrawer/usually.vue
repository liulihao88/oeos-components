<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { sleep } from '../../../packages/utils/gFunc.js'

const { proxy } = getCurrentInstance()
const confirmLoading = ref(false)
function btnClick() {
  isShow.value = true
}
const a = ref(33)
const isShow = ref(false)
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
      size="800"
      title="App"
      @confirm="cusConfirm"
      :confirmAttrs="{
        loading: confirmLoading,
      }"
      v-model="isShow"
    >
      这是内容
  </o-drawer>
    <el-button @click="btnClick" type="danger">打开drawer</el-button>
  </div>
</template>

<style scoped lang="scss"></style>
