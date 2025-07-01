<script setup lang="ts">
import { ref, getCurrentInstance, computed } from 'vue'
const { proxy } = getCurrentInstance()
const sameform = ref({})
const originForm = ref(proxy.clone(sameform))
const formRef = ref(null)

const rules = computed(() => {
  return {
    oldPassword: [proxy.validate('length', { min: 1, max: 40 })],
    newPwd: [
      proxy.validate('length', { min: 1, max: 40 }),
      proxy.validate('same', { value: sameform.value.confirmNewPwd }),
    ],
    confirmNewPwd: [
      proxy.validate('length', { min: 1, max: 40 }),
      proxy.validate('same', { value: sameform.value.newPwd }),
    ],
  }
})

const confirm = async () => {
  await proxy.validForm(formRef)
  proxy.$toast('校验')
}

const passwordType = computed(() => {
  return 'password'
})
</script>

<template>
  <div>
    <el-form ref="formRef" :model="sameform" :rules="rules" label-width="auto" :validate-on-rule-change="false">
      <el-form-item label="旧密码" prop="oldPassword">
        <o-input v-model="sameform.oldPassword" :type="passwordType" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <o-input v-model="sameform.newPwd" :type="passwordType" />
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmNewPwd">
        <o-input v-model="sameform.confirmNewPwd" type="password" />
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="confirm">提交</el-button>
    <el-button type="primary" @click="formRef.clearValidate()">清空校验</el-button>

    <o-warning type="icon" content="密码规则: 1-40位字符组合、特殊字符可选" />
  </div>
</template>
