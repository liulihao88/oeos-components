<script setup lang="ts">
import { ref, getCurrentInstance, computed } from 'vue'
const { proxy } = getCurrentInstance()
const sameform = ref({})
const originForm = ref(proxy.clone(sameform))
const formRef2 = ref(null)

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
  await proxy.validForm(formRef2)
  proxy.$toast('校验')
}

const passwordType = computed(() => {
  if (proxy.$dev) {
    return ''
  } else {
    return 'password'
  }
})
</script>

<template>
  <div>
    <el-form ref="formRef2" :model="sameform" :rules="rules" label-width="auto">
      <el-form-item label="旧密码" prop="oldPassword">
        <o-input v-model="sameform.oldPassword" :type="passwordType" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <o-input v-model="sameform.newPwd" :type="passwordType" />
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmNewPwd">
        <o-input v-model="sameform.confirmNewPwd" :type="passwordType" />
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="confirm">提交</el-button>

    <g-warning type="icon" content="密码规则: 1-40位字符组合、特殊字符可选" />
  </div>
</template>
