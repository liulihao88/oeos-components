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
  return attrs.size ? `el-input--${attrs.size}` : 'o-comp-title__base-size'
})

</script>

<template>
  <div
    class="o-comp-title"
    :class="sizeClass"
    :style="{ ...computedBoxStyle }"
    v-bind="$attrs"
    v-if="props.title"
  >
    {{ props.title }}
  </div>
</template>

<style lang="scss" scoped>
.o-comp-title {
  background: var(--el-fill-color-light);
  vertical-align: middle;
  position: relative;
  border: 1px solid var(--el-border-color);
  box-sizing: border-box !important;
  border-right: 0 none;
  padding: 0 4px;
  white-space: nowrap;
  border-radius: 2px 0 0 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: var(--el-input-height, 32px);
  line-height: 100% !important;
  color: var(--el-color-info);
  font-size: 14px;
}
.o-comp-title + :deep(.el-input__wrapper) {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.o-comp-title__base-size {
  font-size: 14px;
}
</style>
