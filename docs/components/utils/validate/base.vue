<script setup lang="ts">
import { ref, getCurrentInstance, computed } from 'vue'
import { $toast, validate } from '@/utils/src/index'
const { proxy } = getCurrentInstance()
const form = ref({})
const fieldList = computed(() => {
  return [
    {
      label: 'validate()',
      prop: 'name',
      rules: [validate()],
    },
    {
      label: 'validate("password")',
      prop: 'password',
      rules: [validate('password')],
    },
    {
      label: 'validate("number")',
      prop: 'number',
      rules: [validate('number')],
    },
    {
      label: 'validate("zeroPositive")',
      prop: 'zeroPositive',
      rules: [validate('zeroPositive')],
    },
    {
      label: 'validate("integer")',
      prop: 'integer',
      rules: [validate('integer')],
    },
    {
      label: 'validate("decimal")',
      prop: 'decimal',
      rules: [validate('decimal')],
    },
    {
      label: 'validate("mobile")',
      prop: 'mobile',
      rules: [validate('mobile')],
    },
    {
      label: 'validate("email")',
      prop: 'email',
      rules: [validate('email')],
    },
    {
      label: 'validate("ip")',
      prop: 'ip',
      rules: [validate('ip')],
    },
    {
      label: 'validate("port")',
      prop: 'port',
      rules: [validate('port')],
    },
    {
      label: 'validate("between")',
      prop: 'between',
      rules: [validate('between')],
    },
    {
      label: 'validate("between", {min: 1, max: 10})',
      prop: 'between2',
      rules: [validate('between', { min: 1, max: 10 })],
    },
    {
      label: 'validate("length", {min:1, max:10})',
      prop: 'length',
      rules: [validate('length', { min: 1, max: 10 })],
    },
    {
      label: 'validate("same") oldPwd',
      prop: 'oldPwd',
      rules: [validate('same', { value: form.value.newPwd })],
    },
    {
      label: 'validate("same") newPwd',
      prop: 'newPwd',
      rules: [validate('same', { value: form.value.oldPwd })],
    },
    {
      label: 'validate("custom")',
      prop: 'custom',
      rules: [validate('custom', { message: '最多保留2位小数', reg: /^\d+\.?\d{0,2}$/ })],
    },
  ]
})
</script>

<template>
  <div>
    <OFunctionSourceCode functionName="validate"></OFunctionSourceCode>
    <o-title title="由于有特殊的相同字段的校验, 所以fieldList使用了compued, 正常情况下, 不需要computed"></o-title>
    <o-form :fieldList="fieldList" :model="form" ref="oFormRef" :column="2" label-width="200">
      <tempalte v-for="(v, i) in fieldList" :key="i">
        <template #[`${v.prop}-label`]="{ item }">
          <div>{{ item }}??</div>
        </template>
      </tempalte>
    </o-form>
  </div>
</template>
