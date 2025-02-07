<script setup lang="ts">
import { ref, getCurrentInstance, defineProps, defineExpose } from 'vue'
import RenderComp from './renderComp.vue'

const { proxy } = getCurrentInstance()

const props = defineProps({
  fieldList: {
    type: Object,
    required: true,
  },
  model: {
    type: Object,
    required: true,
  },
  directives: {
    type: Object,
    default: () => ({}),
  }
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
    trigger: ['blur', 'change'],
  }
  let mRules = rules.map((v) => {
    let mergeObj = Object.assign({}, defaultRulesObj, v)
    if (!mergeObj.validator && !mergeObj.message) {
      mergeObj.message = '请输入'
    }
    return mergeObj
  })
  return mRules
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
            v-bind="v.attrs"
            v-for="(directiveValue, directiveName) in props.directives[v.prop] || {}"
            v-bind:[directiveName]="directiveValue"
          ></component>
        </template>
      </el-form-item>
    </el-form>


</div>
</template>
