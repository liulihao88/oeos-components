<script setup lang="ts">
/** @使用方式
<o-checkbox
  v-model="formData.categoryIds"
  :options="tableData.data"
  value="id"
  :showAll="false"
  label="name"
  :checkboxDisabled="judgeDisabled"
></o-checkbox>
*/
import { ref, getCurrentInstance, watch, computed } from 'vue'
import { isEmpty } from '../../utils'
import type { PropType } from 'vue'
const props = defineProps({
  options: {
    type: Object,
    default: () => {
      return {}
    },
  },
  type: {
    type: String as PropType<'check' | 'button'>,
    validator: (value: string) => ['check', 'button'].includes(value),
    default: 'check',
  },
  modelValue: {
    type: Array,
    defalut: () => [],
  },
  label: {
    type: String,
    default: 'label',
  },
  value: {
    type: String,
    default: 'value',
  },
  showAll: {
    type: Boolean,
    default: true,
  },
  select: {
    type: Array,
    default: () => [],
  },
  subAttrs: {
    type: Object,
    default: () => {},
  },
  checkboxDisabled: {
    type: Function,
    default: () => {},
  },
  // 自定义label显示多个参数的函数
  customLabel: {
    type: [Function, String],
    default: '',
  },
})
const checkAll = ref(false)
const isIndeterminate = ref(false)
const allCheckList = ref([])

watch(
  () => props.modelValue,
  (newValue) => {
    if (isEmpty(newValue)) {
      isIndeterminate.value = false
      checkAll.value = false
    } else if (newValue.length === props.options?.length) {
      isIndeterminate.value = false
      checkAll.value = true
    } else {
      isIndeterminate.value = true
      checkAll.value = false
    }
  },
  { deep: true, immediate: true },
)

const emits = defineEmits(['update:modelValue'])
function checkAllChange() {
  const optionAll = props.options.map((v) => v[props.value])
  if (
    isIndeterminate.value ||
    (checkAll.value === false && isIndeterminate.value === true)
  ) {
    emitValue(optionAll)
  } else if (checkAll.value === true && isIndeterminate.value === false) {
    emitValue(optionAll)
  } else if (checkAll.value === false && isIndeterminate.value === false) {
    emitValue([])
  }
}
const checkType = computed(() => {
  const obj = {
    check: 'el-checkbox',
    button: 'el-checkbox-button',
  }
  return obj[props.type] ?? 'el-checkbox'
})
function groupChange(item, idx) {
  emitValue(item)
}

function emitValue(item) {
  console.log(`item`, item)
  allCheckList.value = item
  emits('update:modelValue', allCheckList.value)
}
function handleLabel(item, index) {
  // 如果customLabel是函数就执行customLabel的函数去处理label显示
  if (typeof props.customLabel === 'function') {
    return props.customLabel(item, index)
  } else {
    return item[props.label]
  }
}
</script>

<template>
  <div class="checkbox">
    <el-checkbox
      v-model="checkAll"
      class="checkbox__all"
      :indeterminate="isIndeterminate"
      @change="checkAllChange"
      v-if="showAll"
      v-bind="$attrs"
    >
      全选
    </el-checkbox>
    <el-checkbox-group
      v-model="props.modelValue"
      @change="groupChange"
      v-bind="$attrs"
    >
      <slot>
        <component
          :is="checkType"
          v-bind="subAttrs"
          v-for="(item, index) in props.options"
          :key="index"
          :label="item[props.value]"
          :disabled="props.checkboxDisabled(item)"
        >
          <slot :name="item.slot" v-bind="item">
            <!-- {{ item[props.label] }} -->
            {{ handleLabel(item, index) }}
          </slot>
        </component>
      </slot>
    </el-checkbox-group>
  </div>
</template>

<style scoped lang="scss">
.checkbox {
  display: flex;
  .checkbox__all {
    padding-right: 24px;
  }
}
</style>
