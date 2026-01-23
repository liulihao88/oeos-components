<script setup lang="ts">
import { ref, getCurrentInstance, watch, computed, toRaw } from 'vue'
import { validateTrigger, validate, validForm } from '@oeos-components/utils'
const formRef = ref(null)
const form = ref({})

const rules = computed(() => {
  return {
    number: [validate('number')],
    number2: [validateTrigger('number')],
  }
})
const submit = async () => {
  await validForm(formRef)
}
</script>

<template>
  <OFunctionSourceCode functionName="validateTrigger"></OFunctionSourceCode>
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
