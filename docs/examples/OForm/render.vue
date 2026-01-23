<template>
  <o-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :column="1"></o-form>
</template>

<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { validate } from '@oeos-components/utils'

const formData = ref({
  account: '123', // *用户账号
  date: [],
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

  {
    label: '日期',
    prop: 'date',
    rules: [validate()],
    comp: 'o-date-range',
    labelRender: () => {
      return (
        <o-flex align="center" gap="small">
          日期组件
          <el-tooltip content="自定义label" placement="right">
            <o-icon name="warning"></o-icon>
          </el-tooltip>
        </o-flex>
      )
    },
  },
]
</script>
