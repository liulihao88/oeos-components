<script setup lang="ts" name="OCompTitle">
/**
 *
  <o-comp-title :title="props.title" :size="attrs.size" :boxStyle="$attrs.boxStyle ?? {}"></o-comp-title>
 */
import { ref, getCurrentInstance, useAttrs, computed } from 'vue'
import { processWidth } from '@/utils'
const attrs = useAttrs()

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  boxStyle: {
    type: Object,
    default: () => ({}),
  },
})
const sizeMap = ['small', 'large']

const computedBoxStyle = computed(() => {
  if (props.boxStyle?.width) {
    return {
      ...props.boxStyle,
      width: processWidth(props.boxStyle?.width, true),
    }
  } else {
    return props.boxStyle
  }
})

const sizeClass = computed(() => {
  let res = attrs.size ? `el-input--${attrs.size}` : 'o-comp-title__base-size'
  return res
})
const sizeStyle = computed(() => {
  let res = { height: !sizeMap.includes(String(attrs.size)) && '32px' }
  return res
})
</script>

<template>
  <div
    class="o-comp-title"
    :class="sizeClass"
    :style="{ ...sizeStyle, ...computedBoxStyle }"
    v-bind="$attrs"
    v-if="props.title"
  >
    {{ props.title }}
  </div>
</template>

<style lang="scss" scoped>
.o-comp-title {
  background: #f5f7fa;
  vertical-align: middle;
  position: relative;
  border: 1px solid #dcdfe6;
  border-right: 0 none;
  padding: 0 4px;
  white-space: nowrap;
  border-radius: 2px 0 0 2px;
  align-items: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  height: var(--el-input-height);
  color: var(--el-color-info);
}
.o-comp-title + :deep(.el-input__wrapper) {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.o-comp-title__base-size {
  font-size: 14px;
}
</style>
