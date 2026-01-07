<script setup lang="ts">
import { ref, getCurrentInstance, watch, computed } from 'vue'
import * as utils from '@oeos-components/utils'
console.log(`01 utils`, utils);
const { proxy } = getCurrentInstance()
console.log(`89 proxy`, proxy)
console.log(`89 proxy.$toast(123)`, proxy.$toast(123))
 utils.$toast(1234)
console.log(`89 proxy.isEmpty(345)`, proxy.isEmpty(345))
console.log(`89 proxy.getType(345)`, proxy.getType(345))
const { validate, validForm } = proxy
const formRef = ref(null)
const form = ref({})

const rules = computed(() => {
  return {
    number: [validate('number')],
    number2: [proxy.validateTrigger('number')],
  }
})
const submit = async () => {
  await validForm(formRef)
}
</script>

<template>
  <OFunctionSourceCode functionName="validate"></OFunctionSourceCode>
  <div>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
      <el-form-item label="只能输入正整数, 只有提交的时候才校验" prop="number">
        <o-input v-model="form.number" />
      </el-form-item>
      <el-form-item label="change和blur都校验, 使用validateTrigger" prop="number2">
        <o-input v-model="form.number2" />
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="submit">提交</el-button>
    <el-button type="info" @click="formRef.clearValidate()">清空校验</el-button>
  </div>
</template>
