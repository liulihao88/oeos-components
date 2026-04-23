<script setup lang="ts" name="OCompTitle">
/**
 *
  <o-comp-title :title="props.title" :size="attrs.size" :boxStyle="$attrs.boxStyle ?? {}"></o-comp-title>
 */
import { useAttrs, computed } from 'vue'
import { processWidth } from '@oeos-components/utils'
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
  return `o-comp-title--${attrs.size || 'default'}`
})

const sizeStyle = computed(() => {
  const size = attrs.size || 'default'
  const heightMap = {
    large: 'var(--el-component-size-large, 40px)',
    default: 'var(--el-component-size, 32px)',
    small: 'var(--el-component-size-small, 24px)',
  }

  return {
    height: heightMap[size] || heightMap.default,
  }
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
  // outline: 1px solid black;
  box-sizing: border-box !important;
  border-right: 0 none;
  padding: 0 4px;
  white-space: nowrap;
  border-radius: 2px 0 0 2px;
  align-items: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1 !important;
  color: var(--el-color-info);
  font-size: 14px;
}
.o-comp-title + :deep(.el-input__wrapper) {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.o-comp-title--small {
  font-size: 12px;
}

.o-comp-title--large {
  font-size: 14px;
}
</style>
