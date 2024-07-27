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
      return row.placeholder ?? '请输入' + row.label
    } else if (row.comp.includes('select') || row.comp.includes('date')) {
      return row.placeholder ?? '请选择' + row.label
    }
  }
  return row.placeholder ?? ''
}

const oFormRef = ref()
async function validate(isResetFields = false, otherParams = {}) {
  await proxy.validForm(oFormRef, otherParams)
  if (isResetFields) {
    resetFields()
  }
}
function resetFields() {
  oFormRef.value.resetFields()
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
        v-bind="v.formAttrs"
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
        <template v-else>
          <component
            v-model="model[v.prop!]"
            :is="v.comp || 'o-input'"
            :placeholder="getPlaceholder(v)"
            :rules="v.rules"
            v-bind="{ clearable: true, filterable: true, ...v.attrs }"
            v-directives="v.directives"
          ></component>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-form-item__label) {
  align-items: center;
}
</style>
