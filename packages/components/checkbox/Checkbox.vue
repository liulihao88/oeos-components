<script setup lang="ts">
/** @使用方式
<o-checkbox
  v-model="formData.categoryIds"
  :options="tableData.data"
  value="id"
  :showAll="false"
  label="name"
  :customDisabled="judgeDisabled"
></o-checkbox>
*/
import { ref, getCurrentInstance, watch, computed } from 'vue'
const { proxy } = getCurrentInstance()
const props = defineProps({
  type: {
    type: String,
    default: '',
  },
  options: {
    type: Object,
    default: () => {
      return []
    },
  },
  showType: {
    type: String,
    validator: (value: string) => ['check', 'button'].includes(value),
    default: 'check', // button
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
  attrs: {
    type: Object,
    default: () => {},
  },
  customDisabled: {
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
    // 一些不在options里的值, 需要考虑进来, 进行过滤. 这里还要考虑type===simple的情况
    let pureValue = []
    if (proxy.isEmpty(newValue) || typeof newValue !== 'object') {
      pureValue = []
    } else {
      pureValue = newValue.filter((v) => {
        return props.options.some((val) => {
          let res = props.type === 'simple' ? val === v : val[props.value]
          return res
        })
      })
    }

    if (proxy.isEmpty(pureValue)) {
      isIndeterminate.value = false
      checkAll.value = false
    } else if (pureValue.length === props.options.length) {
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
  const optionAll = props.options.map((v) => {
    let res = props.type === 'simple' ? v : v[props.value]
    return res
  })
  if (isIndeterminate.value || (checkAll.value === false && isIndeterminate.value === true)) {
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
  return obj[props.showType] ?? 'el-checkbox'
})
function groupChange(item, idx) {
  emitValue(item)
}

function emitValue(item) {
  allCheckList.value = item
  emits('update:modelValue', allCheckList.value)
}
function handleLabel(item, index) {
  // 如果customLabel是函数就执行customLabel的函数去处理label显示
  if (typeof props.customLabel === 'function') {
    return props.customLabel(item, index)
  } else {
    let res = props.type === 'simple' ? item : item[props.label]
    return res
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
    <el-checkbox-group v-model="props.modelValue" @change="groupChange" v-bind="$attrs">
      <slot>
        <component
          :is="checkType"
          v-bind="attrs"
          v-for="(item, index) in props.options"
          :key="index"
          :value="props.type === 'simple' ? item : item[props.value!]"
          :label="props.type === 'simple' ? item : item[props.label!]"
          :disabled="props.customDisabled(item)"
        >
          <slot :name="props.type === 'simple' ? item : item.slot" v-bind="props.type === 'simple' ? {} : item">
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
