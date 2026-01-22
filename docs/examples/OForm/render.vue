<template>
  <o-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :column="1"></o-form>
</template>

<script setup lang="tsx">
import { ref, reactive } from 'vue'

const formData = ref({
  account: '', // *用户账号
  password: null, // *用户密码
})

const fieldList = [
  {
    label: '账号',
    prop: 'account',
    labelRender: () => {
      return <div class="cl-red">这是labelRender渲染的account</div>
    },
  },
]
</script>
