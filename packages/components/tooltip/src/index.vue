<template>
  <el-tooltip class="o-tooltip-box" :disabled="handleDisabled" :effect="effect" v-bind="tooltipAttrs">
    <span
      @click="contentClick"
      v-if="props.showSlot"
      class="o-tooltip-box__text"
      :style="{ maxWidth: processWidth(width, true) }"
      @mouseover="onMouseOver"
      v-bind="$attrs"
    >
      <span ref="contentRef" class="o-tooltip-box__content">
        <slot>
          {{ $attrs.content }}
        </slot>
      </span>
    </span>
    <template v-if="$slots.content" v-slot:content>
      <slot name="content"></slot>
    </template>
    <!-- 添加对 VNode 类型 content 的支持 -->
    <template v-else-if="isVNodeContent" v-slot:content>
      <component :is="dynamicComponent" />
    </template>
  </el-tooltip>
</template>

<script setup lang="ts" name="OTooltip">
import { ref, useSlots, computed, useAttrs, h, resolveComponent } from 'vue'
import { processWidth } from '@oeos-components/utils'
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

// 检查 content 是否为 VNode
const isVNodeContent = computed(() => {
  const content = attrs.content
  return content && typeof content === 'object' && content.hasOwnProperty('type')
})

// 创建一个动态组件来渲染 VNode
const dynamicComponent = computed(() => {
  const content = attrs.content
  if (isVNodeContent.value) {
    return {
      render: () => content
    }
  }
  return null
})

const contentRef = ref()
const isDisabled = ref(false)
const handleDisabled = computed(() => {
  if (attrs.disabled) {
    return attrs.disabled
  }
  if (!attrs.content && !slots.content) {
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
.o-tooltip-box__text {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
}

.o-tooltip-box__text:has(.el-button) + :deep(.el-button),
.el-button + .o-tooltip-box__text :deep(.el-button),
.o-tooltip-box__text:has(.el-button) + .o-tooltip-box__text:has(.el-button) {
  margin-left: 12px !important;
}
</style>