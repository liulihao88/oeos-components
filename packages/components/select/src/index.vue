<template>
  <div
    class="o-select"
    :style="{ ...processWidth(props.width) }"
    :class="{ 'has-title': props.title, 'has-quick': props.showQuick && !parseDisabled && sOptions.length > 0 }"
  >
    <o-comp-title :title="props.title" :size="attrs.size" :boxStyle="$attrs.boxStyle ?? {}"></o-comp-title>
    <el-select
      ref="selectRef"
      class="o-select__select"
      :class="isEmpty(sOptions) && emptyColor ? 'o-select__empty' : ''"
      v-model="childSelectedValue"
      :placeholder="handlePlaceholder()"
      popper-class="o-select__multiple-checkbox"
      :multiple="multiple"
      @change="changeHandler"
      v-bind="{
        clearable: true,
        filterable: true,
        ...Object.entries($attrs).reduce((obj, [key, value]) => {
          if (key !== 'class' && key !== 'style') {
            obj[key] = value
          }
          return obj
        }, {}),
      }"
    >
      <template #prefix v-if="props.showPrefix">
        <slot name="prefix">
          <span v-if="Array.isArray(childSelectedValue)">{{ childSelectedValue.length }}/{{ sOptions.length }}</span>
          <span v-else>{{ sOptions.length }}个</span>
        </slot>
      </template>
      <template #label="arg" v-if="$slots.label">
        <slot name="label" v-bind="arg"></slot>
      </template>
      <template v-for="(arg, name, index) in noDefaultSlots" v-slot:[name]>
        <slot :name="name" v-bind="arg" :index="index" />
      </template>

      <div class="po-r" v-if="multiple && props.showAll">
        <el-checkbox
          :indeterminate="indeterminate"
          v-model="selectChecked"
          @change="selectAll"
          class="o-select__all-select f-st-ct"
        >
          <div class="mt">全选</div>
        </el-checkbox>
        <el-button type="primary" @click.stop="reverseSelect" size="small" class="reverse-select">反选</el-button>
      </div>

      <el-option
        v-for="(item, index) in sOptions"
        :key="type === 'simple' ? item : item[props.value]"
        :label="type === 'simple' ? item : handleLabel(item)"
        :value="type === 'simple' ? item : item[props.value]"
        :disabled="optionsDisabled(item, index, sOptions)"
      >
        <slot :options="sOptions" :item="item"></slot>
      </el-option>
    </el-select>

    <div class="o-select__select-box" v-if="showQuick && !parseDisabled && sOptions.length > 0">
      <div class="o-select__select-box__inner">
        <o-icon name="ArrowUp" :size="attrs.size === 'small' ? 10 : 14" @click="quickSelect(false)"></o-icon>
        <div class="h-1 w-100% cl-blue bg-line"></div>
        <o-icon name="ArrowDown" :size="attrs.size === 'small' ? 10 : 14" @click="quickSelect(true)"></o-icon>
      </div>
      <!-- <img :src="Loop" alt="" width="12px" /> -->
    </div>
  </div>
</template>

<script setup lang="ts" name="OSelect">
import { ref, getCurrentInstance, useAttrs, watch, useSlots, computed } from 'vue'
import Loop from '@/assets/images/loop.png'
import { processWidth, isEmpty } from '@/utils/src'

import OIcon from '@/components/icon'
import OCompTitle from '@/components/compTitle'
const { proxy } = getCurrentInstance()
const attrs = useAttrs()
const emits = defineEmits(['changeSelect', 'update:modelValue', 'change'])
const slots = useSlots()
const noDefaultSlots = computed(() => {
  const copySlots = proxy.clone(slots)
  delete copySlots.default
  delete copySlots.label
  return copySlots
})

