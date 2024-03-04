<template>
  <div class="kd-select" :style="{ ...mHandleWidth() }">
    <div v-if="props.title" class="left_box">
      {{ props.title }}
    </div>
    <el-select
      ref="rightBox"
      class="right_box"
      :filterable="$attrs.filterable !== false"
      :placeholder="handlePlaceholder()"
      popper-class="kd-custom-multiple-checkbox"
      :clearable="$attrs.clearable !== false"
      v-bind="$attrs"
      @visible-change="handleResChange"
      @change="changeHandler"
    >
      <el-option
        v-for="item in sOptions"
        :key="type === 'simple' ? item : item[props.value]"
        :label="type === 'simple' ? item : handleLabel(item)"
        :value="type === 'simple' ? item : item[props.value]"
        :disabled="optionDisabled(item)"
      >
        <el-checkbox
          v-if="$attrs.multiple === true || $attrs.multiple === ''"
          @click.prevent.native
        >
          {{ handleLabel(item) }}
        </el-checkbox>
      </el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, useAttrs, watch } from 'vue'
const { proxy } = getCurrentInstance()
const attrs = useAttrs()
const emits = defineEmits(['changeSelect'])
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: 'label',
  },
  value: {
    type: String,
    default: 'value',
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
  optionDisabled: {
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
const isLoading = ref(false)

// 根据传入的width, 返回处理后的width
function mHandleWidth() {
  if (!props.width) {
    return {}
  }
  if (
    typeof props.width === 'string' &&
    (props.width.indexOf('px') !== -1 || props.width.indexOf('%') !== -1)
  ) {
    return { width: props.width }
  }
  return { width: props.width + 'px' }
}
function handlePlaceholder() {
  let res = attrs.disabled
    ? props.disPlaceholder
    : attrs.placeholder || '请选择'
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

// 处理多选的返回情况
function changeMulty(arr) {
  let selectLabel = []
  const selectObj = sOptions.filter((v) => {
    if (arr.includes(v[props.value])) {
      selectLabel.push(v[props.label])
      return true
    } else {
      return false
    }
  })
  emits('changeSelect', [arr, selectLabel, selectObj])
}
// 有些场景， 下拉框不仅需要获取value, 还需要获取选择的对象或者label, el-select原生没有这个属性， 所以changeHandler就做了下处理， 返回的数组包含3个属性， 第一个value, 第二个选中对象， 第三个选中的label。
function changeHandler(item) {
  // 如果val是数组, 证明是多选
  if (Array.isArray(item)) {
    changeMulty(item)
    return
  }
  if (!item) {
    emits('changeSelect', [])
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

  emits('changeSelect', [item, selectLabel, selectObj])
}

// 处理只有在 往下拉的时候, 才请求事件的情况
async function handleResChange(isOpen) {
  if (proxy.isEmpty(props.url)) {
    return
  }
  if (isOpen && proxy.isEmpty(sOptions.value)) {
    isLoading.value = true
    let { res, err } = await proxy.asyncWrapper(props.url, props.urlParams)
    if (err) {
      return
    }
    sOptions.value = proxy.isEmpty(props.optionsExpression)
      ? res
      : res[props.optionsExpression]
    isLoading.value = false
  }
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

const urlParams = proxy.translateToPageinfo({
	pageSize: 9999,
	pageNum: 1,
});
*/
</script>

<style lang="scss" scoped>
.kd-select {
  display: inline-flex;
  width: 316px;
  .left_box {
    background: #fff;
    vertical-align: middle;
    position: relative;
    border: 1px solid #dcdfe6;
    border-right: 0 none;
    padding: 0 8px;
    white-space: nowrap;
    border-radius: 2pgex 0 0 2px;
    align-items: center;
    display: inline-block;
    display: flex;
    justify-content: space-around;
    color: rgba(39, 48, 75, 0.85);
    font-size: 12px;
  }
  :deep(.el-input__inner) {
    border-radius: 0px 2px 2px 0 !important;
  }
  .right_box {
    flex-grow: 1;
    display: inline-block;
  }
}

.kd-custom-multiple-checkbox.is-multiple .el-select-dropdown__item {
  &.selected::after {
    left: 21px;
    z-index: 10;
    width: 16px;
    height: 16px;
    border: 1px solid var(--blue);
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
    color: var(--blue);
  }
  &.hover {
    background-color: #f5f7fd;
    border-radius: 1px;
  }
  &.is-disabled {
    &.selected::after {
      background: var(--gray);
      border: 1px solid var(--gray);
    }
    .el-checkbox,
    .el-checkbox__label,
    .el-checkbox__inner {
      color: var(--gray);
      border-color: var(--gray) !important;
    }
  }
}
:deep(.ep-input__wrapper) {
  background: var(--primary);
  & .ep-input__inner {
    color: #fff !important;
  }
}
</style>
