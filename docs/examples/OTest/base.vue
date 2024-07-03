<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const val = ref('0')
proxy.log(`val`, val, '5行 docs/examples/OTest/base.vue')

const isShow = ref(false)
const isTest77 = () => {
  isShow.value = true
  val.value = '0.00'
}

const isTest78 = () => {
  isShow.value = true
  val.value = '9.12'
}
</script>

<template>
  <div>
    <o-dialog ref="dialogRef" title="base" v-model="isShow">
      <o-progress :percentage="val"></o-progress>
      <el-progress :percentage="val"></el-progress>
    </o-dialog>
    <el-button type="primary" @click="isTest77">测试83</el-button>
    <el-button type="primary" @click="isTest78">测试100</el-button>
  </div>
</template>
