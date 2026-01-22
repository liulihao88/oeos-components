<script setup lang="ts" name="OForm">
import { ref } from 'vue'
import RenderComp from './renderComp.vue'
import { validForm, isEmpty } from '@oeos-components/utils'
import OIcon from '@/components/icon/src/index.vue'
import OTooltip from '@/components/tooltip/src/index.vue'

defineOptions({
  inheritAttrs: false,
})

export interface FormSelfProps {
  fieldList: Record<string, any>
  model: Record<string, any>
  showFooter: boolean
  column: 1 | 2 | 3 | 4 | 5 | 6
}

const props = withDefaults(defineProps<FormSelfProps>(), {
  showFooter: true,
  column: 1,
})

// placeholder的显示
const getPlaceholder = (row: any) => {
  if (row.comp && typeof row.comp == 'string') {
    if (row.comp.includes('input')) {
      return row.placeholder ?? '请输入' + row.label
    } else if (row.comp.includes('select') || row.comp.includes('date')) {
      return row.placeholder ?? '请选择' + row.label
    }
  }
  return row.placeholder ?? ''
}

const oFormRef = ref()
async function validate(isResetFields = false, otherParams = {}) {
  await validForm(oFormRef, otherParams)
  if (isResetFields) {
    resetFields()
  }
}
const submit = () => {
  validate()
}
function resetFields() {
  oFormRef.value.resetFields()
}

function clearFieldsValidate() {
  oFormRef.value.clearValidate()
}
function mergeRules(rules) {
  if (isEmpty(rules)) {
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

// label与输入框的布局方式
const getChildWidth = (item: { widthSize: any }) => {
  return `flex: 0 1 ${100 / (item.column || props.column)}%;`
}

defineExpose({
  validate: validate,
  resetFields: resetFields,
})
</script>

<template>
  <div>
    <el-form ref="oFormRef" :model="model" v-bind="{ 'label-width': 'auto', ...$attrs }" class="o-form">
      <el-form-item
        v-for="(v, i) in fieldList"
        :key="i"
        :prop="v.prop"
        :label="v.label"
        v-bind="v.formItemAttrs"
        :style="getChildWidth(v)"
        :rules="mergeRules(v.rules)"
      >
        <template #label>
          <template v-if="v.labelRender">
            <render-comp :render="v.labelRender" :item="v" />
          </template>
          <template v-else>
            <slot :name="v.prop + '-label'">
              <img v-if="v.imgAttrs?.src" :src="v.imgAttrs?.src" class="h-16" v-bind="v.imgAttrs" />
              <o-icon v-else-if="v.imgAttrs?.name" :name="v.imgAttrs?.name" class="m-r-4" v-bind="v.imgAttrs" />
              <o-tooltip :content="v.label" />
            </slot>
          </template>
        </template>
        <template v-if="v.useSlot">
          <slot :name="v.prop"></slot>
        </template>
        <template v-else-if="v.render">
          <render-comp :render="v.render" :item="v" />
        </template>
        <template v-else>
          <component
            v-model="model[v.prop!]"
            :is="v.comp || 'o-input'"
            :placeholder="getPlaceholder(v)"
            :rules="v.rules"
            v-bind="{ clearable: true, filterable: true, width: '100%', ...v.attrs }"
            v-directives="v.directives"
          ></component>
        </template>
      </el-form-item>
    </el-form>
    <o-flex justify="center" v-if="showFooter">
      <el-button type="primary" @click="submit" size="small">提交</el-button>
      <el-button type="" @click="resetFields" size="small">重置</el-button>
      <el-button type="danger" @click="clearFieldsValidate" size="small">清除校验</el-button>
    </o-flex>
  </div>
</template>

<style lang="scss" scoped>
.o-form {
  display: flex;
  flex-wrap: wrap;
}
:deep(.el-form-item__label) {
  align-items: center;
}
:deep(.el-form-item) {
  align-items: center;

  .el-form-item__content {
    .el-input,
    .el-select,
    .el-date-editor,
    .el-input-number,
    .el-textarea {
      width: 100%;
    }
  }
}
</style>
