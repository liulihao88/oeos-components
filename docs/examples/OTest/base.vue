<script setup lang="ts">
import { ref, getCurrentInstance, toRef, computed } from 'vue'
const { proxy } = getCurrentInstance()

const form = ref({})
const formRef = ref(null)
// const rules = {
//   username: [proxy.validate('custom', { message: '3-10位字符且只支持数字、英文', reg: /^[0-9a-zA-Z]{3,10}$/ })],
//   fullName: [proxy.validate('length', { min: 3, max: 20 })],
//   pwd: [proxy.validate('same', { value: toRef(form.value, 'confirmPwd') })],
//   confirmPwd: [proxy.validate('same', { value: toRef(form.value, 'pwd') })],
// }
const num = ref(0)
setInterval(() => {
  num.value += 2
}, 3000)

const rules = computed(() => {
  return {
    username: [proxy.validate('custom', { message: '3-10位字符且只支持数字、英文', reg: /^[0-9a-zA-Z]{3,10}$/ })],
    fullName: [proxy.validate('length', { min: 3, max: 20 })],
    pwd: [proxy.validate('same', { value: form.value.confirmPwd, required: num.value % 2 === 0 ? true : false })],
    confirmPwd: [proxy.validate('same', { value: form.value.pwd, required: num.value % 2 === 0 ? true : false })],
  }
})

const pwdChange = () => {
  formRef.value.validate('pwd')
  formRef.value.validate('confirmPwd')
}

const save = async () => {
  console.log(`%c07 33行 docs/examples/OTest/base.vue form.value`, 'background:#fff;color:red', form.value)

  await proxy.validForm(formRef)
  proxy.$toast('保存成功')
}

const devTest = () => {
  // form.value = proxy.clone({
  //   username: 'andy' + proxy.uuid(),
  //   fullName: 'andy' + proxy.uuid(),
  //   pwd: 'adminadmin',
  //   confirmPwd: 'adminadmin',
  //   description: 'description' + proxy.uuid(),
  // })
  form.value.pwd = ''
  form.value.confirmPwd = ''
}
devTest()
</script>

<template>
  <div>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" inline>
      <!-- <el-form-item label="名称" prop="username">
        <o-input v-model="form.username" placeholder="3-10位字符且只支持数字、英文" />
      </el-form-item>
      <el-form-item label="用户全称" prop="fullName">
        <o-input v-model="form.fullName" placeholder="1-20位字符" />
      </el-form-item> -->
      <el-form-item label="密码" prop="pwd">
        <o-input v-model="form.pwd" placeholder="8-40位字符组合、特殊字符可选" @input="pwdChange" />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPwd">
        <o-input v-model="form.confirmPwd" placeholder="8-40位字符组合、特殊字符可选" @input="pwdChange" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <o-input
          v-model="form.description"
          placeholder="请输入描述信息, 限制50个字符"
          type="textarea"
          :maxlength="50"
        />
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="save">保存</el-button>
  </div>
</template>