const props = defineProps({
  modelValue: {
    type: [Array, String, Number],
  },
  value: {
    type: String,
    default: 'value',
  },
  label: {
    type: [String, Array],
    default: 'label',
  },
  options: {
    type: Array,
    default: () => [],
  },
  // 是简单的options 还是复杂options。默认复杂
  type: {
    type: String,
    default: '', // 简单选项'simple',
  },
  // 是否多选
  multiple: {
    type: Boolean,
    default: false,
  },
  showAll: {
    type: Boolean,
    default: true,
  },
  showPrefix: {
    type: Boolean,
    default: false,
  },
  showQuick: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: '',
  },

  // 如果label显示多个参数的连接符
  connect: {
    type: String,
    default: '/',
  },
  // 自定义label显示多个参数的函数
  customLabel: {
    type: [Function, String],
    default: '',
  },
  width: {
    type: [String, Number],
    default: '',
  },
  // placeholder在disabled的情况下是不显示的. 如果想要在这种情况下显示placeholder, 那么就用这个属性
  disPlaceholder: {
    type: String,
    default: '',
  },
  optionsDisabled: {
    type: Function,
    default: () => {},
  },
  url: {
    type: [String, Function],
    default: '',
  },
  urlParams: {
    type: Object,
    default: () => {},
  },
  optionsExpression: {
    type: String,
    default: '',
  },
  emptyColor: {
    type: Boolean,
    default: false,
  },
})

const sOptions = ref(props.options)

watch(
  () => props.options,
  (val) => {
    sOptions.value = val
  },
  {
    deep: true,
    immediate: true,
  },
)

const disOptions = computed(() => {
  return sOptions.value.filter((...rest) => {
    return !props.optionsDisabled(...rest)
  })
})

const selectRef = ref(null)

// vue3 v-model简写
const childSelectedValue = computed({
  get() {
    // 如果是多选, 且props.modelValue是空, 那么返回空数组.
    if (isEmpty(props.modelValue) && props.multiple) {
      return []
    }
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  },
})
const handleDifValue = (item) => {
  return props.type === 'simple' ? item : item[props.value]
}

const parseDisabled = computed(() => {
  return attrs.disabled === '' || !!attrs.disabled
})
// 设置半选
const indeterminate = computed({
  get() {
    const _deval = props.modelValue
    if (!_deval) {
      return false
    }
    return _deval?.length !== disOptions.value.length && _deval?.length !== 0
  },
  set(val) {
    return val?.length !== disOptions.value.length && val?.length !== 0
  },
})
// 设置全选
const selectChecked = computed({
  get() {
    const _deval = props.modelValue
    return _deval?.length === disOptions.value.length
  },
  set(val) {
    return val?.length === disOptions.value.length
  },
})
// 点击全选
const selectAll = (val: any) => {
  if (val) {
    const selectedAllValue = disOptions.value.map((item) => {
      return handleDifValue(item)
    })
    changeMulty(selectedAllValue)
  } else {
    changeMulty([])
  }
}

// 反选
const reverseSelect = () => {
  const noSelectedValue = disOptions.value
    .filter((v) => {
      return !props.modelValue.includes(handleDifValue(v))
    })
    .map((v) => handleDifValue(v))
  changeMulty(noSelectedValue)
}

function handlePlaceholder() {
  let res = attrs.disabled ? props.disPlaceholder : attrs.placeholder || '请选择'
  return res
}
// 将label作为多个值连接起来。 比如 admin/管理员, 这是两个属性拼接出来的
function handleLabel(item) {
  // 如果customLabel是函数就执行customLabel的函数去处理label显示
  if (typeof props.customLabel === 'function') {
    return props.customLabel(item)
  } else {
    // 如果label是数组, 就拼接数组。
    if (Array.isArray(props.label)) {
      let str = ''
      props.label.forEach((v) => {
        str += item[v] + props.connect
      })
      let res = str.slice(0, -1)
      return res
    } else {
      // 直接显示label
      return item[props.label]
    }
  }
}

const quickSelect = (isPlus) => {
  if (disOptions.value.length === 0 || attrs.disabled === '' || !!attrs.disabled === true) {
    return
  }
  let nextIdx = 0
  if (isEmpty(props.modelValue) || (props.multiple === true && props.modelValue.length > 1)) {
    nextIdx = 0
  } else {
    let nowIdx = disOptions.value.findIndex((v) => {
      if (props.multiple === true) {
        return handleDifValue(v) === props.modelValue[0]
      } else {
        return handleDifValue(v) === props.modelValue
      }
    })
    nextIdx = nowIdx + (isPlus ? 1 : -1)
    if (nextIdx === disOptions.value.length) {
      nextIdx = 0
    }
    if (nextIdx < 0) {
      nextIdx = disOptions.value.length - 1
    }
  }
  let getValue = props.type === 'simple' ? disOptions.value[nextIdx] : disOptions.value[nextIdx][props.value]
  if (props.multiple === true) {
    selectRef.value.$emit('change', [getValue])
  } else {
    selectRef.value.$emit('change', getValue)
  }
}

