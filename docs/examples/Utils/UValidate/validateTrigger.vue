<script setup lang="ts">
import { ref, getCurrentInstance, watch, computed, toRaw } from 'vue'
// import { validateTrigger, validate, validForm } from '@oeos-components/utils'
import { validateTrigger, validate, validForm } from '@/utils/src/index'
const formRef = ref(null)
const form = ref({})

const rules = computed(() => {
  return {
    number: [validate('length', { min: 1, max: 2 })],
    number2: [validateTrigger('length', { min: 1, max: 2 })],
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
      <el-form-item label="长度1-2, 只有提交的时候才校验" prop="number">
        <o-input v-model="form.number" />
      </el-form-item>
      <el-form-item label="长度1-2, change和blur都校验, 使用validateTrigger" prop="number2">
        <o-input v-model="form.number2" />
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="submit">提交</el-button>
    <el-button type="info" @click="formRef.clearValidate()">清空校验</el-button>
  </div>
</template>
