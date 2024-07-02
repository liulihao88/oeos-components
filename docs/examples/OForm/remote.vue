<script setup lang="tsx">
import { ref, getCurrentInstance, reactive } from 'vue'
const { proxy } = getCurrentInstance()
const model = ref({
  sex: 'sex2',
  password: '123',
  name: 'andy',
  desc: '12321321312',
  hobby: ['11', '33'],
})

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
    default: '123',
    rules: [
      {
        required: true,
      },
    ],
    showPassword: true,
    style: { width: '200px' },
    clearable: false,
  },
  {
    label: '昵称',
    prop: 'name',
    useSlot: true,
    rules: [
      {
        required: true,
        message: '请填写昵称',
      },
      {
        min: 3,
        message: '最短是3',
      },
      {
        max: 5,
        message: '最长是5',
      },
    ],
  },
  {
    label: '爱好',
    prop: 'hobby',
    comp: 'o-select',
    rules: [
      {
        required: true,
        message: '请选择爱好',
      },
    ],
    attrs: {
      label: 'name',
      multiple: true,
      style: { width: '100%' },
      value: 'id',
      options: [
        { name: '唱', id: '11' },
        { name: '跳', id: '22' },
        { name: 'rap', id: '33' },
      ],
    },
  },
  {
    label: '性别单选',
    prop: 'sex',
    comp: 'o-radio',
    default: 'sex2',
    attrs: {
      options: [
        { label: '小月月', value: 'sex1' },
        { label: '小鑫鑫', value: 'sex2' },
      ],
    },
  },

  {
    label: '描述',
    prop: 'desc',
    comp: 'o-input',
    attrs: {
      type: 'textarea',
    },
  },
]

const gFormRef = ref()
async function testSubmit() {
  proxy.log(`model`, model, '94行 docs/examples/OForm/remote.vue')
  proxy.log(`model`, model, '94行 docs/examples/OForm/remote.vue')
  await gFormRef.value.validate()
  console.log(`***** 222  97行 test/t1.vue  15:52:04`)
  // proxy.log(`model`, model, '98行 test/t1.vue')
}
// 以下两种方法都是可以的
function clearForm() {
  // gFormRef.value.resetFields()
  console.log(`gFormRef.value.$refs.oFormRef`, gFormRef.value.$refs.oFormRef)
  gFormRef.value.$refs.oFormRef.resetFields()
}
</script>

<template>
  <div>
    <o-form :model="model" :fieldList="fieldList" ref="gFormRef" label-width="100">
      <template #password-label>我是password啊</template>
      <template #name>
        <o-input v-model="model.name" placeholder="我是slot的name" width="300" />
      </template>
    </o-form>
    <el-button type="primary" @click="testSubmit">测试提交</el-button>
    <el-button type="primary" @click="clearForm">清空表单</el-button>
  </div>
</template>

<style scoped lang="scss"></style>
