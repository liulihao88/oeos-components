<template>
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
  >
    <template v-if="$attrs.title" #prepend>
      {{ $attrs.title }}
    </template>
  </el-input>
</template>

<script setup lang="ts">
/**
* @使用方法
<g-input
  title="想天下"
  @keyup.enter="close"
  v-model="aaa"
  width="200"
  size="default"
  :titleAttrs = "{
    onClick: close,
    style: {color: 'blue'}
  }"
  class="m-l-100"
></g-input>
*/
import { ref, getCurrentInstance, computed, useAttrs } from 'vue'
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
})
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
  console.log(` attrs.disabled`, attrs.disabled)
  console.log(` attrs.placeholder`, attrs.placeholder)
  let res =
    attrs.disabled === undefined
      ? attrs.placeholder || '请输入'
      : props.disPlaceholder
  console.log(`res`, res)
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
</script>

<style lang="scss" scoped></style>
