<template>
  <o-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :column="1"></o-form>
  {{ formData }}
</template>

<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { validate } from '@oeos-components/utils'

const formData = ref({
  account: '123', // *用户账号
})

const fieldList = [
  {
    label: '账号',
    prop: 'account',
    rules: [validate()],
    labelRender: () => {
      return <div class="cl-red">labelRender渲染label</div>
    },
    render: (item) => {
      console.log(`75 item`, item);
      return (
        <o-flex>
          <el-input
            placeholder="请输入render"
            modelValue={formData.value.account}
            onUpdate:modelValue={(val) => {
              formData.value.account = val
            }}
          />
          <o-warning content="render渲染value" class="ml" size="small"></o-warning>
        </o-flex>
      )
    },
  },
]
</script>
