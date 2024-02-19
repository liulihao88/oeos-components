<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { sleep } from 'pkg/utils/gFunc.js'

const { proxy } = getCurrentInstance()
function btnClick() {
  isShow.value = true
}
const a = ref(33)
const isShow = ref(false)
// const confirmLoading = ref(false)
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
    <o-dialog
      ref="dialogRef"
      title="App"
      @confirm="cusConfirm"
      :confirmAttrs="{
        loading: confirmLoading,
      }"
      v-model="isShow"
    ></o-dialog>
    <o-button @click="btnClick" type="danger">打开dialog</o-button>
  </div>
</template>

<style scoped lang="scss"></style>
