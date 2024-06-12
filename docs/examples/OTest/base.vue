<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { isEmpty, merge, uuid, $toast, getStorage } from '../../../packages/utils/index.ts'
console.log(`merge(123)`, merge(123))
const form = ref({
  name: '',
  age: '',
  mobile: '',
  number: '',
  custom: '',
})
const rules = {
  // name: [proxy.validate()],
  // age: [proxy.validate('请输入')],
  // mobile: [proxy.validate('mobile')],
  // ip: [proxy.validate('ip', { message: '好好输啊' })],
  number: [proxy.validate('number')],
  custom: [proxy.validate('custom', { message: '最多保留2位小数', reg: /^\d+\.?\d{0,2}$/ })],
}
const formRef = ref(null)
// async function isTest24() {
//   await proxy.validForm(formRef)
// }
// proxy.$toast('你好', 'e', { message: '我不好' })
// let res = proxy.validate('number', '123', true)
// console.log(`14 res`, res)
// let phone = proxy.validate('mobile', 183110564542, true)
// console.log(`14 phone`, phone)
// let port = proxy.validate('port', 122322, true)
// console.log(`09 port`, port)
let ip = proxy.validate('ip', 122322, true)
console.log(`09 ip`, ip)
let custom = proxy.validate('custom', { value: -123, reg: /^-\d+\.?\d{0,2}$/ }, true)
console.log(`09 custom`, custom)

async function isTest69() {
  await proxy.validForm(formRef)
}
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules">
    <el-form-item label="手机号" prop="mobile">
      <o-input v-model="form.mobile" />
    </el-form-item>
    <el-form-item label="ip地址" prop="ip">
      <o-input v-model="form.ip" />
    </el-form-item>
    <el-form-item label="正整数" prop="number">
      <o-input v-model="form.number" />
    </el-form-item>
    <el-form-item label="自定义label" prop="custom">
      <o-input v-model="form.custom" />
    </el-form-item>
  </el-form>
  <el-button type="primary" @click="isTest69">测试51</el-button>
</template>

<style scoped lang="scss">
.cc {
}
</style>
