<template>
  <div class="o-input" v-bind="subAttrs" :style="{ ...mHandleWidth() }">
    <el-tooltip
      :content="$attrs.modelValue"
      :disabled="hideTooltip"
      v-bind="tooltipAttrs"
    >
      <el-input
        v-bind="$attrs"
        :placeholder="handlePlaceholder()"
        class="kd-ipt"
        :clearable="$attrs.clearable !== false"
        :class="{ 'kd-textarea': $attrs.type === 'textarea' }"
        :style="{ ...mHandleWidth() }"
        :maxlength="handleMaxLength"
        :rows="$attrs.rows || 2"
        resize="none"
        height="100px"
        :show-word-limit="handleShowWordLimit()"
        @focus="focusHandler($event)"
        @mouseover.native="inputOnMouseOver($event)"
      >
        <template v-if="$attrs.title" #prepend>
          <div v-bind="titleAttrs">
            {{ $attrs.title }}
          </div>
        </template>
      </el-input>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
/**
* @使用方法
<o-input
  title="名字"
  @keyup.enter="close"
  v-model="aaa"
  width="200"
  size="default"
  :titleAttrs = "{
    onClick: close,
    style: {color: 'blue'}
  }"
  class="m-l-100"
></o-input>
*/
import { ref, getCurrentInstance, computed, useAttrs, watch } from 'vue'
const { proxy } = getCurrentInstance()
const attrs = useAttrs()
const props = defineProps({
  titleAttrs: {
    type: Object,
    default: () => {},
  },
  width: {
    type: [String, Number],
    default: '',
  },
  showWordLimit: {
    type: [Boolean, String],
    default: '',
  },
  block: {
    type: Boolean,
    default: false,
  },
  // placeholder在disabled的情况下是不显示的. 如果想要在这种情况下显示placeholder, 那么就用这个属性
  disPlaceholder: {
    type: String,
    default: '',
  },
  subAttrs: {
    type: Object,
    default: () => {
      return {}
    },
  },
  tooltipAttrs: {
    type: Object,
    default: () => {
      return {}
    },
  },
})
const hideTooltip = ref(true)
const handleMaxLength = computed(() => {
  if (attrs.type === 'textarea') {
    return attrs.maxlength || 1000
  } else {
    return attrs.maxlength || ''
  }
})

// 根据传入的width, 返回处理后的width
function mHandleWidth() {
  if (props.block) {
    return { width: '100%' }
  }
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
  let res =
    attrs.disabled === undefined
      ? attrs.placeholder || '请输入'
      : props.disPlaceholder
  return res
}
// 是否显示showWordLimit属性
function handleShowWordLimit() {
  if (typeof props.showWordLimit === 'boolean') {
    return props.showWordLimit
  }
  if (attrs.type === 'textarea') {
    return true
  }
  return false
}
// 如果是密码输入框, focus直接选中文本
function focusHandler(evt) {
  if (attrs.type === 'password') {
    evt.currentTarget.select()
  }
}
function inputOnMouseOver(event) {
  const target = event.target
  if (target.offsetWidth + 4 < target.scrollWidth) {
    hideTooltip.value = false
  } else {
    hideTooltip.value = true
  }
}
</script>

<style lang="scss" scoped>
.o-input {
  width: 100%;
  display: inline-block;
}

// el-input的宽度会随着鼠标移入显示clearable而改变, 所以加下面这两行代码
:deep(.el-input__suffix:not(.el-select .el-input__suffix)) {
  margin-left: -22px;
}
:deep(.el-input__inner:not(.el-select .el-input__inner)) {
  padding-right: 22px;
}
:deep(.el-textarea__inner) {
  padding-bottom: 20px;
}
</style>
