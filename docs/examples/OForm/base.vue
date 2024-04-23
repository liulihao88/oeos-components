<script setup lang="tsx">
import { ref, getCurrentInstance, reactive } from 'vue'
const { proxy } = getCurrentInstance()
const model = ref({
  account: '', // *用户账号
  password: null, // *用户密码
  sex: 'sex2',
  name: '',
})
const cusRules = {
  hobby: [proxy.validate('请选择111')],
}
const rules = {
  account: [proxy.validate()],
  password: [proxy.validate()],
  name: [proxy.validate()],
  hobby: [proxy.validate('请选择')],
}
const fieldList = [
  {
    label: '账号',
    prop: 'account',
    type: 'input',
    comp: 'el-input',
  },
  {
    label: '密码',
    prop: 'password',
    type: 'password',
    comp: 'el-input',
    attrs: {
      showPassword: true,
      width: '100',
      clearable: false,
    },
  },
  {
    label: '昵称',
    prop: 'name',
    useSlot: true,
  },
  {
    label: '爱好',
    prop: 'hobby',
    comp: 'o-select',
    // itemAttrs: {
    //   rules: cusRules.hobby,
    // },
    attrs: {
      label: 'name',
      multiple: true,
      value: 'id',
      options: [
        { name: '唱', id: 1 },
        { name: '跳', id: 2 },
        { name: 'rap', id: 3 },
      ],
    },
  },
  {
    label: '性别单选',
    prop: 'sex',
    comp: 'o-radio',
    attrs: {
      options: [
        { label: '小月月', value: 'sex1' },
        { label: '小鑫鑫', value: 'sex2' },
      ],
    },
  },

  {
    label: '描述',
    value: 'desc',
    comp: 'o-input',
    attrs: {
      type: 'textarea',
    },
  },
]

const gFormRef = ref()
async function testSubmit() {
  console.log(`gFormRef.value`, gFormRef.value)
  await gFormRef.value.validate()
  console.log(`***** 222  97行 test/t1.vue  15:52:04`)
  // proxy.log(`model`, model, '98行 test/t1.vue')
}
</script>

<template>
  <div>
    <o-form :model="model" :fieldList="fieldList" :rules="rules" ref="gFormRef">
      <template #password-label>我是password啊</template>
      <template #hobby-label>我是hobby啊</template>
      <template #name>
        <o-input v-model="model.name" placeholder="我是slot的name" width="300" />
      </template>
    </o-form>
    <el-button type="primary" @click="testSubmit">测试提交</el-button>
  </div>
</template>

<style scoped lang="scss"></style>
