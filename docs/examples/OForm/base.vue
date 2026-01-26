<script setup lang="tsx">
import { ref, getCurrentInstance, reactive } from 'vue'
const { proxy } = getCurrentInstance()
import { validForm } from '@oeos-components/utils'
const model = ref({
  account: '', // *用户账号
  password: null, // *用户密码
})
const gFormRef = ref()
const rules = {
  account: [proxy.validate()],
  password: [proxy.validate()],
}

const fieldList = [
  {
    label: '账号',
    prop: 'account',
  },
  {
    label: '密码',
    prop: 'password',
  },
]

async function testSubmit() {
  console.log(`111`, 111)
  console.log(`gFormRef.value`, gFormRef.value)
  await gFormRef.value.validate()
  // console.log(`***** 222  97行 test/t1.vue  15:52:04`)
}
</script>

<template>
  <div>
    <o-form :model="model" :fieldList="fieldList" :rules="rules" ref="gFormRef"></o-form>
    <el-button type="primary" @click="testSubmit">测试提交</el-button>
  </div>
</template>
