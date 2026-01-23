<template>
  <o-flex gap="16" class="mb2">
    <o-radio
      v-model="isShow"
      :options="[
        { label: '显示密码', value: true },
        { label: '隐藏密码', value: false },
      ]"
      showType="button"
    ></o-radio>
  </o-flex>
  <o-title title="性别有值的时候显示age"></o-title>
  <o-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :size="size" :labelPosition="labelPosition" />
</template>

<script setup lang="tsx">
import { validateTrigger } from '@oeos-components/utils'
import { computed, ref } from 'vue'
import type { Ref } from 'vue'

const size = ref('default')
const labelPosition = ref('right')
const showRadio = ref(true)
const isShow = ref(true)

const formData = ref({
  account: 'wocwin', // *用户账号
  password: null, // *用户密码
  name: null, // *用户昵称
  sex: null, // *性别: 0:男 1:女
  age: '',
})

const fieldList = computed(() => {
  return [
    {
      label: '账号',
      prop: 'account',
      comp: 'el-input',
      // event: 'account',
    },
    {
      label: '密码',
      prop: 'password',
      comp: 'el-input',
      rules: [validateTrigger()],
      isShow: isShow.value,
      attrs: {
        type: 'password',
      },
    },
    {
      label: '性别',
      prop: 'sex',
      comp: 'o-select',
      attrs: {
        options: [
          { label: '男人', value: 'man' },
          { label: '女人', value: 'woman' },
          { label: '中性人', value: 'middle' },
        ],
      },
    },
    {
      label: '年龄',
      prop: 'age',
      isShow: () => {
        return !!formData.value.sex
      },
    },
  ]
})
</script>
