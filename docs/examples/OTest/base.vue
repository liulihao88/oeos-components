<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const form = ref({})
const rules = [
  {
    required: true,
    message: '请填写名称',
    trigger: ['blur', 'change'],
  },
]
const lengthRules = [
  {
    required: true,
    message: '请填写名称',
    trigger: ['blur', 'change'],
  },
  {
    min: 3,
    message: '最短是3',
    trigger: ['blur', 'change'],
  },
  {
    max: 5,
    message: '最长是5',
    trigger: ['blur', 'change'],
  },
]
const formRef = ref()
async function isTest34() {
  await proxy.validForm(formRef)
}
function clearForm() {
  formRef.value.resetFields();
}
</script>

<template>
  <div>
    <el-button type="primary" @click="isTest34">测试82</el-button>
    <el-button type="primary" @click="clearForm">清空表单</el-button>
    <el-form ref="formRef" :model="form">
      <el-form-item label="名称" prop="name" :rules="rules">
        <o-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="最短3,最长5" prop="length" :rules="lengthRules">
        <o-input v-model="form.length" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss"></style>
