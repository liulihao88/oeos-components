<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
function btnClick() {
  isShow.value = true
}
const a = ref(33)
const isShow = ref(false)
const confirmLoading = ref(false)
async function cusConfirm() {
  console.log(
    `***** 点我作甚  10行 docs/examples/ODialog/usually.vue  15:06:26`,
  )
  confirmLoading.value = true
  await sleep(2000)
  confirmLoading.value = false
  isShow.value = false
}
function sleep(delay = 0, fn = () => {}) {
  return new Promise((resolve) =>
    setTimeout(() => {
      fn && fn()
      resolve()
    }, delay),
  )
}
</script>

<template>
  <el-button @click="btnClick" type="danger">打开dialog</el-button>
  <o-dialog
    ref="dialogRef"
    title="常用的dialog"
    @confirm="cusConfirm"
    :confirmAttrs="{
      loading: confirmLoading,
    }"
    v-model="isShow"
  >
    <div v-copy="'我是复制的文本'" class="bg-blue fs-50">这里可以复制</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
    <div>我想跟过去说声抱歉</div>
  </o-dialog>
</template>

<style scoped lang="scss"></style>
