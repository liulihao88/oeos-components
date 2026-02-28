<script setup lang="ts" name="OForm">
import { ref, watch } from 'vue'
import RenderComp from './renderComp.vue'
import { validForm, isEmpty, $toast } from '@oeos-components/utils'
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
  align: 'center' | 'top' | 'flex-end'
}

const props = withDefaults(defineProps<FormSelfProps>(), {
  showFooter: import.meta.env.DEV ? true : false,
  column: 1,
  align: 'center'
})

const sFieldList = ref(props.fieldList)

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

function clearValidate() {
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

const parseIsShow = (item) => {
  if (item.isShow === undefined) {
    return true
  }
  if (typeof item.isShow === 'function') {
    return item.isShow(item)
  }
  return item.isShow
}

const showFormValue = () => {
  $toast({
    dangerouslyUseHTMLString: true,
    message: `<pre style="max-height: 90vh; overflow-y: auto; overflow-x: hidden">${JSON.stringify(props.model, null, 2)}</pre>`,
    type: 'success',
    duration: 0,
    showClose: true,
  })
}
const showFieldListValue = () => {
  $toast({
    dangerouslyUseHTMLString: true,
    message: `<pre style="max-height: 90vh; overflow-y: auto; overflow-x: hidden">${JSON.stringify(sFieldList.value, null, 2)}</pre>`,
    type: 'success',
    duration: 0,
    showClose: true,
  })
}

watch(
  () => props.fieldList,
  (val) => {
    sFieldList.value = val
  },
  {
    deep: true,
    immediate: true,
  },
)

defineExpose({
  validate: validate,
  clearValidate: clearValidate,
  resetFields: resetFields,
})
</script>

<template>
  <div>
    <el-form ref="oFormRef" :model="model" v-bind="{ 'label-width': 'auto', ...$attrs }" class="o-form">
      <template v-for="(v, i) in sFieldList" :key="i">
        <el-form-item
          :prop="v.prop"
          :label="v.label"
          v-bind="v.formItemAttrs"
          :style="getChildWidth(v)"
          :rules="mergeRules(v.rules)"
          v-if="parseIsShow(v)"
        >
          <template #label>
            <template v-if="v.labelRender">
              <render-comp :render="v.labelRender" :item="v" />
            </template>
            <template v-else>
              <slot :name="v.prop + '-label'" :item="v">
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
      </template>
      
    </el-form>
    <o-flex justify="center" v-if="showFooter">
      <el-button type="primary" @click="submit" size="small">提交</el-button>
      <el-button type="" @click="resetFields" size="small">重置</el-button>
      <el-button type="danger" @click="clearValidate" size="small">清除校验</el-button>
      <el-button type="danger" @click="showFormValue" size="small">查看form的值</el-button>
      <el-button type="danger" @click="showFieldListValue" size="small">查看fieldList的值</el-button>
    </o-flex>
  </div>
</template>

<style lang="scss" scoped>
.o-form {
  display: flex;
  flex-wrap: wrap;
}
:deep(.el-form-item) {
  align-items: v-bind('props.align');

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