// 处理多选的返回情况
function changeMulty(item) {
  let selectLabel = []
  const selectObj = sOptions.value.filter((v) => {
    if (item.includes(v[props.value])) {
      selectLabel.push(v[props.label])
      return true
    } else {
      return false
    }
  })
  _commonEmits(item, selectLabel, selectObj)
}
// 有些场景， 下拉框不仅需要获取value, 还需要获取选择的对象或者label, el-select原生没有这个属性， 所以changeHandler就做了下处理， 返回的数组包含3个属性， 第一个value, 第二个选中对象， 第三个选中的label。
function changeHandler(item) {
  // 如果val是数组, 证明是多选
  if (Array.isArray(item)) {
    changeMulty(item)
    return
  }
  if (!item) {
    _commonEmits('', '', '')
    return
  }
  let selectObj = sOptions.value.filter((v) => {
    if (props.type === 'simple') {
      return v === item
    } else {
      return v[props.value] === item
    }
  })[0]
  let selectLabel = selectObj[props.label]
  _commonEmits(item, selectLabel, selectObj)
}
function _commonEmits(item, selectLabel, selectObj) {
  emits('changeSelect', item, selectLabel, selectObj)
  emits('update:modelValue', item)
  emits('change', item)
}

/** @使用方式
<o-select
  v-model="optionsId"
  label="name"
  value="id"
  :url="listWorkStyles"
  optionsExpression="list"
  :urlParams="urlParams"
></o-select>

import { listWorkStyles } from '/@/api/aig/work_styles';

const urlParams = translateToPageinfo({
	pageSize: 9999,
	pageNum: 1,
});
*/
</script>

<style lang="scss" scoped>
.o-select {
  display: inline-flex;
  width: 316px;
  vertical-align: bottom;
  :deep(.el-select) {
    flex: 1;
  }

  :deep(.el-input__inner) {
    border-radius: 0px 2px 2px 0 !important;
  }

  .o-select__empty {
    :deep(.el-select__wrapper) {
      box-shadow: 0 0 0 1px var(--red) inset;
    }
  }
}
.has-title {
  :deep(.el-select__wrapper) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
.has-quick {
  :deep(.el-select__wrapper) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
}

.o-select__multiple-checkbox.is-multiple .el-select-dropdown__item {
  &.selected::after {
    left: 21px;
    z-index: 10;
    width: 16px;
    height: 16px;
    border: 1px solid #5d7af7;
    border-radius: 2px;
    color: #ffffff;
    top: 50%;
    transform: translateY(-50%);
    line-height: 16px;
    text-align: center;
  }
  .el-checkbox__inner {
    width: 16px;
    height: 16px;
  }
  &.selected .el-checkbox__label {
    color: #5d7af7;
  }
  &.hover {
    background-color: #f5f7fd;
    border-radius: 1px;
  }
  &.is-disabled {
    &.selected::after {
      background: gray;
      border: 1px solid gray;
    }
    .el-checkbox,
    .el-checkbox__label,
    .el-checkbox__inner {
      color: gray;
      border-color: gray !important;
    }
  }
}
:deep(.el-input__wrapper) {
  background: #5d7af7;
  & .el-input__inner {
    color: #fff !important;
  }
}
.o-select__all-select {
  display: flex;
  padding: 0px 0px 10px 20px;
  align-items: end;
  &:hover {
    background-color: #f5f7fa;
  }
}
.o-select__all-select:hover + .el-select-dropdown__item {
  background-color: unset;
}
.reverse-select {
  position: absolute;
  right: 16px;
  top: 4px;
}
.o-select__select-box {
  background: #f5f7fa;
  vertical-align: middle;
  position: relative;
  border: 1px solid #dcdfe6;
  border-left: none;
  white-space: nowrap;
  width: 14px;
  cursor: pointer;
  border-radius: 0px 2px 2px 0px;
  align-items: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--el-input-height);
  min-height: 100%;
  color: var(--el-color-info);
  .o-select__select-box__inner {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    :hover {
      color: var(--blue);
      background: lightblue;
    }
    .o-icon + .o-icon {
      margin-left: 0;
    }
  }
}
</style>
