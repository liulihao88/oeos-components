<script setup lang="tsx">
import { ref, getCurrentInstance, reactive, watch } from 'vue'
const { proxy } = getCurrentInstance()
const model = ref({
  account: '', // *用户账号
  password: '', // *用户密码
})
const cc = ref()
const rules = {
  account: [proxy.validate()],
  password: [proxy.validate()],
}
const changeIpt = (val) => {
  console.log(`22 val`, val)
  console.log('changeIpt')
}
const isDisabled = ref(true)

const fieldList = [
  {
    label: '账号',
    prop: 'account',
    placeholder: 'zhengc',
    type: 'input',
    comp: 'el-input',
    directives: {
      number: true,
    },
  },
  {
    label: '密码',
    prop: 'password',
    comp: 'el-input',
    placeholder: "请输入数字",
    clearable: true,
    directives: {
      focus: true,
      number: true,
      throttle: changeIpt,
    },
    on: {
      input: changeIpt,
    },
  },
]

watch(
  model,
  (val) => {
    // console.log(`05 38行 docs/examples/OForm/directives.vue val`, val)
  },
  {
    deep: true,
    immediate: true,
  },
)

const gFormRef = ref()
async function testSubmit() {
  console.log(`gFormRef.value`, gFormRef.value)
  await gFormRef.value.validate()
  console.log(`***** 222  97行 test/t1.vue  15:52:04`)
}
</script>

<template>
  <div>
    <o-form :model="model" :fieldList="fieldList" :rules="rules" ref="gFormRef"></o-form>
    <el-button type="primary" @click="testSubmit">测试提交</el-button>

    <o-input v-model="cc" v-number="'true'" />
  </div>
</template>

<style scoped lang="scss"></style>
