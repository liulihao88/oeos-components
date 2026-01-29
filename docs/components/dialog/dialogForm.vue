<script setup lang="ts">
import { ref, getCurrentInstance, computed } from 'vue'
const { proxy } = getCurrentInstance()
const isShow = ref(false)

const form = ref({
  name: '',
  age: '',
})
const originForm = proxy.clone(form.value)
const oFormRef = ref(null)
const rules = {
  name: [proxy.validate()],
  age: [proxy.validate()],
}
const fieldList = computed(() => {
  return [
    {
      prop: 'name',
      label: '名字',
      directives: {
        focus: true,
      },
    },
    {
      prop: 'age',
      label: '年龄',
    },
  ]
})
const open = (isEdit = false) => {
  console.log(`02 isEdit`, isEdit)
  if (isEdit) {
    form.value = {
      name: proxy.uuid('name'),
      age: proxy.uuid('number'),
    }
  } else {
    form.value = originForm
  }
  isShow.value = true
}
const confirm = async () => {
  await oFormRef.value.validate(true)
  oFormRef.value.resetFields()
  proxy.$toast('保存成功')
  isShow.value = false
}
</script>

<template>
  <div>
    <o-dialog ref="dialogRef" title="弹框form表单" v-model="isShow" @confirm="confirm">
      <o-form :fieldList="fieldList" :model="form" ref="oFormRef" :rules="rules"></o-form>
    </o-dialog>
    <el-button type="primary" @click="open()">新建</el-button>
    <el-button type="primary" @click="open(true)">编辑</el-button>
  </div>
</template>
