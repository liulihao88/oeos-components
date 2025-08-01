<template>
  <el-tooltip class="tooltip-box" :disabled="handleDisabled" :effect="effect" v-bind="tooltipAttrs">
    <span
      @click="contentClick"
      v-if="props.showSlot"
      class="tooltip-box__text"
      :style="{ maxWidth: processWidth(width, true) }"
      @mouseover="onMouseOver"
      v-bind="$attrs"
    >
      <span ref="contentRef" class="tooltip-box__content">
        <slot>
          {{ $attrs.content }}
        </slot>
      </span>
    </span>
    <slot name="content"></slot>
  </el-tooltip>
</template>

<script setup lang="ts" name="OTooltip">
import { ref, useSlots, computed, useAttrs } from 'vue'
import { processWidth } from '@/utils/src'
const slots = useSlots()
const attrs = useAttrs()

const props = defineProps({
  width: {
    type: String,
    default: '100%',
  },
  showSlot: {
    type: Boolean,
    default: true,
  },
  effect: {
    default: 'dark',
  },
  tooltipAttrs: {
    type: Object,
    default: () => ({}),
  },
})
const contentRef = ref()
const isDisabled = ref(false)
const handleDisabled = computed(() => {
  if (attrs.disabled) {
    return attrs.disabled
  }
  if (!attrs.content) {
    return true
  }
  if (slots.default) {
    return false
  }
  return isDisabled.value
})
function onMouseOver() {
  if (!props.showSlot) {
    return
  }
  // 内容超出，显示文字提示内容
  const tag = contentRef.value
  if (!tag) return
  const parentWidth = tag.parentNode.offsetWidth // 获取元素父级可视宽度
  const contentWidth = tag.offsetWidth // 获取元素可视宽度
  isDisabled.value = contentWidth <= parentWidth
}
const emits = defineEmits(['click'])
function contentClick() {
  emits('click')
}
</script>
<style lang="scss" scoped>
.tooltip-box__text {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
}
.tooltip-box__content {
  // height: inherit;
}
</style>
