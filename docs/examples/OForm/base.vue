<script setup lang="tsx">
import { ref, getCurrentInstance, reactive } from 'vue'
const { proxy } = getCurrentInstance()
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
    comp: 'el-input',
  },
  {
    label: '密码',
    prop: 'password',
    attrs: {
      width: 500,
    },
  },
]

async function testSubmit() {
  console.log(`gFormRef.value`, gFormRef.value)
  await gFormRef.value.validate({ detail: false })
  console.log(`***** 222  97行 test/t1.vue  15:52:04`)
}
</script>

<template>
  <div>
    <o-form :model="model" :fieldList="fieldList" :rules="rules" ref="gFormRef"></o-form>
    <el-button type="primary" @click="testSubmit">测试提交</el-button>
  </div>
</template>
