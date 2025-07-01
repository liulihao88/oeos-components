<script setup lang="ts">
import { ref, getCurrentInstance, watch, computed } from 'vue'
const { proxy } = getCurrentInstance()
const { validate, validForm } = proxy
const formRef = ref(null)
const form = ref({
  // ip: '',
  // newPwd: '',
  // oldPwd: '',
})
const ip = ref()
const ipValid = ref()

const rules = computed(() => {
  return {
    name: [proxy.validate()],
    number: [proxy.validate('number')],
    between: [validate('between', { min: 3, max: 99 })],
    length: [validate('length', { min: 3, max: 10 })],
    mobile: [validate('mobile')],
    ip: [validate('ip')],
    custom: [proxy.validate('custom', { message: '最多保留2位小数', reg: /^\d+\.?\d{0,2}$/ })],
    oldPwd: [validate('length', { min: 1, max: 40 }), validate('same', { value: form.value.newPwd })],
    newPwd: [validate('length', { min: 1, max: 40 }), validate('same', { value: form.value.oldPwd })],
  }
})
const submit = async () => {
  await validForm(formRef)
}

const validIp = () => {
  if (!validate('ip', ip.value, true)) {
    ipValid.value = false
  } else {
    ipValid.value = true
  }
}

// watch(
//   ip,
//   (val) => {
//     validIp()
//   },
//   {
//     deep: true,
//     immediate: true,
//   },
// )
</script>

<template>
  <div>
    <o-warning
      content="由于新旧密码比较相同的时候, 需要实时的获取新旧密码的值, 所以需要使用computed去监听当新旧密码值变化使的值. 如果不需要校验新旧密码值, 则不需要加compued"
    ></o-warning>
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item label="基础用法" prop="name">
        <o-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="只能输入正整数" prop="number">
        <o-input v-model="form.number" />
      </el-form-item>
      <el-form-item label="数字最小为3, 最大为99" prop="between">
        <o-input v-model="form.between" />
      </el-form-item>
      <el-form-item label="长度最短3, 最长10的位数" prop="length">
        <o-input v-model="form.length" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <o-input v-model="form.mobile" />
      </el-form-item>
      <el-form-item label="ip地址" prop="ip">
        <o-input v-model="form.ip" />
      </el-form-item>
      <el-form-item label="旧密码" prop="oldPwd">
        <o-input v-model="form.oldPwd" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <o-input v-model="form.newPwd" />
      </el-form-item>
      <el-form-item label="自定义" prop="custom">
        <o-input v-model="form.custom" placeholder="请输入最多2位小数的不为负的数字" />
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="submit">提交</el-button>
    <el-button type="primary" @click="formRef.clearValidate()">清空校验</el-button>
 
  </div>
</template>
