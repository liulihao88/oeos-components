<script setup lang="tsx">
import { ref, getCurrentInstance, reactive } from 'vue'
const { proxy } = getCurrentInstance()
const cusRules = {
  hobby: [proxy.validate('请选择111')],
}
function onChange(...rest) {
  console.log(`rest`, rest)
  console.log('onChange')
}
function onChangeSelect(...rest2) {
  console.log(`rest2`, rest2)
  console.log('onChangeSelect')
}
function onClear(...aaa) {
  console.log(`aaa`, aaa)
  console.log('onClear')
}

const model = ref({
  account: '', // *用户账号
  pwd: null, // *用户密码
  sex: 'sex2',
  lock: '',
  name: '',
})
const rules = {
  account: [proxy.validate()],
  pwd: [proxy.validate()],
  name: [proxy.validate()],
}
const fieldList = [
  {
    label: '账号',
    prop: 'account',
    comp: 'el-input',
    placeholder: '我是特殊的placeholder',
    labelRender: () => {
      return <div style="color: blue">好了好了好了好了好了好了</div>
    },
  },
  {
    label: '密码1',
    prop: 'pwd',
    comp: 'el-input',
    imgAttrs: {
      src: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',
    },
    attrs: {
      style: {
        width: '200px',
      },
      type: 'password',
      showPassword: true,
      clearable: false,
    },
  },
  {
    label: '昵称',
    prop: 'name',
    useSlot: true,
  },
  {
    label: '选择爱好',
    prop: 'hobby',
    comp: 'o-select',
    imgAttrs: {
      name: 'delete',
    },
    formAttrs: {
      rules: cusRules.hobby,
    },
    attrs: {
      label: 'name',
      multiple: true,
      onChange: onChange,
      onChangeSelect: onChangeSelect,
      onClear: onClear,
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
    label: '是否开启开关',
    prop: 'lock',
    comp: 'el-switch',
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
async function isTest16() {
  await gFormRef.value.validate({ detail: false })
  console.log(`***** 222  97行 test/t1.vue  15:52:04`)
  proxy.log(`model`, model, '98行 test/t1.vue')
}
</script>

<template>
  <div>
    <o-form :model="model" :fieldList="fieldList" :rules="rules" ref="gFormRef">
      <template #name-label>这里我是特殊的name的label</template>
      <template #name>
        <o-input v-model="model.name" placeholder="我是name" width="300" />
      </template>
    </o-form>
    <el-button type="primary" @click="isTest16">测试36</el-button>
  </div>
</template>

<style scoped lang="scss"></style>
