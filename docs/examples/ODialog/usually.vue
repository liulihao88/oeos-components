<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
function btnClick() {
  isShow.value = true
}
const a = ref(33)
const isShow = ref(false)
const confirmLoading = ref(false)
async function cusConfirm() {
  console.log(`***** 点我作甚  10行 docs/examples/ODialog/usually.vue  15:06:26`)
  confirmLoading.value = true
  proxy.$toast('正在保存', 'i');
  await sleep(2000)
  proxy.$toast('保存成功', { duration: 3000 })
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
    width="100%"
    :closeOnClickModal="false"
    :confirmAttrs="{
      loading: confirmLoading,
    }"
    v-model="isShow"
    @cancel="proxy.$toast('哈哈')"
    cancelText="高级配置"
    :cancelAttrs="{
      type: 'primary',
    }"
  >
    <div v-for="(v, i) in 40" :key="i">
      <div>超长文本</div>
    </div>
  </o-dialog>
</template>

<style scoped lang="scss"></style>
