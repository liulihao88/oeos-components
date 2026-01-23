<template>
  <o-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :column="1" :rules="rules">
    <template #account-label>
      <div class="cl-blue">account-label</div>
    </template>
    <template #account>
      <o-input v-model="formData.account" placeholder="这是account的slot写法" width="200" />
    </template>
  </o-form>
</template>

<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { validateTrigger } from '@oeos-components/utils'

const formData = ref({
  account: '', // *用户账号
  password: null, // *用户密码
})

const rules = {
  account: [validateTrigger()],
}

const fieldList = [
  {
    label: '账号',
    prop: 'account',
    useSlot: true,
  },
]
</script>
