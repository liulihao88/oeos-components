<script setup lang="ts">
import { ref, getCurrentInstance, computed } from 'vue'
const { proxy } = getCurrentInstance()
import RenderComp from './renderComp.vue'

const props = defineProps({
  fieldList: {
    type: Object,
    required: true,
  },
  model: {
    type: Object,
    required: true,
  },
})

// placeholder的显示
const getPlaceholder = (row: any) => {
  if (row.comp && typeof row.comp == 'string') {
    if (row.comp.includes('input')) {
      return '请输入' + row.label
    } else if (row.comp.includes('select') || row.comp.includes('date')) {
      return '请选择' + row.label
    }
  }
  return row.placeholder || ''
}

const oFormRef = ref()
async function validate() {
  await proxy.validForm(oFormRef)
}
function resetFields() {
  oFormRef.value.resetFields()
}
function innerSubmit() {
  validate()
}
function mergeRules(rules) {
  if (proxy.isEmpty(rules)) {
    return ''
  }
  let defaultRulesObj = {
    message: '请输入',
    trigger: ['blur', 'change'],
  }
  let mergeRules = rules.map((v) => {
    return Object.assign({}, defaultRulesObj, v)
  })
  console.log(`mergeRules`, mergeRules)
  return mergeRules
}

defineExpose({
  validate: validate,
  resetFields: resetFields,
})
</script>

<template>
  <div>
    <el-form ref="oFormRef" :model="model" v-bind="{ 'label-width': 'auto', ...$attrs }">
      <el-form-item
        v-for="(v, i) in fieldList"
        :key="i"
        :prop="v.prop"
        :label="v.label"
        v-bind="v.itemAttrs"
        :rules="mergeRules(v.rules)"
      >
        <!-- 将 Element Plus 表格的默认 slot 传递给您的组件 -->
        <template #label>
          <slot :name="v.prop + '-label'">
            <o-tooltip :content="v.label"></o-tooltip>
          </slot>
        </template>
        <!-- 自定义label -->
        <template #label v-if="v.labelRender">
          <render-comp :render="v.labelRender" :item="v" />
        </template>
        <template v-if="v.useSlot">
          <slot :name="v.prop"></slot>
        </template>
        <template v-else>
          <component
            v-model="model[v.prop!]"
            :is="v.comp || 'o-input'"
            :placeholder="getPlaceholder(v)"
            :rules="v.rules"
            v-bind="{ clearable: true, filterable: true, ...v.attrs }"
          ></component>
        </template>
      </el-form-item>

      <!-- <el-button type="primary" @click="clearForm">内部清空表单</el-button> -->
      <!-- <el-button type="primary" @click="innerSubmit">组件内部提交</el-button> -->
    </el-form>
  </div>
</template>
