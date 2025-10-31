<script setup lang="ts">
import { ref, getCurrentInstance, watch, computed } from 'vue'
import { validate, validForm } from '@oeos-components/utils'
import type { FormInstance } from 'element-plus'
const formRef = ref<FormInstance | null>(null)
const form = ref({})

const rules = computed(() => {
  return {
    name: [validate()],
    number: [validate('number')],
  }
})
const submit = async () => {
  await validForm(formRef)
}
const submit2 = async () => {
  await validForm(formRef, { message: '我是自定义错误消息' })
}
const submit3 = async () => {
  await validForm(formRef, { showMessage: false })
}
const submit4 = async () => {
  await validForm(formRef, { detail: true })
}
</script>

<template>
  <div>
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item label="基础用法" prop="name">
        <o-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="只能输入正整数" prop="number">
        <o-input v-model="form.number" />
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="submit">提交</el-button>
    <el-button type="primary" @click="submit2">自定义错误消息</el-button>
    <el-button type="primary" @click="submit3">不显示任务错误消息</el-button>
    <el-button type="primary" @click="submit4">错误消息加详情</el-button>
    <el-button type="info" @click="formRef?.clearValidate()">清空校验</el-button>
  </div>
</template>
