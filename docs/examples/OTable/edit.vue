<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const header = [
  {
    label: '名字',
    title: 'name',
  },
  {
    label: '年龄',
    title: '18',
  },
]
const edit = async (row, scope) => {
  if (row.isEdit) {
    await proxy.sleep(1000)
    proxy.$toast('保存成功')
    return (form.value.data[scope.$index].isEdit = false)
  }
  form.value.data[scope.$index].isEdit = !form.value.data[scope.$index].isEdit
}
const columns = [
  {
    label: '名字',
    prop: 'name',
    useSlot: true,
  },
  {
    label: '年龄',
    prop: 'age',
    useSlot: true,
  },
  {
    label: '操作',
    prop: 'operation',
    btns: [
      {
        content: (value, row) => {
          console.log(`74 row`, row)
          console.log(`1157 34行 docs/examples/OTable/edit.vue value `, value)
          if (value?.isEdit) {
            return '保存'
          } else {
            return '编辑'
          }
        },
        type: 'primary',
        handler: edit,
      },
    ],
  },
]

const formRules = ref({
  name: [proxy.validate()],
  age: [{ required: true, message: '请输入年龄', trigger: ['change', 'blur'] }],
})

const form = ref({
  data: [
    {
      name: '',
      age: '12',
      id: 1,
    },
    {
      name: '名字2',
      age: '',
      id: 2,
    },
  ],
})
const formRef = ref(null)
const submitForm = async () => {
  await proxy.validForm(formRef)
  proxy.$toast('编辑成功')
  // if (!formRef) return
  // return await formRef.value?.validate((valid: any) => {
  //   if (valid) {
  //     console.log('submit!')
  //   } else {
  //     console.log('error submit!')
  //     return false
  //   }
  // })
}
</script>

<template>
  <div class="table-box">
    <el-form :model="form" ref="formRef" size="small">
      <o-table :columns="columns" :data="form.data">
        <template #name="{ scope, row }">
          <template v-if="row.isEdit">
            <el-form-item :prop="'data.' + scope.$index + '.name'" :rules="formRules.name" class="">
              <o-input v-model="form.data[scope.$index].name" size="small" />
            </el-form-item>
          </template>
          <template v-else>
            {{ row.name }}
          </template>
        </template>

        <template #age="{ scope, row }">
          <template v-if="row.isEdit">
            <el-form-item :prop="'data.' + scope.$index + '.age'" :rules="formRules.age" class="">
              <o-input v-model="form.data[scope.$index].age" size="small" />
            </el-form-item>
          </template>
          <template v-else>
            {{ row.age }}
          </template>
        </template>
      </o-table>
    </el-form>

    <el-button type="primary" @click="submitForm()">Submit</el-button>
  </div>
</template>

<style scoped lang="scss">
.table-box {
  :deep(.el-table__body .el-table__cell) {
    height: 54px;
    line-height: 54px;
  }
}
</style>
